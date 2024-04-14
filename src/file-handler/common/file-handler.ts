import { BadRequestException } from '@nestjs/common';
import { ALLOWED_FILE_EXTENSTIONS } from 'src/helper/constants';
import {
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
} from 'src/helper/date-time';

export function generateFolderStructure(
  uploadFrom: string,
  fileName: string,
  uuid: string,
): string {
  const fileExtension = getFileExtension(fileName);

  if (!ALLOWED_FILE_EXTENSTIONS.includes(fileExtension)) {
    throw new BadRequestException('File extension is not supported.');
  }

  // Folder structure example: 'front-end-app|2024|01|01|032f4fd4-b943-4468-b6bf-03563c2db304|file-name.jpeg'
  return `${uploadFrom}|${getCurrentYear()}|${getCurrentMonth()}|${getCurrentDate()}|${uuid}|${fileName}`;
}

function getFileExtension(fileName: string): string {
  const dotIndex = fileName.includes('.') ? fileName.lastIndexOf('.') : '';

  if (dotIndex === '') {
    throw new BadRequestException('File extension is required.');
  }

  const extension = fileName.slice(dotIndex);
  return extension;
}

export function validateFolderStructure(folderStructure: string): boolean {
  const folders = folderStructure.split('|');

  if (folders.length < 6) {
    throw new BadRequestException('Folder structure is invalid.');
  }

  return true;
}
