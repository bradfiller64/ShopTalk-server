import { RequestHandler } from "express";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import { Item } from "../models/item";

export const getItemById: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;

    let item = await Item.findByPk(itemId);

    // checking for an item
    if (item) {
        res.status(200).json(item);
    }
    else {
        res.status(404).json({});
    }
}

export const getItemByUser: RequestHandler = async (req, res, next) => {
    let username = req.params.username;

    let items = await User.findAll({
        where: {
            username: username
        }
    })
    if (items) {
        res.status(200).json(items);
    } else {
        res.status(404).json({});
    }
}

export const createItem: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newItem: Item = req.body;
    newItem.username = user.username;

    // checking if item has a name, description, and price
    if (newItem.name && newItem.description && newItem.price) {
        let created = await Item.create(newItem);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const updateItem: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    // extract the item ID from the request parameters
    let itemId = req.params.id;

    //updated item object
    let newItem: Item = req.body;

    // New item username set to current user
    newItem.username = user.username

    // finding item that is to be edited by its id
    let itemFound = await Item.findByPk(itemId);

    // checking for an item, itemFound username matches username of updated item, current user matches username of itemFound, new item has a name, description, and a plan.
    if (itemFound && itemFound.username == newItem.username && user.username == itemFound.username && newItem.name && newItem.description && newItem.price) {

        await Item.update(newItem, {
            where: { itemId: itemId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteItem: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;

    let itemFound = await Item.findByPk(itemId);

    // checking if current user matches the username of item
    if (itemFound && itemFound.username == user.username) {
        await Item.destroy({
            where: { itemId: itemId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}