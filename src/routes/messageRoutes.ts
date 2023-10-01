import { Router } from 'express';
import { createMessage, getMessagesByUser, getMessageById, updateMessage, deleteMessage } from '../controllers/messageController';

const router = Router();

// Create a new message
router.post('/', createMessage);

// Get messages for a specific user
router.get('/:username', getMessagesByUser);

// Get a specific message by ID
router.get('/:id', getMessageById);

// Update a message by ID
router.put('/:id', updateMessage);

// Delete a message by ID
router.delete('/:id', deleteMessage);

export default router;