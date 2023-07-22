"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateItemImage = exports.ImageFactory = exports.Image = void 0;
const sequelize_1 = require("sequelize");
const item_1 = require("./item");
class Image extends sequelize_1.Model {
}
exports.Image = Image;
function ImageFactory(sequelize) {
    Image.init({
        imageId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        imageURL: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'images',
        freezeTableName: true,
        sequelize
    });
}
exports.ImageFactory = ImageFactory;
function AssociateItemImage() {
    item_1.Item.hasMany(Image, { foreignKey: 'itemId', as: 'images' });
}
exports.AssociateItemImage = AssociateItemImage;
