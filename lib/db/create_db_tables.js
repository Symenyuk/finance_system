module.exports = (db) => {
    db.serialize(() => {

        // USERS
        db.run('create table if not exists users (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'login TEXT NOT NULL,' +
            'email TEXT,' +
            'password TEXT NOT NULL,' +
            'mobile TEXT,' +
            'role TEXT NOT NULL,' +
            'status TEXT,' +
            'refresh_token TEXT,' +
            'hospital INTEGER,' +
            'branch INTEGER,' +
            'department INTEGER,' +
            'insurance INTEGER,' +
            'created_at INTEGER,' +
            'updated_at INTEGER,' +
            'code INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON users(id)');

        // HOSPITALS
        db.run('create table if not exists hospitals (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'name_unique TEXT NOT NULL,' +
            'zip_code INTEGER,' +
            'contact_person_name TEXT,' +
            'contact_person_email TEXT,' +
            'contact_person_phone TEXT,' +
            'count_bills INTEGER,' +
            'owner TEXT NOT NULL,' +
            'admin INTEGER,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON hospitals(id)');

        db.run('create table if not exists branch (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'description TEXT,' +
            'region TEXT,' +
            'city TEXT,' +
            'district TEXT,' +
            'street TEXT,' +
            'building TEXT,' +
            'email TEXT,' +
            'tel TEXT,' +
            'mobile TEXT,' +
            'extension TEXT,' +
            'manager_id INTEGER,' +
            'hospital INTEGER,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON branch(id)');

        db.run('create table if not exists department (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'hospital INTEGER,' +
            'branch INTEGER,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON department(id)');

        db.run('create table if not exists services (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'hospital INTEGER,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON services(id)');

        // BILLS
        db.run('create table if not exists bills (' +
            'id INTEGER PRIMARY KEY,' +
            'bill_key TEXT,' +
            'hospital INTEGER,' +
            'insurance INTEGER,' +
            'agreement INTEGER,' +
            'status INTEGER,' +
            'status_message TEXT,' +
            'created_at INTEGER,' +
            'updated_at INTEGER,' +
            'branch INTEGER,' +
            'department INTEGER,' +
            'patient_name TEXT,' +
            'patient_mobile TEXT,' +
            'patient_age TEXT,' +
            'policy_number TEXT NOT NULL,' +
            'policy_type TEXT,' +
            'national_security_number TEXT NOT NULL,' +
            'discount TEXT,' +
            'approval_number TEXT,' +
            'approval_date TEXT,' +
            'approval_time TEXT,' +
            'insurance_approval TEXT,' +
            'related_bill TEXT,' +
            'doctor_name TEXT,' +
            'service_name TEXT,' +
            'service_description TEXT,' +
            'additional_info TEXT,' +
            'cost TEXT,' +
            'paid_by_patient TEXT,' +
            'vat TEXT,' +
            'remain_to_pay_by_insurance TEXT,' +
            'who TEXT,' +
            'network_status INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON bills(id)');

        db.run('create table if not exists billhistory (' +
            'id INTEGER PRIMARY KEY,' +
            'bill_key TEXT,' +
            'status INTEGER,' +
            'msg TEXT,' +
            'who TEXT,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON billhistory(id)');

        // INSURANCE
        db.run('create table if not exists insurance (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT,' +
            'contact_person TEXT,' +
            'zip_code INTEGER,' +
            'owner TEXT NOT NULL,' +
            'admin TEXT,' +
            'region TEXT,' +
            'city TEXT,' +
            'district TEXT,' +
            'street TEXT,' +
            'address TEXT,' +
            'email TEXT,' +
            'tel TEXT,' +
            'mobile TEXT,' +
            'extension TEXT,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON insurance(id)');

        // AGREEMENTS
        db.run('create table if not exists agreements (' +
            'id INTEGER PRIMARY KEY,' +
            'hospital INTEGER NOT NULL,' +
            'insurance INTEGER NOT NULL,' +
            'transaction_interval INTEGER,' +
            'review_interval INTEGER,' +
            'payment_interval INTEGER,' +
            'charges INTEGER,' +
            'transaction_charges_per_bill INTEGER,' +
            'delay_penalty INTEGER,' +
            'discount_rate INTEGER,' +
            'status INTEGER,' +
            'owner TEXT NOT NULL,' +
            'created_at INTEGER,' +
            'updated_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON agreements(id)');

        // PATIENTS
        db.run('create table if not exists patients (' +
            'id INTEGER PRIMARY KEY,' +
            'hospital INTEGER NOT NULL,' +
            'branch INTEGER,' +
            'department INTEGER,' +
            'patient_name TEXT,' +
            'patient_mobile TEXT,' +
            'patient_age TEXT,' +
            'policy_number TEXT NOT NULL,' +
            'policy_type TEXT,' +
            'national_security_number TEXT NOT NULL,' +
            'discount TEXT,' +
            'created_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON patients(id)');

        // INVOICES
        db.run('create table if not exists invoices (' +
            'id INTEGER PRIMARY KEY,' +
            'agreement INTEGER,' +
            'hospital INTEGER,' +
            'insurance INTEGER,' +
            'interval INTEGER,' +
            'status INTEGER,' +
            'cost INTEGER,' +
            'number_of_bills INTEGER,' +
            'amount INTEGER,' +
            'date_from INTEGER,' +
            'date_to INTEGER,' +
            'created_at INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON invoices(id)');
    });
}


