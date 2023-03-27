import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

const errInvalidIdMsg = 'Invalid mongo id';
const errNotFoundMsg = 'Motorcycle not found';

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
      if (!motorcycle) return res.status(404).json({ message: errNotFoundMsg });
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(422).json({ message: errInvalidIdMsg });
    }
  }

  static async updateMotorcycleById(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      const dataForUpdate = req.body;
      
      isValidObjectId(id);
      const updatedCarData = await MotorcycleService.updateMotorcycleById(id, dataForUpdate);
      
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

      const isMotorcycleDeleted = await MotorcycleService.deleteById(id);
      if (!isMotorcycleDeleted) return res.status(404).json({ message: errNotFoundMsg });
      return res.status(200).send();
    } catch (error) {
      return res.status(422).json({ message: errInvalidIdMsg });
    }
  }
}

export default MotorcycleController;