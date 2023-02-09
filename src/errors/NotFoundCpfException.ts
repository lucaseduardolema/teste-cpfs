export default class NotFoundCpfException extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundCpfException';
  }
}
