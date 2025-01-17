import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsService } from './forms/forms.service';
import { FormsController } from './forms/forms.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/form-generator')],
  controllers: [FormsController],
  providers: [FormsService],
})
export class AppModule {}
