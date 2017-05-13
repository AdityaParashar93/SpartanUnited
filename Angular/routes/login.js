/**
 * New node file
 */
var winston = require('winston');
var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://13.56.16.227:27017/SpartanUnited";

var bcrypt=require('bcrypt');
var passport = require('passport');
var mq_client = require('../rpc/client');
//require('./routes/passport')(passport);

exports.checkLogin = function(req,res,next){
	var msg_payload = {"role":req.param("role"),"username":req.param("username"),"password":req.param("password")};
	if(req.param("role")=="students"){
		mq_client.make_request('students_checklogin_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				req.session.username=req.param("username");
				req.session.user_role=req.param("role");
				var response=results.json_responses;
				mq_client.make_request('fetchall_teachers_queue',msg_payload, function(err,results){
					console.log("hey we got the teachers");
					response.user.teachers=results.json_responses.teachers;
					res.send(response);
				});
			}
		});
	}
	if(req.param("role")=="teachers"){
		mq_client.make_request('teachers_checklogin_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				req.session.username=req.param("username");
				req.session.user_role=req.param("role");
				var response=results.json_responses;
				mq_client.make_request('fetchall_students_queue',msg_payload, function(err,results){
					console.log("hey we got the teachers");
					response.user.students=results.json_responses.students;
					res.send(response);
				});
			}
		});
	}
	if(req.param("role")=="parents"){
		mq_client.make_request('parents_checklogin_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				req.session.username=req.param("username");
				req.session.user_role=req.param("role");
			}
			res.send(results.json_responses);
		});
	}
};


exports.fetchall = function(req,res,next){
	var msg_payload = {};
	if(req.param("role")=="students"){
		mq_client.make_request('fetchall_students_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			res.send(results.json_responses);
		});
	}
	if(req.param("role")=="teachers"){
		mq_client.make_request('fetchall_teachers_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			res.send(results.json_responses);
		});
	}
	if(req.param("role")=="parents"){
		mq_client.make_request('fetchall_parents_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			res.send(results.json_responses);
		});
	}
};


exports.registeruser = function(req,res,next){
	msg_payload={"role":req.param("role"),"firstname":req.param("first_name"),"lastname":req.param("last_name"),"email":req.param("email"),"password":req.param("password")};
	if(req.param("role")=="students"){
	mq_client.make_request('register_student_queue',msg_payload, function(err,results){
		console.log(results);
		res.send(results.json_responses);
	});
	}
	if(req.param("role")=="teachers"){
		mq_client.make_request('register_teacher_queue',msg_payload, function(err,results){
			console.log(results);
			res.send(results.json_responses);
		});
	}
	if(req.param("role")=="parents"){
		mq_client.make_request('register_parent_queue',msg_payload, function(err,results){
			console.log(results);
			res.send(results.json_responses);
		});
	}
};