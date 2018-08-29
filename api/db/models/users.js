"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: { type: DataTypes.STRING },
      last_name: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: { type: DataTypes.DATE, defaultValue: "0000-00-00 00:00:00" }
    },
    { tableName: "users", timestamps: false }
  );

  //--- Instance Method ---//

  //--- Clash Method ---//

  User.userProfile = function(userId) {
    return User.findOne({ id: userId })
      .then(function(result) {
        if (!result) {
          return null;
        }
        return result;
      })
      .catch(function(err) {
        return {
          error: err
        };
      });
  };
};
