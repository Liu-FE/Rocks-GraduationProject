import { AfterViewInit, Component} from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpClient } from "@angular/common/http";

export interface TongjibiaoItem {
  name: string;
  id: number;
  num1: number;
  num2: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TongjibiaoItem[] = [
  {id: 1, name: '粉质粘土', num1:1000, num2:0,},
  {id: 2, name: '淤泥质粉质粘土', num1:1000, num2:0,},
  {id: 3, name: '粘土', num1:1000, num2:0,},
  {id: 4, name: '粘质粉土', num1:1000, num2:0,},
  {id: 5, name: '淤泥质粘土', num1:1000, num2:0,},
  {id: 6, name: '圆砾（角砾）', num1:1000, num2:0,},
  {id: 7, name: '中砂', num1:1000, num2:0,},
  {id: 8, name: '有机质土', num1:1000, num2:0,},
  {id: 9, name: '泥炭质土A', num1:1000, num2:0,},
  {id: 10, name: '泥炭质土B', num1:1000, num2:0,},
  {id: 11, name: '砂质粉土', num1:1000, num2:0,},
  {id: 12, name: '粉砂', num1:1000, num2:0,},
  {id: 13, name: '细砂', num1:1000, num2:0,},
  {id: 14, name: '粗砂', num1:1000, num2:0,},
  {id: 15, name: '砾砂', num1:1000, num2:0,},
  {id: 16, name: '卵石（碎石）', num1:1000, num2:0,},
  {id: 17, name: '漂石（块石）', num1:1000, num2:0,},
];

@Component({
  selector: 'app-tongjibiao',
  templateUrl: './tongjibiao.component.html',
  styleUrls: ['./tongjibiao.component.css']
})
export class TongjibiaoComponent implements AfterViewInit {
 
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','num1','num2'];
  dataSource = EXAMPLE_DATA;
  constructor(public http:HttpClient) {
    localStorage.setItem('abc2',"2");
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
    
  }
  public length:any;
  public shuju:any;
  public shuju1:any;
  public number:number=0;
  public number1:number=0;
  public number2:number=0;
  public number3:number=0;
  public number4:number=0;
  public number5:number=0;
  public number6:number=0;
  public number7:number=0;
  public number8:number=0;
  public number9:number=0;
  public number10:number=0;
  public number11:number=0;
  public number12:number=0;
  public number13:number=0;
  public number14:number=0;
  public number15:number=0;
  public number16:number=0;
  public number17:number=0; 
  list:any=[
  {
    "name":"期望数量:",
    "type": "line",
    "data": [1000,1000,1000,1000,1000,
      1000,1000,1000,1000,1000,
      1000,1000,1000,1000,1000,
      1000,1000]
  },
  {
    "name":"当前数量:",
    "type": "bar",
    "data": [0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0]
  }
];
  ngOnInit(): void { 
    
      // var api = "../../assets/areaTree.json"; 
    // var api = "../../assets/tongji.json";   
    // var api = "http://a.itying.com/api/productlist";
    // var api = "http://[::1]:8000/api/rocks";
    
    var api = "http://120.24.218.221:8000/api/rocks";
  this.http.get(api).subscribe(response => {
      this.shuju=response;
      this.length=this.shuju.length;
      // console.log(this.shuju.length);
      // console.log(this.shuju);
      for(this.number=0;this.number<this.shuju.length;this.number++){
        // console.log(this.shuju[this.number].rockAttribute.name);
        // console.log(this.number);
        if(this.shuju[this.number].rockAttribute.name=='粉质粘土'){
          this.number1=this.number1+1;
          // console.log(this.number1);
        }else if(this.shuju[this.number].rockAttribute.name=='淤泥质粉质粘土'){
          this.number2=this.number2+1;
        }else if(this.shuju[this.number].rockAttribute.name=='粘土'){
          this.number3=this.number3+1;
        }else if(this.shuju[this.number].rockAttribute.name=='粘质粉土'){
          this.number4=this.number4+1;
        }else if(this.shuju[this.number].rockAttribute.name=='淤泥质粘土'){
          this.number5=this.number5+1;
        }else if(this.shuju[this.number].rockAttribute.name=='圆砾（角砾）'){
          this.number6=this.number6+1;
        }else if(this.shuju[this.number].rockAttribute.name=='中砂'){
          this.number7=this.number7+1;
        }else if(this.shuju[this.number].rockAttribute.name=='有机质土'){
          this.number8=this.number8+1;
        }else if(this.shuju[this.number].rockAttribute.name=='泥炭质土A'){
          this.number9=this.number9+1;
        }else if(this.shuju[this.number].rockAttribute.name=='泥炭质土B'){
          this.number10=this.number10+1;
        }else if(this.shuju[this.number].rockAttribute.name=='砂质粉土'){
          this.number11=this.number11+1;
        }else if(this.shuju[this.number].rockAttribute.name=='粉砂'){
          this.number12=this.number12+1;
        }else if(this.shuju[this.number].rockAttribute.name=='细砂'){
          this.number13=this.number13+1;
        }else if(this.shuju[this.number].rockAttribute.name=='粗砂'){
          this.number14=this.number14+1;
        }else if(this.shuju[this.number].rockAttribute.name=='砾砂'){
          this.number15=this.number15+1;
        }else if(this.shuju[this.number].rockAttribute.name=='卵石（碎石）'){
          this.number16=this.number16+1;
        }else if(this.shuju[this.number].rockAttribute.name=='漂石（块石）'){
          this.number17=this.number17+1;
        }
      }
      this.dataSource[0].num2=this.number1;
      this.dataSource[1].num2=this.number2;
      this.dataSource[2].num2=this.number3;
      this.dataSource[3].num2=this.number4;
      this.dataSource[4].num2=this.number5;
      this.dataSource[5].num2=this.number6;
      this.dataSource[6].num2=this.number7;
      this.dataSource[7].num2=this.number8;
      this.dataSource[8].num2=this.number9;
      this.dataSource[9].num2=this.number10;
      this.dataSource[10].num2=this.number11;
      this.dataSource[11].num2=this.number12;
      this.dataSource[12].num2=this.number13;
      this.dataSource[13].num2=this.number14;
      this.dataSource[14].num2=this.number15;
      this.dataSource[15].num2=this.number16;
      this.dataSource[16].num2=this.number17;

      // console.log(this.dataSource);
      // for(this.number=0;this.number<17;this.number++){
      //   // console.log(this.dataSource[this.number].num2);
      //   // console.log(this.shuju.series[1].data[this.number]); 
      //   // this.number=this.number+1;
      //   this.dataSource[this.number].num2=this.shuju.series[1].data[this.number];
      //   // console.log(this.number); 
      // }
   });

      // var api = "../../assets/tongji.json"; 
      // this.http.get(api).subscribe(response => {
      //   this.shuju1=response;
      // console.log(this.shuju1.series[1].data);
      // console.log(this.shuju1);
      // });
  }
  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',//Tooltip 辅助线
    },
  legend: {},
  xAxis: {
    type: 'category',
    data: ['粉质粘土', '淤泥质粉质粘土', '粘土', '粘质粉土', '淤泥质粘土',
    '圆砾（角砾）', '中砂','有机质土','泥炭质土A','泥炭质土B',
    '砂质粉土','粉砂','细砂','粗砂','砾砂',
    '卵石（碎石）','漂石（块石）',],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      "name":"期望数量:",
      "type": "line",
      "data": [1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000,1000,1000,1000,
        1000,1000]
    },
    {
      "name":"当前数量:",
      "type": "bar",
      "data": [0,0,0,0,0,
        0,0,0,0,0,
        0,0,0,0,0,
        0,0]
    }
  ],
  };

echartsIntance: any;
onChartInit(ec: any) {
  this.echartsIntance = ec;
  this.chartOption.series  = this.list;
  // this.chartOption.series  = this.shuju1.series;//获得数据
  this.echartsIntance.setOption(this.chartOption);//更新图表

};

num:any=1;
change1(){
  this.num=1;     
};
change2(){
  this.num=2;  
  
  var numbers=[this.number1,this.number2,this.number3,this.number4,this.number5,
    this.number6,this.number7,this.number8,this.number9,this.number10,
    this.number11,this.number12,this.number13,this.number14,this.number15,this.number16,this.number17];
  
  // console.log(numbers);
 
  this.list[1].data=numbers; 
  // console.log(this.list[1]);
  // this.shuju1.series[1].data=numbers;
  // console.log(this.shuju1.series);
  // console.log(this.chartOption.series);
  // console.log(this.chartOption.series);
  // this.chartOption.series  = this.shuju1.series;
  // console.log( this.chartOption);

};

}
