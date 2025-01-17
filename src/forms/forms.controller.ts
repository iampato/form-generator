import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { Form } from '../schemas/form.schema';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(@Body() formData: Partial<Form>): Promise<Form> {
    return this.formsService.create(formData);
  }

  @Get()
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files): Promise<any> {
    // Handle file logic here (e.g., save file info in DB)
    return files;
  }
}
