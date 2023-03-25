import ICar from '../../../../src/Interfaces/ICar';

const carDataInputs: ICar = {
  model: 'Fusca',
  year: 1980,
  color: 'Branco',
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const carDataOutput = {
  id: '641f420c557b7e4e64aefa34',
  model: 'Fusca',
  year: 1980,
  color: 'Branco',
  status: false,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

export { carDataOutput, carDataInputs };
