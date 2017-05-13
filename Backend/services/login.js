var winston = require('winston');
var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://13.56.16.227:27017/SpartanUnited";


exports.handle_request_register_student=function(msg,callback){
	var res={};
	var json_responces;
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.update({doctype:msg.role},
					{$push:{students:{first_name:msg.firstname,
						last_name:msg.lastname,
						user_email:msg.email,
						user_password:msg.password,
						message:[],
						courses:{
							"maths":[],
							"science":[],
							"english":[]
						}}}},function(err,user){
					if(err) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }
				else {
					connection.close();
					res.json_responses={"statusCode":200,"user":user};
					callback(null, res);
				}
		});
		});
	});
}


exports.handle_request_register_teacher=function(msg,callback){
	var students=[];
	var res={};
	var json_responces;
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
				coll.update({doctype:msg.role},
							{$push:{teachers:{first_name:msg.firstname,
								last_name:msg.lastname,
								user_email:msg.email,
								user_password:msg.password,
								message:[],
								}}},function(err,user){
							if(err) {
							connection.close();
							console.log(err);
							res.json_responses={"statusCode":405};
							callback(null, res);
			            }
						else if(!user) {
							connection.close();
							res.json_responses={"statusCode":401};
							callback(null, res);
			            }
						else {
							connection.close();
							res.json_responses={"statusCode":200,"user":user};
							callback(null, res);
						}
				});
			});
	});
}

exports.handle_request_register_parent=function(msg,callback){
	var res={};
	var json_responces;
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.update({doctype:msg.role},
					{$push:{parents:{first_name:msg.firstname,
						last_name:msg.lastname,
						user_email:msg.email,
						user_password:msg.password,
						message:[],
						students_email:""}}},function(err,user){
					if(err) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }
				else {
					connection.close();
					res.json_responses={"statusCode":200,"user":user};
					callback(null, res);
				}
		});
		});
	});
}







exports.handle_request_checkLogin_students = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"students"},{students:{$elemMatch:{
				user_email:msg.username,
				user_password:msg.password
				}}},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.students){
						res.json_responses={"statusCode":200,user:user.students[0]};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};


exports.handle_request_checkLogin_parents = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"parents"},{parents:{$elemMatch:{
				user_email:msg.username,
				user_password:msg.password
				}}},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.parents){
						res.json_responses={"statusCode":200,user:user.parents[0]};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};


exports.handle_request_checkLogin_teachers = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"teachers"},{teachers:{$elemMatch:{
				user_email:msg.username,
				user_password:msg.password
				}}},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.teachers){
						res.json_responses={"statusCode":200,user:user.teachers[0]};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};


exports.handle_request_fetchall_students = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"students"},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.students){
						res.json_responses={"statusCode":200,students:user.students};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};

exports.handle_request_fetchall_parents = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"parents"},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.parents){
						res.json_responses={"statusCode":200,parents:user.parents};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};


exports.handle_request_fetchall_teachers = function(msg, callback){
	var res={};
	var json_responses;
	console.log(msg);
	mongo.connect(mongoURL,function(connection){
		var coll=mongo.collection('SpartanUnited');
		process.nextTick(function(){
			coll.findOne({doctype:"teachers"},function(err,user)
			{
				if(err) {
					connection.close();
					res.json_responses={"statusCode":401};
					callback(null, res);
	            }

				else if(!user) {
					connection.close();
					res.json_responses={"statusCode":405};
					callback(null, res);
	            }
				else {
					console.log(user);
					if(user.teachers){
						res.json_responses={"statusCode":200,teachers:user.teachers};
						callback(null, res);
					}
					else{
						res.json_responses={"statusCode":405};
						callback(null, res);
					}
				}
		});
		});
	});
};