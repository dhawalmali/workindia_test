const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Credential = sequelize.define('credential',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: Sequelize.STRING,
    website: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = Credential;