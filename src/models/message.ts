import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";
import { Item } from "./item";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>{
    declare messageId: number;
    declare sender: string;
    declare receiver: string;
    declare itemId: number;
    declare message: string;
    declare createdAt?: Date;
}

export function MessageFactory(sequelize: Sequelize) {
    Message.init({
        messageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'messsages',
        sequelize
    });
}

export function AssociateUserMessage() {
    User.hasMany(Message, { foreignKey: 'sender', as: 'sentMessages' });
    User.hasMany(Message, { foreignKey: 'receiver', as: 'receivedMessages' });
    Message.belongsTo(User, { foreignKey: 'sender', as: 'senderInfo' });
    Message.belongsTo(User, { foreignKey: 'receiver', as: 'receiverInfo' });
}

export function AssociateItemMessage() {
    Item.hasMany(Message, { foreignKey: 'itemId', as: 'messages' });
    Message.belongsTo(Item, { foreignKey: 'itemId' });
}