const QueryService = require('./../../services/preparedQueryService');
const mysql = require('mysql');
const Parallelism = 4; 
const asyncBatch = require('async-batch').default;

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
          console.log(req.body);
          console.log("req header:", req.headers);
          let user_ids = [1,2,3,4,5]
          let foo = 100;
          let now = parseInt(Date.now()/1000);

          /*BULK INSERT STRTS*/
          let data = user_ids.map( user_id =>{
            return [user_id,foo++,1,now,1, now ];
          });

          let query = `INSERT INTO user_asset_map(user_id, asset_id, created_by, created_dt, updated_by, updated_dt) VALUES ?`
          let ack = await QueryService.writeQuery(query, [data])
          /*BULK INSERT ENDS*/

          /*Promice all max size 20*/
          // let queryList = [];
          // user_ids.forEach(id=>{
          //   queryList.push(QueryService.writeQuery(`INSERT INTO user_asset_map(user_id, asset_id, created_by, created_dt, updated_by, updated_dt) VALUES(?,?,?,?,?,?)`, [id,foo++,1,now,1, now]))
          // })
          //let ack  = await Promise.all(queryList);

          return res.status(200).send({ 'status': 200, 'message': 'bulk insert success', data: ack });
        } catch(e){
          console.log(e.message)
          return res.status(200).send({ 'status': 400, 'message': 'Something went wrong' });
        }

      },
      processInBatch: async (req, res)=>{
        try{

          let arr = [1,2,3,4,5];
          await asyncBatch(arr, asyncMethod, Parallelism);
           return res.status(200).send({ 'status': 200, 'message': 'processInBatch', data: {} });
        } catch(e){
          console.log(e.message)
          return res.status(200).send({ 'status': 400, 'message': 'Something went wrong' });
        }
      },
};


const asyncMethod = async (val) => { 
  let data = await QueryService.readQuery(`SELECT * FROM users WHERE id in (?)`, [val]);
  data = JSON.stringify(data)
  console.log(`data: ${data}`);

};
