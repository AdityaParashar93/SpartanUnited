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
		$locationProvider.html5Mode(true);
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
	console.log($scope.current_user);
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
				sharedUser.setItem(data.user);
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