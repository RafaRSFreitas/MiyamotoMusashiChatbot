import express from 'express';
import { handleMessage } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', handleMessage);

export default router;