import { Module } from '@nestjs/common';
import { FileUploadController } from './upload/file-upload.controller';
import { S3Service } from 'src/s3/s3.service';
import { FileDownloadController } from './download/file-download.controller';

@Module({
  controllers: [FileUploadController, FileDownloadController],
  providers: [S3Service],
  exports: [],
})
export class FileHandlerModule {}
