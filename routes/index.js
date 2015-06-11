
/*
 * GET home page.
 */

exports.index = function(req, res){
	sess = req.session;
	if(sess.email){
		res.render('index');
	}
	else{
		// res.render('login');
		res.render('index');
	}
};

exports.partial = function (req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};