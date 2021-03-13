const role = (role) => {
    let res = '';
    switch (role) {
        // admin group
        case 'superAdmin':
            res = 'superadmin';
            break;
        case 'accountManager':
            res = 'account_manager';
            break;
        case 'financeManager':
            res = 'finance_manager';
            break;

        // hospital group
        case 'adminHospital':
            res = 'admin_hospital';
            break;
        case 'teller':
            res = 'teller';
            break;
        case 'financeHospital':
            res = 'finance_hospital';
            break;
        case 'financeManagerHospital':
            res = 'finance_manager_hospital';
            break;

        // insurance group
        case 'adminInsurance':
            res = 'admin_insurance';
            break;
        case 'audit':
            res = 'audit';
            break;
        case 'auditManagerInsurance':
            res = 'audit_manager_insurance';
            break;
        case 'financeManagerInsurance':
            res = 'finance_manager_insurance';
            break;
    }
    return res;
}

const billStatus = (status) => {
    let res = '';
    switch (status) {
        case 'created':
            res = 0;
            break;
        case 'checked1':
            res = 10;
            break;
        case 'verified':
            res = 20;
            break;
        case 'sent':
            res = 21;
            break;
        case 'concerned':
            res = 22;
            break;
        case 'pending':
            res = 23;
            break;
        case 'checked3':
            res = 30;
            break;
        case 'dispute':
            res = 40;
            break;
        case 'dispute_verified':
            res = 41;
            break;
        case 'dispute_checked':
            res = 42;
            break;
        case 'dispute_approved':
            res = 43;
            break;
        case 'dispute_concerned':
            res = 44;
            break;
        case 'dispute_cancel':
            res = 45;
            break;
        case 'terminated':
            res = 50;
            break;
        case 'approved':
            res = 60;
            break;
        case 'payed':
            res = 70;
            break;
        case 'received':
            res = 80;
            break;
        case 'pending_payment':
            res = 81;
            break;
        case 'fee_payed':
            res = 90;
            break;
        case 'fee_received':
            res = 91;
            break;
    }
    return res;
}

const billStringStatus = (status) => {
    let res = '';
    switch (status) {
        case 0:
            res = 'Created';
            break;
        case 10:
            res = 'Checked';
            break;
        case 20:
            res = 'Verified';
            break;
        case 21:
            res = 'Sent';
            break;
        case 22:
            res = 'Concerned';
            break;
        case 23:
            res = 'Pending';
            break;
        case 30:
            res = 'Checked';
            break;
        case 40:
            res = 'Dispute';
            break;
        case 41:
            res = 'Dispute verified';
            break;
        case 42:
            res = 'Dispute checked';
            break;
        case 43:
            res = 'Dispute approved';
            break;
        case 44:
            res = 'Dispute concerned';
            break;
        case 45:
            res = 'Dispute cancel';
            break;
        case 50:
            res = 'Terminated';
            break;
        case 60:
            res = 'Approved';
            break;
        case 70:
            res = 'Payed';
            break;
        case 80:
            res = 'Received';
            break;
        case 81:
            res = 'Pending payment';
            break;
        case 90:
            res = 'Fee payed';
            break;
        case 91:
            res = 'fee_received';
            break;
    }
    return res;
}



module.exports = {
    role,
    billStatus,
    billStringStatus
};

