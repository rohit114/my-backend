var async = require('async');

module.exports = {
	getUser: async function (req, res) {
		try{
			let data = {"id":1, "name": "Rohit Kumar", "phone": "9672421899"};
			console.log("----> In getUsers controller", data);
			return res.status(200).send({ 'status': 200, 'message': 'success', "data": data});
		} catch(e){
			return res.status(400).send({ 'status': 400, 'message': 'success'});
		}
	},
};