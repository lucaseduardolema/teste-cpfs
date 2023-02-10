import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import request from 'supertest';
import App from '../../../src/App';

describe('Teste camada Controller: findAllCpfs', function () {
  afterEach(Sinon.restore);

  it('Deve retornar todos os cpfs do banco de dados', async function () {
    const outputCpfMock = [
      {
        cpf: cpf.generate(false),
        createdAt: new Date(),
      },
      {
        cpf: cpf.generate(false),
        createdAt: new Date(),
      },
      {
        cpf: cpf.generate(false),
        createdAt: new Date(),
      },
    ];

    const outputCpfMockDateString = outputCpfMock.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
    }));

    console.table(outputCpfMock);
    console.table(outputCpfMockDateString);

    Sinon.stub(Model, 'find').resolves(outputCpfMock);

    const { body } = await request(App).get('/cpf').expect(200);

    expect(body).to.be.deep.equal(outputCpfMockDateString);
  });
});
