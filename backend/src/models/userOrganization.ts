import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";
import { User } from "./user.ts";
import { Organization } from "./organization.ts";


const UserOrganization = sequelize.define(
    'UserOrganization',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("owner", "admin", "member"),
            defaultValue: "member",
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "pending"),
            defaultValue: "active",
            allowNull: false
        },
        joined_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW            
        }
    }
)

UserOrganization.belongsTo(
    User,{
        foreignKey:{
            name: 'user_id',
            allowNull: false
        }
    }
)

UserOrganization.belongsTo(
    Organization,{
        foreignKey:{
            name: 'organization_id',
            allowNull: false
        }
    }
)

export { UserOrganization };