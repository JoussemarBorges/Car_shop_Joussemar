import IMotorcycle from '../../../../src/Interfaces/IMotorcycle';

const validIdMock = '6420c50538636ef74cf1009d';

const invalidIdMock = 'invalidId';

const motorcycleDataInput: IMotorcycle = {
  model: 'Honda XL 250r',
  year: 1983,
  color: 'red',
  status: true,
  buyValue: 15.000,
  category: 'Street',
  engineCapacity: 250,
};

const motorcycleDataOutput = {
  id: '6420c50538636ef74cf1009d',
  model: 'Honda XL 250r',
  year: 1983,
  color: 'red',
  status: true,
  buyValue: 15,
  category: 'Street',
  engineCapacity: 250,
};

const allMotorcyclesMock = [
  {
    id: '6420c43538636ef74cf10099',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '6420c4e138636ef74cf1009b',
    model: 'Vespa PX 200',
    year: 1980,
    color: 'blue',
    status: true,
    buyValue: 15,
    category: 'Street',
    engineCapacity: 200,
  },
  {
    id: '6420c50538636ef74cf1009d',
    model: 'Honda XL 250',
    year: 1983,
    color: 'red',
    status: true,
    buyValue: 15,
    category: 'Street',
    engineCapacity: 250,
  },
];

const returnDeletedData = {
  _id: validIdMock,
  ...motorcycleDataInput,
  __v: 0,
};

export { 
  motorcycleDataOutput,
  motorcycleDataInput,
  allMotorcyclesMock,
  validIdMock,
  invalidIdMock,
  returnDeletedData,
};