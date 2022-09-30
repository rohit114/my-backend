const QueryService = require('./../../services/preparedQueryService');
const Database = require('./../../models/Database');
const mysql = require('mysql');
const excluded = [null, 'undefined', ""];
const users = new Map()
users.set('1', {name: "Rohit Kumar", phone: "213-555-1234", address: "123 N 1st cross, 27th main"})
users.set('2', {name: "Rahul Kumar", phone: "213-555-1235", address: "124 S 1st Ave"})
users.set('3', {name: "Neeraj Kumar", phone: "213-555-1236", address: "125 S 1st cross"})
users.set('4', {name: "Amit Kumar", phone: "213-555-1237", address: "126 E 2nd cross"})

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
      getAllDataFromMap: async (req, res) =>{
        try{
            var result = []
            const U1 = Database.getData1()
            const U2 = Database.getData2()
            U1.forEach((value, key)=>{
                const temp = {}
                temp.id =key
                temp.data = value
                result.push(temp)
            })
            U2.forEach((value, key)=>{
                const temp = {}
                temp.id =key
                temp.data = value
                result.push(temp)
            })
            return res.status(200).send({status: 200, data: result});

        } catch (e){
             console.log(e.message)
             return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });
        }
    
      },

      getDataFromMapById: async (req, res) =>{
        try{
            const id = req.query.id
            const U1 = Database.getData1()
            const U2 = Database.getData2()

            const finalData = new Map([...U1, ...U2])
            const userDataById = finalData.get(parseInt(id))
            var result = {}
            var status = 200

            if(userDataById){
                result.id = id
                result.data = userDataById
            } else {
                status = 404
            }
            return res.status(status).send({status: status, data: result});

        } catch (e){
            console.log(e.message)
            return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });
        }
        
      },

      createDataInMap: async (req, res) =>{

        const body = req.body
        const result = {}
        const userData = Database.getData1()
        const id = Math.floor(Math.random() * 10000);
        const status = 201
        userData.set(id, body)
        result.id = id
        result.data = userData.get(id)
        res.status(status).send({status: status, data: result});
      },

      updateDataFromMapById: async (req, res) =>{
        const id = parseInt(req.query.id)
        const body = req.body
        console.log("data to update", body)
        const userData = Database.getData1()
        const userObject = userData.get(id);
        let status = 200
        var result = {}
        if(userObject !== undefined){
            userData.set(id, body)
            result.id = id
            result.data = userData.get(id)
        } else {
            status = 404
            result =   `User with id ${id} not found!`
        }
        res.status(status).send({status: status, data: result});
      }
};