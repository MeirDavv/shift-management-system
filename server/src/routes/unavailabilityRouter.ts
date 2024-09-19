import express from 'express';
import unavailabilityController from '../controllers/unavailabilityController';
import verifyToken from '../middlewares/verifyToken';
import verifyAPIkey from '../middlewares/verifyAPIkey';


const router = express.Router();

router.get('/unavailability/all', verifyAPIkey, verifyToken, unavailabilityController.getAllUnavailableShifts);
router.get('/unavailability', verifyToken, unavailabilityController.getUnavailableShifts);
router.post('/unavailability', verifyToken, unavailabilityController.submitUnavailableShifts)

export default router;