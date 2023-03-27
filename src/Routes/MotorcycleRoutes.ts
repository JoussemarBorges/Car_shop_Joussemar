import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post(
  '/',
  (req, res, next) => MotorcycleController.createNewMotorcycle(req, res, next),
);

motorcycleRoutes.get(
  '/',
  (req, res, next) => MotorcycleController.getAllMotorcycles(req, res, next),
);

motorcycleRoutes.get(
  '/:id',
  (req, res, next) => MotorcycleController.getMotorcycleById(req, res, next),
);

motorcycleRoutes.put(
  '/:id',
  MotorcycleController.updateMotorcycleById,
);
motorcycleRoutes.delete('/:id', MotorcycleController.deleteById);

export default motorcycleRoutes;