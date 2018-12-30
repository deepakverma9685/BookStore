const Sequelize = require('sequelize');
const db_constant = require('../constants/db_constants');
const db        = {};
const sequelize = new Sequelize(db_constant.db_name,db_constant.db_user,db_constant.db_password, {
    host: db_constant.db_host,
    dialect: db_constant.db_dialect,
    port:db_constant.db_port,
    operatorsAliases: false

});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db;