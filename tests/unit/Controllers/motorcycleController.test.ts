import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import Motorcycle from '../../../src/Domains/Motorcycle';

import {
  motorcycleDataInput,
  allMotorcyclesMock,
  invalidIdMock,
  validIdMock,
  notRegisterId,
  returnDeletedData,
} from '../../mocks/motorcyclesMocks';
// import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Testes para a MotorcycleController', function () {
  let req = {} as Request;
  const res = {} as Response;
  let next: SinonStub;
  
  // eslint-disable-next-line mocha/no-hooks-for-single-case
  beforeEach(function () {
    next = Sinon.stub();
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  afterEach(function () {
    Sinon.restore();
  });

  const ID_INVALID_DESCRIPTION = 'Deveria lançar um erro para um Id inválido';
  const ID_NOT_FOUND_DESCRIPTION = 'Deveria lançar um erro para um Id não cadastrado';
  const CAR_NOT_FOUND_MESSAGE = 'Motorcycle not found';

  describe('Testes unitários da camada motorcycleController', function () {
    it('Deveria ser possível criar uma nova motorcycle no BD', async function () {
      const MotoDataOutput: Motorcycle = new Motorcycle(allMotorcyclesMock[0]);

      Sinon.stub(MotorcycleService, 'registerMotorcycle').resolves(MotoDataOutput);

      await MotorcycleController.createNewMotorcycle(req, res, next);

      expect((res.status as SinonStub).calledWith(201)).to.equal(true);
      expect((res.json as SinonStub).calledWith(MotoDataOutput)).to.equal(true);
    });

    it('Deveria lançar um erro caso não crie uma nova motorcycle', async function () {
      const error = new Error('Internal Error');

      Sinon.stub(MotorcycleService, 'registerMotorcycle').rejects(error);
      await MotorcycleController.createNewMotorcycle(req, res, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('testando a busca por motorcycles', function () {
    it('deveria buscar or todas as motorcycles', async function () {
      const carDataOutput: Motorcycle[] = allMotorcyclesMock.map((car) => new Motorcycle(car));

      Sinon.stub(MotorcycleService, 'getAllMotorcycles').resolves(carDataOutput);
  
      await MotorcycleController.getAllMotorcycles(req, res, next);
      
      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput));
    });

    it('deveria lançar um erro ao não conseguir buscar todas as motorcycles', async function () {
      const error = new Error('Internal Error');

      Sinon.stub(MotorcycleService, 'getAllMotorcycles').rejects(error);
      await MotorcycleController.getAllMotorcycles(req, res, next);

      expect(next.calledWith(error)).to.equal(true);
    });

    it('deveria buscar uma motorcycle espécífico pelo Id', async function () {
      const carDataOutput: Motorcycle = new Motorcycle(allMotorcyclesMock[0]);
      
      Sinon.stub(MotorcycleService, 'getMotorcycleById').resolves(carDataOutput);

      req = { params: validIdMock } as unknown as Request;
      await MotorcycleController.getMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput)).to.equal(true);
    });

    it(ID_INVALID_DESCRIPTION, async function () {
      req = { params: invalidIdMock } as unknown as Request;
      
      await MotorcycleController.getMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(422)).to.equal(true);
    });

    it(ID_NOT_FOUND_DESCRIPTION, async function () {
      req = { params: notRegisterId } as unknown as Request;

      Sinon.stub(MotorcycleService, 'getMotorcycleById').resolves(null);
      await MotorcycleController.getMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(404)).to.equal(true);
      expect((res.json as SinonStub).calledWith({ message: CAR_NOT_FOUND_MESSAGE }));
    });
  });

  describe('Testanto a atualização de uma motorcycle', function () {
    it('Deveria atualizar uma motorcycle com sucesso', async function () {
      req = { 
        params: notRegisterId,
        body: motorcycleDataInput,
      } as unknown as Request;

      const carDataOutput: Motorcycle = new Motorcycle(allMotorcyclesMock[0]);

      Sinon.stub(MotorcycleService, 'updateMotorcycleById').resolves(carDataOutput);
      await MotorcycleController.updateMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput)).to.equal(true);
    });

    it(ID_INVALID_DESCRIPTION, async function () {
      req = { 
        params: invalidIdMock,
        body: motorcycleDataInput,
      } as unknown as Request;

      await MotorcycleController.updateMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(422)).to.equal(true);
    });

    it(ID_NOT_FOUND_DESCRIPTION, async function () {
      req = { 
        params: notRegisterId,
        body: motorcycleDataInput,
      } as unknown as Request;

      Sinon.stub(MotorcycleService, 'updateMotorcycleById').resolves(null);
      await MotorcycleController.updateMotorcycleById(req, res, next);

      expect((res.status as SinonStub).calledWith(404)).to.equal(true);
      expect((res.json as SinonStub).calledWith({ message: CAR_NOT_FOUND_MESSAGE }));
    });
  });

  describe('Testando a deleção de uma motorcycle', function () {
    it('Deveria deletar uma motorcycle pelo Id com sucesso', async function () {
      req = { params: validIdMock } as unknown as Request;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockDeleted = returnDeletedData as unknown | null | any;

      Sinon.stub(MotorcycleService, 'deleteById').resolves(mockDeleted);
      await MotorcycleController.deleteById(req, res, next);

      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
    });

    it(ID_INVALID_DESCRIPTION, async function () {
      req = { params: invalidIdMock } as unknown as Request;
      
      await MotorcycleController.deleteById(req, res, next);

      expect((res.status as SinonStub).calledWith(422)).to.equal(true);
    });

    it(ID_NOT_FOUND_DESCRIPTION, async function () {
      req = { params: notRegisterId } as unknown as Request;

      Sinon.stub(MotorcycleService, 'deleteById').resolves(null);
      await MotorcycleController.deleteById(req, res, next);

      expect((res.status as SinonStub).calledWith(404)).to.equal(true);
      expect((res.json as SinonStub).calledWith({ message: CAR_NOT_FOUND_MESSAGE }));
    });
  });
});
