import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from '../schemas/form.schema';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async create(formData: Partial<Form>): Promise<Form> {
    const createdForm = new this.formModel(formData);
    return createdForm.save();
  }

  async findAll(): Promise<Form[]> {
    return this.formModel.find().exec();
  }
}
