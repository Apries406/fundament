import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局生效，所有模块不用再导入 ConfigModule，可以直接用
      envFilePath: '.env', // 指定 .env 文件的路径，默认就是根目录的 .env，可以省略
      ignoreEnvFile: false, // 是否忽略 .env 文件，生产环境可能用服务器的环境变量，可设为 true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
