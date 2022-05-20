import { Component } from '@angular/core';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-root',//selector: 'app-root'
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'yan-tu';
  constructor(public authservice:AuthService){
      }
   token =localStorage.getItem('token');
   
  //  window.location.reload();//刷新窗口
  
  // ngAfterContentChecked(){   
    
  // }

  // ngOnDestroy(){
  //   this.authservice.logout();
  //   window.location.reload();//刷新窗口
  // }

}
