import { NestFactory } from '@nestjs/core'; //引入NestFactory
import { AppModule } from './app.module'; //引入AppModule
import express, { urlencoded } from 'express'; //解析URL
import compression from 'compression'; //引入html传输的gzip压缩

const jsonServer = require('json-server'); //引入json-server模块
const router = jsonServer.router('db.json'); //创建路由变量
//异步启动函数
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(jsonServer.defaults()); //jsonServer 添加配置（Cors等）
  app.use('/api', router); //添加自定义路由
  app.use(urlencoded({ extended: true })); // 解析 URL 编码的数据
  app.use(compression()); //压缩
  // app.use('/', express.static('client'));
  app.enableCors(); //使用CORS跨域
  await app.listen(8000); //端口8000监听
  console.log(`Application is running on: ${await app.getUrl()}`);
}
//执行bootstrap函数
bootstrap();
