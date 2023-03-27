import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post(
  '/',
  (req, res, next) => CarController.createNewCar(req, res, next),
);

carRoutes.get(
  '/',
  (req, res, next) => CarController.getAllCars(req, res, next),
);

carRoutes.get(
  '/:id',
  (req, res, next) => CarController.getCarById(req, res, next),
);

carRoutes.put(
  '/:id',
  CarController.updateCarById,
);

carRoutes.delete('/:id', CarController.deleteById);
export default carRoutes;