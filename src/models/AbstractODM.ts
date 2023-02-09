import { Model, model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected model;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = (models[this.modelName] as Model<T>)
      || (model(this.modelName, this.schema) as Model<T>);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findOne(param: string): Promise<T | null> {
    return this.model.findOne({ cpf: param });
  }

  public async delete(key: string, param: T): Promise<void> {
    await this.model.findOneAndRemove({ key: param });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }
}

export default AbstractODM;
