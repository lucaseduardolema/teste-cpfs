import express, { Router } from 'express';

export default abstract class AbstractController<S> {
  public router: express.Router;
  public service: S;

  constructor(service: S) {
    this.router = Router();
    this.service = service;
  }

  public abstract initRoutes(): Router;
}
