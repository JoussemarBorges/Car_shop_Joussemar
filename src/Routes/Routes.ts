import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => CarController.createNewCar(req, res, next),
);

export default routes;