import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.ts";
import { Team } from "./team.ts";
import { User } from "./user.ts";


const TeamMember = sequelize.define(
    'TeamMember',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("leader", "member", "viewer"),
            defaultValue: "member",
            allowNull: false,
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

TeamMember.belongsTo(
    Team,{
        foreignKey:{
            name: 'team_id',
            allowNull: false
        }
    }
)
TeamMember.belongsTo(
    User,{
        foreignKey:{
            name: 'user_id',
            allowNull: false
        }
    }
)

TeamMember.belongsTo(User, {
  foreignKey: { name: "added_by", allowNull: false },
  as: "addedBy",
});

export { TeamMember }