/*
 * Serve JSON to our AngularJS client
 */

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);
var user = sequelize.define('User', {
        UID: { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true }, 
        GACCOUNT : Sequelize.TEXT,
        ADMIN : Sequelize.BOOLEAN,
        STUID : Sequelize.TEXT
    },{
        tableName: 'SA_user'
    });
// exports.addUser = function(req, res) {
//         var username = req.params.username;
//         var password = req.params.password;
        
//         var shasum = crypto.createHash('md5');
//         shasum.update(password);
//         password = shasum.digest('hex');
//         user.build({ username: username, password: password })
//             .save().then(function(users){
//                 res.json(users);
//             }).catch(function(err){
//                 console.log(err);
//     })
// };


exports.listUsers = function(req, res) {
    user.findAll().then(function(users){
        res.json(users);
    }).catch(function(err){
        console.log(err);
    })
};

// exports.getUserById = function(req, res){
//     var uid = req.params.uid;
//     user.find({
//         where: {UID: uid},
//         attributes: ['UID', 'UNAME', 'DEPARTMENT', 'MANAGER', 'ADMIN', 'STATUS', 'ULESSON', 'PRETEST', 'POSTTEST']
//     }).then(function(users){
//         res.json(users);
//     }).catch(function(err){
//         console.log(err);
//     })
// };

// exports.getUserByAccount = function(req, res){
//     var uaccount = req.params.uaccount;
//     user.find({
//         where: {UACCOUNT: uaccount},
//         attributes: ['UID', 'UNAME', 'DEPARTMENT', 'MANAGER', 'ADMIN', 'STATUS', 'ULESSON', 'PRETEST', 'POSTTEST']
//     }).then(function(users){
//         res.json(users);
//     }).catch(function(err){
//         console.log(err);
//     })
// };

// exports.deleteUserById = function(req, res){
//     var uid = req.params.uid;
//     user.destroy({where: {UID: uid}}).then(function(){
//         res.json({ message: 'User removed!' });
//     }).catch(function(err){
//         console.log(err);
//     })
// };



// CREATE TABLE IF NOT EXISTS `user` (
//   `UID` int(11) NOT NULL AUTO_INCREMENT,
//   `UNAME` text NOT NULL,
//   `UACCOUNT` text NOT NULL,
//   `UPASSWORD` text NOT NULL,
//   `DEPARTMENT` text,
//   `MANAGER` text,
//   `ADMIN` text,                          true if user is admin
//   `STATUS` text,                         上次離開前停留處
//   `ULESSON` text,                        需要上的課程
//   `PRETEST` int(11) DEFAULT NULL,        
//   `POSTTEST` int(11) DEFAULT NULL,       
//   `createdAt` datetime NOT NULL,         
//   `updatedAt` datetime NOT NULL,         
//   PRIMARY KEY (`UID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;