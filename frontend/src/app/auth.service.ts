
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isLogin = false;
//   // username = '';
  // redirectUrl = '/index';
  constructor(private _snackBar: MatSnackBar,private router:Router,) { 
    this.updateUserLoginState();
  }
 saveUserLoginState(userInfo:any):void {
   if(userInfo.access_token){
    // console.log(userInfo.access_token);
    //  this.isLogin = true;
     localStorage.setItem('token',userInfo.access_token);
     
    //  console.log(localStorage);
    //  const token =localStorage.getItem('token');
    //  console.log(token);
   }
 }
 updateUserLoginState():void{
   const token =localStorage.getItem('token');
  //  if(token){
  //   this.isLogin = true;
  //  } else {
  //   this.isLogin = false;
  //  }
 }
 logout():void{
   localStorage.clear();
   this.updateUserLoginState();
   var message="成功退出！";
   this._snackBar.open(message);  
   setTimeout(()=>{ 
     this._snackBar.ngOnDestroy();
     window.location.reload(); 
   },1000);
 }

}
