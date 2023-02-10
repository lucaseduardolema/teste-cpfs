import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import request from 'supertest';
import App from '../../../src/App';

describe('Teste camada Controller: checkCpf', function () {
  afterEach(Sinon.restore);

  it('Deve retornar um cpf do banco de dados', async function () {
    const outputCpfMock = {
      cpf: cpf.generate(false),
      createdAt: new Date(),
    };

    Sinon.stub(Model, 'findOne').resolves(outputCpfMock);

    const { body } = await request(App)
      .get(`/cpf/${outputCpfMock.cpf}`)
      .expect(200);

    expect(body).to.have.property('cpf');
    expect(body).to.have.property('createdAt');
  });

  it('Deve lançar erro "InvalidCpfExeception" ao tentar buscar um cpf inválido', async function () {
    const { body } = await request(App).get('/cpf/invalid-cpf').expect(400);

    expect(body.type).to.be.equal('InvalidCpfExeception');
    expect(body.message).to.be.equal('CPF is not valid');
  });
});
