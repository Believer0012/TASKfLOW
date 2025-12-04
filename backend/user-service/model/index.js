import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import userFactory from "./base/user.js";
import refreshFactory from "./base/refreshToken.js";

// Initialize models
const User = userFactory(sequelize, DataTypes);
const RefreshToken = refreshFactory(sequelize, DataTypes);

// Setup associations if defined
if (typeof User.associate === "function") User.associate({ RefreshToken });
if (typeof RefreshToken.associate === "function") RefreshToken.associate({ User });

// Export initialized models and sequelize instance
export { sequelize };
export { User, RefreshToken };
export default { sequelize, User, RefreshToken };
