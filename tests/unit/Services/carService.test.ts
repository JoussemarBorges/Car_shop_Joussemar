import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
// import ICar from '../../../src/Interfaces/ICar';
// import Car from '../../../src/Domains/Car';
import { carDataInput, carDataOutput, allCarsMock } from './MockServiceTest/carServiceMocks.Test';
import CarService from '../../../src/Services/CarService';

describe('Testes da carService', function () {
  describe('Teste o registro de um carro', function () {
    it('Deveria registrar um novo carro com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(carDataOutput);
  
      const result = await CarService.registerCar(carDataInput);
  
      expect(result).to.be.deep.equal(carDataOutput);
    });
  });
  
  describe('Teste da rota /cars e /cars/:id', function () {
    it('Deveria ser possível retornar todos os carros cadastrados', async function () {
      sinon.stub(Model, 'find').resolves(allCarsMock);
  
      const result = await CarService.getAllCars();
  
      expect(result).to.be.deep.equal(allCarsMock);
    });
  });
});