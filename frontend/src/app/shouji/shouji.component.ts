import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../upload.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shouji',
  templateUrl: './shouji.component.html',
  styleUrls: ['./shouji.component.css']
})
export class ShoujiComponent implements OnInit {

  public data: any;
  addressForm: FormGroup;
  addressForm1: FormGroup;
  inProgress: boolean = false;
  isLinear = true;
  public imgUrl1: any;
    

  constructor(private _snackBar: MatSnackBar,private router:Router,private fb: FormBuilder,public http: HttpClient,public route: ActivatedRoute,private uploadservice: UploadService) { 
    localStorage.setItem('abc2',"2");
    this.route.params.subscribe((res)=>{
      // console.log(res);
      this.data=res;
      // console.log(this.data);
      this.imgUrl1=this.uploadservice.ur222+this.data.imgUrl;
      // console.log(this.imgUrl1);
    });
    
   
    this.addressForm = this.fb.group({
      number: [this.data.number, Validators.required],
      gatherName: [this.data.gatherName, Validators.required],
      gatherAddress: [this.data.gatherAddress, Validators.required],
      gatherDate: [this.data.gatherDate,Validators.required],
      storeAddress: [this.data.storeAddress, Validators.required],
      note: ['人工标定', Validators.required],
      color: [this.data.color, Validators.required],
      dentisy: [this.data.dentisy, Validators.required],
      strength: [this.data.strength, Validators.required],
      include: [this.data.include, Validators.required],
      state: [this.data.state, Validators.required],
      gloss: [this.data.gloss, Validators.required],
      evenness: [this.data.evenness, Validators.required],
      name: [this.data.name, Validators.required],
      id: [this.data.id, Validators.required],
      imgUrl: [this.data.imgUrl, Validators.required],
      videoUrl: [this.data.videoUrl, Validators.required],
    });
    this.addressForm1 = this.fb.group({});
    
  }
  

  ngOnInit(): void {
   
  }

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
  
  onSubmit(): void {
    
   
    //  console.log(this.addressForm.value)
     this.list.push(this.addressForm1.value);
    //  console.log(this.list[0]);
     //手动设置请求的类型
    //  const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
     //存在跨域
    //  const formData: FormData = new FormData();
    //  formData.append('file', this.file1);
    //  formData.append('file', this.file);
    //  formData.append('form', this.list[0]);
    //  console.log(this.list[0]);
     var myJSON = JSON.stringify(this.list[0],null,9);
    //  console.log(myJSON);
     let api2 = this.data.id;
     let api1 ='/api/rocks/';
     let api =api1+api2;
    //  console.log(api);
     this.uploadservice.patchshuju(api,myJSON);
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
     
    //  let api ='http://[::1]:3000/sample-rock/upload';
    //  this.http.post(api,formData).subscribe(response => {
    //   console.log(response);
    // });

    // let api ='/api/rocks';
    // this.uploadservice.postshuju(api,formData);

    // this.http.patch
    // this.http.delete

  //   this.http.post(api,this.list,httpOptions).subscribe(response => {
  //    console.log(response);
  //  });
  }

//步进器
  public number:any=0;
panelOpenState = false;
isDisplay(){
  if(this.addressForm.value.number&&this.addressForm.value.gatherName
    &&this.addressForm.value.gatherAddress&&this.addressForm.value.gatherDate
    &&this.addressForm.value.storeAddress&&this.addressForm.value.note){
        return true;
  }else return false;
}
ngAfterContentChecked(){
  this.addressForm1= this.fb.group({
    id: [this.addressForm.value.id, Validators.required],
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
    imgUrl: [this.addressForm.value.imgUrl, Validators.required],
    videoUrl: [this.addressForm.value.videoUrl, Validators.required],
  });
  // console.log(this.addressForm1.value);
  
// if(this.addressForm.value.color&&this.number==0){
//     // console.log(this.addressForm.value.颜色);
//   this.number=1;
//     // console.log(this.number);
// }
// if(this.addressForm.value.dentisy&&this.number==1){
//   this.number=2;
// }
// if(this.addressForm.value.strength&&this.number==2){
//   this.number=3;
// }
// if(this.addressForm.value.include&&this.number==3){
//   this.number=4;
// }
// if(this.addressForm.value.state&&this.number==4){
//   this.number=5;
// }
// if(this.addressForm.value.gloss&&this.number==5){
//   this.number=6;
// }
// if(this.addressForm.value.evenness&&this.number==6){
//   this.number=7;
// }
// if(this.addressForm.value.name&&this.number==7){
//   // console.log(this.addressForm.value.定名);
//   this.panelOpenState = false;
// }
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
