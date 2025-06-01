// Car category route for create, fetch, update and delete car
import { Router } from 'express';
import * as CarController from '../controllers/car.controller';
const router = Router();

router.post('/', CarController.createCar);
router.get('/', CarController.getCars);
router.put('/:id', CarController.updateCar);
router.delete('/:id', CarController.deleteCar);

export default router;