'use strict';

const express = require('express');
const secureRouter = express.Router();
const jwt = require('jsonwebtoken');
const {
    // user
    registrationValidation,
    changeUserDataValidation,

    // hospital
    createHospitalValidation,
    editHospitalValidation,
    createServiceValidation,
    createBranchValidation,
    createDepartmentValidation,
    editDepartmentValidation,

    // insurance
    createInsuranceValidation,

    // agreement
    createAgreementValidation,
    editAgreementValidation,

    // bill
    createBillValidation,

    // *****
    validate
} = require('../lib/utils/validator');

const SECRET_KEY = global.config.jwt.access_token_key;
const permission = global.permissions;

const routeMiddleware = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Token is not valid'});
            } else {
                req.decoded = decoded;
                const userRole = req.decoded.userRole;
                let url = req.url.slice(1).split('/')[0].split('?')[0];
                let userPermission = permission[userRole][url];

                if (!userPermission) {
                    return res.status(401).send({message: 'Unauthorized'});
                }
                next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

// --- controllers --- //
const users = require('../lib/users/users');
const hospital = require('../lib/hospital/hospital');
const servicesHospital = require('../lib/hospital/services');
const branch = require('../lib/hospital/branch');
const department = require('../lib/hospital/department');
const insurance = require('../lib/insurance/insurance');
const agreement = require('../lib/agreement/agreement');
const bill = require('../lib/bill/bill');
const billsStatistics = require('../lib/bill/statistics');
const billHistory = require('../lib/bill/history');
const invoice = require('../lib/invoice/invoice');
const notifications = require('../lib/utils/notifications');

// User
secureRouter.post('/register', routeMiddleware, registrationValidation(), validate, users.registration);
secureRouter.get('/get_user', routeMiddleware, users.getUser);
secureRouter.patch('/change_user_status/:id', routeMiddleware, users.changeUserStatus);
secureRouter.get('/get_users/:type', routeMiddleware, users.getUsers);
secureRouter.delete('/delete_user/:id', routeMiddleware, users.deleteUser);
secureRouter.put('/change_user_data', routeMiddleware, changeUserDataValidation(), validate, users.changeUserData);

// Hospital
secureRouter.post('/create_hospital', routeMiddleware, createHospitalValidation(), validate, hospital.createHospital);
secureRouter.get('/get_hospital/:id', routeMiddleware, hospital.getHospital);
secureRouter.get('/get_all_hospitals', routeMiddleware, hospital.getAllHospital);
secureRouter.get('/get_connected_insurances', routeMiddleware, hospital.getConnectedInsurances);
secureRouter.patch('/change_admin_hospital/:id', routeMiddleware, hospital.changeAdminHospital);
secureRouter.put('/edit_hospital/:id', routeMiddleware, editHospitalValidation(), validate, hospital.editHospital);
secureRouter.delete('/delete_hospital/:id', routeMiddleware, hospital.deleteHospital);

// Services Hospital
secureRouter.post('/create_service', routeMiddleware, createServiceValidation(), validate, servicesHospital.createService);
secureRouter.get('/get_service/:id', routeMiddleware, servicesHospital.getService);
secureRouter.get('/get_services', routeMiddleware, servicesHospital.getServices);
secureRouter.put('/edit_service/:id', routeMiddleware, createServiceValidation(), validate, servicesHospital.editService);
secureRouter.delete('/delete_service/:id', routeMiddleware, servicesHospital.deleteService);

// Branch
secureRouter.post('/create_branch', routeMiddleware, createBranchValidation(), validate, branch.createBranch);
secureRouter.get('/get_branch/:id', routeMiddleware, branch.getBranch);
secureRouter.get('/get_all_branches', routeMiddleware, branch.getAllBranches);
secureRouter.put('/edit_branch/:id', routeMiddleware, createBranchValidation(), validate, branch.editBranch);
secureRouter.delete('/delete_branch/:id', routeMiddleware, branch.deleteBranch);

// Department
secureRouter.post('/create_department', routeMiddleware, createDepartmentValidation(), validate, department.createDepartment);
secureRouter.get('/get_department/:id', routeMiddleware, department.getDepartment);
secureRouter.get('/get_all_departments', routeMiddleware, department.getAllDepartments);
secureRouter.put('/edit_department/:id', routeMiddleware, editDepartmentValidation(), validate, department.editDepartment);
secureRouter.delete('/delete_department/:id', routeMiddleware, department.deleteDepartment);

// Insurance
secureRouter.post('/create_insurance', routeMiddleware, createInsuranceValidation(), validate, insurance.createInsurance);
secureRouter.get('/get_insurance/:id', routeMiddleware, insurance.getInsurance);
secureRouter.get('/get_all_insurances', routeMiddleware, insurance.getAllInsurance);
secureRouter.patch('/change_admin_insurance/:id', routeMiddleware, insurance.changeAdminInsurance);
secureRouter.put('/edit_insurance/:id', routeMiddleware, createInsuranceValidation(), validate, insurance.editInsurance);
secureRouter.delete('/delete_insurance/:id', routeMiddleware, insurance.deleteInsurance);
secureRouter.get('/get_connected_hospitals', routeMiddleware, insurance.getConnectedHospitals);

// Agreement
secureRouter.post('/create_agreement', routeMiddleware, createAgreementValidation(), validate, agreement.createAgreement);
secureRouter.get('/get_agreement/:id', routeMiddleware, agreement.getAgreement);
secureRouter.get('/get_agreement_by_counterparties', routeMiddleware, agreement.getAgreementByCounterparties);
secureRouter.get('/get_all_agreements', routeMiddleware, agreement.getAllAgreements);
secureRouter.patch('/change_agreement_owner/:id', routeMiddleware, agreement.changeAgreementOwner);
secureRouter.patch('/renew_agreement/:id', routeMiddleware, agreement.renewAgreement);
secureRouter.put('/edit_agreement/:id', routeMiddleware, editAgreementValidation(), validate, agreement.editAgreement);

// Bill
secureRouter.get('/check_patient', routeMiddleware, bill.checkPatient);
secureRouter.get('/get_related_bills', routeMiddleware, bill.getRelatedBills);
secureRouter.post('/create_bill', routeMiddleware, createBillValidation(), validate, bill.createBill);
secureRouter.get('/get_bill/:id', routeMiddleware, bill.getBill);
secureRouter.get('/get_bills', routeMiddleware, bill.getBills);
secureRouter.patch('/change_bill_status/:id', routeMiddleware, bill.changeBillStatus);
secureRouter.get('/get_bill_history/:id', routeMiddleware, billHistory.getBillHistory);

// Statistics
secureRouter.get('/bills_statistics', routeMiddleware, billsStatistics.billsStatistics);

// Invoice
secureRouter.get('/check_create_invoice', routeMiddleware, invoice.checkCreateInvoice);
secureRouter.get('/get_invoices', routeMiddleware, invoice.getInvoices);
secureRouter.patch('/change_invoice_status/:id', routeMiddleware, invoice.changeInvoiceStatus);
secureRouter.get('/export_invoice', routeMiddleware, invoice.exportInvoice);

// Notifications
secureRouter.get('/check_bills', routeMiddleware, notifications.checkBills);
secureRouter.get('/check_invoices', routeMiddleware, notifications.checkInvoices);

module.exports = secureRouter;
