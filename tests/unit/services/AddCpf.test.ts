import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CpfService from '../../../src/services/CpfService';

describe('Teste cama Service: addCpf', function () {
  beforeEach(Sinon.restore);

  it('Deve incluir com sucesso um cpf no banco', async function () {
    const inputCpfMock = {
      cpf: cpf.generate(false),
    };

    const outputCpfMock = {
      cpf: inputCpfMock.cpf,
      createdAt: new Date()
    }

    Sinon.stub(Model, 'findOne').resolves(null)
    Sinon.stub(Model, 'create').resolves(outputCpfMock)

    const service = new CpfService()
    const result = await service.addCpf(inputCpfMock)

    expect(result).to.be.deep.equal(outputCpfMock)
  });
});
