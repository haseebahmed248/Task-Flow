import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";
import { Project } from "./project.ts";
import { User } from "./user.ts";


const Task = sequelize.define(
    'task',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        project_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        assignee_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        creator_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('todo', 'inprogress', 'completed'),
            defaultValue: 'todo',
            allowNull: true
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            defaultValue: 'low',
            allowNull: true
        },
        duedate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },{
        timestamps: true,
        indexes: [{
            name: 'task_title_id',
            fields: ['title']
        }]
    }
)

Task.belongsTo(
    Project, {
        foreignKey:{
            name: 'project_id',
            allowNull: false
        }
    }
)

Task.belongsTo(User, {
  foreignKey: { name: "assignee_id", allowNull: true },
  as: "assignee",
});

Task.belongsTo(User, {
  foreignKey: { name: "creator_id", allowNull: false },
  as: "creator",
});

export { Task };