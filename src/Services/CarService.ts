import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  static async registerCar(dataNewCar: ICar): Promise<Car> {
    const vehicle = new CarODM();

    const newCar = await vehicle.create(dataNewCar);

    const carCreated = new Car(newCar);

    return carCreated;
  }
}

export default CarService;