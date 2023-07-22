import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>>{
    declare itemId: number;
    declare username: string;
    declare name: string;
    declare description: string;
    declare price: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function ItemFactory(sequelize: Sequelize) {
    Item.init({
        itemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'items',
        sequelize
    });
}

export function AssociateUserGoal() {
    User.hasMany(Item, { foreignKey: 'username' });
    Item.belongsTo(User, { foreignKey: 'username' });
}