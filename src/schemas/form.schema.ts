import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Array })
  fields: Field[];
}

export class Field {
  @Prop({ required: true })
  label: string;

  @Prop()
  placeholder?: string;

  @Prop()
  type: string; // e.g., text, number, file

  @Prop({ default: false })
  required: boolean;

  @Prop()
  minLength?: number;

  @Prop()
  validations?: Validation[];
}

export class Validation {
  @Prop()
  type: string; // e.g., phone, email

  @Prop()
  message: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
