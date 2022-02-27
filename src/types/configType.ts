import { ConfigService, ConfigType } from '@nestjs/config';
import envConfig from '../config/env.config';

// config type
export type TConfigType = ConfigType<typeof envConfig>;
