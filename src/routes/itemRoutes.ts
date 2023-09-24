import express from 'express';
import {
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemsByUser,
} from '../controllers/itemController';

const router = express.Router();

// Get item by ID
router.get('/:id', getItemById);

// Create a new item
router.post('/', createItem);

// Update item by ID
router.put('/:id', updateItem);

// Delete item by ID
router.delete('/:id', deleteItem);

// Get items by user
router.get('/user/:username/items', getItemsByUser);

export default router;