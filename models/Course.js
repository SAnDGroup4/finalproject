exports.Course = function(Sequelize, sequelize){
	return sequelize.define('Course', {
	
        CID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
        CNAME:Sequelize.TEXT,
        CINFO:Sequelize.TEXT,
        CTEACHER:Sequelize.TEXT,
        CYEAR:Sequelize.DATE,
        CSEMESTER:Sequelize.DATE
	},{
		tableName: 'SA_course'
	});
};
