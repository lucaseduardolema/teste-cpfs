import { Request, Response, Router } from 'express';
import Cpf from '../domains/Cpf';
import ICpf from '../interfaces/ICpf';
import ICpfService from '../interfaces/ICpfService';
import validateCpfBody from '../middlewares/validateCpfBody';
import validateCpfParam from '../middlewares/validateCpfParam';
import CpfService from '../services/CpfService';
import AbstractController from './AbstractController';

export default class CpfController extends AbstractController<
ICpfService<ICpf, Cpf>
> {
  constructor() {
    super(new CpfService());
  }

  private async addCpf(req: Request, res: Response): Promise<Response> {
    const cpf = req.body;
    const newCpf = await this.service.addCpf(cpf);
    return res.status(201).json(newCpf);
  }

  private async checkCpf(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params;
    const result = await this.service.checkCpf(cpf);
    return res.status(200).json(result);
  }

  private async findAllCpfs(req: Request, res: Response): Promise<Response> {
    const result = await this.service.findAllCpfs();
    return res.status(200).json(result);
  }

  private async removeCpf(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params;
    await this.service.removeCpf(cpf);
    return res.status(200).end();
  }

  public initRoutes(): Router {
    this.router.route('/cpf')
      .post(validateCpfBody, (req, res) => this.addCpf(req, res))
      .get((req, res) => this.findAllCpfs(req, res));
    this.router.route('/cpf/:cpf')
      .get(validateCpfParam, (req, res) => this.checkCpf(req, res))
      .delete(validateCpfParam, (req, res) => this.removeCpf(req, res));
    return this.router;
  }
}
