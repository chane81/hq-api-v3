import { DynamicModule, Global, Module } from '@nestjs/common';
import { config, ConnectionPool } from 'mssql';
import { RepoService } from './repo.service';
import { CONFIG_OPTIONS } from '../../constants/common.constants';

@Module({})
@Global()
export class RepoModule {
  static forRoot(options: config): DynamicModule {
    return {
      module: RepoModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useFactory: async () => {
            const pool = new ConnectionPool(options);
            const conn = await pool.connect();

            return conn;
          },
        },
        RepoService,
      ],
      exports: [RepoService],
    };
  }
}
