import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; //引入appController
import { AppService } from './app.service'; //引入appService
import { MulterModule } from '@nestjs/platform-express'; //文件上传
import { diskStorage } from 'multer'; //硬盘存储
import { HttpModule } from '@nestjs/axios'; //http
import { AuthModule } from './auth/auth.module'; //引入JWT认证
import { UsersModule } from './users/users.module'; //引入用户模块
import { APP_GUARD } from '@nestjs/core'; //守卫
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'; //JWT守卫
import { ServeStaticModule } from '@nestjs/serve-static'; //静态服务器
import { join } from 'path'; //添加路径
const rawdir = './uploads/raw'; //原始文件目录
@Module({
  imports: [
    //文件上传并保存至/upload/raw
    MulterModule.register({
      storage: diskStorage({
        //保存地址
        destination: function (req, file, cb) {
          cb(null, rawdir);
        },
        filename: function (req, file, cb) {
          //文件重命名
          // const uniqueSuffix = Date.now();
          const filename = `${file.originalname}`;
          cb(null, filename);
        },
      }),
      //文件限制
      limits: {
        fieldSize: 500 * 1024 * 1024,
      },
    }),
    HttpModule,
    AuthModule,
    UsersModule,
    //添加静态文件
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'), //路径
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //守卫
    },
  ],
})
export class AppModule {}
