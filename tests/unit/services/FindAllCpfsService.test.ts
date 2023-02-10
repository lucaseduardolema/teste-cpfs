import { expect } from 'chai';
import { cpf } from 'cpf-cnpj-validator';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Cpf from '../../../src/domains/Cpf';
import CpfService from '../../../src/services/CpfService';

describe('Teste camada Service: findAllCpfs', function () {
  afterEach(Sinon.restore);

  const service = new CpfService();

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

    Sinon.stub(Model, 'find').resolves(outputCpfMock);

    const result = await service.findAllCpfs();

    expect(result).to.be.deep.equal(outputCpfMock);
    expect(result.map((cpf) => cpf instanceof Cpf)).to.be.deep.equal([
      true,
      true,
      true,
    ]);
  });
});
