import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ExistsCpfException from '../../../src/errors/ExistsCpfException';
import CpfService from '../../../src/services/CpfService';

describe('Teste camada Service: addCpf', function () {
  afterEach(Sinon.restore);

  const service = new CpfService();

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

    const result = await service.addCpf(inputCpfMock);

    expect(result).to.be.deep.equal(outputCpfMock);
  });

  it('Deve lançae erro "ExistsCpfException" ao tentar cadastrar um cpf já existente', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    Sinon.stub(Model, 'findOne').resolves(inputCpfMock.cpf);

    try {
      await service.addCpf(inputCpfMock);
    } catch (error: any) {
      expect(error instanceof ExistsCpfException).to.equal(true);
      expect(error.status).to.equal(409);
    }
  });
});
