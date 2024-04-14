import { Body, Controller, Get } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

@Controller('file/download')
export class FileDownloadController {
  constructor(private readonly s3Service: S3Service) {}
  @Get()
  async downloadFile(@Body() dto: { folder_structure: string }) {
    return await this.s3Service.getS3Object(dto.folder_structure);
  }
}
