import { Injectable } from '@nestjs/common';
import imagemin from 'imagemin'; //引入imagemin包
import imageminWebp from 'imagemin-webp'; //引入imagemin-webp包
import fs from 'fs'; //nodejs fs模块( File System文件管理系统)
import FormData from 'form-data'; //nodejs form-data格式
import { HttpService } from '@nestjs/axios'; //引入HttpService
import { Observable } from 'rxjs'; //rxjs Observable => HttpService返回的对象
import { AxiosResponse } from 'axios';
const rawdir = './uploads/raw/'; //定义原始图片路径 todo 配置参数
const webpdir = './uploads/webp/'; //定义webp路径

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {} //依赖注入

  //格式转换
  transWebp = async (filename: string) => {
    //是图片格式进行格式转换
    if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(filename)) {
      //调用image-webp函数进行webp格式转换
      (async () => {
        await imagemin([rawdir + filename], {
          destination: webpdir, //webp目的路径
          plugins: [imageminWebp({ quality: 10 })], //无损编码图像
        });
      })();
    }
  };

  //删除image，video，webp
  deleteFile(req, res) {
    const fileName = req.params.id; //定义文件名
    //删除webp文件
    fs.unlink(webpdir + fileName + '.webp', function (err) {
      //报错信息
      if (err) {
        res.status(500).send({
          message: 'Could not delete the file. ' + err,
        });
      } else {
        //删除原始image & videio
        fs.readdir(rawdir, function (err, files) {
          files.forEach(function (file) {
            if (file.startsWith(fileName)) {
              fs.unlink(rawdir + file, (err) => {
                if (err) {
                  res.status(500).send({
                    message: 'Could not delete the file. ' + err,
                  });
                }
              });
            }
          });
          if (err) {
            res.status(500).send({
              message: 'Unable to scan files!',
            });
          } else {
            res.status(200).send({
              message: 'success!',
            });
          }
        });
      }
    });
  }

  //识别
  recognition(fileName: string, res) {
    const formData = new FormData(); //定义formData
    // console.log(fileName);
    let fileId = new String(fileName);
    fileId = fileId.substring(0, fileName.indexOf('.')); //定义fileId
    // console.log(fileId);
    formData.append(
      'image',
      fs.createReadStream(rawdir + fileName), //磁盘写入，创建一个可读的文件流
    );
    // console.log(fileId);
    this.transWebp(fileName);
    // console.log(fileId);
    this.httpService
      .post<Observable<AxiosResponse<any>>>(
        'http://115.28.155.32:443/v1/object-detection/yolov5s', //url
        formData, //formdata格式文件
        {
          headers: formData.getHeaders(), //配置参数--表头
        },
      ) //订阅server响应
      .subscribe((data: AxiosResponse<any>) => {
        // console.log(data.data[0]); //打印输出智能识别的结果
        //识别成功返回识别的结果-class
        if (data.data[0]) {
          return res.status(200).send({
            message: data.data[0].class,
          });
        } else {
          //识别失败删除下载的图片
          res.send({
            message: '无法识别',
          });
          fs.unlink(webpdir + fileId + '.webp', function (err) {
            //报错信息
            if (err) {
              // res.status(500).send({
              //   message: 'Could not delete the file. ' + err,
              // });
            } else {
              //删除原始image & videio
              fs.readdir(rawdir, function (err, files) {
                files.forEach(function (file) {
                  if (file.startsWith(fileId.toString())) {
                    fs.unlink(rawdir + file, (err) => {
                      if (err) {
                        // res.status(500).send({
                        //   message: 'Could not delete the file. ' + err,
                        // });
                      }
                    });
                  }
                });
                if (err) {
                  // res.status(500).send({
                  //   message: 'Unable to scan files!',
                  // });
                } else {
                  // res.status(200).send({
                  //   message: 'success!',
                  // });
                }
              });
            }
          });
        }
      });
  }

  //获取图片和视频
  downloadFile(filename, res) {
    const fileName = filename.id; //定义文件名
    //webp结尾下载webp文件
    if (fileName.endsWith('webp')) {
      res.download(webpdir + fileName, fileName);
    } //否则下载原始文件
    else {
      res.download(rawdir + fileName, fileName);
    }
  }
}
