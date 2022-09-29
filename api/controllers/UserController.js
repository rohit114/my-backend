const fs = require('fs')
const csv = require('csv-parser')
const QueryService = require('./../../services/preparedQueryService');
const mysql = require('mysql');

module.exports = {
    getUser : async function(req, res) {
        try {
            console.log("req:", req.query);
            let query = `SELECT * FROM users WHERE id=?`;
            let data = await QueryService.readQuery(query, [req.query.id]);
            console.log("user data", data);

           return res.status(200).send({ 'status': 200, 'message': 'success', 'data': data });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
     createUser : async function(req, res) {
        try {
            console.log("req body:", req.body);
            let inputs = req.body;
            const now = parseInt(Date.now()/1000);

            let query = `INSERT INTO users (first_name, last_name, phone, email, created_by, created_dt, updated_by, updated_dt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ? );`;
            let ack = await QueryService.writeQuery(query, [inputs.first_name, inputs.last_name, inputs.phone, inputs.email, 1, now, 1, now]);

            // const table_name = `users`;
            // let query = `INSERT INTO ?? SET ?`
            // var inserts = [table_name, data]; //data is an object
            // query = mysql.format(query, inserts);
            // let ack = await QueryService.writeQuery(query, []);
            return res.status(200).send({ 'status': 200, 'message': 'success', 'data': ack });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
      bulkInsertDemo: async (req, res)=>{
        try {
          let user_ids = [114,114,114,114,114]
          let foo = 100;
          let now = parseInt(Date.now()/1000);

          /*BULK INSERT STRTS*/
          let data = user_ids.map( user_id =>{
            return [user_id,foo++,1,now,1, now ];
          });
         
          let query = `INSERT INTO user_asset_map(user_id, asset_id, created_by, created_dt, updated_by, updated_dt) VALUES ?`
          let ack = await QueryService.writeQuery(query, [data])
          /*BULK INSERT ENDS*/


          return res.status(200).send({ 'status': 200, 'message': 'bulk insert success', data: ack });
        } catch(e){
          console.log(e.message)
          return res.status(200).send({ 'status': 400, 'message': 'Something went wrong' });
        }

      },
      bulkInsertDemoCSV: async (req, res)=>{
        try {
          const results = []
          var dataFinal = []
          //Read csv
          const csvData = await createReadStream();
          console.log('csvData 2', csvData);

          /*BULK INSERT STARTS*/
          csvData.forEach(i=>{
            let temp = []
            temp.push(parseInt(i.user_id))
            temp.push(parseInt(i.asset_id))
            temp.push(parseInt(i.created_by))
            temp.push(parseInt(i.created_dt))
            temp.push(parseInt(i.updated_by))
            temp.push(parseInt(i.updated_dt))
            dataFinal.push(temp)
          });
           /*BULK INSERT ENDS*/
          let query = `INSERT INTO user_asset_map(user_id, asset_id, created_by, created_dt, updated_by, updated_dt) VALUES ?`
          let ack = await QueryService.writeQuery(query, [dataFinal])

          return res.status(200).send({ 'status': 200, 'message': 'bulk insert success', data: ack });
        } catch(e){
          console.log(e.message)
          return res.status(200).send({ 'status': 400, 'message': 'Something went wrong' });
        }

      }
};

function createReadStream(){
  var csvData = [];
  return new Promise(resolve => {
    fs.createReadStream('/Users/rohitkumar/Desktop/test.csv')
      .pipe(csv())
      .on('data', (data) => csvData.push(data))
      .on('end', () => {
         resolve(csvData)
  }); 
})
}
