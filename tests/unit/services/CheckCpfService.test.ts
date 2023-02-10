import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import NotFoundCpfException from '../../../src/errors/NotFoundCpfException';
import CpfService from '../../../src/services/CpfService';

describe('Teste camada Service: checkCpf', function () {
  afterEach(Sinon.restore);

  const service = new CpfService();

  it('Deve retornar um cpf do banco de dados', async function () {
    const outputCpfMock = {
      cpf: cpf.generate(false),
      createdAt: new Date(),
    };

    Sinon.stub(Model, 'findOne').resolves(outputCpfMock);

    const result = await service.checkCpf(outputCpfMock.cpf);

    expect(result).to.be.deep.equal(outputCpfMock);
  });

  it('Deve lançar o erro "NotFoundCpfException" se o CPF não existir', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    Sinon.stub(Model, 'findOne').resolves(null);

    try {
      await service.checkCpf(inputCpfMock.cpf);
    } catch (error: any) {
      expect(error instanceof NotFoundCpfException).to.equal(true);
      expect(error.status).to.equal(404);
    }
  });
});
