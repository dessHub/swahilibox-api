import express from 'express';
import User from '../models/user';
const router = express.Router();
import UserController from '../controllers/user';

router.get('/', (req, res) => {
    UserController.index(req, res);
});

router.post('/adduser', (req, res) => {
    UserController.addUser(req, res);
});

export default router;
