import IVehicle from './IVehicle';

type Category = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle {
  category: Category,
  engineCapacity: number,
}
export { Category };

export default IMotorcycle;