import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        timestamps: true, //sequelize will create the createat and updatedat automatically
        indexes: [{
            name: 'email_idx',
            fields: ['email']
        }]
    }
)

export { User }