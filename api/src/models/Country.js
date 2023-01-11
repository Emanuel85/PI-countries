const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //comentario de test
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    population: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // language: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    area: {
      type: DataTypes.STRING,

    }
  }, {
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",

  });
};
// work around