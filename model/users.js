

const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const User = sequelize.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            confirmpassword: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            freezeTableName: true,
        }
    );

    return User;
};





function validateSchema(user) {
    const userSchema = joi.object({
    username: joi.string().alphanum().required().min(3).max(30),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(30),
    confirmpassword: joi.string().required().valid(Joi.ref('password')),
});

 return userSchema.validate(user, options);
 };



//module.exports = userSchema;

function loginValidation(user){
    const logSchema = joi.object({
        username: joi.string().required().min(3).max(30),
        password: joi.string().required(),
    })
    return logSchema.validate(user)
}




 module.exports.validate = validateSchema;
module.exports.loginValidation = loginValidation;