import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileRenderService {  
  constructor() {}
  getBase64(value:any):Promise<any> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(value);
    })
  }
}