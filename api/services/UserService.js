const QueryService = require('./../../services/preparedQueryService');


module.exports = {
	getUserById : async function(req, res) {
        try {
            console.log("req:", req.query);
            let query = `SELECT * FROM users WHERE id=?`;
            let data = await QueryService.readQuery(query, [req.query.id]);
            console.log("user data", data);
            return data;

        } catch(e){
           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      }



}