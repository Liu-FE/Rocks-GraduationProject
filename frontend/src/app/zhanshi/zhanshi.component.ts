import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { UploadService } from '../upload.service';

var videoURL1 ="";
var id1 ="";
var shuliang=0;

@Component({
  selector: 'app-zhanshi',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  // videoURL ="../../assets/yangbenguanli/uploads/raw/car1识别后的视频.mp4"; 
  constructor(private uploadservice: UploadService) { }
  videoURL =this.uploadservice.ur222+videoURL1;

}

@Component({
  selector: 'app-zhanshi',
  templateUrl: './dialog-elements-example-dialog1.html',
})
export class DialogElementsExampleDialog1 {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog1>,private uploadservice: UploadService) { }
  id=id1;
  onNoClick(): void {
    this.dialogRef.close();
  }
 delete(){
     let api2 = this.id;
     let api1 ='/api/rocks/';
     let api =api1+api2;
    //  console.log(api);
     let api4 ='/sample-rock/';
     let api3 =api4+api2;
     this.uploadservice.deletetupian(api3);
     this.uploadservice.deleteshuju(api);
     this.dialogRef.close();
  }
}

@Component({
  selector: 'app-zhanshi',
  templateUrl: './zhanshi.component.html',
  styleUrls: ['./zhanshi.component.css']
})
export class ZhanshiComponent implements OnInit {


  public numid =0;
  list1:any=[];
  list2:any=[];
  constructor(private uploadservice: UploadService,public http: HttpClient,public dialog: MatDialog,public dialog1: MatDialog) { 
    shuliang=0; 
   
  }

  openDialog(abc:any) {
    videoURL1=abc;
    this.dialog.open(DialogElementsExampleDialog);
  }
  openDialog1(abc:any) {
    id1=abc;
    this.dialog1.open(DialogElementsExampleDialog1);
  }

  public flag: boolean = false;

  public shuju: any;
  public number:number=0;

  ngOnInit(): void {
    shuliang=0;
    var api = "http://120.24.218.221:8000/api/rocks";
    // var api = "../../assets/yangbenguanli/db.json";
    // var api = "../../assets/yangbenguanli/uploads/webp/1640839022599.webp";
    this.http.get(api).subscribe(response => {
     
      this.shuju = response;
      // console.log(this.shuju.rocks);//本地
      // console.log(this.shuju[0]);
      // console.log(this.shuju.length-1); 
      this.numid=this.shuju.length-1;
      // console.log(this.numid); 
      for(this.number=0;this.number<this.shuju.length;this.number++){
        
        this.list1[this.numid]=this.shuju[this.number];
        this.list2[this.numid]=this.shuju[this.number]; 
        // console.log(this.list1[this.numid].imgUrl);
        // this.list2[this.numid].imgUrl=this.uploadservice.ur222+this.list1[this.numid].imgUrl; 
        this.numid=this.numid-1; 
      }
        //  var imgs = document.querySelectorAll('img');
        //  this.numid=document.querySelectorAll('img').length;
        //  if(imgs[0].getAttribute('data-src')==null){
        //    for(this.number=0;this.number<this.numid;this.number++){
        //     // console.log(this.number);   
        //      imgs[this.number].setAttribute('data-src',this.uploadservice.ur222+this.list1[this.number].imgUrl);
        //     //  console.log(this.uploadservice.ur222+this.list1[this.number].imgUrl);
        //     //  console.log(imgs[this.number].getAttribute('data-src'));    
        //    } }


      // console.log(this.list1);
      // console.log(this.list1);
      // console.log(this.shuju.rocks[0].rockAttribute);
      // console.log(this.shuju.rocks[0].rockAttribute.name); 
    }); 
    // setTimeout(()=>{
      
    // },2400);


    // setTimeout(()=>{
    //   console.log(0);
     // onload是等所有的资源文件加载完毕以后再绑定事件
    
  // },2400);

  }

  ngAfterContentChecked(){
    const abc2 =localStorage.getItem('abc2');
    if(abc2=="2"){
      // console.log(1);
      localStorage.setItem('abc2',"1");
      setTimeout(()=>{
        window.location.reload();//刷新窗口 
     }); 
    }
    // console.log('hahah');
    if(document.querySelectorAll('img').length>0&&this.list2.length>0){     
      // window.onload = function(){
         // 获取图片列表，即img标签列表
        //  console.log(1);
         var imgs = document.querySelectorAll('img');
         this.numid=document.querySelectorAll('img').length;
         if(imgs[0].getAttribute('data-src')==null){
           for(this.number=0;this.number<this.numid;this.number++){
            // console.log(this.number);   
             imgs[this.number].setAttribute('data-src',this.uploadservice.ur222+this.list1[this.number].imgUrl!);
            //  console.log(this.uploadservice.ur222+this.list1[this.number].imgUrl);
            //  console.log(imgs[this.number].getAttribute('data-src'));    
           } }
         // 获取到浏览器顶部的距离
         function getTop(e:any){
          //  console.log(e.offsetTop);
           return e.offsetTop;
         }
         // 懒加载实现
         function lazyload(imgs:any){
           // 可视区域高度
           var h = window.innerHeight;
           //滚动区域高度
           var s = document.documentElement.scrollTop || document.body.scrollTop;
           var i=shuliang;  
           for(i=shuliang;i<imgs.length;i++){ 
             //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
             if(i==shuliang){
             if ((h+s)>=getTop(imgs[i])) {
               // 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
               (function(i){ 
                //  console.log(i);
                 shuliang=i+1;
                //  console.log(shuliang);
                //  setTimeout(function(){
                   //创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
                   var temp = new Image();
                   temp.src = imgs[i].getAttribute('data-src');//只会请求一次
                   // onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
                   temp.onload = function(){
                     // 获取自定义属性data-src，用真图片替换假图片
                     imgs[i].src = imgs[i].getAttribute('data-src');
                    //  console.log(333);
                   }
                //  },2000)
               })(i)
             }
             }
           }
         } 
     lazyload(imgs);                  
   
         // 滚屏函数
          window.onscroll =function(){  
           lazyload(imgs);
         }
    }
  }


  isDisplay(item:any){
   return item.note == '人工标定'?true:false;
  }

}
