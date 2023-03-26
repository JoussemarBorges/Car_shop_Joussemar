import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  static async createNewMotorcycle(req: Request, res: Response, next: NextFunction) {
    const dataNewMotorcycle: IMotorcycle = {
      ...req.body,
    };

    try {
      const motorcycleDataRecorded = await MotorcycleService.registerMotorcycle(dataNewMotorcycle);
      return res.status(201).json(motorcycleDataRecorded);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMotorcycles(_req: Request, res: Response, next: NextFunction) {
    try {
      const listMotocycles = await MotorcycleService.getAllMotorcycles();
      return res.status(200).json(listMotocycles);      
    } catch (error) {
      next(error);
    }
  }

  static async getMotorcycleById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    
    try {
      isValidObjectId(id);
      const motorcycle = await MotorcycleService.getMotorcycleById(id);
      if (!motorcycle) return res.status(404).json({ message: 'Motorcycle not found' });
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  static async updateMotorcycleById(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      const dataForUpdate = req.body;
      
      isValidObjectId(id);
      const updatedCarData = await MotorcycleService.updateMotorcycleById(id, dataForUpdate);
      
      if (!updatedCarData) return res.status(404).json({ message: 'Motorcycle not found' });
      return res.status(200).json(updatedCarData);
    } catch (error) {
      return res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default MotorcycleController;