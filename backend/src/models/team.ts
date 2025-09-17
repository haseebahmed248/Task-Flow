import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";
import { Organization } from "./organization.ts";

const Team = sequelize.define(
    'teams',
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
            type: DataTypes.TEXT,
            allowNull: true
        },
        color: {
            type: DataTypes.ENUM("red", "blue", "green", "yellow"),
            allowNull: false,
            defaultValue: "blue"
        }
    },{
        timestamps: true,
        indexes: [{
            name: 'team_name_idx',
            fields: ['name']
        }]
    }
)


Organization.hasMany(Team, {
  foreignKey: {
    name: "organization_id",
    allowNull: false,
  },
});

Team.belongsTo(Organization, {
  foreignKey: {
    name: "organization_id",
    allowNull: false,
  },
});

export { Team };