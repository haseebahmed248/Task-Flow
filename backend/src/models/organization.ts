import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";

const Organization = sequelize.define(
    'organization',
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
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        logourl: {
            type: DataTypes.STRING,
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
            name: 'organization_name_idx',
            fields: ['name']
        }]
        
    }
)

export { Organization }