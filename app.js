
const express = require("express");
const axios = require("axios");
const app = express();
const mysql2 = require('mysql2');
const userRoutes = require('./route/users');

//const getApi = require('./route/GetApi');
const db = require('./model');
const dbConfig = require('./config/db-config');
const sequelize = require('./model/index');
const jwt = require('jsonwebtoken');
const joi = require('joi');


app.use(express.json());






app.use("/api/users", userRoutes);




const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});








