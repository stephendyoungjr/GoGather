'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '../../config/database.js');
const config = require(configPath)[env];

if (!config) {
  console.error(`Database configuration for environment "${env}" not found. Check database.js and NODE_ENV.`);
  process.exit(1);
}

let sequelize;
try {
  if (config.use_env_variable) {
    console.log('Using DATABASE_URL from environment variable');
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    console.log(`Connecting to database ${config.database}...`);
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
} catch (err) {
  console.error('Failed to initialize Sequelize:', err.message);
  process.exit(1);
}

const db = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
