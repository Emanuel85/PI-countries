const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24
      }
    },
    season: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Summer', 'Autumn', 'Winter', 'Spring']]
      },
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }

  }, {
    timestamps: false,
  });
};
