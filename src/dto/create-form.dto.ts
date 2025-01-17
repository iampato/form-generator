import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ValidationDto {
  @ApiProperty({
    description: 'Type of validation (e.g., phone, email)',
    example: 'email',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Validation error message',
    example: 'Please enter a valid email address',
  })
  @IsString()
  message: string;
}

export class FieldDto {
  @ApiProperty({
    description: 'Label of the form field',
    example: 'Email Address',
  })
  @IsString()
  label: string;

  @ApiPropertyOptional({
    description: 'Placeholder text for the field',
    example: 'Enter your email',
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

  @ApiProperty({
    description: 'Type of the field (e.g., text, number, file)',
    example: 'text',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Whether the field is required',
    default: false,
  })
  @IsBoolean()
  required: boolean;

  @ApiPropertyOptional({
    description: 'Minimum length requirement for the field',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  minLength?: number;

  @ApiPropertyOptional({
    description: 'Array of validation rules',
    type: [ValidationDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidationDto)
  validations?: ValidationDto[];
}

export class CreateFormDto {
  @ApiProperty({
    description: 'Title of the form',
    example: 'Contact Form',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'URL of the form',
    example: 'contact-form',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Array of form fields',
    type: [FieldDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  fields: FieldDto[];
}
