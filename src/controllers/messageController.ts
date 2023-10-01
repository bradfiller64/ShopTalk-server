import { RequestHandler } from 'express';
import { Message } from '../models/message';

// Create a new message
export const createMessage: RequestHandler = async (req, res, next) => {
    try {
        const newMessage = await Message.create(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Could not create message' });
    }
};


// Get messages by user (sender or receiver)
export const getMessagesByUser: RequestHandler = async (req, res, next) => {
    const { username } = req.params;
    try {
        const messages = await Message.findAll({
            where: {
                $or: [{ sender: username }, { receiver: username }],
            },
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages by user:', error);
        res.status(500).json({ error: 'Could not fetch messages' });
    }
};

// Get message by ID
export const getMessageById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const message = await Message.findByPk(id);
        if (!message) {
            res.status(404).json({ error: 'Message not found' });
        } else {
            res.status(200).json(message);
        }
    } catch (error) {
        console.error('Error fetching message by ID:', error);
        res.status(500).json({ error: 'Could not fetch message' });
    }
};


// Update message by ID
export const updateMessage: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [updatedRows] = await Message.update(req.body, {
            where: { id },
        });
        if (updatedRows === 0) {
            res.status(404).json({ error: 'Message not found' });
        } else {
            res.status(200).json({ message: 'Message updated successfully' });
        }
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Could not update message' });
    }
};

// Delete message by ID
export const deleteMessage: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Message.destroy({
            where: { id },
        });
        if (deletedRowCount === 0) {
            res.status(404).json({ error: 'Message not found' });
        } else {
            res.status(200).json({ message: 'Message deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Could not delete message' });
    }
};