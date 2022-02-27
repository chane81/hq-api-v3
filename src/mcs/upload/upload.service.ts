import { Inject, Injectable } from '@nestjs/common';
import { getType } from 'mime';
import { UploadModuleOptions } from './upload.interfaces';
import { CONFIG_OPTIONS } from '~/constants/common.constants';
import { getErrorResult, getDefaultResult } from '~/utils/result.util';
import { ResUploadDto } from '~/dto/upload/upload.dto';
import * as AWS from 'aws-sdk';
import { BaseDto } from '~/dto/base.dto';

@Injectable()
export class UploadService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: UploadModuleOptions,
  ) {}

  /**
   * s3 파일 삭제
   * @param filePaths 삭제할 파일 경로들
   */
  public async delete(filePaths: string[]) {
    let result: BaseDto = getDefaultResult;
    const { baseUrl, accessKeyId, secretAccessKey, bucketName } = this.options;

    try {
      // aws config
      AWS.config.update({
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
      });

      const fileDelete = async (path: string) => {
        const s3Key = path.replace(baseUrl + '/', '');

        await new AWS.S3()
          .deleteObject({
            Bucket: bucketName,
            Key: s3Key,
          })
          .promise();
      };

      await Promise.all(filePaths.filter((path) => !!path).map(fileDelete));
    } catch (ex) {
      result = getErrorResult(ex, filePaths);
    }

    return result;
  }

  /**
   * s3 파일 업로드
   * @param files 단일 file 필드에 여러개의 파일을 첨부할 수 있으므로 array 형태 파일 타입
   * @param savePath 버킷 하위에 저장할 폴더 경로
   * @returns 저장된 파일의 url 들을 ResUploadDto.DATA 에 담아 리턴
   */
  public async upload(
    files: Array<Express.Multer.File>,
    savePath: string,
  ): Promise<ResUploadDto> {
    let result: ResUploadDto = getDefaultResult;
    const { baseUrl, accessKeyId, secretAccessKey, bucketName } = this.options;

    try {
      // aws config
      AWS.config.update({
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
      });

      // upload method
      const fileUpload = async (file: Express.Multer.File) => {
        const objectName = `${Date.now() + file.originalname}`;
        const filePath = `${savePath}/${objectName}`;

        // content-type 을 지정해주지 않으면 aws s3 에 저장될 때
        // 'application/octet-stream'으로 저장되며, s3에서 url 클릭시
        // 파일 다운로드가 되므로 content-type을 명시적으로 선언함
        await new AWS.S3()
          .putObject({
            Body: file.buffer,
            Bucket: bucketName,
            Key: filePath,
            ContentType: getType(file.originalname),
            ACL: 'public-read',
          })
          .promise();

        const url = `${baseUrl}/${filePath}`;

        return url;
      };

      result.DATA = await Promise.all(
        files.filter((file) => !!file).map(fileUpload),
      );
    } catch (ex) {
      result = getErrorResult(ex, { files, savePath });
    }

    return result;
  }
}
