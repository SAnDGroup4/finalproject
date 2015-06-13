
/*
 * GET home page.
 */

exports.index = function(req, res){
	var config = {};
	console.log('get index');
	console.log(req.session.isLogin);
	console.log(req.session.tokens);
    config.isLogin = req.session.isLogin ? true : false;
    if(config.isLogin){
    	console.log('render index');
    	console.log(req.session.isLogin);
    	console.log(req.session.tokens);

        res.render('index', config);
    }
    else{
        console.log('render login');
    	console.log(req.session.isLogin);
    	console.log(req.session.tokens);
        res.render('login', config);
	}
};

exports.partial = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};