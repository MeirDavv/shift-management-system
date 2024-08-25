import express from 'express';
import shiftController from '../controllers/shiftController';

const router = express.Router();

router.get('/shifts', shiftController.getShifts);

export default router;