import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import NotFoundCpfException from '../../../src/errors/NotFoundCpfException';
import CpfService from '../../../src/services/CpfService';

describe('Teste camada Service: removeCpf', function () {
  afterEach(Sinon.restore);

  const service = new CpfService();

  it('Deve remover com sucesso um cpf do banco', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    const outputCpfMock = {
      cpf: inputCpfMock.cpf,
      createdAt: new Date(),
    };

    Sinon.stub(Model, 'findOne').resolves(outputCpfMock);
    Sinon.stub(Model, 'deleteOne').resolves(undefined);

    // falso positivo

    try {
      await service.removeCpf(inputCpfMock.cpf);
    } catch (error) {
      expect(error).to.be.undefined;
    }
  });

  it('Deve lançar o erro "NotFoundCpfException" se o CPF não existir', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    Sinon.stub(Model, 'findOne').resolves(null);

    try {
      await service.removeCpf(inputCpfMock.cpf);
    } catch (error: any) {
      expect(error instanceof NotFoundCpfException).to.equal(true);
      expect(error.status).to.equal(404);
    }
  });
});
