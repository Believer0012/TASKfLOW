import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // ❌ REMOVED created_at
    // ❌ REMOVED created_by (unless you really need it)
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "Tasks",

    timestamps: true,   // creates createdAt + updatedAt automatically
    underscored: false, // ensures camelCase (createdAt), not snake_case (created_at)

    // Optional: If you want to always return plain JSON fields
    // freezeTableName: true,
  }
);

export default Task;
