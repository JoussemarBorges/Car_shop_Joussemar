import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private static createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  static async registerMotorcycle(dataNewMotorcycle: IMotorcycle): Promise<Motorcycle> {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(dataNewMotorcycle);
    const motorcycleCreated = new Motorcycle(newMotorcycle);
    return motorcycleCreated;
  }
  
  static async getAllMotorcycles(): Promise<Motorcycle[] | null> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();

    const listMotorcycles = motorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));

    return listMotorcycles as Motorcycle[];
  }

  static async getMotorcycleById(id: string): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    
    if (!motorcycle) return motorcycle;
    
    const wasmotorcycleFound = this.createMotorcycleDomain(motorcycle);
    return wasmotorcycleFound;
  }

  // static async updateCarById(id: string, dataForUpdate: ICar): Promise<Car | null> {
  //   const carODM = new CarODM();
    
  //   const result = await carODM.updateOne(id, dataForUpdate);
  //   if (!result) return result;

  //   const updatedCarData = await this.getCarById(id);

  //   return updatedCarData;
  // }
}

export default MotorcycleService;