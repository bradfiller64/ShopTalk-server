import { RequestHandler } from "express";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import { Image } from "../models/image";
import { Item } from "../models/item";

// Get all images associated with a specific item
export const getItemImages: RequestHandler = async (req, res, next) => {
    const { itemId } = req.params;

    try {
        const images = await Image.findAll({
            where: { itemId },
        });

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching item images:', error);
        res.status(500).json({ error: 'Could not fetch item images' });
    }
};

// Create a new image associated with an item
export const createImage: RequestHandler = async (req, res, next) => {
    // User authentication
    const user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const newImage: Image = req.body;

    // Ensure that the itemId is provided in the request body
    if (!newImage.itemId) {
        return res.status(400).json({ error: 'itemId is required in the request body' });
    }

    try {
        // Check if the item associated with the image exists
        const { itemId } = newImage;
        const itemExists = await Item.findByPk(itemId);

        if (!itemExists) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Create the image associated with the item
        const createdImage = await Image.create(newImage);
        res.status(201).json(createdImage);
    } catch (error) {
        console.error('Error creating item image:', error);
        res.status(500).json({ error: 'Could not create item image' });
    }
};

// Delete an image associated with an item
export const deleteImage: RequestHandler = async (req, res, next) => {
    // User authentication
    const user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const imageId = req.params.id;

    try {
        // Find the image by its ID
        const imageToDelete = await Image.findByPk(imageId);

        if (!imageToDelete) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Check if the item associated with the image belongs to the current user
        const { itemId } = imageToDelete;
        const associatedItem = await Item.findByPk(itemId);

        if (!associatedItem || associatedItem.username !== user.username) {
            return res.status(403).json({ error: 'You do not have permission to delete this image' });
        }

        // Delete the image
        await imageToDelete.destroy();

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting item image:', error);
        res.status(500).json({ error: 'Could not delete item image' });
    }
};