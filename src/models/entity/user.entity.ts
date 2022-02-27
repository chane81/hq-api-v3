import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

/** 사용자 */
export class User extends PickType(BaseEntity, ['REG_DT', 'MOD_DT']) {
  /** 사용자 SEQ */
  USER_ID: number;

  /** 사용자 구분 (GROUP_CD: A0006)
   * A: 어드민 유저
   * M: 일반 유저)
   */
  GUBUN_CD: string;

  /** 이메일 */
  @IsEmail()
  @IsString()
  EMAIL: string;

  /** 비밀번호 */
  @IsString()
  PWD: string;

  /** 닉네임 */
  NICK_NAME: string;

  /** 연령대 */
  AGE_GROUP: number;

  /** 폰번호 */
  PHONE_NO: string;

  /** 거주지 1 */
  ADDR1: string;

  /** 거주지 2 */
  ADDR2: string;

  /** 내 위치 주소 */
  MY_ADDR: string;

  /** 성별 */
  SEX: string;

  /** 삭제여부 Y/N */
  DEL_YN: 'Y' | 'N';
}
