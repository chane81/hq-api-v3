import { BaseDto } from '../base.dto';

/** res upload result
 * req 로 들어온 파일의 업로드 결과 url 들을 리턴한다.
 */
export class ResUploadDto extends BaseDto {
  DATA?: string[];
}
