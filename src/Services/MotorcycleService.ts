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
  
  // static async getAllCars(): Promise<Car[] | null> {
  //   const carODM = new CarODM();
  //   const cars = await carODM.find();

  //   const listCars = cars.map((car) => this.createCarDomain(car));

  //   return listCars as Car[];
  // }

  // static async getCarById(id: string): Promise<Car | null> {
  //   const carODM = new CarODM();
  //   const car = await carODM.findById(id);
    
  //   if (!car) return car;
    
  //   const wasCarFound = this.createCarDomain(car);
  //   return wasCarFound;
  // }

  // static async updateCarById(id: string, dataForUpdate: ICar): Promise<Car | null> {
  //   const carODM = new CarODM();
    
  //   const result = await carODM.updateOne(id, dataForUpdate);
  //   if (!result) return result;

  //   const updatedCarData = await this.getCarById(id);

  //   return updatedCarData;
  // }
}

export default MotorcycleService;