var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
	var config = {};
    config.isLogin = req.session.isLogin ? true : false;
    request.post({url: 'http://localhost:8080/token'});
    config.token = req.session.token;
    console.log(config.token);
    if(config.isLogin){
        res.render('index', config);
    }
    else{
        res.render('login', config);
	}
};

exports.partial = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};