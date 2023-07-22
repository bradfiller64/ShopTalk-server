"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateItemMessage = exports.AssociateUserMessage = exports.MessageFactory = exports.Message = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const item_1 = require("./item");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
function MessageFactory(sequelize) {
    Message.init({
        messageId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sender: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'messsages',
        sequelize
    });
}
exports.MessageFactory = MessageFactory;
function AssociateUserMessage() {
    user_1.User.hasMany(Message, { foreignKey: 'sender', as: 'sentMessages' });
    user_1.User.hasMany(Message, { foreignKey: 'receiver', as: 'receivedMessages' });
    Message.belongsTo(user_1.User, { foreignKey: 'sender', as: 'senderInfo' });
    Message.belongsTo(user_1.User, { foreignKey: 'receiver', as: 'receiverInfo' });
}
exports.AssociateUserMessage = AssociateUserMessage;
function AssociateItemMessage() {
    item_1.Item.hasMany(Message, { foreignKey: 'itemId', as: 'messages' });
    Message.belongsTo(item_1.Item, { foreignKey: 'itemId' });
}
exports.AssociateItemMessage = AssociateItemMessage;
