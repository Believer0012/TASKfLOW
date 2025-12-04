
"use strict";
import bcrypt from "bcryptjs";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
			password_hash: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			tableName: "Users",
			timestamps: true,
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		}
	);

		// Instance helper to validate a plain text password against the stored hash
		User.prototype.validatePassword = async function (password) {
			return bcrypt.compare(password, this.password_hash);
		};

		return User;
	};

