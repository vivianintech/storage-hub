import { Body, Controller, Get } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { S3Service } from 'src/s3/s3.service';

@Controller('file/download')
export class FileDownloadController {
  constructor(private readonly s3Service: S3Service) {}
  @Get()
  async downloadFile(@Body() dto: FileDownloadRequestDto): Promise<string> {
    return await this.s3Service.getS3Object(dto.folder_structure);
  }
}

class FileDownloadRequestDto {
  @ApiProperty({
    description: 'Folder structure of the targeted file',
  })
  folder_structure: string;
}
