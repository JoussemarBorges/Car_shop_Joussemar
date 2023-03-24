import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  static async createNewCar(req: Request, res: Response, next: NextFunction) {
    const dataNewCar: ICar = {
      ...req.body,
    };

    try {
      const carDataRecorded = await CarService.registerCar(dataNewCar);
      return res.status(201).json(carDataRecorded);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;