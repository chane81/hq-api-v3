import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../../constants/common.constants';
import { UploadModuleOptions } from './upload.interfaces';
import { UploadService } from './upload.service';

@Module({})
@Global()
export class UploadModule {
  static forRoot(options: UploadModuleOptions): DynamicModule {
    return {
      module: UploadModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        UploadService,
      ],
      exports: [UploadService],
    };
  }
}
