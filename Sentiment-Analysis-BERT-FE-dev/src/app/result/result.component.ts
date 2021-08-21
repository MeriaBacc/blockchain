import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/project.service';
import { Post } from '../Models/post.model';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as d3 from 'd3';
import { Word } from 'd3-cloud';
import { TwoWordCompModalComponent } from '../modals/two-word-comp-modal/two-word-comp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  math = Math;
  stars: number[] = [1, 2, 3, 4, 5];
  panelOpen1: boolean = false;
  panelOpen2: boolean = false;
  panelOpen3: boolean = false;
  panelOpen4: boolean = false;
  fullpage :string =''
  ss: boolean = false;
  id: any;
  results: Post[] = [];
  chartList: any[] = [];
  globalchartoption: any = this.generateChart([]);
  filtredCmntsByPost : any = [];
  spinner: boolean = true;
  spinner1: boolean = true;
  spinner2: boolean = true;
  firstword: FormGroup;
  secondeword: FormGroup;
  firstControl = new FormControl();
  secondeControl = new FormControl();
  searesult1: any[] = [];
  searesult2: any[] = [];
  chartListSerach1: any[] = [];
  chartListSerach2: any[] = [];
  globalchartSerach1: any = this.generateChart([]);
  globalchartSerach2: any = this.generateChart([]);
  search1clicked: boolean = false;
  search2clicked: boolean = false;
  starsSearch1: any[] = []; 
  starsSearch2: any[] = [];
  sum1 : number = 0
  sum2 : number = 0 
  resultsApi : Post[] = [];
  x : number = 0
  y : number = 0
  second(){
    this.ss = !this.ss
    console.log(this.ss)
  }

  constructor(private proSer: ProjectService, private route: ActivatedRoute,public dialog: MatDialog,fb: FormBuilder) {
    this.firstword = fb.group({
      first : this.firstControl
    })
    this.secondeword = fb.group({
      second : this.secondeControl
    })
   }
   searchFirst(value :string){
     this.search1clicked = true
     this.searesult1 = [];
    //console.log(value)
    this.results.forEach((elem :any) =>{
      if (elem.content != undefined){
      if(elem.content.includes(value)){
        elem["type"] = "Post";
        this.searesult1.push(elem)
      }
      var res = elem.comments.filter((c:any) => c['cmnt'].includes(value))
      res.forEach((r:any) =>{
        r["type"] = "Comment";
        this.searesult1.push(r)
        //console.log(r)
      } )
    }
    })
    //console.log(this.searesult1)
  //   for(var i = 1; i <= this.results.length; i++){
  //     if (this.results[i] != undefined){
  //       var comm = this.results[i].comments
  //       console.log(comm)
  //       if(this.results[i].content.includes(value) || this.results[i].comments.filter(c => c['cmnt'].includes(value))){
  //         console.log(this.results[i].comments.filter(c => c['cmnt'].includes(value)))
  //         console.log(this.results[i])
  //         this.searesult1.push(this.results[i])
  //         console.log(this.searesult1)
  //       }
  //     }
  //  }
  var reserchstars1 = this.getStarsCount(this.searesult1)
  console.log(reserchstars1)
  this.sum1 = 0 
  reserchstars1.forEach((r:number)=>{
    this.sum1 += r
  })
  console.log(this.sum1)
   this.chartListSerach1.push(this.generateChart(this.searesult1));
   this.GolobalChartsOnSearch1()
  }

  searchSeconde(value :string){
    this.search2clicked = true
    this.searesult2 = [];
    this.results.forEach((elem :any) =>{
      if (elem.content != undefined){
      if(elem.content.includes(value)){
        elem["type"] = "Post";
        this.searesult2.push(elem)
      }
      var res = elem.comments.filter((c:any) => c['cmnt'].includes(value))
      res.forEach((r:any) =>{
        r["type"] = "Comment";
        this.searesult2.push(r)
        //console.log(r)
      } )
    }
    })
  //   console.log(value)
  //   for(var i = 1; i <= this.results.length; i++){
  //     if (this.results[i] != undefined){
  //       var comm = this.results[i].comments
  //       if(this.results[i].content.includes(value) || this.results[i].comments.filter(c => c["cmnt"].includes(value))){
  //         this.searesult2.push(this.results[i])
  //         console.log(this.searesult2)
  //       }
  //        this.commentsSearch2 = this.results[i].comments.filter(c => c["cmnt"].includes(value))
  //      }
  //  }
  var reserchstars2 = this.getStarsCount(this.searesult2)
  console.log(reserchstars2)
  this.sum2 = 0 
  reserchstars2.forEach((r:number)=>{
    this.sum2 += r
  })
  console.log(this.sum2)
   this.chartListSerach2.push(this.generateChart(this.searesult2));
   this.GolobalChartsOnSearch2()
   this.calculatefirstpercentage()
   this.calculatesecondepercentage()
  }

  pieChartPlugins: any[] = [pluginDataLabels];

  togglePanel1() {
    this.panelOpen1 = !this.panelOpen1
  }
  togglePanel2() {
    this.panelOpen2 = !this.panelOpen2
  }
  togglePanel3() {
    this.panelOpen3 = !this.panelOpen3
  }
  togglePanel4() {
    this.panelOpen4 = !this.panelOpen4
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proSer.getResult(this.id).subscribe(
      reslt => {
        reslt.forEach((res: { _id: string;source:string; content: string; class: { label: string; score: string; }; sentiment: { label: string; score: string; }; comments: Object[]; }) => {
            var post = new Post();
            post.id = res._id;
            post.content = res.content;
            post.class = res.class;
            post.sentiment = res.sentiment;
            post.comments = res.comments;
            post.source = res.source
            this.generateCharts(post.comments);
          if(res.source == "file"){  
            this.results.push(post);
            console.log(res)
          }else if( res.source == "Amazon" || res.source == "facebook" || res.source == "twitter" || res.source == "Linkedin"){
            this.resultsApi.push(post);
            console.log(res)
          }

        });
        this.data_for_word_cloud = this.getWordCloudData(([] as any[]).concat(...[...this.results.map(itm => itm.comments)]));
        console.log(this.data_for_word_cloud);
        
      }, _err => {

      }, () => this.genraloption()
    );


  }

  onWorkClick(e: any) {

  }

  data_for_word_cloud: any[] = [];
  data_for_filterd_comments: any[] = [];
  
  GolobalChartsOnSearch1(){
    this.globalchartSerach1 = this.generateChart(this.searesult1);
  }
  GolobalChartsOnSearch2(){
    this.globalchartSerach2 = this.generateChart(this.searesult2);
  }


  genraloption(): void {
    this.spinner = false;
    var arr = ([] as any[]).concat(...[...this.results.map(itm => itm.comments)]);

    this.globalchartoption = this.generateChart(arr);

    this.spinner1 = false;
    this.spinner2 = false;


  }
  filterd_comments(star: Array<string>) {
    return ([] as any[]).concat(...[...this.results.map(itm => itm.comments)])
      .filter((cmnt) => star.indexOf((cmnt.sentiment.label as string)) > -1 );
  }
  chartClicked(e: any) {
    console.log(e.active[0]._index);
    var labels = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
    this.data_for_filterd_comments = this.filterd_comments([labels[e.active[0]._index]])
    let element: HTMLElement = document.getElementById('filtredComments') as HTMLElement;
    element.click();
  }
  generateCharts(arr: Array<any>) {
    this.chartList.push(this.generateChart(arr));

  }

  data_for_word_cloud_by_post: any[] = [];



  filters :Array<string> = [];

  chartInsidePostClicked(e:any,id:string){
    console.log(id);
    var labels = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
    if (this.filters.indexOf(labels[e.active[0]._index]) == -1)  {

    this.filters.push(labels[e.active[0]._index]);
    this.actuComntsArr (id);
    }
  }

  removefiltr(fltr :string ,id:string){
    this.filters.splice(this.filters.indexOf(fltr),1);
    this.actuComntsArr (id);
  }

  see_more_clicked(id: string) {
    this.actuComntsArr (id);
    //this.data_for_word_cloud_by_post = this.getWordCloudData(this.results[Number.parseInt(id)].comments)
  }
  actuComntsArr (id:string){
    this.filtredCmntsByPost = this.results[Number.parseInt(id)].comments
    .filter((cmnt) => this.filters.indexOf((cmnt.sentiment.label as string)) > -1 || this.filters.length == 0);
    //this.data_for_word_cloud_by_post = this.getWordCloudData(this.filtredCmntsByPost);
  }

  scroll_to(post_id: number) {
    this.panelOpen4 = true
    let model: HTMLElement = document.getElementById("modelclose") as HTMLElement;
    model.click();
    let element: HTMLElement = document.getElementById("post_" + post_id) as HTMLElement;
    element.classList.add("animate");
    setTimeout(function () {
      element.classList.remove("animate");
    }, 3000);
    if (post_id != 0) {
      post_id -= 1;
    }
    let prev_element: HTMLElement = document.getElementById("post_" + post_id) as HTMLElement;

    prev_element.scrollIntoView({
      inline: 'start'
    });
  }
  generateChart(arr: Array<any>) {
    var chr = {
      "sentiment": {
        chartType: 'pie',
        chartDatasets: [
          {
            data: this.getStarsCount(arr)
            , label: 'Sentiment Analyse'
          }
        ],
        chartLabels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        chartColors: [
          {
            backgroundColor: [
              'rgba(255,0,0, 0.4)',
              'rgba(193, 62, 0, 0.4)',
              'rgba(255, 255, 0, 0.4)',
              'rgba(62, 193, 0, 0.4)',
              'rgba(0, 255, 0, 0.4)'
            ]
          }
        ],
        chartOptions: {
          layout: {
            padding: 0
          },
          responsive: true,

          legend: {
            position: 'left',
            align: "start",
            labels: {

              fontSize: 13,
              usePointStyle: true

            }
          },
          plugins: {
            datalabels: {
              formatter: (_value: any, ctx: any) => {
                if (_value != 0) {
                  var total = ctx.chart.data.datasets[0].data.reduce((sum: any, itm: any) => sum + itm, 0)
                  return Math.round(_value * 100 / total * 10) / 10 + " %"; /* Math.round(_value * 100 / total * 10) / 10 + " %" */
                }
                return "";
              },
              font: {

              }
            }
          }
        }
      },
      "class": {
        chartType: 'horizontalBar',
        chartDatasets: [
          {
            data: this.getClassCount(arr)
            ,
            label: 'Classification '
          }
        ],
        chartLabels: this.getuniqueValues(arr)
        
        ,
        chartColors: [
          {
            backgroundColor: ['rgb(33,240,182)', 'rgb(205,217,184)', 'rgb(188,227,51)', 'rgb(241,212,56)', 'rgb(250,175,227)', 'rgb(108,240,77)', 'rgb(252,183,144)', 'rgb(75,214,253)', 'rgb(175,198,254)']
          }
        ],
        chartOptions: {
          responsive: true,
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          plugins: {
            datalabels: {
              formatter: (_value: any, ctx: any) => {
                if (_value != 0) {
                  var total = ctx.chart.data.datasets[0].data.reduce((sum: any, itm: any) => sum + itm, 0)
                  return Math.round(_value * 100 / total * 10) / 10 + " %";
                }
                return "";
              },
              font: {
                size: 16
              }
            },
          }
        }
      }
    };
    return chr;
  }

  getStarsCount(arr: Array<any>) {
    var labels = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
    var counts = [0, 0, 0, 0, 0];
    arr.forEach(elem => {
      counts[labels.indexOf(elem.sentiment.label)] += 1;
    });
    return counts;
  }

  getClassCount(arr: Array<any>) {
    var classs = this.getuniqueValues(arr);
    var counts = [0];
    classs.forEach(_ele => {
      counts.push(0);
    });
    counts.pop();
    arr.forEach(elem => {
      elem.class.label.split(' ').forEach((el :string)=> {
        counts[classs.indexOf(el)] += 1;
      });
      
    });
    return counts;
  }
  getWordCloudData(arrCmnts: Array<any>) {
    if (arrCmnts.length  == 0) 
    return [];
    var stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));
    var source: string = arrCmnts.reduce((conc, itm) => conc + " " + itm.cmnt);
    var words = source.split(/[\s.]+/g)
      .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
      .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
      .map(w => w.replace(/['’]s$/g, ""))
      .map(w => w.substring(0, 30))
      .map(w => w.toLowerCase())
      .filter(w => w && !stopwords.has(w) && w.length > 2);
    var data = d3.rollups(words, group => group.length, w => w)
      .sort(([, a], [, b]) => d3.descending(a, b))
      .slice(0, 100)
      .map(([text, value]) => ({ text, value }));

    return data ;
  }
  get_rotate() {
    return 0;// (_d:any) => (~~(Math.random() * 6) - 3) * 30;
  }
  getuniqueValues(arr: Array<any>): any[] {
    return [...new Set(arr.reduce( (ar:Array<string>,item) => { return ar.concat((item.class.label as string).split(" ") ); },[] ))];

  }

  getCommentsSentimentAVG(arr: Array<any>) {
    var array = [...arr.map(item => Number.parseInt(item.sentiment.label.split(" ")[0]))]
    return Math.round(array.reduce((sum, itm) => sum + itm, 0) / array.length * 100) / 100
  }


  openDialog() {
    const dialogRef = this.dialog.open(TwoWordCompModalComponent, {
      height: '500px',
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // public captureScreen()  
  // {  
  //   var data = document.getElementById('contentToConvert') ;  //Id of the table
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     let imgWidth = 208;   
  //     let pageHeight = 295;    
  //     let imgHeight = canvas.height * imgWidth / canvas.width;  
  //     let heightLeft = imgHeight;  

  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     let position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  
  // }
  calculatefirstpercentage(){
    this.x =  Math.round(this.sum1/(this.sum2+this.sum1)*100) 
   return this.x
  }
  calculatesecondepercentage(){
    this.y = Math.round(this.sum2/(this.sum2+this.sum1)*100 )
    return  this.y
  }

}
