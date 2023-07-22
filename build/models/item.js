"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserItem = exports.ItemFactory = exports.Item = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Item extends sequelize_1.Model {
}
exports.Item = Item;
function ItemFactory(sequelize) {
    Item.init({
        itemId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'items',
        sequelize
    });
}
exports.ItemFactory = ItemFactory;
function AssociateUserItem() {
    user_1.User.hasMany(Item, { foreignKey: 'username', as: 'items' });
    Item.belongsTo(user_1.User, { foreignKey: 'username' });
}
exports.AssociateUserItem = AssociateUserItem;
