exports.Assignment = function(Sequelize, sequelize){
	return sequelize.define('Assignment', {
	
        AID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
        ANAME:Sequelize.TEXT,
        ADETAIL:Sequelize.TEXT,
        ALINK:Sequelize.TEXT,
        CID: { type:Sequelize.INTEGER, references: {model: Course, key: 'CID'}}
	},{
		tableName: 'SA_assignment'
	});
};
