import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private static createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  static async registerCar(dataNewCar: ICar): Promise<Car> {
    const carODM = new CarODM();
    const newCar = await carODM.create(dataNewCar);
    const carCreated = new Car(newCar);
    return carCreated;
  }
  
  static async getAllCars(): Promise<Car[] | null> {
    const carODM = new CarODM();
    const cars = await carODM.find();

    const listCars = cars.map((car) => this.createCarDomain(car));

    return listCars as Car[];
  }

  static async getCarById(id: string): Promise<Car | null> {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    const wasCarFound = this.createCarDomain(car);

    if (!car) return car;
    
    return wasCarFound;
  }
}

export default CarService;