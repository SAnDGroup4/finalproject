var sslEnabled = false;
var path = require('path');

module.exports = {

	model: {
		mysql: {
			database: "sql371041",
			account: "sql371041",
			password: "aM8%wP2%",
			options:{
				host:"sql3.freemysqlhosting.net",
				logging: false
			}
		}
	},
	session: {
		redis: {
			host: 'pub-redis-11080.us-east-1-1.2.ec2.garantiadata.com',
			port: 11080,
			pass: "e1033e1033"
		}
    }
}