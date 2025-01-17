import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FormsService } from './forms.service';
import { Form } from '../schemas/form.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateFormDto } from 'src/dto/create-form.dto';

@ApiTags('Forms') // Tags the controller for grouping in Swagger UI
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @ApiOperation({ summary: 'Create a new form' })
  @ApiResponse({ status: 201, description: 'Form created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @ApiOperation({ summary: 'Retrieve all forms' })
  @ApiResponse({ status: 200, description: 'List of all forms.' })
  @Get()
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @ApiOperation({ summary: 'Upload files for a form' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Files uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'File upload error.' })
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files): Promise<any> {
    return files;
  }
}
