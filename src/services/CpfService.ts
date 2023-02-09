import { cpf } from 'cpf-cnpj-validator';
import Cpf from '../domains/Cpf';
import InvalidCpfExeception from '../errors/InvalidCpfException';
import ICpf from '../interfaces/ICpf';
import ICpfService from '../interfaces/ICpfService';
import CpfODM from '../models/CpfODM';

export default class CpfService implements ICpfService<ICpf, Cpf> {
  protected odm: CpfODM = new CpfODM();

  async addCpf(dto: ICpf): Promise<Cpf> {
    this.validateCpf(dto.cpf)
    const newCpf = await this.odm.create(dto);
    return new Cpf(newCpf);
  }
  checkCpf(cpf: string): Promise<Cpf> {
    throw new Error('Method not implemented.');
  }
  removeCpf(cpf: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllCpfs(): Promise<Cpf[]> {
    throw new Error('Method not implemented.');
  }

  private validateCpf(cpfToValidate: string) {
    if (!cpf.isValid(cpfToValidate)) throw new InvalidCpfExeception('CPF is not valid');
  }
}
