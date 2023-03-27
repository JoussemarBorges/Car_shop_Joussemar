import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

const errInvalidIdMsg = 'Invalid mongo id';
const errNotFoundMsg = 'Car not found';

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
      if (!car) return res.status(404).json({ message: errNotFoundMsg });
      return res.status(200).json(car);
    } catch (error) {
      return res.status(422).json({ message: errInvalidIdMsg });
    }
  }

  static async updateCarById(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      const dataForUpdate = req.body;
      
      isValidObjectId(id);
      const updatedCarData = await CarService.updateCarById(id, dataForUpdate);
      
      if (!updatedCarData) return res.status(404).json({ message: errNotFoundMsg });
      return res.status(200).json(updatedCarData);
    } catch (error) {
      return res.status(422).json({ message: errInvalidIdMsg });
    }
  }

  static async deleteById(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      isValidObjectId(id);

      const isCarDeleted = await CarService.deleteById(id);
      if (!isCarDeleted) return res.status(404).json({ message: errNotFoundMsg });
      return res.status(200).send();
    } catch (error) {
      return res.status(422).json({ message: errInvalidIdMsg });
    }
  }
}

export default CarController;