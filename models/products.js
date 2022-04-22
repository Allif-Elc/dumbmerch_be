'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.user,{
        as: "user",
        foreignKey:{
          name: "idUser",
        }
      });

      products.belongsToMany(models.category,{
        as: "category",
        through: {
          model: "categoryproduct",
          as: "bridge",
        },
        foreignKey: "idProduct"
      })
    }
  }
  products.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};