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
    const newCpf = await this.service.addCpf(req.body);
    return res.status(201).json(newCpf);
  }

  public initRoutes(): Router {
    this.router.post('/cpf', (req, res) => this.addCpf(req, res));
    return this.router;
  }
}
