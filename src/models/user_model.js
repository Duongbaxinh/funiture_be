'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { through: models.Order })
      User.belongsToMany(models.Product, { through: models.Review })
      User.belongsToMany(models.Product, { through: models.CartProducts })
      User.hasOne(models.Cart)
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(['admind', 'user']),
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(newUser, option) {
        const defaultNameUser = Math.floor(Math.random() * 100)
        if (newUser.password) {
          newUser.fullName = `user-${defaultNameUser}`
          newUser.password = bcrypt.hashSync(newUser.password, 10)
        }
      }
    }
  });
  return User;
};