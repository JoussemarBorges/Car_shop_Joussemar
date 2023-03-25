import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
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

  static async getAllCars(_req: Request, res: Response, next: NextFunction) {
    try {
      const listCars = await CarService.getAllCars();
      return res.status(200).json(listCars);      
    } catch (error) {
      next(error);
    }
  }

  static async getCarById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    try {
      isValidObjectId(id);
      const car = await CarService.getCarById(id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      return res.status(200).json(car);
    } catch (error) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default CarController;