import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UploadService } from '../upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shibie',
  templateUrl: './shibie.component.html',
  styleUrls: ['./shibie.component.css']
})
export class ShibieComponent implements OnInit {
  
  addressForm: FormGroup;
  inProgress: boolean = false;

  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder,public http: HttpClient,private datePipe: DatePipe,private uploadservice: UploadService) {
    localStorage.setItem('abc2',"2");
    this.data=this.today;
    // console.log(this.data);
    
    this.data1=this.datePipe.transform(this.today, 'yyyy-MM-dd');
    // console.log(this.data1);

    this.addressForm = this.fb.group({
      id: [null, Validators.required],
      number: [this.data, Validators.required],
      gatherName: ['工程师', Validators.required],
      gatherAddress: ['矿区', Validators.required],
      gatherDate: [this.data1,Validators.required],
      storeAddress: ['储藏室', Validators.required],
      note: ['智能识别', Validators.required],
      rockAttribute:{
        name: null
      },
      imgUrl: [null, Validators.required],
    });
    
    // console.log(this.addressForm.value.采样日期);
  }
  data:any;
  data1:any;

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
  


  tupians=[''];
  list:any=[];
  file: any;
  imgURL:any;
  today: number = Date.now();//获取时间
 
  // {{today | date:'YYYY-MM-dd'}}
  isDisplay(){
    if(this.addressForm.value.number&&this.addressForm.value.gatherName
      &&this.addressForm.value.gatherAddress&&this.addressForm.value.gatherDate
      &&this.addressForm.value.storeAddress&&this.addressForm.value.note){
          return true;
    }else return false;
  }
  today1: number = Date.now();//获取时间
  onSubmit(): void {
    
    this.today1 = Date.now();//获取时间
    // console.log(this.today1);
    this.addressForm.value.id=this.today1;
    //  console.log(this.addressForm.value)
    
    
  
    
       //图片文件重命名
       let names = this.file.name.split(".");
       Object.defineProperty(this.file,'name',{
            writable:true,//设置属性为可写
       });
       this.file.name =this.addressForm.value.id + "." + names[names.length-1];
       // console.log(this.file);
      //  this.addressForm.value.imgUrl="../../assets/yangbenguanli/uploads/webp/" + this.addressForm.value.id + ".webp";
      this.addressForm.value.imgUrl=this.uploadservice.url11 + this.addressForm.value.id + ".webp";
     
     //手动设置请求的类型
     const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
     //存在跨域
     const headers = {
      // 'Authorization': 'Bearer ' +'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvY2tzIiwic3ViIjoxLCJpYXQiOjE2NTE0ODI3MDcsImV4cCI6MTY1MTY1NTUwN30.wjsrqrgJFmJejrwNPs3hbmcuCjAWeL9nDV6dT469QW0'
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }
    const requestOptions = {                                                                                                                                                                             
      headers: new HttpHeaders(headers), 
    };
     const formData: FormData = new FormData();
     formData.append('image', this.file,this.file.name);
     let api2 ='/sample-rock/recognition';
     let url="http://120.24.218.221:8000";
     this.http.post(url+api2,formData,requestOptions).subscribe(response => {
    // console.log(response);
    var xyz=response;
    var myJSON = JSON.stringify(xyz,null,9);
    var myJSON1 = JSON.parse(myJSON);
    // console.log(myJSON1);
    
    switch(myJSON1.message){
      case 0:{this.addressForm.value.rockAttribute.name='粉质粘土';break;}
      case 1:{this.addressForm.value.rockAttribute.name='淤泥质粉质粘土';break;}
      case 2:{this.addressForm.value.rockAttribute.name='粘土';break;}
      case 3:{this.addressForm.value.rockAttribute.name='粘质粉土';break;}
      case 4:{this.addressForm.value.rockAttribute.name='淤泥质粘土';break;}
      case 5:{this.addressForm.value.rockAttribute.name='圆砾（角砾）';break;}
      case 6:{this.addressForm.value.rockAttribute.name='中砂';break;}
      case 7:{this.addressForm.value.rockAttribute.name='有机质土';break;}
      case 8:{this.addressForm.value.rockAttribute.name='泥炭质土A';break;}
      case 9:{this.addressForm.value.rockAttribute.name='泥炭质土B';break;}
      case 10:{this.addressForm.value.rockAttribute.name='砂质粉土';break;}
      case 11:{this.addressForm.value.rockAttribute.name='粉砂';break;}
      case 12:{this.addressForm.value.rockAttribute.name='细砂';break;}
      case 13:{this.addressForm.value.rockAttribute.name='粗砂';break;}
      case 14:{this.addressForm.value.rockAttribute.name='砾砂';break;}
      case 15:{this.addressForm.value.rockAttribute.name='卵石（碎石）';break;}
      case 16:{this.addressForm.value.rockAttribute.name='漂石（块石）';break;}
      default:{
      var message="图片识别失败！";
      this._snackBar.open(message);
      setTimeout(()=>{ 
       this._snackBar.ngOnDestroy();
     },1000); break;}
    }
if(myJSON1.message<17){
// let api ='/sample-rock/upload';
    //  this.uploadservice.posttupian(api,formData);
    
    //  console.log(this.list)
    //  console.log(this.list[0].rockAttribute.name);

     this.list.push(this.addressForm.value);
     var myJSON = JSON.stringify(this.list[0],null,9);
    //  console.log(myJSON);
     let api1 ='/api/rocks';
      
     this.uploadservice.postshuju(api1,myJSON);
}
    
   });
   var message="识别上传中......";
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
  },10000);
    //  let api ='http://[::1]:3000/sample-rock/upload';
    //  this.http.post(api,formData).subscribe(response => {
    //   console.log(response);
    // });

    // let api ='/api/rocks';
    // this.uploadservice.postshuju(api,formData);
    

    // let api ='http://127.0.0.1:3000/dologin';
    // this.uploadservice.postshuju(api,this.list);
  //   this.http.post(api,this.list,httpOptions).subscribe(response => {
  //    console.log(response);
  //  });

  }

  //图片和视频的选择并预览



fileChange(files:any) {
  // console.log(files.files);
//  console.log(files.files.length);

  this.file =null;
  this.file =files.files[0];
  if (files.files.length === 0) {
    return;
  }
  const reader = new FileReader(); 
  if(files.files[0].type=='image/jpeg'){   
    reader.readAsDataURL(files.files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }
}



}
