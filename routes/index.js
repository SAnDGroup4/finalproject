var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
	var config = {};
	console.log(req.session.isLogin);
	if(!req.session.isLogin){
		req.session.isLogin = false;
		config.token = false;
		res.render('login', config);

	}
	else{
		config.token = true;
		res.render('index', config);
	}
	// var config = {};
 //    config.isLogin = req.session.isLogin ? true : false;
 //    request.post({url: 'http://localhost:8080/token'});
 //    config.token = req.session.token;
 //    console.log(config.token);
 //    if(config.isLogin){
 //        res.render('index', config);
 //    }
 //    else{
 //        res.render('login', config);
	// }
};

exports.partial = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};