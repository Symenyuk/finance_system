'use strict';

const {body, validationResult} = require('express-validator');

const registrationValidation = () => {
    return [
        body('name', 'Name must be at least 2 characters long').exists().isLength({min: 2}),
        body('login', 'Login must be at least 5 characters long').exists().isLength({min: 5}),
        body('email', 'Please provide a valid email address').exists().isEmail(),
        body('password', 'Password must be at least 5 characters long').exists().isLength({min: 5}),
        body('mobile', 'Mobile must be integer').optional({checkFalsy: true}).isInt(),
        body('role', 'Role required').exists().notEmpty(),
    ]
}

const changeUserDataValidation = () => {
    return [
        body('name', 'Name is required').isLength({min: 3}),
        body('login', 'Login is required').isLength({min: 5}),
        body('email', 'Please provide a valid email address').isEmail(),
        body('mobile', 'Mobile mus be integer').isInt(),
        body('password')
            .isLength({min: 5})
            .withMessage('Password is required.'),
    ]
}

// ************  HOSPITAL ************ //
const createHospitalValidation = () => {
    return [
        body('name', 'Hospital name must be at least 2 characters long')
            .exists()
            .isLength({min: 2}),
        body('name_unique', 'Hospital unique name must be a string')
            .exists()
            .isString(),
        body('zip_code', 'Zip Code must be a integer')
            .exists()
            .isInt(),
        body('contact_person_name', 'Hospital contact person name must be at least 2 characters long')
            .optional({checkFalsy: true})
            .isLength({min: 2}),
        body('contact_person_email', 'Hospital contact person email should be a valid email value')
            .optional({checkFalsy: true})
            .isEmail(),
        body('contact_person_phone', 'Contact person phone must be integer')
            .optional({checkFalsy: true})
            .isInt(),
    ]
}
const editHospitalValidation = () => {
    return [
        body('name', 'Hospital name must be at least 2 characters long')
            .exists()
            .isLength({min: 2}),
        body('zip_code', 'Zip Code must be a integer')
            .exists()
            .isInt(),
        body('contact_person_name', 'Hospital contact person name must be at least 2 characters long')
            .optional({checkFalsy: true})
            .isLength({min: 2}),
        body('contact_person_email', 'Hospital contact person email should be a valid email value')
            .optional({checkFalsy: true})
            .isEmail(),
        body('contact_person_phone', 'Contact person phone must be integer')
            .optional({checkFalsy: true})
            .isInt(),
    ]
}

const createServiceValidation = () => {
    return [
        body('name', 'Name must be at least 3 characters long')
            .exists()
            .isLength({min: 3}),
    ]
}

const createBranchValidation = () => {
    return [
        body('name', 'Name must be at least 2 characters long').exists().isLength({min: 2}),
        body('description').optional({checkFalsy: true}),

        body('region', 'Region required').exists(),
        body('city').optional({checkFalsy: true}),
        body('district').optional({checkFalsy: true}),
        body('street', 'Street must be at least 2 characters long').isLength({min: 2}),
        body('building', 'Building can\'t be empty').notEmpty(),

        body('email', 'Please provide a valid email address').isEmail(),
        body('tel', 'Phone must be integer').isInt(),
        body('mobile', 'Mobile must be integer').optional({checkFalsy: true}).isInt(),

        body('extension', 'Extension must be at least 3 characters long').optional({checkFalsy: true}),
        body('manager_id', 'Manager must be at least 3 characters long').optional({checkFalsy: true}).isLength({min: 3}),
    ]
}

const createDepartmentValidation = () => {
    return [
        body('name', 'Name must be at least 2 characters long').exists().isLength({min: 2}),
        body('branch', 'Branch must be integer').exists().isInt({min: 0}),
    ]
}
const editDepartmentValidation = () => {
    return [
        body('name', 'Name must be at least 2 characters long').exists().isLength({min: 2}),
    ]
}

// ************  INSURANCE ************ //
const createInsuranceValidation = () => {
    return [
        body('name', 'Name must be at least 2 characters long').exists().isLength({min: 2}),
        body('contact', 'Contact person must be at least 3 characters long').optional({checkFalsy: true}).isLength({min: 3}),
        body('zip_code', 'Zip Code must be a integer')
            .exists()
            .isInt(),
        body('region', 'Region required').exists(),
        body('city').optional({checkFalsy: true}),
        body('district').optional({checkFalsy: true}),
        body('street', 'Street required').notEmpty(),
        body('building', 'Building required').notEmpty(),

        body('email', 'Please provide a valid email address').isEmail(),
        body('tel', 'Phone must be integer').isInt(),
        body('mobile', 'Mobile must be integer').optional({checkFalsy: true}).isInt(),
        body('extension', 'Extension required').optional({checkFalsy: true}).isLength({min: 3}),
    ]
}


// ************  AGREEMENT ************ //
const createAgreementValidation = () => {
    return [
        body('hospital', 'Hospital is required and must be integer').exists().isInt({min: 0}),
        body('insurance', 'Insurance is required and must be integer').exists().isInt({min: 0}),
        body('transaction_interval')
            .exists().withMessage('Transaction interval is required')
            .isInt().withMessage('Transaction interval must be an integer'),
        body('review_interval')
            .exists().withMessage('Review interval is required')
            .isInt({min: 1}).withMessage('Review interval must be an integer and greater than zero'),
        body('payment_interval')
            .exists().withMessage('Payment interval is required')
            .isInt({min: 1}).withMessage('Payment interval must be an integer and greater than zero'),
        body('charges')
            .exists().withMessage('Charges interval is required')
            .isFloat({ gt: 0.0 }).withMessage('Charges interval must be an float'),
        body('transaction_charges_per_bill', 'Charges per bill must be float')
            .exists().withMessage('Charges per bill is required')
            .isFloat({ gt: 0.0 }).withMessage('Charges per bill must be an float'),
        body('delay_penalty', 'Delay penalty must be an float')
            .optional({checkFalsy: true})
            .isFloat({ gt: 0.0 }),
        body('discount_rate', 'Discount rate must be an integer or greater than zero')
            .optional({checkFalsy: true})
            .isInt({min: 1}),
    ]
}
const editAgreementValidation = () => {
    return [
        body('transaction_interval')
            .exists().withMessage('Transaction interval is required')
            .isInt().withMessage('Transaction interval must be an integer'),
        body('review_interval')
            .exists().withMessage('Review interval is required')
            .isInt({min: 1}).withMessage('Review interval must be an integer and greater than zero'),
        body('payment_interval')
            .exists().withMessage('Payment interval is required')
            .isInt({min: 1}).withMessage('Payment interval must be an integer and greater than zero'),
        body('charges')
            .exists().withMessage('Charges interval is required')
            .isFloat({ gt: 0.0 }).withMessage('Charges interval must be an float'),
        body('transaction_charges_per_bill', 'Charges per bill must be float')
            .exists().withMessage('Charges per bill is required')
            .isFloat({ gt: 0.0 }).withMessage('Charges per bill must be an float'),
        body('delay_penalty', 'Delay penalty must be an float')
            .optional({checkFalsy: true})
            .isFloat({ gt: 0.0 }),
        body('discount_rate', 'Discount rate must be an integer or greater than zero')
            .optional({checkFalsy: true})
            .isInt({min: 1}),
    ]
}

// ************  BILL ************ //
const createBillValidation = () => {
    return [
        body('insurance', 'insurance must be integer')
            .exists()
            .isInt(),
        body('branch', 'Branch must be integer')
            .optional({checkFalsy: true})
            .isInt(),
        body('department', 'Department must be integer')
            .optional({checkFalsy: true})
            .isInt(),
        body('patient_name', 'Patient name required')
            .exists()
            .isString(),
        body('patient_mobile', 'Patient mobile must be integer')
            .optional({checkFalsy: true})
            .isInt(),
        body('patient_age', 'Patient age must be integer')
            .exists()
            .isInt({min: 0}),
        body('policy_number', 'Policy number required')
            .exists()
            .notEmpty(),
        body('policy_type', 'Policy type required').exists().notEmpty(),
        body('national_security_number', 'National Security Number required').exists().notEmpty(),
        body('discount', 'Discount must be float').optional({checkFalsy: true}).isFloat({ gt: 0.0 }),
        body('approval_number', 'Approval number must be integer').optional({checkFalsy: true}).isInt({min: 1}),
        body('approval_date', 'Approval date required').exists().notEmpty(),
        body('approval_time', 'Approval time required').exists().notEmpty(),
        body('insurance_approval', 'Insurance approval required').exists().notEmpty(),
        body('doctor_name', 'Doctor name required').exists(),
        body('service_name', 'Service name required').notEmpty(),
        body('service_description', 'Service description must be at least 3 characters long')
            .optional({checkFalsy: true})
            .isLength({min: 3}),
        body('additional_info', 'Additional info must be at least 3 characters long')
            .optional({checkFalsy: true})
            .isLength({min: 3}),
        body('cost', 'Cost must be float and greater than zero')
            .exists()
            .isFloat({ gt: 0.1 }),
        body('paid_by_patient', 'Paid by patient must be float and greater than zero')
            .exists()
            .isFloat({ gt: 0.1 }),
        body('vat', 'Vat must be float').optional({checkFalsy: true}).isFloat({ gt: 0.0 }),
        body('remain_to_pay_by_insurance', 'Remain to pay by insurance must be float and greater than zero')
            .optional({checkFalsy: true})
            .isFloat({ gt: 0.1 }),
    ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
    return res.status(422).json({
        errors: extractedErrors,
    })
}


module.exports = {
    // users
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
    validate,
}