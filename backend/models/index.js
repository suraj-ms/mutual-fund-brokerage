const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Investment = require('./investment')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Investment, { foreignKey: 'userId' });
db.Investment.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
