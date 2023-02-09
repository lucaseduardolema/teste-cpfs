import ICpf from '../interfaces/ICpf';

export default class Cpf {
  private cpf: string;
  private createdAt: Date | undefined;

  constructor(cpf: ICpf) {
    this.cpf = cpf.cpf;
    this.createdAt = cpf.createdAt;
  }
}
