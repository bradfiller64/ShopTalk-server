import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { Item } from "./item";

export class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>>{
    declare imageId: number;
    declare imageURL: string;
    declare itemId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function ImageFactory(sequelize: Sequelize) {
    Image.init({
        imageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'images',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateItemImage() {
    Item.hasMany(Image, { foreignKey: 'itemId', as: 'images' });
}