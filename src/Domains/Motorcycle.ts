import Vehicle from './Vehicle';
import IMotorcycle, { Category } from '../Interfaces/IMotorcycle';

class Motorcycle extends Vehicle {
  private category: Category;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;