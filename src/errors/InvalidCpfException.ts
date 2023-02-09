export default class InvalidCpfExeception extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
    this.name = 'InvalidCpfExeception';
  }
}
