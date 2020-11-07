const QueryService = require('./preparedQueryService');


module.exports = {
    getUsers : async function(req, res) {
        try{
            console.log("******** req", req.query);
            let query = `SELECT * FROM users WHERE id=?`;
            let data = await QueryService.Query(query, [req.query.id]);
            console.log("******** user data", data);
            return res.json({status:200, message:"Success", data:data});

        }catch(e){
        
           console.log(e.message)
          return res.json({status:400, message:"Something went wrong"});
        }
      },
};