export default interface ICpfService<I, D> {
  addCpf(dto: I): Promise<D>;
  checkCpf(cpfToSeach: string): Promise<D>;
  removeCpf(cpfToRemove: string): Promise<void>;
  findAllCpfs(): Promise<D[]>;
}
