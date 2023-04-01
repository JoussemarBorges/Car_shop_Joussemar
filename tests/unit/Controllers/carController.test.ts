import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarService from '../../../src/Services/CarService';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';

import {
  // carDataInput,
  // carDataOutput,
  allCarsMock,
  // invalidIdMock,
  // validIdMock,
  // returnDeletedData,
} from '../Services/MockServiceTest/car.ServiceMocks.Test';

describe('Testes para a CarController', function () {
  const req = {} as Request;
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

  describe('testando o métodofind', function () {
    it('deveria buscar or todos os carros', async function () {
      const dataOutput: Car[] = allCarsMock.map((car) => new Car(car));

      Sinon.stub(CarService, 'getAllCars').resolves(dataOutput);
  
      await CarController.getAllCars(req, res, next);
      
      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(dataOutput));
    });

    it('deveria lançar um erro ao não conseguir buscar todos os carros', async function () {
      const error = new Error('Internal Error');

      Sinon.stub(CarService, 'getAllCars').rejects(error);
      await CarController.getAllCars(req, res, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });
});
