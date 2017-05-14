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
		});
		$urlRouterProvider.otherwise('/');
});
//defining the login controller
login.controller('login', function($scope,$http,$state,$window,sharedUser) {
	$scope.register_valid=true;
	$scope.register_invalid=true;
	$scope.login_valid=true;
	$scope.login_invalid=true;
	$scope.current_user=sharedUser.getItem();
	$scope.maths=[];
	$scope.english=[];
	$scope.science=[];
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
				$scope.maths=[];
				$scope.science=[];
				$scope.english=[];
				for(var count=0;count<$scope.current_user.courses.maths.length;count++){
					$scope.maths.push($scope.current_user.courses.maths[0].Marks_Obtained);
				}
				for(var count=0;count<$scope.current_user.courses.science.length;count++){
					$scope.science.push($scope.current_user.courses.science[0].Marks_Obtained);
				}
				for(var count=0;count<$scope.current_user.courses.english.length;count++){
					$scope.english.push($scope.current_user.courses.english[0].Marks_Obtained);
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
				        name: 'English',
				        data: $scope.english
				    }, {
				        name: 'Science',
				        data: $scope.science
				    }, {
				        name: 'Mathematics',
				        data: $scope.maths
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
				for(var count=0;count<$scope.current_user.courses.maths.length;count++){
					$scope.maths.push($scope.current_user.courses.maths[0].Marks_Obtained);
				}
				for(var count=0;count<$scope.current_user.courses.science.length;count++){
					$scope.science.push($scope.current_user.courses.science[0].Marks_Obtained);
				}
				for(var count=0;count<$scope.current_user.courses.english.length;count++){
					$scope.english.push($scope.current_user.courses.english[0].Marks_Obtained);
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
				        name: 'Science',
				        data: $scope.science
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
				    backgroundColor: {
				         linearGradient: [0, 0, 0, 400],
				         stops: [
				            [0, 'rgb(96, 96, 96)'],
				            [1, 'rgb(16, 16, 16)']
				         ]
				      },
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [{
				        name: 'Mathematics',
				        data: $scope.maths
				    }]

				});	
				
				
				
				Highcharts.chart('container2', {

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
				    backgroundColor: {
				         linearGradient: [0, 0, 0, 400],
				         stops: [
				            [0, 'rgb(96, 96, 96)'],
				            [1, 'rgb(16, 16, 16)']
				         ]
				      },
				    plotOptions: {
				        series: {
				            pointStart: 1
				        }
				    },
				    
				    series: [{
				        name: 'English',
				        data: $scope.english
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
					$window.location.assign('/index_teachers');
				}
			}
			else{
				$scope.login_invalid = false;
				$scope.login_valid = true;
			} 
		}).error(function(error) {
			$scope.login_invalid = false;
			$scope.login_valid = true;
		});
	};
			
});