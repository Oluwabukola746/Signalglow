

const dbConfig = require('../config/db-config');
const { Sequelize } = require('sequelize');
const createUserModel = require('./users');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
});

// Create the User model
const User = createUserModel(sequelize);

// Synchronize the model with the database
sequelize.sync({ force: false }) // set force to true to drop existing tables
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

module.exports = {
    sequelize,
    User,
};


