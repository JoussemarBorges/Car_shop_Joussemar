import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { 
  motorcycleDataInput,
  motorcycleDataOutput,
  allMotorcyclesMock,
  validIdMock,
  invalidIdMock, 
} from './MockServiceTest/motorcycleMocks.test';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testes da motorcycleService', function () {
  describe('Teste o registro de um motorcyclero', function () {
    it('Deveria registrar um novo motorcyclero com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleDataOutput);
      
      const result = await MotorcycleService.registerMotorcycle(motorcycleDataInput);
  
      expect(result).to.be.deep.equal(motorcycleDataOutput);
    });
  });
  
  describe('Teste da rota /motorcycles e /motorcycles/:id', function () {
    afterEach(sinon.restore);
    it('Deveria ser possível retornar todos os motorcycleros cadastrados', async function () {
      sinon.stub(Model, 'find').resolves(allMotorcyclesMock);

      const result = await MotorcycleService.getAllMotorcycles();

      expect(result).to.be.deep.equal(allMotorcyclesMock);
    });
    it(
      'Deveria ser possível retornar um registro de um motorcyclero a partir de um Id específico',
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
    it('Deveria ser possível atualizar uma motorcycle com sucesso', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleDataOutput);

      const result = await MotorcycleService.updateMotorcycleById(validIdMock, motorcycleDataInput);

      expect(result).to.be.deep.equal(motorcycleDataOutput);
    });
    it('Deveria retornar null em caso de receber um id inválido', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      const result = await MotorcycleService
        .updateMotorcycleById(invalidIdMock, motorcycleDataInput);
        
      expect(result).to.be.equal(null);
    });
  });
});