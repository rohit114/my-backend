const QueryService = require('./../../services/preparedQueryService');
const mysql = require('mysql');

module.exports = {
    getUserTrxnByAmount : async function(req, res) {
        try {
          //I want list of users who made transactions more than worth 0.5 lakh in last 10 days
            let query = `SELECT   ut.user_id, u.first_name, u.phone, min(from_unixtime(ut.created_dt)), sum(ut.amount) as sum FROM user_transections ut 
            INNER JOIN users u on ut.user_id=u.id
            where ut.created_dt >= unix_timestamp(NOW()  - INTERVAL 10 DAY)
            group by ut.user_id
            HAVING sum > 50000;`;
            let data = await QueryService.readQuery(query, [req.query.id]);
            console.log("user data", data);

           return res.status(200).send({ 'status': 200, 'message': 'success', 'data': data });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
      getUserTrxnHistory : async function(req, res) {
        try {
            //Transactions of a user for a given month with pagination
            let inputs = req.query;
            let offset  = parseInt(inputs.next_offset) || 0;
            let limit = parseInt(inputs.limit) || 10;
            let my_timestamp = 1617274738 //unix timestamp
            let user_id = inputs.user_id;
            let trxn_type = inputs.trxn_type
            let query = `SELECT  u.first_name, u.id as user_id , ut.*, from_unixtime(ut.created_dt) FROM users  u 
            INNER JOIN user_transections ut on ut.user_id=u.id
            WHERE ut.created_dt>=${my_timestamp}
            and ut.user_id = ?
            LIMIT ${limit}
            OFFSET ${offset}`;

            let data = await QueryService.readQuery(query, [user_id]);

            if(data.length < limit ){
              next_offset = -1;
            } else {
              next_offset = offset + limit;
            }
      

           return res.status(200).send({ 'status': 200, 'message': 'success', 'data': data, "next_offset": next_offset });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
      dumpDummyData : async function(req, res) {
        try {
            //ADD Dummy data in user_transections
            let usre_ids = [ 1,,2,3,4,5];

            let data = [];
            const now = parseInt(Date.now()/1000);
            let day = now;
            for(let i=0 ; i< 30 ; i++){
              //user_id, tid, amount , currency , trxn_type , created_by , created_dt ,  updated_by, updated_dt
              let tid = Math.floor(Math.random() * 100000000);
              let amount = 10000;
              day = day - 86400;
              let currency = 'INR';
              let trxn_type = 'NEFT'
              let created_by = 3
              let updated_by = 3

              if(i>0){
                amount = amount*1;
              }
              let temp = [3, tid, amount, currency, trxn_type, created_by, day, updated_by, day];
              data.push(temp)
            }
            console.log(data);
            let query = `INSERT INTO user_transections (user_id, tid, amount , currency , trxn_type , created_by , created_dt ,  updated_by, updated_dt) VALUES ?`;
            await QueryService.writeQuery(query, [data]);


           return res.status(200).send({ 'status': 200, 'message': 'success', 'data': data });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      }
};