module.exports = (db) => {
    const log = require('../utils/logger');
    const countRegions = 13;

    let insertRegions = () => {
        db.serialize(() => {
            db.run(`INSERT INTO regions(capital_city_id, code, name_ar, name_en, population, region_id)
                    VALUES
                    (3, 'RD', 'منطقة الرياض', 'Riyadh', 6777146, 1),
                    (6, 'MQ', 'منطقة مكة المكرمة', 'Makkah', 6915006, 2),
                    (14, 'MN', 'منطقة المدينة المنورة', 'Madinah', 1777933, 3),
                    (11, 'QA', 'منطقة القصيم', 'Qassim', 1215858, 4),
                    (13, 'SQ', 'المنطقة الشرقية', 'Eastern Province', 4105780, 5),
                    (15, 'AS', 'منطقة عسير', 'Asir', 1913392, 6),
                    (1, 'TB', 'منطقة تبوك', 'Tabuk', 791535, 7),
                    (10, 'HA', 'منطقة حائل', 'Hail', 597144, 8),
                    (2213, 'SH', 'منطقة الحدود الشمالية', 'Northern Borders', 320524, 9),
                    (17, 'GA', 'منطقة جازان', 'Jizan', 1365110, 10),
                    (3417, 'NG', 'منطقة نجران', 'Najran', 505652, 11),
                    (1542, 'BA', 'منطقة الباحة', 'Bahah', 411888, 12),
                    (2237, 'GO', 'منطقة الجوف', 'Jawf', 440009, 13)`
            );
        });
    }

    db.serialize(() => {
        db.run('create table if not exists regions (' +
            'id INTEGER PRIMARY KEY,' +
            'capital_city_id INTEGER,' +
            'code TEXT,' +
            'name_ar TEXT,' +
            'name_en TEXT,' +
            'population INTEGER,' +
            'region_id INTEGER' +
            ')');
        db.run('CREATE INDEX if not exists index_id ON regions(id)');

        db.get(`SELECT COUNT(*) as countRegions FROM regions`, (err, rows) => {
            if (err) {
                log.error(`Error. Select count regions ${err}`);
            }
            if (rows.countRegions === countRegions) {
               log.info(`in the database of ${countRegions} regions`);
            } else if (rows.countRegions === 0) {
                insertRegions();
                log.info(`${countRegions} regions have been added to the database`);
            } else if (rows.countRegions !== countRegions) {
                db.run(`DELETE FROM regions`);
                insertRegions();
                log.info(`regions overwritten in the database`);
            }
        });
    });
}