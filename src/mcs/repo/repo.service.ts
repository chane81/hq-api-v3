import { Inject, Injectable } from '@nestjs/common';
import { ConnectionPool } from 'mssql';
import { CONFIG_OPTIONS } from '~/constants/common.constants';

@Injectable()
export class RepoService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly conn: ConnectionPool,
  ) {}

  /** DB 수행 req */
  public getReq() {
    return this.conn.request();
  }
}
