const validIdMock = '641f420c557b7e4e64aefa34';

const invalidIdMock = 'invalidId';

const carDataInput = {
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

const allCarsMock = [
  {
    id: '641f420c557b7e4e64aefa34',
    model: 'Fusca',
    year: 1980,
    color: 'Branco',
    status: false,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '641f4a9b557b7e4e64aefa37',
    model: 'Fusca',
    year: 1978,
    color: 'Vermelho',
    status: false,
    buyValue: 15,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '641f4ab9557b7e4e64aefa39',
    model: 'Ferrari',
    year: 2001,
    color: 'Vermelho',
    status: false,
    buyValue: 500,
    doorsQty: 4,
    seatsQty: 5,
  },
];

const returnDeletedData = {
  _id: validIdMock,
  ...carDataInput,
  __v: 0,
};

export { 
  carDataOutput,
  carDataInput,
  allCarsMock,
  validIdMock,
  invalidIdMock,
  returnDeletedData,
};
