import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import request from 'supertest';
import App from '../../../src/App';

describe('Teste camada Controller: removeCpf', function () {
  afterEach(Sinon.restore);

  it('Deve deletat com sucesso um cpf no bando de dados', async function () {
    const inputCpfMock = cpf.generate(false);

    const outputCpfMock = {
      cpf: inputCpfMock,
      createdAt: new Date(),
    };

    Sinon.stub(Model, 'findOne').resolves(outputCpfMock);
    Sinon.stub(Model, 'deleteOne').resolves(undefined);

    await request(App).delete(`/cpf/${inputCpfMock}`).expect(200);
  });

  it('Deve lançar erro "InvalidCpfExeception" ao tentar buscar um cpf inválido', async function () {
    const { body } = await request(App).delete('/cpf/invalid-cpf').expect(400);

    expect(body.type).to.be.equal('InvalidCpfExeception');
    expect(body.message).to.be.equal('CPF is not valid');
  });
});
