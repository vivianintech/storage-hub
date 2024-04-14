import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload/file-upload.controller';
import { FileUploadService } from './file-upload/file-upload.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileHandlerModule {}
