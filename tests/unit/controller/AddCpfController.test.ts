import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';

import request from 'supertest';

import App from '../../../src/App';

describe('Test camada Controller: addCpf', function () {
  afterEach(Sinon.restore);

  it('Deve incluir com sucesso um cpf no banco', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    const outputCpfMock = {
      cpf: inputCpfMock.cpf,
      createdAt: new Date(),
    };

    Sinon.stub(Model, 'findOne').resolves(null);
    Sinon.stub(Model, 'create').resolves(outputCpfMock);

    const { body } = await request(App)
      .post('/cpf')
      .send(inputCpfMock)
      .expect(201);

    expect(body).to.have.property('cpf');
    expect(body).to.have.property('createdAt');
  });

  it('Deve lançae erro "InvalidCpfExeception" ao tentar cadastrar um cpf inválido', async function () {
    const inputCpfMock = {
      cpf: 'invalid_cpf',
    };

    const { body } = await request(App)
      .post('/cpf')
      .send(inputCpfMock)
      .expect(400);

    expect(body.type).to.be.equal('InvalidCpfExeception');
    expect(body.message).to.be.equal('CPF is not valid');
  });
});
