
// module.exports = {

// 	getUser: (req,res)=>{
// 		try{

// 			res.status(200).send({status: 200, message: "success", data: "Hello from User.getUser()"})
// 		} catch(e){
// 			res.status(400).send({status: 400, message: "failed!"})
// 		}

// 	}

// };



const foo1 = async ()=>{
	let inputs = "Hello from User.foo()"
	return inputs;
};


exports.foo = ()=>{
	let inputs = "Hello from User.foo()"
	return inputs;
}