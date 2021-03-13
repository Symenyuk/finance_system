const sqlite = require('sqlite3').verbose();
const log = require('../utils/logger');

const db = new sqlite.Database('bfs.db', (err) => {
    if (err) {
        log.error(`Connect to BFS database ${err.message}`);
    }
    log.info(`Connected to BFS database.`);
});
db.configure('busyTimeout', 30000);

require('./create_db_tables')(db);
require('./regions')(db);
require('./cities')(db);
require('./districts')(db);
require('./initAdmin')(db);
require('./hospitals_list')(db);

module.exports = db;
