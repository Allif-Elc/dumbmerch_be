'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile,{
        as: "profile",
        foreignKey:{
          name: "idUser",
        }
      });

      user.hasMany(models.chat,{
        as: "recipient",
        foreignKey:{
          name: "idRecipient",
        }
      });

      user.hasMany(models.chat,{
        as: "sender",
        foreignKey:{
          name: "idSender",
        }
      });

      user.hasMany(models.products,{
        as: "product",
        foreignKey:{
          name: "idUser",
        }
      });

      user.hasMany(models.transaction,{
        as: "transactionsBuyer",
        foreignKey:{
          name:"idBuyer"
        }
      });
      
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};