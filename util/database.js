const Sequelize = require('sequelize');

const sequelize = new Sequelize('workindia', 'root', 'root123', {
    host: 'localhost',
    port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})
module.exports = sequelize;