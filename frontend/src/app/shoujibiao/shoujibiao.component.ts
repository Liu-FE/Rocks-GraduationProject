import { Component} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { UploadService } from '../upload.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shoujibiao',
  templateUrl: './shoujibiao.component.html',
  styleUrls: ['./shoujibiao.component.css']
})
export class ShoujibiaoComponent {
  
  
  addressForm: FormGroup;
  addressForm1: FormGroup;
  isLinear = true;
  today1: number = Date.now();//获取时间
  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder,public http: HttpClient,private uploadservice: UploadService,private datePipe: DatePipe,) {
    localStorage.setItem('abc2',"2");
    this.data=this.today;
    // console.log(this.data);
    
    this.data1=this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.addressForm = this.fb.group({
      number: [this.data, Validators.required],
      gatherName: ['工程师', Validators.required],
      gatherAddress: ['矿区', Validators.required],
      gatherDate: [this.data1,Validators.required],
      storeAddress: ['储藏室', Validators.required],
      note: ['人工标定', Validators.required],
  
      color: [null, Validators.required],
      dentisy: [null, Validators.required],
      strength: [null, Validators.required],
      include: [null, Validators.required],
      state: [null, Validators.required],
      gloss: [null, Validators.required],
      evenness: [null, Validators.required],
      name: [null, Validators.required],
      
      id: [null, Validators.required],
      // 图片: [null, Validators.required],
    });
    // console.log(this.addressForm.value.color);
    // console.log(this.addressForm.value.颜色);
    // console.log(this.addressForm.controls['颜色']);
    this.addressForm1 = this.fb.group({});
    
  }
  data:any;
  data1:any;

  colours = [
    {name: '灰色'},
    {name: '灰黄色'},
    {name: '黄色'},
    {name: '灰褐色'},
    {name: '灰绿色'},
    {name: '蓝灰色'},
    {name: '灰白色'},
    {name: '紫红色'},
    {name: '红色'},
    {name: '杂黄色'},
    {name: '褐黄色'},
    {name: '黄绿色'},
    {name: '黑色'},
  ];

  compactnesss = [
    {name: '密实'},
    {name: '中密'},
    {name: '稍密'},
    {name: '松散'},
  ];

  strengths = [
    {name: '好'},
    {name: '较好'},
    {name: '差'},
  ];

  inclusions = [
    {name: '粉土'},
    {name: '粉质粘土'},
    {name: '砂'},
    {name: '砾'},
    {name: '铁锰质'},
    {name: '有机质'},
    {name: '贝壳'},
    {name: '互层粉土'},
    {name: '互层粉质粘土'},
    {name: '结核'},
  ];

  states = [
    {name: '硬塑'},
    {name: '可塑'},
    {name: '软塑'},
    {name: '流塑'},
    {name: '硬塑~可塑'},
    {name: '可塑~软塑'},
    {name: '软塑~流塑'},
  ];

  glossinesss = [
    {name: '粗糙'},
    {name: '光滑'},
    {name: '油脂光泽'},
    {name: '鳞片状构造'},
  ];

  uniformitys = [
    {name: '均匀'},
    {name: '较均匀'},
    {name: '不均匀'},
  ];

  names = [
    { name: '粉质粘土'},
    { name: '淤泥质粉质粘土'},
    { name: '粘土'},
    { name: '粘质粉土'},
    { name: '淤泥质粘土'},
    { name: '圆砾（角砾）'},
    { name: '中砂'},
    { name: '有机质土'},
    { name: '泥炭质土A'},
    { name: '泥炭质土B'},
    { name: '砂质粉土'},
    { name: '粉砂'},
    { name: '细砂'},
    { name: '粗砂'},
    { name: '砾砂'},
    { name: '卵石（碎石）'},
    { name: '漂石（块石）'},
  ];
  tupians=[''];

  list:any=[];
  list1:any=[];


  

  file: any;
  file1: any;
  onSubmit(): void {
    // alert('Thanks!');
    this.today1 = Date.now();//获取时间
    // console.log(this.today1);
    this.addressForm1.value.id=this.today1;
    

      //图片文件重命名
    let names = this.file.name.split(".");
    Object.defineProperty(this.file,'name',{
         writable:true,//设置属性为可写
    });
    this.file.name =this.addressForm1.value.id + "." + names[names.length-1];
    // console.log(this.file);
    // this.addressForm1.value.imgUrl="../../assets/yangbenguanli/uploads/webp/" + this.addressForm1.value.id + ".webp";
    this.addressForm1.value.imgUrl=this.uploadservice.url11 + this.addressForm1.value.id + ".webp";
    //视频文件重命名
    let names1 = this.file1.name.split(".");
    Object.defineProperty(this.file1,'name',{
         writable:true,//设置属性为可写
    });
    this.file1.name =this.addressForm1.value.id + "." + names1[names1.length-1];
    // console.log(this.file1);
    // this.addressForm1.value.videoUrl="../../assets/yangbenguanli/uploads/raw/" + this.file1.name;
    this.addressForm1.value.videoUrl=this.uploadservice.url11  + this.file1.name;
    //  console.log(this.addressForm.value)
    // this.list.push(this.today1);
    //  this.list.push(this.addressForm.value);
    //  console.log(this.list[0]);
     //手动设置请求的类型
     const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
     
   //存在跨域
   const token = localStorage.getItem('token');
   const headers={'Authorization': localStorage.getItem('token')}
     const formData: FormData = new FormData();
     
     formData.append('image', this.file,this.file.name);
     formData.append('video', this.file1,this.file1.name);//后端的key是'video'，
    //  console.log(formData);
     let api ='/sample-rock/upload';
     
    this.uploadservice.posttupian(api,formData);

    this.list1.push(this.addressForm1.value);
    var myJSON = JSON.stringify(this.list1[0],null,9);
    let api1 ='/api/rocks';
    this.uploadservice.postshuju(api1,myJSON);
               var message="上传中......";
               this._snackBar.open(message);
               setTimeout(()=>{ 
                this._snackBar.ngOnDestroy();
              },1000);
     localStorage.setItem('abc1',"2");   
     setTimeout(()=>{
      const abc1 =localStorage.getItem('abc1');
      if(abc1!="1")
      {
        var message="上传失败！";
        this._snackBar.open(message);
        setTimeout(()=>{ 
         this._snackBar.ngOnDestroy();
       },2000);
        localStorage.setItem('abc1',"2"); 
      } 
    },5000);
    
    // let ccc =localStorage.getItem('ccc');
    // console.log(bbb);
    // console.log(ccc);
     //  window.location.reload();//刷新窗口 
     
// this.uploadservice.postshuju(api1,myJSON);
    //  formData.append('form',this.list[0]);
    // console.log(this.list[0]);
    // var obj = { "name":"runoob", "alexa":10000, "site":"inter"};

    // var myJSON = JSON.stringify(this.list[0],null,9);
    // console.log(myJSON);

    // console.log(this.addressForm1.value);
    
    //  console.log(this.list1[0]);
    
    // console.log(myJSON);
   
    // var myJSON1 = JSON.parse(myJSON);
    // console.log(myJSON1);

  
    //  let api ='http://127.0.0.1:3000/dologin';
    //  this.http.post(api,myJSON).subscribe(response => {
    //   console.log(response);
    // });

    // let api ='http://[::1]:8000/sample-rock/upload';
    //  this.http.post(api,formData).subscribe(response => {
    //   console.log(response);
    // });

    // console.log(this.list[0]);
    // formData.append('form',this.list[0]);
    // let api ='/api/rocks';
    // this.uploadservice.postshuju(api,myJSON);

   //   this.http.post(api,this.list,httpOptions).subscribe(response => {
   //    console.log(response);
   //  });

}
  
  //图片和视频的选择并预览
imgURL:any;
videoURL:any;
date1:any;
date2:any;
date3:any;

today: number = Date.now();//获取时间


fileChange(files:any) {
  // console.log(files.files);
//  console.log(files.files.length);

  this.file =null;
  this.file =files.files[0];
  
  if (files.files.length === 0) {
    return;
  }
  const reader = new FileReader();
  //图片显示
  if(files.files[0].type=='image/jpeg'){ 
  
   
    reader.readAsDataURL(files.files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }
}

fileChange1(files:any) {
  // console.log(files.files);
//  console.log(files.files.length);

  this.file1 =files.files[0];
  // if (files.files.length === 0) {
  //   return;
  // }
  const reader1 = new FileReader();
  
  if(files.files[0].type=='video/mp4'){
    var message="视频上传成功！";
    this._snackBar.open(message);
    setTimeout(()=>{ 
     this._snackBar.ngOnDestroy();
   },2000);
    reader1.readAsDataURL(files.files[0]);
    reader1.onload = () => {
      this.videoURL = reader1.result;
    };
    }

}


//把图片换成base6格式
 
//  public value:any=[];


// setImgSrc(value:string) {
//   this.value = value;
//   // console.log( this.value);
//   this.tupians.push(this.value);
//   console.log(this.tupians);
// }
 ngOnInit() {
    // this.addressForm.value.采样日期='2022-04-14';
    // console.log(this.addressForm.value.采样日期);     
    // console.log(this.addressForm.value.样本编号);
    // console.log(1);  
    // console.log(this.addressForm.value);    
    // console.log(2);  
    // this.addressForm.value.采样日期='2022-04-14';
    // console.log(this.addressForm.value.采样日期);
    // console.log(3);  
    // console.log(this.addressForm.value); 
    // console.log(4);  
} 

//步进器
public number:any=0;
panelOpenState = false;
isDisplay(){
    if(this.addressForm.value.name&&this.addressForm.value.number&&this.addressForm.value.gatherName
      &&this.addressForm.value.gatherAddress&&this.addressForm.value.gatherDate
      &&this.addressForm.value.storeAddress&&this.addressForm.value.note&&this.file1){
          return true;
    }else return false;
  }
ngAfterContentChecked(){
  this.addressForm1= this.fb.group({
  id: [null, Validators.required],
  number: [this.addressForm.value.number, Validators.required],
  gatherName: [this.addressForm.value.gatherName, Validators.required],
  gatherAddress: [this.addressForm.value.gatherAddress, Validators.required],
  gatherDate: [this.addressForm.value.gatherDate,Validators.required],
  storeAddress: [this.addressForm.value.storeAddress, Validators.required],
  
  rockAttribute:{
    name: this.addressForm.value.name,
    color: this.addressForm.value.color,
    dentisy: this.addressForm.value.dentisy,
    strength: this.addressForm.value.strength,
    include: this.addressForm.value.include,
    state: this.addressForm.value.state,
    gloss: this.addressForm.value.gloss,
    evenness: this.addressForm.value.evenness,
  },
  note: [this.addressForm.value.note, Validators.required],
  imgUrl: [null, Validators.required],
  videoUrl: [null, Validators.required],
});
if(this.addressForm.value.color&&this.number==0){
    // console.log(this.addressForm.value.颜色);
  this.number=1;
    // console.log(this.number);
}
if(this.addressForm.value.dentisy&&this.number==1){
  this.number=2;
}
if(this.addressForm.value.strength&&this.number==2){
  this.number=3;
}
if(this.addressForm.value.include&&this.number==3){
  this.number=4;
}
if(this.addressForm.value.state&&this.number==4){
  this.number=5;
}
if(this.addressForm.value.gloss&&this.number==5){
  this.number=6;
}
if(this.addressForm.value.evenness&&this.number==6){
  this.number=7;
}
if(this.addressForm.value.name&&this.number==7){
  // console.log(this.addressForm.value.定名);
  this.panelOpenState = false;
}
}

mingming(){
  if(this.addressForm.value.name&&this.number==7){
     return false;
  }else {
    return true;
  }
}
mingming1(){
  if(this.addressForm.value.name&&this.number==7){
     return true;
  }else {
    return false;
  }
}



}
