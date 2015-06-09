/*
 * Serve JSON to our AngularJS client
 */
var course = require('../models').Course;
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		local.model.mysql.database,
		local.model.mysql.account,
		local.model.mysql.password,
		local.model.mysql.options
);

exports.listCourses = function (req, res){
    course.findAll({
        where: {
        }
    }).then(function(courses) {
        res.json(courses);
    }).catch(function(err){
        console.log(err);
    })
};

exports.listCoursesBySemester = function(req, res){
    var year = req.params.year;
    var semester = req.params.semester;
    course.findAll({where: {CYEAR : year, CSEMESTER : semester}}).then(function(courses){
        res.json(courses);
    }).catch(function(err){
        console.log(err);
    })
};

exports.listCoursesByChapter = function(req, res){
    var csubject = req.params.csubject;
    var cchapter = req.params.cchapter;
    course.findAll({where: {SUBJECT: csubject, CHAPTER: cchapter}}).then(function(courses){
        res.json(courses);
    }).catch(function(err){
        console.log(err);
    })
};

exports.listCourseByLesson = function(req, res){
    var csubject = req.params.csubject;
    var cchapter = req.params.cchapter;
    var clesson = req.params.clesson;
    course.find({where: {SUBJECT: csubject, CHAPTER: cchapter, LESSON: clesson}}).then(function(course){
        res.json(course);
    }).catch(function(err){
        console.log(err);
    })
};



// CREATE TABLE IF NOT EXISTS `course` (
//   `CID` int(11) NOT NULL AUTO_INCREMENT,
//   `CNAME` text NOT NULL,
//   `CHAPTER` text NOT NULL,
//   `SUBJECT` text NOT NULL,
//   `LESSON` text NOT NULL,
//   `VIDEO` text NOT NULL,
//   `PPT` text NOT NULL,
//   `createdAt` datetime NOT NULL,
//   `updatedAt` datetime NOT NULL,
//   PRIMARY KEY (`CID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;