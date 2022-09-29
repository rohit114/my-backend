module.exports = {
    
    mysqlServer: {
        host: "localhost",
         user: "root",
         password: '',
         database: "mydb",
         pool: true,
         connectionLimit: 50
    },
    mysqlWriteServer: {
        host: "localhost",
         user: "root",
         password: '',
         database: "mydb",
         pool: true,
         connectionLimit: 150,
         acquireTimeout: 10000,
         multipleStatements: true
    },
  };