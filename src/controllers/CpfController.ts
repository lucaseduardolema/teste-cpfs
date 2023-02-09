import { Request, Response, Router } from 'express';
import Cpf from '../domains/Cpf';
import ICpf from '../interfaces/ICpf';
import ICpfService from '../interfaces/ICpfService';
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

  public initRoutes(): Router {
    this.router.post('/cpf', (req, res) => this.addCpf(req, res));
    this.router.get('/cpf/:cpf', (req, res) => this.checkCpf(req, res));
    return this.router;
  }
}
