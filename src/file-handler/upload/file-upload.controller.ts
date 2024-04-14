import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { generateFolderStructure } from '../file-handler.helper';
import { S3Service } from 'src/s3/s3.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from '@nestjs/class-validator';

@Controller('file/upload')
export class FileUploadController {
  constructor(private readonly s3Service: S3Service) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: FileUploadRequestDto,
  ): Promise<FileUploadResponseDto> {
    const folderStructure = generateFolderStructure(
      dto.upload_from,
      dto.file_name,
      dto.uuid,
      dto.email,
    );

    this.s3Service.uploadS3Object(folderStructure, file);
    const presignedUrl = await this.s3Service.getS3Object('download.jpeg');
    return { presigned_url: presignedUrl, folder_structure: folderStructure };
  }
}

export const exampleCurlPostUpload =
  'curl -X POST http://localhost:3000/file/upload \
  -H "Content-Type: multipart/form-data" \
  -F "upload_from=front-end" \
  -F "file_name=file_name.jpeg" \
  -F "uuid=3c02caa8-ce22-456e-9108-d03d63f2bdf0" \
  -F "file=@/path/to/your/file.jpeg"';

class FileUploadRequestDto {
  @ApiProperty({
    description:
      'The original application or service where the file upload is initiated.',
  })
  @IsString()
  upload_from: string;

  @ApiProperty({
    description:
      'Name of the uploaded file including the file extension. E.g: file-name.jpeg',
  })
  @IsString()
  file_name: string;

  @ApiProperty({
    description: 'UUID version 4',
  })
  @IsUUID('4')
  uuid: string;

  @ApiProperty({
    description: 'Email of user uploads the file',
  })
  @IsEmail()
  email: string;
}

class FileUploadResponseDto {
  @ApiProperty({
    description: 'Presigned Url to download the uploaded file',
  })
  presigned_url: string;

  @ApiProperty({
    description: 'Folder structure of the uploaded file',
  })
  folder_structure: string;
}
