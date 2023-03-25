import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
// import ICar from '../../../src/Interfaces/ICar';
// import Car from '../../../src/Domains/Car';
import { carDataInputs, carDataOutput } from './MockServiceTest/carServiceMocks.Test';
import CarService from '../../../src/Services/CarService';

describe('Teste o registro d eum carro', function () {
  it('Deveria registrar um novo carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carDataOutput);

    const result = await CarService.registerCar(carDataInputs);

    expect(result).to.be.deep.equal(carDataOutput);
  });
});