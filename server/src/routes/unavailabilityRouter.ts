import express from 'express';
import unavailabilityController from '../controllers/unavailabilityController';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

router.get('/unavailability/all', verifyToken, unavailabilityController.getAllUnavailableShifts);
router.get('/unavailability', verifyToken, unavailabilityController.getUnavailableShifts);
router.post('/unavailability', verifyToken, unavailabilityController.submitUnavailableShifts)

export default router;