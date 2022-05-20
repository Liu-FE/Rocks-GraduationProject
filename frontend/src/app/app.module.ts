//Angular核心模块
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//根组件
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DengluComponent } from './denglu/denglu.component';
import { ShoujiComponent } from './shouji/shouji.component';
import { ShibieComponent } from './shibie/shibie.component';
import { ZhanshiComponent } from './zhanshi/zhanshi.component';


import { TongjibiaoComponent } from './tongjibiao/tongjibiao.component';
import { ShoujibiaoComponent } from './shoujibiao/shoujibiao.component';


import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';



import { FileUploadModule } from 'ng2-file-upload';


import { DatePipe } from '@angular/common';
//引入服务
import { UploadService } from './upload.service';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [/*配置当前项目运行的的组件*/
    AppComponent, DengluComponent, ShoujiComponent, 
    ShibieComponent, ZhanshiComponent,  
   TongjibiaoComponent, ShoujibiaoComponent, 

    
  ],
  imports: [/*配置当前模块运行依赖的其他模块*/
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FileUploadModule,  //注意引入
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  
  ],
  providers: [DatePipe,MatSnackBar],/*配置项目所需要的服务*/
  bootstrap: [AppComponent]

})
//根模块不需要导出任何东西,因为其它组件不需要导入根模块
export class AppModule { }
