import { IsString, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
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
}
