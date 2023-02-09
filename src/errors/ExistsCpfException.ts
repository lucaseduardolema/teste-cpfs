export default class ExistsCpfException extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 409;
    this.name = 'ExistsCpfException';
  }
}
