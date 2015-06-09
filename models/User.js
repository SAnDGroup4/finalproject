exports.User = function(Sequelize, sequelize){
	return sequelize.define('User', {
	
        UID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
        GACCOUNT:Sequelize.TEXT,
        ADMIN:Sequelize.BOOLEAN,
        STUID:Sequelize.TEXT
	},{
		tableName: 'SA_user'
	});
};
