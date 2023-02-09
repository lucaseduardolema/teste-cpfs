import { Schema } from 'mongoose';
import ICpf from '../interfaces/ICpf';
import AbstractODM from './AbstractODM';

export default class CpfODM extends AbstractODM<ICpf> {
  constructor() {
    const schema = new Schema<ICpf>({
      cpf: {
        type: String,
        unique: true,
      },
      createdAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
    });
    super(schema, 'Cpf');
  }
}
