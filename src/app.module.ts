import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';

/* import { ConfigModule } from '@nestjs/config';
import { jsonConfigLoader } from 'config/json-config.loader'; */
/* import path from 'node:path';
import { plainToClass } from 'class-transformer';
import { ConfigSchema } from 'config/config.schema';
import { validate } from 'class-validator'; */

@Module({
  imports: [
    // 全局配置 TypeORM 链接
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型： mysql
      connectorPackage: 'mysql2',
      host: 'localhost', // 数据库地址
      port: 13306, // 数据库端口
      username: 'root', // 数据库用户名
      password: 'Cxhzs067311.', // 数据库密码
      database: 'fundament', // 数据库名
      entities: [User], // 实体，用来创建对应的数据库表
      synchronize: true, // 自动同步实体类到数据库，生产环境建议设为 false
      logging: true, // 开启日志，打印 SQL 语句
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/**
 *    ConfigModule.forRoot({
      isGlobal: true, // 全局生效，所有模块不用再导入 ConfigModule，可以直接用
      // 用自定义加载器，可以传多个，最终配置合并
      load: [jsonConfigLoader],
      // 也可以用 .env 文件，不过它会覆盖 JSON 里的配置，也就是这里的优先级更高
      envFilePath: '.env',
      /*       envFilePath: path.resolve(
        process.cwd(),
        `config/.env.${process.env.NODE_ENV || 'development'}`,
      ), */
// 启用配置验证
/*       validate: (config) => {
        // 1. 把配置对象转成 ConfigSchema 的实例
        const validatedConfig = plainToClass(ConfigSchema, config);
        // 2. 验证配置是否符合 ConfigSchema 的规则
        return validate(validatedConfig);
      },
      // 验证失败抛出详细错误
      validationOptions: {
        stopAtFirstError: false, // 是否遇到第一个错误就停止，默认为true。 false 会显示所有错误
      }, 
      ignoreEnvFile: false, // 是否忽略 .env 文件，生产环境可能用服务器的环境变量，可设为 true
    })
 */
