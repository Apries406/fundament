import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

/**
 * 定义环境枚举（只能是 development/test/production）
 */
export enum AppEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

/**
 * 配置验证类（对应 .env 里的配置）
 */
export class ConfigSchema {
  // DB_HOST：必须是字符串，不能为空
  @IsString()
  DB_HOST: string;

  // DB_PORT：必须是数字，且在 1-65535 之间
  @IsNumber()
  @Min(1)
  @Max(65535)
  DB_PORT: number;

  // DB_USER：必须是字符串
  @IsString()
  DB_USER: string;

  // DB_PASSWORD：必须是字符串
  @IsString()
  DB_PASSWORD: string;

  // DB_NAME：必须是字符串
  @IsString()
  DB_NAME: string;

  // JWT_SECRET：必须是字符串
  @IsString()
  JWT_SECRET: string;

  // JWT_EXPIRES_IN：可选，默认 24h
  @IsOptional()
  @IsString()
  JWT_EXPIRES_IN = '24h';

  // APP_ENV：必须是 AppEnv 枚举里的值
  @IsEnum(AppEnv)
  APP_ENV: AppEnv;

  // APP_PORT：可选，默认 3000，且在 1-65535 之间
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(65535)
  APP_PORT = 3000;
}
