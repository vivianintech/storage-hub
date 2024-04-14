import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileUploadDto } from './dto/file-upload-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { generateFolderStructure } from '../file-handler.helper';
import { S3Service } from 'src/s3/s3.service';

@Controller('file/upload')
export class FileUploadController {
  constructor(private readonly s3Service: S3Service) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: FileUploadDto,
  ) {
    const folderStructure = generateFolderStructure(
      dto.upload_from,
      dto.file_name,
      dto.uuid,
    );

    this.s3Service.uploadS3Object(folderStructure, file);
    const presignedUrl = await this.s3Service.getS3Object('download.jpeg');
    return { presigned_url: presignedUrl, folder_structure: folderStructure };
  }
}
