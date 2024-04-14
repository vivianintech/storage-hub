import { Injectable } from '@nestjs/common';
import { generateFolderStructure } from '../common/file-handler';
import { FileUploadDto } from './dto/file-upload-request.dto';

@Injectable()
export class FileUploadService {
  public async upload(dto: FileUploadDto): Promise<string> {
    const folderStructure = generateFolderStructure(
      dto.upload_from,
      dto.fileName,
      dto.uuid,
    );

    return folderStructure;
  }

  private selectBucket() {
    return process.env.R2_BUCKET;
  }
}
