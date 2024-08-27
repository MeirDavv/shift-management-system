import express from 'express';
import shiftController from '../controllers/shiftController';
import verifyAPIkey from '../middlewares/verifyAPIkey';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/shifts', shiftController.getShifts);
router.post('/shifts', verifyAPIkey, shiftController.updateShifts);

// Route to trigger AI script, protected by API key and JWT token
router.post('/run-ai-script',verifyToken, shiftController.runAIScript)


export default router;