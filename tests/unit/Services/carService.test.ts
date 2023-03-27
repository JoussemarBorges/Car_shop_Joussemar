import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { 
  carDataInput,
  carDataOutput,
  allCarsMock,
  invalidIdMock,
  validIdMock,
} from './MockServiceTest/carServiceMocks.Test';

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
    afterEach(sinon.restore);
    it('Deveria ser possível retornar todos os carros cadastrados', async function () {
      sinon.stub(Model, 'find').resolves(allCarsMock);

      const result = await CarService.getAllCars();

      expect(result).to.be.deep.equal(allCarsMock);
    });
    it(
      'Deveria ser possível retornar um registro de um carro a partir de um Id específico',
      async function () {
        const { id } = allCarsMock[0];
        sinon.stub(Model, 'findById').resolves(allCarsMock[0]);

        const result = await CarService.getCarById(id);
        
        expect(result).to.be.deep.equal(allCarsMock[0]);
      },
    );
    it('Deveria retornar null em caso de receber um id não cadastrado', async function () {
      sinon.stub(Model, 'findById').resolves(null);

      const result = await CarService.getCarById(invalidIdMock);
        
      expect(result).to.be.equal(null);
    });
    it('Deveria ser possível atualizar um carro com sucesso', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carDataOutput);

      const result = await CarService.updateCarById(validIdMock, carDataInput);

      expect(result).to.be.deep.equal(carDataOutput);
    });
    it('Deveria retornar null em caso de receber um id inválido', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const result = await CarService.updateCarById(invalidIdMock, carDataInput);
        
      expect(result).to.be.equal(null);
    });
  });
});