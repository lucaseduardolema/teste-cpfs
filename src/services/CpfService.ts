import Cpf from '../domains/Cpf';
import ExistsCpfException from '../errors/ExistsCpfException';
import NotFoundCpfException from '../errors/NotFoundCpfException';
import ICpf from '../interfaces/ICpf';
import ICpfService from '../interfaces/ICpfService';
import CpfODM from '../models/CpfODM';

export default class CpfService implements ICpfService<ICpf, Cpf> {
  protected odm: CpfODM = new CpfODM();

  public async addCpf(dto: ICpf): Promise<Cpf> {
    const result = await this.odm.findOne(dto.cpf);
    if (result) throw new ExistsCpfException('Cpf already exists');
    const newCpf = await this.odm.create(dto);
    return new Cpf(newCpf);
  }

  public async checkCpf(cpfToSeach: string): Promise<Cpf> {
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
}
