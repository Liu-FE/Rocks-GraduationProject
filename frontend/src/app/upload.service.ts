import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private _snackBar: MatSnackBar,private router:Router,public http: HttpClient,) { }
  public url11="/sample-rock/";
  public ur222="http://120.24.218.221:8000";
  postshuju(api:any,body:any,){
    let url="http://120.24.218.221:8000";
    const headers={ 'content-type':'application/json'}
    this.http.post(url+api,body,{'headers':headers}).subscribe(response => {
     console.log(response);
     setTimeout(()=>{ 
      var message="上传成功！";
      this._snackBar.open(message);
      },1000);  
    setTimeout(()=>{ 
     this._snackBar.ngOnDestroy();
   },2000);
         localStorage.setItem('abc1',"1");
     setTimeout(()=>{
       window.location.reload();//刷新窗口 
    },2200);   
   });
  } 


   posttupian(api:any,body:any,){
    const headers = {
      // 'Authorization': 'Bearer ' +'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvY2tzIiwic3ViIjoxLCJpYXQiOjE2NTE0ODI3MDcsImV4cCI6MTY1MTY1NTUwN30.wjsrqrgJFmJejrwNPs3hbmcuCjAWeL9nDV6dT469QW0'
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }
    const requestOptions = {                                                                                                                                                                             
      headers: new HttpHeaders(headers), 
    };
    let url="http://120.24.218.221:8000";
    // console.log(requestOptions);
      this.http.post(url+api,body, requestOptions).subscribe(response => {
           console.log(response); 
          
         });
  }
  // posttupian1(api:any,body:any,){
   
  //   let url="http://120.24.218.221:8000";
  //     this.http.post(url+api,body,).subscribe(response => {
  //      console.log(response);  
  //        alert('上传成功！'); 
  //        localStorage.setItem('abc1',"1");  
  //    });
  // }
  patchshuju(api:any,body:any,){
    let url="http://120.24.218.221:8000";
    const headers={ 'content-type':'application/json'}
    this.http.patch(url+api,body,{'headers':headers}).subscribe(response => {
    //  console.log(response);
     setTimeout(()=>{ 
        var message="编辑成功!";
        this._snackBar.open(message);
      },1000); 
     
        setTimeout(()=>{ 
         this._snackBar.ngOnDestroy();
       },2000);
     localStorage.setItem('abc1',"1"); 
     setTimeout(()=>{
      this.router.navigate(['/zhanshi']); 
   },2000); 
   });
  } 
  deleteshuju(api:any){
    let url="http://120.24.218.221:8000";
    this.http.delete(url+api).subscribe(response => {
     console.log(response);
        var message="删除成功!";
        this._snackBar.open(message);
        setTimeout(()=>{ 
         this._snackBar.ngOnDestroy();
       },1000);
     setTimeout(()=>{
      window.location.reload();//刷新窗口 
   },1100);    
   });
  }
  deletetupian(api:any){
    let url="http://120.24.218.221:8000"; 
    const headers = {
        // 'Authorization': 'Bearer ' +'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvY2tzIiwic3ViIjoxLCJpYXQiOjE2NTE0ODI3MDcsImV4cCI6MTY1MTY1NTUwN30.wjsrqrgJFmJejrwNPs3hbmcuCjAWeL9nDV6dT469QW0'
        'Authorization': 'Bearer ' +localStorage.getItem('token')
      }
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headers), 
      };
    this.http.delete(url+api,requestOptions).subscribe(response => {
      console.log(response);      
   });
  }



}
