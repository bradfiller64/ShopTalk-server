import express from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    loginUser,
} from '../controllers/userController';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

// Get a specific user by username
router.get('/:username', getUser);

// Update user information
router.put('/:username', updateUser);

// Delete a user
router.delete('/:username', deleteUser);

// User login
router.post('/login', loginUser);

export default router;