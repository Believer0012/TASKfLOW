"use strict";

export default (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "RefreshTokens",
      timestamps: true,
    }
  );

  RefreshToken.associate = function (models) {
    RefreshToken.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
  };

  return RefreshToken;
};
