import express from 'express';
import {getShifts} from '../controllers/shiftController';

const router = express.Router();

router.get('/shifts', getShifts);

export default router;