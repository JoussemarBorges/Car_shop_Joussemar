import { Model, Schema, model, models, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  readonly model: Model<T>;
  private schema: Schema<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  } 

  public async updateOne(id: string, dataForUpdate: T): Promise<T | null> {
    await this.model.updateOne({ id }, { $set: { ...dataForUpdate } as UpdateQuery<T> });

    return this.findById(id);
  } 
}

export default AbstractODM;