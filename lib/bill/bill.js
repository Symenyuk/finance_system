'use strict';

const log = require('../utils/logger');
const db = require('../db/db');
const moment = require('moment');
moment().format();

require('../network/blockEventListener').listener();
const fabricNetwork = require('../network/connectNetwork');

const permission = global.permissions;
const roles = require('../../config/config').role;
const billStringStatus = require('../../config/config').billStringStatus;
const billStatus = require('../../config/config').billStatus;

const adminCertificate = global.config.network.admin;
const hospitalCertificate = global.config.network.hospital;
const insuranceCertificate = global.config.network.insurance;

const billConfig = global.config.bill;

const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

let options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    header: {
        height: '45mm',
        contents: '<div style="text-align: center;">Blockchain Financial Systems</div>'
    },
    type: 'pdf',
};

const checkPatient = (req, res) => {
    let national_security_number = req.query.national_security_number;
    const hospital = req.decoded.hospital;

    if (national_security_number !== undefined) {
        db.serialize(() => {
            db.get(`SELECT * FROM patients WHERE national_security_number = ? AND hospital = ?`,
                [national_security_number, hospital], (err, data) => {
                    if (err) {
                        log.error(`checkPatient. ${err}`);
                        res.status(500).json({message: 'Server error'});
                    }

                    if (data) {
                        res.status(200).send(JSON.stringify(data));
                    } else {
                        res.status(200).json({message: 'None data'});
                    }
                });
        });
    }
}

const getRelatedBills = (req, res) => {
    const hospital = req.decoded.hospital;
    let national_security_number = req.query.national_security_number;

    if (national_security_number) {
        db.serialize(() => {
            db.all(`SELECT bill_key, doctor_name, service_name, created_at 
                FROM bills 
                WHERE hospital = ? AND national_security_number = ? 
                ORDER BY created_at DESC LIMIT 20`,
                [hospital, Number(national_security_number)], (err, data) => {
                    if (err) {
                        res.status(500).json({message: 'Server error'});
                    }
                    res.status(200).send(JSON.stringify(data));
                });
        });
    } else {
        log.error(`None all params for getRelatedBills`);
        res.status(422).send({message: `Error. None all params for getRelatedBills`});
    }
}

const createBill = async (req, res) => {
    const hospital = req.decoded.hospital;
    const who = req.decoded.userLogin;
    const status = 0;
    const created_at = Date.now();
    const updated_at = Date.now();

    let insurance = req.body.insurance;
    let branch = req.body.branch;
    let department = req.body.department;

    let patient_name = req.body.patient_name;
    let patient_mobile = req.body.patient_mobile;
    let patient_age = req.body.patient_age;
    let policy_number = req.body.policy_number; // UNIQUE
    let policy_type = req.body.policy_type; // optional field
    let national_security_number = req.body.national_security_number;  // UNIQUE

    let discount = req.body.discount; // optional field

    let approval_number = req.body.approval_number; // optional field
    let approval_date = req.body.approval_date;
    let approval_time = req.body.approval_time;
    let insurance_approval = req.body.insurance_approval; // YES/No
    let related_bill = req.body.related_bill; // optional field

    let doctor_name = req.body.doctor_name;

    let service_name = req.body.service_name;
    let service_description = req.body.service_description; // optional field

    let additional_info = req.body.additional_info; // optional field
    let cost = req.body.cost;
    let paid_by_patient = req.body.paid_by_patient;
    let vat = req.body.vat;  // optional field
    let remain_to_pay_by_insurance = req.body.remain_to_pay_by_insurance; // optional field


    if (hospital && who && insurance && branch && department && patient_name && patient_mobile && patient_age
        && policy_number && national_security_number && doctor_name && service_name
        && cost && paid_by_patient) {

        let initCreateBill = async () => {

            db.serialize(() => {

                // bill_key
                db.get(`SELECT name_unique, count_bills FROM hospitals WHERE id = ?`, hospital, async (err, data) => {
                    if (err) {
                        log.error(`createBill. ${err}`);
                        res.status(500).json({message: 'Server error'});
                    }
                    let hospitalCountBills = (data.count_bills === null) ? 1 : Number(data.count_bills) + 1;
                    let hospitalNameUnique = data.name_unique;

                    let bill_key = hospitalNameUnique + Number(hospitalCountBills);
                    let network_status = null;

                    // identify agreement
                    let agreement;
                    db.get(`SELECT id FROM agreements WHERE hospital = ? AND insurance = ?`, [hospital, insurance], async (err, data) => {
                        if (err) {
                            log.error(`createBill. ${err}`);
                            res.status(500).json({message: 'Server error'});
                        }
                        agreement = data.id;

                        // Create bill in network
                        try {
                            const contract = await fabricNetwork.connectNetwork(hospitalCertificate.connection, hospitalCertificate.wallet, hospitalCertificate.identity);
                            let tx = await contract.submitTransaction('initBill',
                                String(bill_key),
                                String(hospital),
                                String(insurance),
                                String(agreement),
                                String(status),
                                '', // status_message
                                String(created_at),
                                String(updated_at),
                                String(branch),
                                String(department),
                                String(patient_name),
                                String(patient_mobile),
                                String(patient_age),
                                String(policy_number),
                                String(policy_type),
                                String(discount),
                                String(approval_number),
                                String(approval_date),
                                String(approval_time),
                                String(insurance_approval),
                                String(related_bill),
                                String(doctor_name),
                                String(service_name),
                                String(service_description),
                                String(additional_info),
                                String(cost),
                                String(paid_by_patient),
                                String(vat),
                                String(remain_to_pay_by_insurance),
                                String(who), // tx_creator
                                String(national_security_number)
                            );
                            if (tx) {
                                log.info(`Created bill ${bill_key}. Transaction complete.`);
                                db.serialize(() => {
                                    let data = [bill_key, hospital, insurance, agreement, status, created_at, updated_at,
                                        branch, department,
                                        patient_name, patient_mobile, patient_age, policy_number, policy_type,
                                        national_security_number,
                                        discount,
                                        approval_number, approval_date, approval_time, insurance_approval,
                                        related_bill,
                                        doctor_name,
                                        service_name, service_description,
                                        additional_info, cost, paid_by_patient, vat, remain_to_pay_by_insurance, who, network_status];

                                    let stmt = db.prepare(`INSERT INTO bills
                                                           (bill_key, hospital, insurance, agreement, status,
                                                           created_at, updated_at,
                                                           branch, department,
                                                           patient_name, patient_mobile, patient_age,
                                                           policy_number,
                                                           policy_type,
                                                           national_security_number,
                                                           discount,
                                                           approval_number, approval_date, approval_time,
                                                           insurance_approval,
                                                           related_bill,
                                                           doctor_name,
                                                           service_name, service_description,
                                                           additional_info, cost, paid_by_patient, vat,
                                                           remain_to_pay_by_insurance, who, network_status)
                                                           VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                                           ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                                    stmt.run(data, (err) => {
                                        if (err) {
                                            log.error(`Insert bill. ${err}`);
                                            return res.status(500).send({message: 'Server error', err})
                                        }
                                    });
                                    stmt.finalize();

                                    // History
                                    let dataHistory = [bill_key, status, 'created bill', who, updated_at];
                                    let stmtHistory = db.prepare(`INSERT INTO billhistory (bill_key, status, msg, who, updated_at) VALUES(?, ?, ?, ?, ?)`);
                                    stmtHistory.run(dataHistory, (err) => {
                                        if (err) {
                                            log.error(`Insert bill history. ${err}`);
                                            res.status(500).send({message: 'Server error', err})
                                        }
                                    });
                                    stmtHistory.finalize();

                                    // Patient
                                    db.serialize(() => {
                                        db.get(`SELECT national_security_number FROM patients WHERE hospital = ? AND national_security_number = ?`, [hospital, national_security_number], (err, data) => {
                                            if (err) {
                                                log.error(`getBill, ${err}`);
                                            }
                                            if (data) {
                                                db.run(`UPDATE patients 
                                                        SET hospital = ?, branch = ?, department = ?, patient_name = ?, 
                                                        patient_mobile = ?, patient_age = ?,
                                                        policy_number = ?, policy_type = ?, discount = ?
                                                        WHERE national_security_number = ?`,
                                                    [hospital, branch, department, patient_age, patient_mobile, patient_age, policy_number, policy_type,
                                                        discount], (err) => {
                                                        if (err) {
                                                            log.error(`update patients, ${err}`);
                                                            res.status(500).send({message: 'Server error!'})
                                                        }
                                                        res.status(200).send({message: 'Success'});
                                                    });
                                            } else {
                                                let dataPatient = [hospital, branch, department, patient_name, patient_mobile,
                                                    patient_age, policy_number, policy_type, national_security_number,
                                                    discount, created_at];
                                                let stmtPatient = db.prepare(`INSERT INTO patients
                                                    (hospital, branch, department, patient_name, patient_mobile, patient_age,
                                                    policy_number, policy_type, national_security_number, discount, created_at)
                                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                                                stmtPatient.run(dataPatient, (err) => {
                                                    if (err) {
                                                        log.error(`Insert patients ${err}`);
                                                    }
                                                    res.status(200).send({message: 'Success'});
                                                });
                                                stmtPatient.finalize();
                                            }
                                        });
                                    });

                                    // Hospital count_bills
                                    db.run(`UPDATE hospitals SET count_bills = ? WHERE id = ?`, [hospitalCountBills, hospital], (err) => {
                                        if (err) {
                                            log.error(`update count bills hospital. ${err}`);
                                            res.status(500).send({message: 'Server error!'})
                                        }
                                    });
                                });
                            }
                        } catch (error) {
                            log.error(`Network. Bill not created, ${error}`);
                            res.status(500).json({
                                error: error
                            });
                        }
                    });
                });
            });
        }

        db.serialize(() => {
            // check unique policy number
            db.get(`SELECT policy_number, national_security_number FROM patients WHERE policy_number = ?`,
                [policy_number], (err, data) => {
                    if (err) {
                        log.error(`select policy_number, ${err}`);
                        res.status(500).send({message: 'Server error'});
                    }
                    if (data) {
                        if (data.national_security_number === national_security_number) {
                            initCreateBill();
                        } else {
                            res.status(409).send({message: 'Policy number already exists'});
                        }
                    } else {
                        initCreateBill();
                    }
                })
        });
    } else {
        log.error(`None all params for createBill`);
        res.status(422).send({message: `Error. None all params for createBill`});
    }
}

const changeBillStatus = async (req, res) => {
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;

    const userRole = req.decoded.userRole;
    const who = req.decoded.userLogin;
    const id = req.params.id;
    const bill_key = req.body.bill_key;
    let oldStatus = req.body.oldStatus;
    let newStatus = req.body.status;
    let msg = req.body.msg || '';
    let updated_at = Date.now();
    let canChangeBillStatus = permission[userRole].canChangeBillStatus[oldStatus];

    if (canChangeBillStatus) {
        if (canChangeBillStatus.includes(newStatus)) {
            if (id && who && bill_key && newStatus && oldStatus !== undefined) {

                // Change bill status in network
                let connection, wallet, identity;

                if (hospital) {
                    connection = hospitalCertificate.connection;
                    wallet = hospitalCertificate.wallet;
                    identity = hospitalCertificate.identity;
                }
                if (insurance) {
                    connection = insuranceCertificate.connection;
                    wallet = insuranceCertificate.wallet;
                    identity = insuranceCertificate.identity;
                }
                if (!hospital && !insurance) {
                    connection = adminCertificate.connection;
                    wallet = adminCertificate.wallet;
                    identity = adminCertificate.identity;
                }

                // Change status in database
                db.serialize(() => {

                    let networkChangeStatus = async (newStatus, msg) => {
                        try {
                            const contract = await fabricNetwork.connectNetwork(connection, wallet, identity);
                            await contract.submitTransaction(
                                'updateStatus',
                                String(bill_key),
                                String(newStatus),
                                String(msg),
                                String(updated_at),
                                String(who) // tx_creator
                            );
                            log.info(`bill ${bill_key} changed status to ${newStatus}. Transaction complete.`);
                        } catch (error) {
                            log.error(`Network. Bill status not changed. ${error}`);
                            res.status(500).json({
                                error: error
                            });
                        }
                    };

                    let addHistory = (newStatus, msg) => {
                        db.run(`INSERT INTO billhistory(bill_key, status, msg, who, updated_at) VALUES(?, ?, ?, ?, ?)`, [bill_key, newStatus, msg, who, updated_at], (err) => {
                            if (err) {
                                log.error(`Insert bill history. ${err}`);
                                res.status(500).send({message: 'Server error'})
                            }
                            res.status(200).send({message: 'Success'});
                        });
                    };


                    let sqlChangeStatus = () => {
                        db.run(`UPDATE bills SET status = ?, status_message = ?, updated_at = ? WHERE id = ?`, [newStatus, msg, updated_at, id], (err) => {
                            if (err) {
                                log.error(`changeBillStatus. ${err}`);
                            }
                            networkChangeStatus(newStatus, msg);
                            addHistory(newStatus, msg);
                        });
                    };


                    if (newStatus === billStatus('dispute_concerned')) {
                        db.get(`SELECT count(*) as countDisputeConcerned FROM billhistory WHERE status = ? AND bill_key = '${bill_key}'`, billStatus('dispute_concerned'), (err, data) => {
                            if (err) {
                                log.error(`Select billhistory. ${err}`);
                                res.status(500).send({message: 'Server error'})
                            }
                            if (data.countDisputeConcerned >= billConfig.countConcernStatus) {
                                let terminatedStatus = billStatus('terminated');
                                let terminatedMsg = 'automatic change of status to terminated';
                                db.run(`UPDATE bills SET status = ?, status_message = ?, updated_at = ? WHERE bill_key = ?`, [terminatedStatus, terminatedMsg, updated_at, bill_key], (err) => {
                                    if (err) {
                                        log.error(`changeBillStatus. ${err}`);
                                    }
                                    log.info(`bill ${bill_key} automatic change of status to terminated`);
                                    networkChangeStatus(terminatedStatus, terminatedMsg);
                                    addHistory(terminatedStatus, terminatedMsg);
                                });
                            } else {
                                sqlChangeStatus();
                            }
                        });
                    } else if (newStatus === billStatus('pending_payment')) {
                        db.get(`SELECT count(*) as countPendingPayment FROM billhistory WHERE status = ? AND bill_key = '${bill_key}'`, billStatus('pending_payment'), (err, data) => {
                            if (err) {
                                log.error(`Select billhistory. ${err}`);
                                res.status(500).send({message: 'Server error'})
                            }

                            if (data.countPendingPayment >= billConfig.countPendingPaymentStatus) {
                                let terminatedStatus = billStatus('terminated');
                                let terminatedMsg = 'automatic change of status to terminated';
                                db.run(`UPDATE bills SET status = ?, status_message = ?, updated_at = ? WHERE bill_key = ?`, [terminatedStatus, terminatedMsg, updated_at, bill_key], (err) => {
                                    if (err) {
                                        log.error(`changeBillStatus. ${err}`);
                                    }
                                    log.info(`bill ${bill_key} automatic change of status to terminated`);
                                    networkChangeStatus(terminatedStatus, terminatedMsg);
                                    addHistory(terminatedStatus, terminatedMsg);
                                });
                            } else {
                                sqlChangeStatus();
                            }
                        });
                    } else {
                        sqlChangeStatus();
                    }
                });
            } else {
                log.error(`Error. None all params for changeBillStatus`);
                res.status(422).send({message: `Error. None all params for changeBillStatus`});
            }
        } else {
            return res.status(403).send({message: 'Access is forbidden'});
        }
    } else {
        return res.status(403).send({message: 'Access is forbidden'});
    }
}

const getBills = (req, res) => {
    const hospital = req.decoded.hospital;
    const insurance = req.decoded.insurance;
    const role = req.decoded.userRole;

    const filterStatus = req.query.status ? `AND bills.status IN (${req.query.status})` : '';
    const filterNetworkStatus = req.query.network_status ? `AND bills.network_status IN (${req.query.network_status})` : '';
    const filterBranch = req.query.branch ? `AND bills.branch = ${req.query.branch}` : '';
    const filterDepartment = req.query.department ? `AND bills.department = ${req.query.department}` : '';
    const filterPatientName = req.query.patient_name ? `AND bills.patient_name LIKE '%${req.query.patient_name}%'` : '';
    const filterPatientMobile = req.query.patient_mobile ? `AND bills.patient_mobile LIKE '%${req.query.patient_mobile}%'` : '';
    const filterPolicyNumber = req.query.policy_number ? `AND bills.policy_number = '${req.query.policy_number}'` : '';
    const filterPolicyType = req.query.policy_type ? `AND bills.policy_type LIKE '%${req.query.policy_type}%'` : '';
    const filterDoctorName = req.query.doctor_name ? `AND bills.doctor_name LIKE '%${req.query.doctor_name}%'` : '';
    const filerService = req.query.service ? `AND bills.service_name = '${req.query.service}'` : '';

    const filterHospital = req.query.hospital ? `AND bills.hospital = ${req.query.hospital}` : '';
    const filterInsurance = req.query.insurance ? `AND bills.insurance = ${req.query.insurance}` : '';

    let orderBy = req.query.order_by ? `ORDER BY bills.${req.query.order_by}` : ``;
    let financeBills = ``;
    let tellerBills = ``;

    let filterCountBills = req.query.count;
    let filterOffset = req.query.offset || 0;

    // export to pdf
    let getExportBills = req.query.get_export_bills;

    function exportBills(data) {
        ejs.renderFile(__dirname + '/bill-template.ejs', {
            moment: moment,
            billStringStatus: billStringStatus,
            bills: data
        }, function (err, data) {
            if (err) {
                log.error(err);
                res.status(500).send(err);
            } else {
                pdf.create(data, options).toFile('bills_reports/bills-report.pdf', (err) => {
                    if (err) {
                        log.error(`bills pdf create, ${err}`);
                        res.status(500).send({message: 'Server error'});
                    }
                    res.status(200).sendFile(path.join(__dirname, '../../bills_reports/bills-report.pdf'));
                });
            }
        });
    }

    let filterFrom = req.query.from ? `AND bills.created_at >= ${moment(req.query.from).format("x")}` : ``;
    let filterTo = req.query.to ? `AND bills.created_at <= ${moment(req.query.to)
        .add(23, 'hours')
        .add(59, 'minutes')
        .add(59, 'seconds')
        .format("x")}` : ``;

    let selectField;
    switch (role) {
        case roles('superAdmin'):
            selectField = `bills.id, bills.agreement, bills.hospital, bills.insurance, bills.bill_key, bills.status, bills.network_status,
            bills.created_at,
            agreements.transaction_charges_per_bill,
            hospitals.name as hospital_name,
            insurance.name as insurance_name`;
            break;
        case roles('accountManager'):
            selectField = `bills.id, bills.agreement, bills.hospital, bills.insurance, bills.bill_key, bills.status, bills.network_status,
            bills.created_at,
            agreements.transaction_charges_per_bill,
            hospitals.name as hospital_name,
            insurance.name as insurance_name`;
            break;
        case roles('financeManager'):
            selectField = `bills.id, bills.agreement, bills.hospital, bills.insurance, bills.bill_key, bills.status, bills.network_status,
            bills.created_at,
            bills.policy_number,
            agreements.transaction_charges_per_bill,
            hospitals.name as hospital_name,
            insurance.name as insurance_name`;
            break;

        // Hospital
        case roles('adminHospital'):
            selectField = `bills.id, bills.created_at, bills.department, bills.branch, bills.insurance, 
            bills.service_name, bills.approval_number, bills.paid_by_patient, bills.remain_to_pay_by_insurance, 
            bills.status, bills.network_status, bills.created_at,
            insurance.name as insurance_name`;
            break;
        case roles('teller'):
            selectField = `bills.id, bills.created_at, bills.department, bills.patient_name, bills.patient_mobile, 
            bills.insurance, bills.approval_number, bills.paid_by_patient, bills.remain_to_pay_by_insurance, 
            bills.status, bills.network_status, bills.created_at,
            insurance.name as insurance_name`;
            break;
        case roles('financeHospital'):
            selectField = `bills.id, bills.bill_key, bills.department, bills.insurance, bills.insurance_approval, 
            bills.policy_type, bills.cost, bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, 
            bills.status, bills.network_status, bills.created_at, bills.who as teller,
            insurance.name as insurance_name`;
            break;
        case roles('financeManagerHospital'):
            selectField = `bills.id, bills.bill_key, bills.department, bills.insurance, bills.insurance_approval, 
            bills.cost, bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, bills.status, bills.network_status,
            bills.created_at, bills.who as teller,
            insurance.name as insurance_name`;
            break;

        // Insurance
        case roles('adminInsurance'):
            selectField = `bills.id, bills.bill_key, bills.insurance, bills.department, bills.insurance_approval, 
            bills.cost, bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, bills.status, bills.network_status,
            bills.created_at,
            insurance.name as insurance_name`;
            break;
        case roles('audit'):
            selectField = `bills.id, bills.bill_key, bills.hospital, bills.department, bills.insurance_approval, 
            bills.insurance, bills.cost, bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, 
            bills.status, bills.network_status, bills.created_at,
            insurance.name as insurance_name`;
            break;
        case roles('auditManagerInsurance'):
            selectField = `bills.id, bills.bill_key, bills.insurance, bills.department, bills.cost, 
            bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, bills.status, bills.network_status, bills.created_at,
            insurance.name as insurance_name`;
            break;
        case roles('financeManagerInsurance'):
            selectField = `bills.id, bills.bill_key, bills.insurance, bills.department, bills.cost, 
            bills.paid_by_patient, bills.discount, bills.remain_to_pay_by_insurance, bills.status, bills.network_status, bills.created_at,
            insurance.name as insurance_name`;
            break;
        default:
            `bills.bill_key, bills.hospital, bills.insurance, bills.agreement, bills.status, bills.network_status, bills.created_at`;
    }


    if (role === roles('superAdmin') || role === roles('accountManager') || role === roles('financeManager')) {
        db.serialize(() => {
            db.all(`SELECT ${selectField} FROM bills
                    INNER JOIN agreements ON agreements.id = bills.agreement
                    LEFT JOIN hospitals ON hospitals.id = bills.hospital
                    LEFT JOIN insurance ON insurance.id = bills.insurance
                    WHERE bills.id NOT IN ('null') ${filterStatus} ${filterNetworkStatus} ${filterHospital} ${filterInsurance} ${filterFrom} ${filterTo} ${orderBy}`, (err, data) => {
                if (err) {
                    log.error(`getBills. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                }
                let limitedData = data.slice(filterOffset, filterCountBills ? Number(filterOffset) + Number(filterCountBills) : data.length);

                let arrayDate = [];
                if (getExportBills) {
                    for (let bill of limitedData) {
                        arrayDate.push(bill.created_at);
                    }
                    let from = Math.min(...arrayDate);
                    let to = Math.max(...arrayDate);

                    exportBills({'count': data.length, 'list': limitedData, 'dateFrom': from, 'dateTo': to});
                } else {
                    res.status(200).send({'count': data.length, 'list': limitedData});
                }
            });
        });
    }

    if (hospital) {
        let selectBills = () => {
            db.serialize(() => {
                db.all(`SELECT DISTINCT ${selectField} FROM bills
                INNER JOIN agreements ON agreements.hospital = bills.hospital
                LEFT JOIN insurance ON insurance.id = bills.insurance
                WHERE bills.hospital = ${hospital} 
                ${filterStatus} ${filterNetworkStatus} ${filterBranch} ${filterDepartment} ${filterPatientName} ${filterPatientMobile} ${filterPolicyNumber} 
                ${filterPolicyType} ${filterHospital} ${filterInsurance} ${filterDoctorName} ${filerService} ${financeBills} ${tellerBills}
                ${filterFrom} ${filterTo}
                ${orderBy}`, (err, data) => {
                    if (err) {
                        log.error(`getBills, hospital. ${err}`);
                        res.status(500).json({message: 'Server error'});
                    } else if (!data) {
                        res.status(200).json({'count': 0, 'list': []});
                    }
                    let limitedData = data.slice(filterOffset, filterCountBills ? Number(filterOffset) + Number(filterCountBills) : data.length);
                    res.status(200).send({'count': data.length, 'list': limitedData});

                });
            });
        }
        if (role === roles('teller')) {
            db.serialize(() => {
                db.get(`SELECT department FROM users WHERE id = ?`, [req.decoded.userId], (err, data) => {
                    if (err) {
                        log.error(`getBills. get department teller. ${err}`);
                        res.status(500).json({message: 'Server error'});
                    }
                    if (data.department !== null) {
                        tellerBills = `AND bills.department = ${data.department}`;
                        selectBills();
                    } else {
                        res.status(200).json({'count': 0, 'list': []});
                    }
                });
            });
        } else {
            selectBills();
        }
    }
    if (insurance) {
        db.serialize(() => {
            db.all(`SELECT DISTINCT ${selectField}, agreements.transaction_interval as transact_interval FROM bills 
                    INNER JOIN agreements ON agreements.insurance = bills.insurance
                    LEFT JOIN insurance ON insurance.id = bills.insurance
                    WHERE bills.insurance = ${insurance}
                    ${filterStatus} ${filterNetworkStatus} ${filterBranch} ${filterDepartment} ${filterPatientName} ${filterPatientMobile} 
                    ${filterPolicyNumber} ${filterPolicyType} ${filterHospital} ${filterInsurance} ${filterDoctorName} 
                    ${filterFrom} ${filterTo}
                    ${filerService} ${orderBy}`, (err, data) => {
                if (err) {
                    log.error(`getBills, insurance. ${err}`);
                    res.status(500).json({message: 'Server error'});
                } else if (!data) {
                    res.status(200).json({'count': 0, 'list': []});
                } else {
                    let insuranceBills = data.filter(item => {
                        let visibleBill = (Number(item.transact_interval) === 7) ?
                            moment(item.created_at).endOf('week') :
                            moment(item.created_at).endOf('month');

                        return moment().isAfter(visibleBill);
                    });
                    if (insuranceBills.length) {
                        let limitedData = insuranceBills.slice(filterOffset, filterCountBills ? Number(filterOffset) + Number(filterCountBills) : insuranceBills.length);
                        res.status(200).send({'count': data.length, 'list': limitedData});
                    } else {
                        res.status(200).json({'count': 0, 'list': []});
                    }
                }
            });

        });
    }
}

const getBill = async (req, res) => {
    const id = req.params.id;
    const userRole = req.decoded.userRole;
    let field;

    switch (userRole) {
        case roles('accountManager'):
        case roles('financeManager'):
        case roles('teller'):
        case roles('financeHospital'):
        case roles('financeManagerHospital'):
        case roles('audit'):
        case roles('auditManagerInsurance'):
        case roles('financeManagerInsurance'):
            field = `bills.*`;
            break;

        default:
            field = `bills.id, bills.bill_key, bills.hospital, bills.insurance, bills.agreement, bills.status, bills.network_status,
                 bills.status_message, bills.created_at, bills.updated_at, bills.branch,
                 bills.department, bills.patient_name, bills.patient_mobile, bills.patient_age, bills.policy_number,
                 bills.policy_type, bills.approval_number, bills.approval_date, bills.approval_time,
                 bills.insurance_approval, bills.related_bill, bills.doctor_name, bills.service_name,
                 bills.service_description, bills.additional_info, bills.vat, bills.who`;
    }

    if (id) {
        db.serialize(() => {
            db.get(`SELECT ${field},
                    hospitals.name as hospital_name,
                    insurance.name as insurance_name,
                    branch.name as branch_name,
                    department.name as department_name FROM bills LEFT JOIN hospitals ON hospitals.id = bills.hospital
                    LEFT JOIN insurance ON insurance.id = bills.insurance LEFT JOIN branch ON branch.id = bills.branch
                    LEFT JOIN department ON department.id = bills.department WHERE bills.id = ?`, [id], (err, data) => {
                if (err) {
                    log.error(`getBill, ${err}`);
                    res.status(500).json({message: 'Server error'});
                }
                res.status(200).send(JSON.stringify(data));
            });
        });
    } else {
        log.error(`Error. Need 'id' param for getBill`);
        res.status(422).send({message: `Error.  Need 'id' param for getBill`});
    }
}

module.exports = {
    checkPatient,
    getRelatedBills,
    createBill,
    getBills,
    getBill,
    changeBillStatus
}
