exports.User = function(Sequelize, sequelize){
	return sequelize.define('File', {
		FFID: { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
        FID: Sequelize.TEXT, 
        FPARENT:Sequelize.TEXT,
        FNAME:Sequelize.TEXT,
        FOWNER:Sequelize.TEXT,
    },{
        tableName: 'SA_file'
    });
};
