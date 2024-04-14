import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_USER_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_USER_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_USER_SECRET_ACCESS_KEY,
      },
    });
    this.bucket = process.env.R2_BUCKET;
  }

  async getS3Object(folderStructure: string): Promise<string> {
    try {
      return await getSignedUrl(
        this.s3Client,
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: folderStructure,
        }),
      );
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  }

  async uploadS3Object(folderStructure: string, file: Express.Multer.File) {
    try {
      this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: folderStructure,
          Body: file.buffer,
        }),
      );

      this.s3Client.destroy();
      console.log('upload successful');
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  }
}
