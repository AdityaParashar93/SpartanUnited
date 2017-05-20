//loading the 'login' angularJS module

var login = angular.module('login', ['ui.router','ngRoute','ngResource']);

login.factory('sharedUser', function() {
	  var current_user = {};

	  return {
	    setItem: setItem,
	    getItem: getItem
	  };

	  function setItem(item) {
	    current_user=item;
	  }

	  function getItem() {
	    return current_user;
	  }
	});



login.config(function($stateProvider, $urlRouterProvider, $locationProvider,$routeProvider) {
	$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
		$stateProvider.state('landing',{
			url : '/',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header.html',
	            },
	            'content': {
	                templateUrl : 'templates/login.html',
	            },
			}
		}).state('index_student',{
			url : '/index_student',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/index_student.html',
	            },
			}
		}).state('index_student_subjects',{
			url : '/index_student_subjects',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/index_student_subjects.html',
	            },
			}
		}).state('index_student_grades',{
			url : '/index_student_grades',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/my_grades.html',
	            },
			}
		}).state('index_teacher',{
			url : '/index_teacher',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/index_teacher.html',
	            },
			}
		}).state('grade_assignment',{
			url : '/grade_assignment',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/grade_assignment.html',
	            },
			}
		}).state('class_performance',{
			url : '/class_performance',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/class_performance.html',
	            },
			}
		}).state('my_class',{
			url : '/my_class',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/my_class.html',
	            },
			}
		}).state('contact_teacher',{
			url : '/contact_teacher',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/contact_teacher.html',
	            },
			}
		}).state('contact_admin',{
			url : '/contact_admin',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/contact_admin.html',
	            },
			}
		}).state('contact_admin_teacher',{
			url : '/contact_admin_teacher',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/contact_admin_teacher.html',
	            },
			}
		}).state('contact_student',{
			url : '/contact_student',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_teacher.html'
	            },
	            'content': {
	                templateUrl : 'templates/contact_student.html',
	            },
			}
		}).state('admin',{
			url : '/admin',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header_admin.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_admin.html'
	            },
	            'content': {
	                templateUrl : 'templates/admin_login.html',
	            },
			}
		}).state('admin0',{
			url : '/admin_index',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header_admin.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_admin.html'
	            },
	            'content': {
	                templateUrl : 'templates/index_admin.html',
	            },
			}
		}).state('admin1',{
			url : '/admin_teacher',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header_admin.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_admin.html'
	            },
	            'content': {
	                templateUrl : 'templates/admin_teacher.html',
	            },
			}
		}).state('admin2',{
			url : '/admin_student',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header_admin.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_admin.html'
	            },
	            'content': {
	                templateUrl : 'templates/admin_student.html',
	            },
			}
		}).state('about_us',{
			url : '/about_us',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header_admin.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_admin.html'
	            },
	            'content': {
	                templateUrl : 'templates/admin_student.html',
	            },
			}
		}).state('student_to_student',{
			url : '/student_to_student',
			controller: 'login',
			params : {USER: null},
			views: {
	            'header': {
	                templateUrl : 'templates/header1.html',
	            },
	            'sidebar':{
	            	templateUrl : 'templates/sidebar_student.html'
	            },
	            'content': {
	                templateUrl : 'templates/student_to_student.html',
	            },
			}
		});
		$urlRouterProvider.otherwise('/');
});





login.controller('login', function($scope,$http,$state,$window,sharedUser) {
	$scope.register_valid=true;
	$scope.register_invalid=true;
	$scope.login_valid=true;
	$scope.login_invalid=true;
	$scope.current_user=sharedUser.getItem();
	$scope.dist=[];
	$scope.cloud=[];
	$scope.webui=[];
	$scope.register = function() {
		$http({
			method : "POST",
			url : '/registeruser',
			data : {
				"first_name" : $scope.first_name,
				"last_name" : $scope.last_name,
				"role":$scope.role,
				"email":$scope.email,
				"password" : $scope.password,
			}
		}).success(function(data) {
			if (data.statusCode == 405) {
				$scope.register_invalid = false;
				$scope.register_valid = true;
			}
			else{
				$scope.register_invalid = true;
				$scope.register_valid = false;
			} 
		}).error(function(error) {
			$scope.register_invalid = false;
			$scope.register_valid = true;
		});
	};
	
	
	$scope.init_user=function(x){
		$http({
			method : "POST",
			url : '/fetch_user',
			data : {
				"role" : x,
				"username":$scope.current_user.user_email
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				console.log(data);
				$scope.current_user=data.user;
				$scope.webui=[];
				$scope.dist=[];
				$scope.cloud=[];
				for(var count=0;count<$scope.current_user.courses.dist.length;count++){
					$scope.dist.push($scope.current_user.courses.dist[count].marks_obtained);
				}
				for(var count=0;count<$scope.current_user.courses.webui.length;count++){
					$scope.webui.push($scope.current_user.courses.webui[count].marks_obtained);
				}
				for(var count=0;count<$scope.current_user.courses.cloud.length;count++){
					$scope.cloud.push($scope.current_user.courses.cloud[count].marks_obtained);
				}
				
				Highcharts.chart('container', {

				    title: {
				        text: 'Your grades for the All the subjects'
				    },

				    subtitle: {
				        text: 'Source: SpartanUnited'
				    },

				    yAxis: {
				        title: {
				            text: 'Total Marks'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				   
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [{
				        name: 'CLoud Technologies',
				        data: $scope.cloud
				    }, {
				        name: 'Web UI',
				        data: $scope.webui
				    }, {
				        name: 'Distributed Systems',
				        data: $scope.dist
				    }]

				});	
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
	
	$scope.init_user1=function(x){
		$http({
			method : "POST",
			url : '/fetch_user',
			data : {
				"role" : x,
				"username":$scope.current_user.user_email
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				console.log(data);
				$scope.current_user=data.user;
				$scope.webui=[];
				$scope.dist=[];
				$scope.cloud=[];
				for(var count=0;count<$scope.current_user.courses.dist.length;count++){
					$scope.dist.push($scope.current_user.courses.dist[count].marks_obtained);
				}
				for(var count=0;count<$scope.current_user.courses.webui.length;count++){
					$scope.webui.push($scope.current_user.courses.webui[count].marks_obtained);
				}
				for(var count=0;count<$scope.current_user.courses.cloud.length;count++){
					$scope.cloud.push($scope.current_user.courses.cloud[count].marks_obtained);
				}
				Highcharts.chart('container0', {

				    title: {
				        text: 'Your grades for the All the subjects'
				    },

				    subtitle: {
				        text: 'Source: SpartanUnited'
				    },

				    yAxis: {
				        title: {
				            text: 'Total Marks'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				    
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [ {
				        name: 'Web UI',
				        data: $scope.webui
				    }]

				});	
				
				
				Highcharts.chart('container1', {

				    title: {
				        text: 'Your grades for the All the subjects'
				    },

				    subtitle: {
				        text: 'Source: SpartanUnited'
				    },

				    yAxis: {
				        title: {
				            text: 'Total Marks'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				   
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [{
				        name: 'Distributed Systems',
				        data: $scope.dist
				    }]

				});	
				
				
				
				Highcharts.chart('container2', {

				    title: {
				        text: 'Your grades Courses'
				    },

				    subtitle: {
				        text: 'Source: SpartanUnited'
				    },

				    yAxis: {
				        title: {
				            text: 'Total Marks'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [{
				        name: 'Cloud Technologies',
				        data: $scope.cloud
				    }]

				});	
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
	
	
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password,
				"role":$scope.role
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				$scope.login_invalid = true;
				$scope.login_valid = false;
				if($scope.role=="students"){
					sharedUser.setItem(data.user);
					$window.location.assign('/index_student');
				}
				if($scope.role=="parents"){
					$state.go("index_parents");
				}
				if($scope.role=="teachers"){
					$window.location.assign('/index_teacher');
				}
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	};
		
	
	$scope.init_teachers=function(x){
		$http({
			method : "POST",
			url : '/fetch_user',
			data : {
				"role" : x,
				"username":$scope.current_user.user_email
			}
		}).success(function(data) {
			if (data.statusCode == 200) {
				console.log(data);
				$scope.current_user=data.user;
				$scope.chart_config=[];
				if($scope.current_user.course=="Web UI"){
				for(var count=0;count<$scope.current_user.students.length;count++){
					$scope.temp_config={};
					$scope.temp_config.data=[];
					console.log($scope.current_user.students[count].user_email);
					$scope.temp_config.name=$scope.current_user.students[count].user_email;
					for(var count1=0;count1<$scope.current_user.students[count].courses.webui.length;count1++){
						$scope.temp_config.data.push($scope.current_user.students[count].courses.webui[count1].marks_obtained);
					}
					$scope.chart_config.push($scope.temp_config);
				}
				console.log($scope.chart_config);
				}
				if($scope.current_user.course=="Distributed Systems"){
					for(var count=0;count<$scope.current_user.students.length;count++){
						$scope.temp_config={};
						$scope.temp_config.data=[];
						console.log($scope.current_user.students[count].user_email);
						$scope.temp_config.name=$scope.current_user.students[count].user_email;
						for(var count1=0;count1<$scope.current_user.students[count].courses.dist.length;count1++){
							$scope.temp_config.data.push($scope.current_user.students[count].courses.dist[count1].marks_obtained);
						}
						$scope.chart_config.push($scope.temp_config);
					}
					console.log($scope.chart_config);
				}
				if($scope.current_user.course=="Cloud Technologies"){
					for(var count=0;count<$scope.current_user.students.length;count++){
						$scope.temp_config={};
						$scope.temp_config.data=[];
						console.log($scope.current_user.students[count].user_email);
						$scope.temp_config.name=$scope.current_user.students[count].user_email;
						for(var count1=0;count1<$scope.current_user.students[count].courses.cloud.length;count1++){
							$scope.temp_config.data.push($scope.current_user.students[count].courses.cloud[count1].marks_obtained);
						}
						$scope.chart_config.push($scope.temp_config);
					}
					console.log($scope.chart_config);
				}
				Highcharts.chart('container', {

				    title: {
				        text: 'Grade Graph'
				    },

				    subtitle: {
				        text: 'Source: SpartanUnited'
				    },

				    yAxis: {
				        title: {
				            text: 'Total Marks'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },

				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },

				    series: $scope.chart_config
				});
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
	$scope.test=[];
	$scope.post_grades=function(x,a,b,c){
		console.log("post_grades");
		console.log(a);
		$http({
			method : "POST",
			url : '/post_grades',
			data : {
				"assignment_name":a,
				"assignment_total":b,
				"assignment_score":c,
				"student_id":x.user_email,
				"course":$scope.current_user.course
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
	
	$scope.send_message=function(a,b){
		$http({
			method : "POST",
			url : '/send_message_teacher',
			data : {
				"to":a,
				"message":b,
				"senders_email":$scope.current_user.user_email,
				"senders_first_name":$scope.current_user.first_name,
				"senders_last_name":$scope.current_user.last_name
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200){
				
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	};
	
	$scope.send_message_admin=function(a,b){
		$http({
			method : "POST",
			url : '/send_message_admin',
			data : {
				"to":a,
				"message":b,
				"senders_email":$scope.current_user.user_email,
				"senders_first_name":$scope.current_user.first_name,
				"senders_last_name":$scope.current_user.last_name
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	};
	
	$scope.send_message_student=function(x,a){
		$http({
			method : "POST",
			url : '/send_message_student',
			data : {
				"to":x.user_email,
				"message":a,
				"senders_email":$scope.current_user.user_email,
				"senders_first_name":$scope.current_user.first_name,
				"senders_last_name":$scope.current_user.last_name
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	};
	
	$scope.admin_login=function(){
		$state.go("admin0");
	};

	
	$scope.init_admin=function(){
		$http({
			method : "POST",
			url : '/init_admin',
			data : {
				
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				$scope.current_user=data.user;
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
	
	$scope.init_student_to_student=function(x){
		$http({
			method : "POST",
			url : '/init_student_to_student',
			data : {
				"role":x
			}
		}).success(function(data) {
			console.log(data);
			if (data.statusCode == 200) {
				$scope.current_user=data.user;
			}
			else{
				
			} 
		}).error(function(error) {
			
		});
	}
});