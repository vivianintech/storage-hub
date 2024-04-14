import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileUploadDto } from './dto/file-upload-request.dto';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file/upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: FileUploadDto,
  ): Promise<string> {
    return await this.fileUploadService.upload(dto);
  }
}
