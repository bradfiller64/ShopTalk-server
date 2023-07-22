import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserItem, ItemFactory } from "./item";
import { AssociateItemMessage, AssociateUserMessage, MessageFactory } from "./message";
import { AssociateItemImage, ImageFactory } from "./image";

const dbName = 'shoptalk_db';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
ItemFactory(sequelize);
MessageFactory(sequelize);
ImageFactory(sequelize);

AssociateUserItem();
AssociateItemMessage();
AssociateUserMessage();
AssociateItemImage();

export const db = sequelize;