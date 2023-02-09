export default interface ICpfService<I, D> {
  addCpf(dto: I): Promise<D>;
  checkCpf(cpf: string): Promise<D>;
  removeCpf(cpf: string): Promise<void>;
  findAllCpfs(): Promise<D[]>;
}
