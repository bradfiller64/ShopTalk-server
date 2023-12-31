import { RequestHandler } from 'express';
import { Message } from '../models/message';
import { User } from '../models/user';
import { verifyUser } from '../services/auth';
import { Item } from '../models/item';

export const createMessage: RequestHandler = async (req, res, next) => {
    try {
        // User authentication
        const sender: User | null = await verifyUser(req);
        if (!sender) {
            return res.status(403).json({ error: 'Authentication failed' });
        }

        // Extract the receiver's username, itemId, and message from the request body
        const { receiver, itemId, message } = req.body;

        // Check if the receiver exists (you might want to add additional validation)
        const receiverUser = await User.findOne({ where: { username: receiver } });
        if (!receiverUser) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        // Check if the itemId exists (you might want to add additional validation)
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Create the message with sender, receiver, itemId, and message
        const newMessage = await Message.create({
            sender: sender.username,
            receiver,
            itemId,
            message,
        });

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
        // User authentication
        const user: User | null = await verifyUser(req);

        if (!user) {
            return res.status(403).send();
        }

        // Retrieve messages where the sender or receiver matches the specified username
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender: username },
                    { receiver: username },
                ],
            },
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Could not fetch messages' });
    }
};

// Get message by ID
export const getMessageById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        // User authentication
        const user: User | null = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'Authentication failed' });
        }

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

    try {
        // User authentication
        const user: User | null = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'Authentication failed' });
        }

        const messageId = req.params.id;
        const messageFound = await Message.findByPk(messageId);

        // Check if the user is the sender of the message before allowing updates
        const message = await Message.findByPk(messageId);
        if (!message || message.sender !== user.username) {
            return res.status(403).json({ error: 'Unauthorized to update this message' });
        }

        const [updatedRows] = await Message.update(req.body, {
            where: { messageId: messageId },
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

    try {
        // User authentication
        const user: User | null = await verifyUser(req);
        if (!user) {
            return res.status(403).json({ error: 'Authentication failed' });
        }

        const messageId = req.params.id;
        const messageFound = await Message.findByPk(messageId);

        // Check if the user is the sender of the message before allowing deletion
        if (!messageFound || messageFound.sender !== user.username) {
            return res.status(403).json({ error: 'Unauthorized to delete this message' });
        }

        // Perform the deletion for both sender and receiver
        await Message.destroy({
            where: { messageId: messageId },
        });

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Could not delete message' });
    }
};