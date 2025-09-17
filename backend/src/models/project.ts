import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";


const Project = sequelize.define(
    'project',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("draft", "active", "completed"),
            allowNull: false,
            defaultValue: "draft",
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
            defaultValue: "medium",
        },  
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        settings: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {}
        }
    },{
        timestamps: true,
        indexes: [{
            name: 'project_name_idx',
            fields: ['name']
        }]
    }
)

export { Project };