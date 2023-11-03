const {DataTypes} = require('sequelize');

// 2º: Importar arquivo de connect database
const db = require('../db/conn');

// 3º Estruturar a tabela
const newUser = db.define('newUser', {
    name: {
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
        require: true
    },
    re_password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

module.exports = newUser;