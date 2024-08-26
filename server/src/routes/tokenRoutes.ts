import express from 'express';
import tokenController from '../controllers/tokenController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/token/:employee_id', verifyToken, tokenController.getJwtForEmployee);

export default router;