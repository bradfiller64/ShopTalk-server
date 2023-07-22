"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const item_1 = require("./item");
const message_1 = require("./message");
const image_1 = require("./image");
const dbName = 'shoptalk_db';
const username = 'root';
const password = 'password';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.UserFactory)(sequelize);
(0, item_1.ItemFactory)(sequelize);
(0, message_1.MessageFactory)(sequelize);
(0, image_1.ImageFactory)(sequelize);
(0, item_1.AssociateUserItem)();
(0, message_1.AssociateItemMessage)();
(0, message_1.AssociateUserMessage)();
(0, image_1.AssociateItemImage)();
exports.db = sequelize;
