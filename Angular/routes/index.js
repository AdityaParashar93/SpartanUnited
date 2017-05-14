
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.re = function(req, res){
	  res.render('index', { title: 'SpartanUnited' });
};

exports.re1 = function(req, res){
	  res.render('login', { title: 'SpartanUnited' });
};