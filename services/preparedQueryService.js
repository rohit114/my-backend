const mysql = require('mysql');
const dbConfig = require('./connection');
const pool = mysql.createPool(dbConfig.mysqlServer);
const writePool = mysql.createPool(dbConfig.mysqlWriteServer);

writePool.on('acquire', function(connection) {
  console.debug('Connection Acquired...');
});

writePool.on('release', function(connection) {
  console.debug('Connection Released...');
});

module.exports = {

    readQuery: function (queryString, valuesToEscape) {
        return new Promise((resolve, reject) => {
			console.log(queryString, valuesToEscape)
            pool.query(queryString, valuesToEscape, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    },
    writeQuery: function (queryString, valuesToEscape) {
        return new Promise((resolve, reject) => {
			console.log(queryString, valuesToEscape)
            writePool.query(queryString, valuesToEscape, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    },
}
