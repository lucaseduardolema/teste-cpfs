import { cpf } from 'cpf-cnpj-validator';
import Cpf from '../domains/Cpf';
import InvalidCpfExeception from '../errors/InvalidCpfException';
import NotFoundCpfException from '../errors/NotFoundCpfException';
import ICpf from '../interfaces/ICpf';
import ICpfService from '../interfaces/ICpfService';
import CpfODM from '../models/CpfODM';

export default class CpfService implements ICpfService<ICpf, Cpf> {
  protected odm: CpfODM = new CpfODM();

  public async addCpf(dto: ICpf): Promise<Cpf> {
    this.validateCpf(dto.cpf);
    const newCpf = await this.odm.create(dto);
    return new Cpf(newCpf);
  }

  public async checkCpf(cpfToSeach: string): Promise<Cpf> {
    this.validateCpf(cpfToSeach)
    const result = await this.odm.findOne(cpfToSeach);
    if (!result) throw new NotFoundCpfException('CPF is not found');
    return new Cpf(result);
  }

  public removeCpf(cpfToRemove: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public findAllCpfs(): Promise<Cpf[]> {
    throw new Error('Method not implemented.');
  }

  private validateCpf(cpfToValidate: string) {
    if (!cpf.isValid(cpfToValidate)) {
      throw new InvalidCpfExeception('CPF is not valid');
    }
  }
}
