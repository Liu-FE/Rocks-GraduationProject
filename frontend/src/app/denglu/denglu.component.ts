import { Component, OnInit } from '@angular/core';
import { Site }    from '../../site';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-denglu',
  templateUrl: './denglu.component.html',
  styleUrls: ['./denglu.component.css'],
  
})
export class DengluComponent implements OnInit {



constructor(private _snackBar: MatSnackBar,public http: HttpClient,private router: Router,private uploadservice: UploadService,private authservice:AuthService ) { 
  localStorage.setItem('abc2',"2");
}
  user = new Site('','',''); //与denglu.component.html动态数据绑定  
  
  // openSnackBar( ) {
  //   var message="登陆成功！";
  //   this._snackBar.open(message);
  // }

  // constructor(){}

  // ngOnInit(): void {}

  // login(){
  //   console.log(this.user.name)
  //   console.log(this.user.pwd)
  // }

  list:any=[{
    username: "",
    password: ""
}];
 
  public jieguo:any;
  login() {
    this.list[0].username=this.user.name;
    this.list[0].password=this.user.pwd; 
    // console.log(this.list[0]);
    // this.list[0].username.push(username);
    // this.list[0].password.push(password);
     
    var myJSON = JSON.stringify(this.list[0],null,9);
    // console.log(myJSON);
    let api ='/sample-rock/auth/login';
    let url="http://120.24.218.221:8000";
    const headers={ 'content-type':'application/json'}
    this.http.post(url+api,myJSON,{'headers':headers}).subscribe(response => {
    //  console.log(response);
     this.jieguo=response;
     var message="登陆成功！";
    this._snackBar.open(message);
    setTimeout(()=>{ 
      this._snackBar.ngOnDestroy();
    },2000);
   });
        if(this.user.name==''){
            var message="请输入用户名！";           
    this._snackBar.open(message);
    setTimeout(()=>{ 
      this._snackBar.ngOnDestroy();
    },2000);
        }else if(this.user.pwd==''){
            var message="请输入密码！";
    this._snackBar.open(message);
    setTimeout(()=>{ 
      this._snackBar.ngOnDestroy();
    },2000);
        }else{
           setTimeout(()=>{
             if(this.jieguo==null){
               var message="登录失败！";
               this._snackBar.open(message);
               setTimeout(()=>{ 
                this._snackBar.ngOnDestroy();
              },2000);
              }
        },5000);
        }
        
       
        // else if(this.user.pwd!=''){
        //     alert("密码错误，登录失败！");
        // }
//   if(this.list[0].username){
//     this.newItemEvent.emit(1);//登录判定的结果传给主界面
// }else {this.newItemEvent.emit(2);}
}

  ngOnInit(): void {   
  }
  
  ngAfterContentChecked(){   
    if(this.jieguo){
      // console.log(this.jieguo.access_token);
      this.authservice.saveUserLoginState(this.jieguo);
      
      setTimeout(()=>{ 
        this.router.navigate(['/tongjibiao']);
      },1000); 
    }
  }
  ngOnDestroy(){
    window.location.reload();//刷新窗口
  }
}
