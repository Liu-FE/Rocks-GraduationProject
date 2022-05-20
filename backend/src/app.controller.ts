import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  Res,
  Request,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service'; //引入AppService
import { FileFieldsInterceptor } from '@nestjs/platform-express'; //引入文件拦截器
import { AuthService } from './auth/auth.service'; //引入认证服务
import { LocalAuthGuard } from './auth/guards/local-auth.guard'; //引入认证守卫
import { Public } from './auth/public.decorator'; //引入设置
//控制器'sample-rock'
@Controller('sample-rock')
export class AppController {
  constructor(
    private readonly appService: AppService, //依赖注入AppService
    private readonly authService: AuthService, //依赖注入AuthService
  ) {}

  //身份认证
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login') //POST路由'auth/login'
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //上传文件
  @Post('upload') //POST路由'upload'
  //使用拦截器装饰器
  @UseInterceptors(
    //文件拦截器
    FileFieldsInterceptor([
      //多文件根据key键上传
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  //上传文件
  uploadFile(
    @UploadedFiles() //路由处理程序参数修饰符。提取文件对象，并用文件的值填充装饰参数。与基于Express的应用程序的multer中间件结合使用。
    files: {
      image: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    //如果接收到封面图片就进行格式转换--todo 需要改进文件格式判断
    // file.image数组转换为对象
    const fileName = files.image[0].originalname;
    console.log(fileName); //控制台打印文件原始名
    return this.appService.transWebp(fileName); //调用transWebp函数进行webp格式转换
  }

  //删除文件
  @Delete(':id') //删除路由':id'
  deleteFile(@Req() req, @Res() res) {
    //console.log(req.params.id);
    return this.appService.deleteFile(req, res);
  }

  //智能识别
  @Post('recognition') //POST路由'recognition'
  @UseInterceptors(
    //文件拦截器
    FileFieldsInterceptor([
      //多文件根据key键上传
      { name: 'image', maxCount: 1 },
    ]),
  )
  //开始识别
  recognition(
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
    },
    @Res() res,
  ) {
    const fileName = files.image[0].originalname;
    return this.appService.recognition(fileName, res);
  }

  //获取文件
  @Get(':id')
  @Public()
  downloadFile(@Param() filename, @Res() res) {
    return this.appService.downloadFile(filename, res);
  }
}
