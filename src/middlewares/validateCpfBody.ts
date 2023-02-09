import { cpf } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import InvalidCpfExeception from '../errors/InvalidCpfException';

export default function validateCpfBody(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (!cpf.isValid(req.body.cpf)) {
    throw new InvalidCpfExeception('CPF is not valid');
  }
  next();
}
