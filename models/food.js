module.exports = function(sequlize, DataTypes) {
  var Foods = sequlize.define("Foods", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  /*Foods.associate = function(models) {
    Foods.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };*/

  return Foods;
};
