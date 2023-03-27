import { Model, Schema, model, models } from 'mongoose';

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

  public async findByIdAndUpdate(
    id: object | number | string,
    dataForUpdate: object,
  ): Promise<T | null> {
    const result = await this.model
      .findByIdAndUpdate(id, { $set: { ...dataForUpdate } }, { new: true });

    return result;
  }
  
  public async deleteById(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }
}

export default AbstractODM;