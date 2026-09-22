const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbFolder = path.join(__dirname, '..', '..', 'banco');

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(dbFolder, 'banco.sqlite'),
  logging: false
});

module.exports = sequelize;