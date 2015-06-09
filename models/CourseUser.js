exports.CourseUser = function(Sequelize, sequelize){
	return sequelize.define('CourseUser', {
        UCID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
        UID: { type:Sequelize.INTEGER, references: {model: User, key: 'UID'}},
        CID: { type:Sequelize.INTEGER, references: {model: Course, key: 'CID'}}
	},{
		tableName: 'SA_course_user'
	});
};
