const { DataTypes } = require('sequelize');
const sequelize = require('../config/banco');

const produto = sequelize.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = produto