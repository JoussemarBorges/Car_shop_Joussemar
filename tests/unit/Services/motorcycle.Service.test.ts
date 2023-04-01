import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { 
  motorcycleDataInput,
  motorcycleDataOutput,
  allMotorcyclesMock,
  validIdMock,
  invalidIdMock,
  returnDeletedData, 
} from './MockServiceTest/motorcycle.Mocks.test';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testes da motorcycleService', function () {
  afterEach(sinon.restore);
  describe('Teste o registro de uma motorcycle', function () {
    it('Deveria registrar um novo motorcycle com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleDataOutput);
      
      const result = await MotorcycleService.registerMotorcycle(motorcycleDataInput);
  
      expect(result).to.be.deep.equal(motorcycleDataOutput);
    });
  });
  
  describe('Teste da rota /motorcycles e /motorcycles/:id', function () {
    it('Deveria ser possível retornar todas as motorcycles cadastradas', async function () {
      sinon.stub(Model, 'find').resolves(allMotorcyclesMock);

      const result = await MotorcycleService.getAllMotorcycles();

      expect(result).to.be.deep.equal(allMotorcyclesMock);
    });
    it(
      'Deveria ser possível retornar um registro de uma motorcycle a partir de um Id específico',
      async function () {
        const { id } = allMotorcyclesMock[0];
        sinon.stub(Model, 'findById').resolves(allMotorcyclesMock[0]);

        const result = await MotorcycleService.getMotorcycleById(id);
        
        expect(result).to.be.deep.equal(allMotorcyclesMock[0]);
      },
    );
    it('Deveria retornar null em caso de receber um id não cadastrado', async function () {
      const id = 'invalidID';
      sinon.stub(Model, 'findById').resolves(null);

      const result = await MotorcycleService.getMotorcycleById(id);
        
      expect(result).to.be.equal(null);
    });
  });
    
  describe('Testando a atualização de uma motorcycle', function () {
    it('Deveria ser possível atualizar uma motorcycle com sucesso', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleDataOutput);

      const result = await MotorcycleService
        .updateMotorcycleById(validIdMock, motorcycleDataInput);

      expect(result).to.be.deep.equal(motorcycleDataOutput);
    });
    it('Deveria retornar null em caso de receber um id inválido', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const result = await MotorcycleService
        .updateMotorcycleById(invalidIdMock, motorcycleDataInput);
        
      expect(result).to.be.equal(null);
    });
  });

  describe('Testando a deleção de uma motorcycle', function () {
    it('Deveria ser possível deletar uma motocycle por um Id correto', async function () {
      sinon.stub(Model, 'findByIdAndDelete').resolves(returnDeletedData);

      const result = await MotorcycleService.deleteById(validIdMock);

      expect(result).to.be.deep.equal(returnDeletedData);
    });
  });
});