import { Controller, Post } from '@nestjs/common';

@Controller('file/download')
export class FileDownloadController {
  @Post()
  fileDownload(): string {
    return 'This action returns all cats';
  }
}
