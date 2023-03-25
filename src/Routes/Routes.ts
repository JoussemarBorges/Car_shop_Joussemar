import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => CarController.createNewCar(req, res, next),
);

routes.get(
  '/',
  (req, res, next) => CarController.getAllCars(req, res, next),
);

routes.get(
  '/:id',
  (req, res, next) => CarController.getCarById(req, res, next),
);

export default routes;