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
	req.session.username=req.param("username");
	var msg_payload = {"role":req.param("role"),"username":req.param("username"),"password":req.param("password")};
	if(req.param("role")=="students"){
		mq_client.make_request('students_checklogin_queue',msg_payload, function(err,results){
			console.log("hey we got the response");
			console.log(results);
			if(results.json_responses.statusCode=="200"){
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
	console.log("call is here");
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

exports.fetch_user=function(req,res,next){
	console.log("Test  "+req.session.username);
	msg_payload={"role":req.param("role"),username:req.session.username};
	if(req.param("role")=="students"){
		mq_client.make_request('fetch_student_queue',msg_payload, function(err,results){
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				var response=results.json_responses;
				mq_client.make_request('fetchall_teachers_queue',msg_payload, function(err,results){
					console.log("hey we got the teachers");
					response.user.teachers=results.json_responses.teachers;
					res.send(response);
				});
			}
		});
	}
	if(req.param("role")=="parents"){
		mq_client.make_request('fetch_parent_queue',msg_payload, function(err,results){
			console.log(results);
			if(results.json_responses.statusCode=="200"){
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
		mq_client.make_request('fetch_teacher_queue',msg_payload, function(err,results){
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				var response=results.json_responses;
				mq_client.make_request('fetchall_students_queue',msg_payload, function(err,results){
					console.log("hey we got the teachers");
					response.user.students=results.json_responses.students;
					res.send(response);
				});
			}
		});
	}
};


exports.post_grades=function(req,res,next){
	console.log(req.param("assignment_name"));
	var msg_payload={
			"assignment_name":req.param("assignment_name"),
			"assignment_total":req.param("assignment_total"),
			"assignment_score":req.param("assignment_score"),
			"student_id":req.param("student_id"),
			"course":req.param("course")
	};
	if(req.param("course")=="Web UI")
	{
		console.log("Web UI");
		mq_client.make_request('post_grades_webui_queue',msg_payload, function(err,results){
			res.send(results.json_responses);
		});
	}
	if(req.param("course")=="Distributed Systems")
	{	
		console.log("Distributed Systems");
		mq_client.make_request('post_grades_dist_queue',msg_payload, function(err,results){
			res.send(results.json_responses);
		});
	}
	if(req.param("course")=="Cloud Technologies")
	{
		console.log("Cloud Technologies");
		mq_client.make_request('post_grades_cloud_queue',msg_payload, function(err,results){
			res.send(results.json_responses);
		});
	}
};

exports.send_message_teacher=function(req,res,next){
	msg_payload={
			"to":req.param("to"),
			"message":req.param("message"),
			"senders_email":req.param("senders_email"),
			"senders_first_name":req.param("senders_first_name"),
			"senders_last_name":req.param("senders_last_name")
	};
	mq_client.make_request('send_message_teacher',msg_payload, function(err,results){
		res.send(results.json_responses);
	});
}


exports.send_message_student=function(req,res,next){
	msg_payload={
			"to":req.param("to"),
			"message":req.param("message"),
			"senders_email":req.param("senders_email"),
			"senders_first_name":req.param("senders_first_name"),
			"senders_last_name":req.param("senders_last_name")
	};
	mq_client.make_request('send_message_student',msg_payload, function(err,results){
		res.send(results.json_responses);
	});
}

exports.send_message_admin=function(req,res,next){
	msg_payload={
			"to":req.param("to"),
			"message":req.param("message"),
			"senders_email":req.param("senders_email"),
			"senders_first_name":req.param("senders_first_name"),
 			"senders_last_name":req.param("senders_last_name")
	};
	mq_client.make_request('send_message_admin',msg_payload, function(err,results){
		res.send(results.json_responses);
	});
}
exports.init_admin=function(req,res,next){
	msg_payload={};
	var json_responses={};
	mq_client.make_request('init_admin',msg_payload, function(err,results){
		console.log(results);
		json_responses=results.json_responses;
		mq_client.make_request('fetchall_teachers_queue',msg_payload, function(err,results){
			json_responses.user.teachers=results.json_responses.teachers;
		});
		mq_client.make_request('fetchall_students_queue',msg_payload, function(err,results){
				json_responses.user.students=results.json_responses.students;
				res.send(json_responses);
		});
	});
}
exports.init_student_to_student=function(req,res,next){
	msg_payload={"role":req.param("role"),username:req.session.username};
	if(req.param("role")=="students"){
		mq_client.make_request('fetch_student_queue',msg_payload, function(err,results){
			console.log(results);
			if(results.json_responses.statusCode=="200"){
				var response=results.json_responses;
				mq_client.make_request('fetchall_students_queue',msg_payload, function(err,results){
					console.log("hey we got the peers");
					response.user.students=results.json_responses.students;
					res.send(response);
				});
			}
		});
	}
}