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
  invalidIdMock,
  validIdMock,
  // returnDeletedData,
  notRegisterId,
} from '../../mocks/carMocks';

describe('Testes para a CarController', function () {
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

  describe('Testando a criação de um carro', function () {
    it('Deveria ser possível criar um novo carro no BD', async function () {
      const carDataOutput: Car = new Car(allCarsMock[0]);

      Sinon.stub(CarService, 'registerCar').resolves(carDataOutput);

      await CarController.createNewCar(req, res, next);

      expect((res.status as SinonStub).calledWith(201)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput)).to.equal(true);
    });
    it('Deveria lançar um erro caso não crie um novo carro', async function () {
      const error = new Error('Internal Error');

      Sinon.stub(CarService, 'registerCar').rejects(error);
      await CarController.createNewCar(req, res, next);

      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('testando a busca por carros', function () {
    it('deveria buscar or todos os carros', async function () {
      const carDataOutput: Car[] = allCarsMock.map((car) => new Car(car));

      Sinon.stub(CarService, 'getAllCars').resolves(carDataOutput);
  
      await CarController.getAllCars(req, res, next);
      
      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput));
    });

    it('deveria lançar um erro ao não conseguir buscar todos os carros', async function () {
      const error = new Error('Internal Error');

      Sinon.stub(CarService, 'getAllCars').rejects(error);
      await CarController.getAllCars(req, res, next);

      expect(next.calledWith(error)).to.equal(true);
    });

    it('deveria buscar um carro espécífico pelo Id', async function () {
      const carDataOutput: Car = new Car(allCarsMock[0]);
      
      Sinon.stub(CarService, 'getCarById').resolves(carDataOutput);

      req = { params: validIdMock } as unknown as Request;
      await CarController.getCarById(req, res, next);

      expect((res.status as SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as SinonStub).calledWith(carDataOutput)).to.equal(true);
    });

    it('deveria lançar um erro para um Id inválido', async function () {
      req = { params: invalidIdMock } as unknown as Request;
      
      await CarController.getCarById(req, res, next);
      
      expect((res.status as SinonStub).calledWith(422)).to.equal(true);
    });

    it('deveria lançar um erro para um Id não cadastrado', async function () {
      req = { params: notRegisterId } as unknown as Request;

      Sinon.stub(CarService, 'getCarById').resolves(null);
      await CarController.getCarById(req, res, next);

      expect((res.status as SinonStub).calledWith(404)).to.equal(true);
      expect((res.json as SinonStub).calledWith({ message: 'Car not Found' }));
    });
  });
});
