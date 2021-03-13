'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const billStatus = require('../../config/config').billStatus;


const billsStatistics = (req, res) => {
    const hospital = req.decoded.hospital;

    const filterInsurance = req.query.insurance ? `AND insurance = ${req.query.insurance}` : ``;
    const filterStatus = req.query.status ? `AND status = ${req.query.status}` : ``;
    let filterDate = req.query.date;
    if (filterDate !== undefined) {
        if (filterDate === '7') filterDate = " AND (created_at + 604800) > CAST(strftime('%s', 'now') AS INT)";
        if (filterDate === '30') filterDate = " AND (created_at + 2592000) > CAST(strftime('%s', 'now') AS INT)";
    } else {
        filterDate = ``;
    }
    let array = [];
    let countBills;
    let patientPaid;
    let insurancePaid;
    let totalPaid;

    db.serialize(() => {

        // number of bills
        db.get(`SELECT COUNT(*) as count_bills FROM bills WHERE hospital = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            countBills = data.count_bills;
            array.push(data);
        });

        // total paid by patient
        db.all(`SELECT paid_by_patient as total_paid_by_patient FROM bills WHERE hospital = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            if (data.length) {
                let total_paid_by_patient = data.reduce((a, b) => ({total_paid_by_patient: +a.total_paid_by_patient + +b.total_paid_by_patient}));
                patientPaid = total_paid_by_patient.total_paid_by_patient;
                array.push(total_paid_by_patient);
            }
        });

        // total to pay by insurance
        db.all(`SELECT remain_to_pay_by_insurance as total_paid_by_insurance FROM bills WHERE hospital = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            if (data.length) {
                let total_paid_by_insurance = data.reduce((a, b) => ({total_paid_by_insurance: +a.total_paid_by_insurance + +b.total_paid_by_insurance}));
                insurancePaid = total_paid_by_insurance.total_paid_by_insurance;
                array.push(total_paid_by_insurance);

                // total amount (paid)
                totalPaid = {'total_paid': (Number(patientPaid) + Number(insurancePaid))};
                array.push(totalPaid);
            }
        });


        // total of dispute
        db.get(`SELECT COUNT(*) as total_of_dispute FROM bills WHERE hospital = ? AND status = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, billStatus('dispute'), (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            array.push(data);
        });

        // total approved bills
        db.get(`SELECT COUNT(*) as total_approved_bills FROM bills WHERE hospital = ? AND status = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, billStatus('approved'), (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            array.push(data);
        });

        // total paid bills
        db.get(`SELECT COUNT(*) as total_paid_bills FROM bills WHERE hospital = ? AND status = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, billStatus('payed'), (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            array.push(data);
        });

        // total bills charges due
        db.get(`SELECT COUNT(*) as total_bills_charges_due FROM bills WHERE hospital = ? AND status NOT IN (${billStatus('fee_received')}) ${filterInsurance} ${filterDate} ${filterStatus}`, hospital,
            (err, data) => {
                if (err) {
                    log.error(`billsStatistics. ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                array.push(data);
            });

        // total bills charges paid
        db.get(`SELECT COUNT(*) as total_bills_charges_paid FROM bills WHERE hospital = ? AND status = ? ${filterInsurance} ${filterDate} ${filterStatus}`, hospital, billStatus('fee_received'), (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            array.push(data);
        });

        // transaction charges due date
        db.get(`SELECT transaction_charges_per_bill FROM agreements WHERE hospital = ? ${filterInsurance}`, hospital, (err, data) => {
            if (err) {
                log.error(`billsStatistics. ${err}`);
                res.status(500).json({message: 'Server error'});
            }
            let transactionChargesDueDate = {'transaction_charges_due_date': data.transaction_charges_per_bill * countBills};
            array.push(transactionChargesDueDate);
            res.status(200).send(JSON.stringify(array));
        });
    });
}


module.exports = {
    billsStatistics
}