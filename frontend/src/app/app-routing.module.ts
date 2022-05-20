//配置路由的模块
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DengluComponent } from './denglu/denglu.component';
import { ShoujiComponent } from './shouji/shouji.component';
import { ShibieComponent } from './shibie/shibie.component';
import { ZhanshiComponent } from './zhanshi/zhanshi.component';

import { TongjibiaoComponent } from './tongjibiao/tongjibiao.component';
import { ShoujibiaoComponent } from './shoujibiao/shoujibiao.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [

  {path:'denglu',  component:DengluComponent},
  {path:'edit/:imgUrl/:id/:number/:gatherName/:gatherAddress/:gatherDate/:storeAddress/:videoUrl/:color/:dentisy/:strength/:include/:state/:gloss/:evenness/:name',  component:ShoujiComponent,canActivate:[AuthGuard]},
  {path:'shoujibiao',  component:ShoujibiaoComponent,canActivate:[AuthGuard]},
  {path:'shibie',  component:ShibieComponent,canActivate:[AuthGuard]},
  {path:'zhanshi', component:ZhanshiComponent,canActivate:[AuthGuard]},
  {path:'tongjibiao',  component:TongjibiaoComponent},

  //匹配不到路由的时候加载的组件 或跳转的路由
  {
    path:'**',redirectTo:'tongjibiao'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
