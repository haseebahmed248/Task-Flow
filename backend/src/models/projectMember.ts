import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";
import { User } from "./user.ts";
import { Project } from "./project.ts";


const ProjectMember = sequelize.define(
    'ProjectMember',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        project_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        access_level: {
            type: DataTypes.ENUM("read", "write", "admin"),
            allowNull: false,
            defaultValue: "read",
        },
        added_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        added_by: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }
)

ProjectMember.belongsTo(
    User,{
        foreignKey: {
            name: 'user_id',
            allowNull: false
        }
    }
)

ProjectMember.belongsTo(
    Project,{
        foreignKey: {
            name: 'project_id',
            allowNull: false
        }
    }
)

ProjectMember.belongsTo(
    User,{
        foreignKey: {
            name: 'added_by',
            allowNull: false
        },
        as: 'addedBy'
    }
)

export { ProjectMember }