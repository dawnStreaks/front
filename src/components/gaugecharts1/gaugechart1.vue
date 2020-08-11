<template>
  <div id="app">
      <!-- <div class='wrapper'> -->
        <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header" style="text-align:left" >  {{ this.get_text('kpi_quick_view@gaugechart@l')}}
                  
                       
                   
                          <b-dropdown id="dropdown-1" text="" class="m-md-2" auto-close="disabled" >
                            <b-dropdown-form style="width:300px;">
                                         <b-form-group horizontal :label="get_text('mtp@gaugechart@l')" >
                                              <b-form-select v-model="mtp_date" :options="mtp_options" v-on:change="getSelectedMTP(mtp_date)">
                                               <option slot="first" :value="null">-- اختر --</option>
                                             </b-form-select>
                                         </b-form-group>
                             </b-dropdown-form>
                             <b-dropdown-divider></b-dropdown-divider>
                             <b-dropdown-form style="width: 300px;">
                               <b-form-group horizontal :label="get_text('periodicity@gaugechart@l')" >
                                              <b-form-select v-model="periodicity" :options="periodicity_options">
                                               <option slot="first" :value="null">-- اختر --</option>
                                             </b-form-select>
                                        </b-form-group>
                             </b-dropdown-form>
                          </b-dropdown>

 


                      <table align="right"  >
                        <tr>
                          <td><strong> {{ this.get_text('mtp@gaugechart@l') }}</strong></td>
                          <td>
                             &nbsp; &nbsp; 
                            {{from_mtp}}
                           
                          </td>
                          <td>
                             &nbsp; &nbsp; 
                            {{to_mtp}}
                             
                          </td>
                          <td>
                            &nbsp;&nbsp;
                            <strong>{{this.get_text('up_to_date_status@gaugechart@l') }}</strong>
                            &nbsp;&nbsp;<span v-html="getUpToDateStatus()"></span>
                          </td>
                          </tr>
                          </table>
                         <button  id="myPrntbtn" v-on:click="loaded"><i  class="fa fa-print "></i></button>


                            
                       
                  </div>
                  <div class="card-body">
                    <b-container class="bv-example-row">
                        <b-row>
                     
                         <b-col cols="2" >
                           <strong>
                                 
                             {{ this.get_text('kpi_name@gaugechart@l') }}
                           </strong>
                              <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <this.value_type{{this.mtp_options}}input v-model="kpi_name" placeholder="edit me"> -->
               
                          </b-col>
                          <b-col cols="2">
                              {{this.kpi_name}}
                             </b-col>
                          <b-col cols="2">
                            <strong>
                              {{ this.get_text('org_unit@gaugechart@l') }}
                           </strong>
                            <!-- &nbsp;&nbsp;
                            <input v-model="org_unit" placeholder="edit me"> -->
                          </b-col>      
                          <b-col cols="2">
                            {{this.org_unit}}
                          </b-col>                     
                         <b-col cols="2">
                           <strong>
                            {{ this.get_text('as_of_date@gaugechart@l') }}

                           </strong>
                             <!-- <label for="date-mask">As of Date</label>
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <masked-input v-model="as_of_date" mask="1111 / 11 / 11" placeholder="Date" name="date-mask" id="todays"/>  -->
                          </b-col>
                          <b-col cols="2">
                            {{this.as_of_date}}
                          </b-col>
                            
                       </b-row>
                       <br>
                        <b-row>
                         <b-col cols="2">
                           <strong>
                             {{ this.get_text('last_value_date@gaugechart@l') }}

                           </strong>
                           <!-- <label for="date-mask2">Last Value Date </label>
                             
                             <masked-input v-model="last_value_date" mask="11 / 11 / 1111" placeholder="Date" name="date-mask2"/> -->
                               </b-col>
                              <b-col cols="2">
                               {{
                                 this.last_value_date
                               }}
                              </b-col>
                                                      
                          <b-col cols="2">
                            <strong>
                              {{ this.get_text('last_value@gaugechart@l') }}
                            </strong>                               
                            <!-- <input v-model="last_value" placeholder="edit me"> -->
                          </b-col>
                          <b-col cols="2">
                            {{this.last_value}}
                          </b-col>
                         <b-col cols="2">
                           <strong>
                               {{ this.get_text('last_year_value@gaugechart@l') }}
                           </strong>

                           <!-- &nbsp;
                          <input v-model="last_year_value" placeholder="edit me"> -->

                         </b-col>
                         <b-col cols="2">
                           {{this.last_year_value}}
                         </b-col>
                       </b-row>
                       <br>
                       <br>
                        <b-row>
                         <b-col cols="2">
                            <strong>
                             {{ this.get_text('value_targetted@gaugechart@l') }}
                            </strong>
                          <!-- <input v-model="value_targetted" placeholder="edit me"> -->

                         </b-col>
                         <b-col cols="2">
                           {{this.value_targetted}}
                         </b-col>
                          <b-col cols="2">
                            <strong>
                                 {{ this.get_text('to_target@gaugechart@l') }}
                            </strong>
                           <!-- <input v-model="target_diff" placeholder="edit me"> -->

                          </b-col>
                          <b-col cols="2">
                            {{this.target_diff}}
                          </b-col>
                         <b-col cols="2">  
                           <strong>  {{ this.get_text('upcoming_value_date@gaugechart@l') }}</strong>
                           
                           <!-- <label for="date-mask3">Upcoming  Date</label>
                           &nbsp;
                             <masked-input v-model="upcoming_value_date" mask="11 / 11 / 1111" placeholder="Date" name="date-mask3"/>  -->
                          </b-col>
                          <b-col cols="2">
                            {{this.upcoming_value_date}}
                          </b-col>
                       </b-row>
                      </b-container>
                         <br>
                         <br>
                         <br>
    <!-- <ejs-circulargauge background= 'skyblue' :border= 'border' :margin= 'margin' > -->
                 <b-container class="bv-example-row " dir="ltr" >   
                      <b-row>
                             
                         <b-col class="donut">

                            <!-- <b-card header="Metrics"> -->
                              <!-- <table>  -->
                                 <strong style="float:left">  {{ this.get_text('metrics@gaugechart@l') }}</strong>
                                   
                                   <br>
                                <b-row>
                                    <div class="chart-wrapper" >
                                      <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; z-index: 999999999999999">
                                        {{min_allowed1()}}%<Br />
                                        </div>
                                    <doughnut-example1 chartId="chart-doughnut-01" height="150px"  />
                                    </div>
                                </b-row>
                                
                                   <div  v-if="this.value_type!=1" style="text-align:center;"> {{this.get_text('value@gaugechart@l')}}:{{doughnut_value1}}</div>
                                     <br>                    
                                <b-row>
                                    <div class="chart-wrapper">
                                      <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; ">
                                        {{target1()}}%<Br />
                                        </div>
                                    <doughnut-example2 chartId="chart-doughnut-02" height="150px" />
                                    </div>
                                </b-row>
                                     <div v-if="this.value_type!=1" style="text-align:center;" > {{this.get_text('value@gaugechart@l')}}:{{doughnut_value2}}</div>
                                                                    <br>                    

                               <b-row>
                                    <div class="chart-wrapper">
                                      <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; z-index: 999999999999999">
                                        {{improved1()}}%<Br />
                                        </div>
                                    <doughnut-example3 chartId="chart-doughnut-03" height="150px"/>
                                    </div>
                                </b-row>
                                   <div v-if="this.value_type!=1" style="text-align:center;"> {{this.get_text('value@gaugechart@l')}}:{{doughnut_value3}}</div>
                                <br>
                              <!-- </table>                              -->
                            <!-- </b-card> -->

                         </b-col>
                            <b-col class="gauge1">
                          <!-- <b-card header="KPI Status"> -->
                            <b-row id="gauge-row" >
                           <b-col>{{ this.get_text('kpi status@gaugechart@l') }} 
                            &nbsp;&nbsp;%
                            <strong> {{kpi_status}}</strong>&nbsp;
                            <!-- <span v-html="getKpiStatusColor()"></span> -->
                            </b-col>  
                           <b-col >{{ this.get_text('to_target@gaugechart@l') }}  <strong> {{target_diff}}</strong>;
                           </b-col>  
                                                      
                           </b-row> 
                            <ejs-circulargauge>
                              <e-axes>
                               <e-axis startAngle= 230 endAngle= 130  maximum= 120 radius= '60%' :annotations='annotations' :pointers = 'pointers'  :lineStyle= 'lineStyle' :minorTicks= 'minorTicks' :majorTicks = 'majorTicks' :ranges='ranges'>
                             </e-axis>
                             </e-axes>
                              </ejs-circulargauge>
                  <div  id="quarter-map1" v-if="periodicity == 3"  >
                <b-row v-for="rc in 3" :key="rc"  >                          
                <b-col  v-for="cc in 4" :key="cc" style="padding-left: 2px;padding-right: 2px; " >
                <div class="card text-white "  style="margin-bottom:2px; "  >
                  <div class="card-body" v-bind:style="styles">
                    <div class="quarter-map">{{ get_text('target@gaugechart@l') }} %{{quarter_map_values[rc-1]['q'+(cc)+'_value']}} <span v-if="((quarter_map_values['q'+(rc)+'_target'])-(quarter_map_values['q'+(rc)+'_value']))>0"><i class="fa fa-angle-down"></i></span> <span v-else-if="((quarter_map_values['q'+(rc)+'_target'])-(quarter_map_values['q'+(rc)+'_value']))<0"><i class="fa fa-angle-up"></i></span> <span v-if="((quarter_map_values['q'+(rc)+'_target'])-(quarter_map_values['q'+(rc)+'_value']))==0"><i class="fa fa-check"></i></span> </div>
                    <div class="quarter-map" >{{ get_text('actual@gaugechart@l') }} %{{quarter_map_values[rc-1]['q'+(cc)+'_target']}} </div>
                    <div id="progress_bar" class="progress progress-white progress-xs my-2">
                      <div  class="progress-bar" role="progressbar" :style="{width:(quarter_map_values[rc-1]['q'+(cc)+'_value']) + '%'}" v-bind:aria-valuenow="(quarter_map_values[rc-1]['q'+(cc)+'_value'])" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                </b-col>
                </b-row>
                                

                </div>
                 <div v-else-if="periodicity == 6">
                <b-row v-for="rc in 3" :key="rc" >                                
                <b-col  v-for="cc in 2" :key="cc" style="padding-left: 2px;padding-right: 2px; ">
                <div class="card text-white " style="margin-bottom:2px;">
                  <div class="card-body" v-bind:style="styles">
                    <div>{{ get_text('target@gaugechart@l') }} %{{quarter_map_values[rc-1]['h'+(cc)+'_value']}} <span v-if="target-actual>0"><i class="fa fa-angle-down"></i></span> <span v-else-if="target-actual<0"><i class="fa fa-angle-up"></i></span> <span v-if="target-actual==0"><i class="fa fa-check"></i></span> </div>
                    <div>{{ get_text('actual@gaugechart@l') }} %{{quarter_map_values[rc-1]['h'+(cc)+'_target']}}</div>
                    <div class="progress progress-white progress-xs my-2">
                      <div  class="progress-bar" role="progressbar" :style="{width:quarter_map_values[rc-1]['h'+(cc)+'_value'] + '%'}" v-bind:aria-valuenow="quarter_map_values[rc-1]['h'+(cc)+'_value']" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                </b-col>
                </b-row>
                </div>
                <div v-else-if="periodicity == 1">
                                    </div>


            <div v-else>
               <b-row v-for="rc in 3" :key="rc" >                                
                <b-col  v-for="cc in 1" :key="cc" style="padding-left: 2px;padding-right: 2px; ">
                <div class="card text-white " style="margin-bottom:2px;">
                  <div class="card-body" v-bind:style="styles">
                    <div>{{ get_text('target@gaugechart@l') }} %{{quarter_map_values[rc-1]['y'+(cc)+'_value']}} <span v-if="target-actual>0"><i class="fa fa-angle-down"></i></span> <span v-else-if="target-actual<0"><i class="fa fa-angle-up"></i></span> <span v-if="target-actual==0"><i class="fa fa-check"></i></span> </div>
                    <div>{{ get_text('actual@gaugechart@l') }} %{{quarter_map_values[rc-1]['y'+(cc)+'_target']}}</div>
                    <div class="progress progress-white progress-xs my-2">
                      <div  class="progress-bar" role="progressbar" :style="{width:quarter_map_values[rc-1]['y'+(cc)+'_value'] + '%'}" v-bind:aria-valuenow="quarter_map_values[rc-1]['h'+(cc)+'_value']" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                </b-col>
                </b-row>

                </div>
                                             
                       </b-col>
                      </b-row>
                </b-container>
                    
                  </div>  
                </div>
               </div>
         </div>     
  </div>
</template>
<script>
import Vue from 'vue';
import { CircularGaugePlugin,Annotations } from "@syncfusion/ej2-vue-circulargauge";
import DoughnutExample1 from './DoughnutExample1.vue';
import DoughnutExample2 from './DoughnutExample2.vue';
import DoughnutExample3 from './DoughnutExample3.vue';
import {store} from '@/components/store';
import moment from 'moment';


let currentVue = Vue.component("currentTemplate", {
  // props: ['actual1'],
  template: '<div><span id="annotation2" style="font-size:10px; color:#424242; font-family:Regular">Current:20</span></div>',
  data() {
    return {
      data: {},
    
    };
    
  },
  computed:{
       actual2() {                      
        var kpi_name=  this.$store.state.kpi_value       
        var actual1= kpi_name[0].acc_value 
         return actual1
          },

    }
      
});
let currentTemplate = function() {
  return { template: currentVue };
};

let targetVue = Vue.component("targetTemplate", {
  template: '<div><span id="annotation1" style="font-size:10px; color:#424242; font-family:Regular">Target:5</span></div>',
  data() {
    return {
      data: {}
    };
  },
  
});
let targetTemplate = function() {
  return { template: targetVue };
};

// let supposedVue = Vue.component("supposedTemplate", {
//   template: this.getKpiStatusRangeColor,
//   data() {
//     return {
//       data: {}
//     };
//   },
//   methods:{
//      getKpiStatusRangeColor: function() {
     
//          alert(kpi_status)
//      if((this.kpi_status==100))
//        return 'red';

    
// 		}


//   }

// });
// let supposedTemplate = function() {
//   return { template: supposedVue };
// };
Vue.use(CircularGaugePlugin);
export default {
   store: store,
    data: function () {
        return {
         // kpi_id:3,
          i:0,
          j:0,
          width:"250",
          //actual1:this.actual1(),
          //target1:this.target1(),

          //actual1:actual1(),
           //kpi_name:null,
          //  kpi_value:{
            //kpi_name: 'aa',
            // org_unit:'',
            // as_of_date:this.get_as_of_date(),// new Date().toJSON().slice(0, 10).replace(/-/g,'/'),
            // last_value_date:'',
            // last_value:'',
            // last_year_value:'',
            // value_targetted:'',
            // target_diff:'',
            // upcoming_value_date:'',
            // up_to_date_status:'',
            // to_target:'',
            from_mtp:'',
            to_mtp:'',

      mtp_date:4,//{ value: 1, text:'خطة 2010-2012 لوزارة المالية'},
            //mtp_options:'',
            // periodicity:3,
            // periodicity_options:[{ value: 1, text: this.get_text('none@gaugechart@l') },
            //                      { value: 3, text: this.get_text('quarter@gaugechart@l') },
            //                       { value: 6, text: this.get_text('semi_annual@gaugechart@l') },
            //                       { value:12, text: this.get_text('annual@gaugechart@l') },
            //                       { value:36, text:this.get_text('every_3_years@gaugechart@l') },],
            doughnut_value1:'70',
            doughnut_value2:'80',
            doughnut_value3:'90',
            row_count:'3',
            //target:30,
           //actual:50.50,
            // styles:{
            //   'font-size':'11px',
            //   'padding-left': '2px',
            //   'padding-right': '2px',
            //   'padding-top':'2px',
            //   'padding-bottom':'2px',
            //   'background-color':this.getKpiStatusRangeColor(),
            //   'text-align':'center',
            // },
           border: {color: "#FF0000", width: 2},
            margin: { left: 40, right: 40, top: 40, bottom: 40 },
        majorTicks: {
            width: 1, color: '#8c8c8c'
        },
        lineStyle: { width: 2 },
        minorTicks: {
            width: 1, color: '#8c8c8c'
        },
          pointers: [{
            value:this.target1,
            type: 'Marker',
            markerShape: 'InvertedTriangle',
            radius: '100%',
            markerHeight: 15,
            markerWidth: 15
        },
        {
            value:this.actual1,
            radius: '60%'
        }],
        annotations:[{
            content:targetTemplate,
            angle: 360,
            radius: '120%',
            zIndex: '1',
        },
        
        {
            content:currentTemplate,
            angle: 90,
            radius: '3%',                                                                                    
            zIndex: '1',
        },
       
        ],
        
        ranges: [{
            start: 0,
            end: this.actual1,
            radius: '110%',
            endWidth: 15,
            startWidth: 15,
           color:this.getKpiStatusRangeColor(),//'#ff5985'  ,////this.kpi_status==100?'green':'blue',// 
            }],
            
      
        }
    },
     provide: {
    circulargauge: [Annotations]
},
   components:{
         DoughnutExample2,
         DoughnutExample1,
         DoughnutExample3,
         //MaskedInput,
   },
   	methods: {

        actual1() {                      
        var kpi_name=  this.$store.state.kpi_value['acc_value']       
        var actual1= kpi_name//[0].acc_value 
         return actual1
          },
        target1()
          {                      
        var kpi_value1=  this.$store.state.kpi_value['target_value'] 
         var target1= kpi_value1//[0].target_value
         return target1
          },
       loaded: function(args) {
    var printButton = document.getElementById("myPrntbtn");
       printButton.style.visibility = 'hidden';
        window.print()
        printButton.style.visibility = 'visible';

   },

       getSelectedMTP(mtp_date){
       //alert(mtp_date)
      // alert(kpi_id)


                var url = window.location.pathname;
                var kpi_id = url.substring(url.lastIndexOf('/') + 1);
               

                   this.$store.dispatch('loadKPIvalue', mtp_date,kpi_id,this.periodicity);
       },
            min_allowed1(){
               //var kpi_name=  this.$store.state.kpi_value  
               var kpi_min_allowed= (this.$store.state.kpi_value['acc_value']*(1- this.$store.state.kpi_value['margin_pct']))
                 return kpi_min_allowed
            },

             improved1(){
              // var kpi_name=  this.$store.state.kpi_value  
               var kpi_improved= (kpi_name[0].acc_value*(1+kpi_name[0].margin_pct))
                 return kpi_improved
            },

      
        get_as_of_date()
      {
        //alert("hi")
        var datepart= new Date().toJSON().slice(0, 10).replace(/-/g,'/')
       //  year = datePart.slice(0,4)
        const formattedDate = moment(datepart).format('DD/MM/YYYY')
         //var todate= day+'/'+month+'/'+year;
        //alert(todate)
        return formattedDate
      },

     
     get_text(textbit) {
                var transtext = this.$store.state.translations[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if(spliteText.length > 2) {
                        var newTxt = (spliteText[0]+'@'+'l');
                        var transtext1 = this.$store.state.translations[this.$i18n.locale][newTxt];
                        if (transtext1) {
                            return transtext1;
                        } else {
                            return "!" + textbit;
                        }
                    } else {
                        return "!" + textbit;
                    }
                }

            },
    
     getUpToDateStatus:function(){

       if(this.last_value)
       {
         return '<i class="fa fa-check-circle-o fa-lg" style="color:green"></i>'
       }

        else
       {
         return '<i class="fa fa-circle-o fa-lg" style="color:red"></i>'
       }


     } , 
		// getKpiStatusColor() {
     
    //   if(this.kpi_status<0)
    //   return '<strong style="color:red;">%'+this.kpi_status+'</strong>';
     
    //  else if((this.kpi_status>=0) && (this.kpi_status<=84 ))
    //   return '<strong style="color:	#FFA500;">%'+this.kpi_status+'</strong>';
     
    //  else if((this.kpi_status>=84.1) && (this.kpi_status<100))
    //   return '<strong style="color:	#90EE90;">%'+this.kpi_status+'</strong>';

    //   else if((this.kpi_status==100))
    //   return '<strong style="color:	green;">%'+this.kpi_status+'</strong>';

    //   else if((this.kpi_status>=101) && (this.kpi_status<=200))
    //   return '<strong style="color:	blue;">%'+this.kpi_status+'</strong>';

    //   else if((this.kpi_status>=201))
    //   return '<strong style="color:	red;">%'+this.kpi_status+'</strong>';
     
     
    //  else
    //   return this.kpi_status
    // },
   getKpiStatusRangeColor: function() {
     
         if(this.kpi_status<0)
      return 'red';
     
     else if((this.kpi_status>=0) && (this.kpi_status<=84 ))
      return '#FFA500';
     
     else if((this.kpi_status>=84.1) && (this.kpi_status<100))
      return '#90EE90';

      else if((this.kpi_status==100))
      return 'green';

      else if((this.kpi_status>=101) && (this.kpi_status<=200))
      return 'blue';

      else if((this.kpi_status>=201))
      return 'green';
     
     
     else
      return 'blue'
    
		}
     
  },
// watch() {  

//   from_mtp: function () {
//          this.$store.dispatch('loadKPIvalue');

//        var kpi_value= this.$store.state.kpi_value
//         var from_mtp= kpi_value[0].mtp_start_date
//           return from_mtp;
//         },
 
//   },
mounted()
{
 this.$store.dispatch('loadKPIvalue');
},
  
  created() {
            this.$store.dispatch('translation');
           
                    this.$store.dispatch('loadKPIvalue');
                    this.$store.dispatch('loadKPIquarter');
                    this.$store.dispatch('loadMTP');
                    // this.actual1();
                    // this.target1();
                   // this.last_value=this.$store.state.kpi_value['last_value']

        },
  
   

   computed:{

   

         periodicity()
          {
            var period=3;
            return period;
            },
            styles()
            {
            var styles={
                          'font-size':'11px',
                          'padding-left': '2px',
                          'padding-right': '2px',
                          'padding-top':'2px',
                          'padding-bottom':'2px',
                          'background-color':this.getKpiStatusRangeColor(),
                          'text-align':'center',
                        }
            return styles;
            },
            periodicity_options()
{
          var options= [{ value: 1, text: this.get_text('none@gaugechart@l') },
                                           { value: 3, text: this.get_text('quarter@gaugechart@l') },
                                            { value: 6, text: this.get_text('semi_annual@gaugechart@l') },
                                            { value:12, text: this.get_text('annual@gaugechart@l') },
                                            { value:36, text:this.get_text('every_3_years@gaugechart@l') },]
          return options;
          },

     mtp_options(){
        var mtp_options=  this.$store.state.kpi_mtp.map(function (item)     
        {
            console.log(item);
            return {
             //value: item.id,
             value: item.value,
              text: item.text
            }
          });
        //this.mtp_date=mtp_options[0]
         return mtp_options

     },

    value_type(){
      var kpi_name=  this.$store.state.kpi_value       
        var kpi_last_value= kpi_name[0].value_type 
         return kpi_last_value


    },
 
     quarter_map_values(){

        var kpi_av_value=  this.$store.state.kpi_quarter_map
        var i=1;
        //  kpi_av_value =  kpi_av_value.map(function (item) {
        //     //alert(item);
        //     return {
        //       actual_value: item.q1_value,
        //       target_value: item.q1_target
        //     // value: item.name_ar,
        //     }
        //   });
      //alert(kpi_av_value)
        return kpi_av_value

     },

target() {                      
        var kpi_name=  this.$store.state.kpi_value       
        var kpi_last_value= kpi_name[0].target_value 
         return kpi_last_value
    },

  actual() {                      
        var kpi_name=  this.$store.state.kpi_value       
        var kpi_last_value= kpi_name[0].acc_value 
         return kpi_last_value
    },
    //  from_mtp()
    //  {

    //    var kpi_value= this.$store.state.kpi_value
    //     var from_mtp= kpi_value[0].mtp_start_date
    //       return from_mtp;
    //  },
    //  to_mtp()
    //  {
    //    var kpi_value = this.$store.state.kpi_value
    //     var to_mtp= kpi_value[0].mtp_end_name
    //       return to_mtp;
    //  },
     kpi_status()
     {
       var kpi_value = this.$store.state.kpi_value
       //alert(this.min_allowed1())
        var kpi_status= (kpi_value[0].acc_value - this.min_allowed1()) / (kpi_value[0].target_value - this.min_allowed1())//kpi_value[0].kpi_status
          return kpi_status;
     },

    kpi_name() {                      
        var kpi_value=  this.$store.state.kpi_value[0]['kpi_name']       
        var kpi_name_value= kpi_value//[0].kpi_name
      return kpi_name_value   
    },
    org_unit() {                      
        var kpi_value=  this.$store.state.kpi_value[0]['unit_name']       
        var kpi_unit_name=kpi_value//[0].unit_name  
        return kpi_unit_name
    },
    as_of_date() {                      
        var kpi_value=  this.$store.state.kpi_value[0]['data_as_of_date']       
         var kpi_as_of_date=kpi_value//[0].data_as_of_date   
         return kpi_as_of_date
    },
    last_value_date() {                      
        var kpi_name=  this.$store.state.kpi_value[0]['last_value_date']       
         var kpi_last_value_date=kpi_name//[0].last_value_date   
         return kpi_last_value_date
    },
    last_value() {                      
        var kpi_name2=  this.$store.state.kpi_value[0]['last_value']       
        var kpi_last_value= kpi_name2//[0].last_value 
         return kpi_last_value
    },
    last_year_value() {                      
        var kpi_value=  this.$store.state.kpi_value[0]['prev_year_value ']       
         var kpi_last_year_value=kpi_value//[0].prev_year_value   
         return kpi_last_year_value
    },
    value_targetted() {                      
        var kpi_name=  this.$store.state.kpi_value[0]['target_value']       
        var kpi_target_value= kpi_name//[0].target_value
        return kpi_target_value
    },
    target_diff() {                      
        //var kpi_name=  this.$store.state.kpi_value       
        //var kpi_target_diff=(kpi_name[0].target_value -kpi_name[0].last_value ) 
        var kpi_target_diff=((this.$store.state.kpi_value[0]['target_value'] )-(this.$store.state.kpi_value[0]['last_value']) ) 

        return kpi_target_diff

    },
  upcoming_value_date() {                      
        var kpi_name=  this.$store.state.kpi_value[0]['next_value_date']       
        var kpi_upcoming_value_date=kpi_name//[0].next_value_date
        return kpi_upcoming_value_date
    },
    
    
    }}
  
   
</script>
<style>
@media print {
  #annotation1{
    font-size: 4px ;
       display:block;
       /* margin-right:200px; */
       /* margin-top: -40px; */
      transform: scale(0.7) translate(-50px,-60px) ;

  }
  #annotation2{
       display:block;
       /* margin-right:200px; */
       transform: scale(0.7) translate(-50px,-120px) ;
           /* font-size: 4px ; */

  }
  .quarter-map{
      font-size: 8px ;
       display:block;
  }
  #quarter-map1{
       /* display:block;
      max-height: 50%;
      padding-top: 0%;
      margin-top: 0%;
      padding-bottom: 80%; */
       transform:  translate(0px,-60px) ;
       
  }
  .row{
    max-height: 50%;
    
  }
  
 
 
 .donut{
   padding-left: 400px;
   margin-left:15px;
   display:block;
 }
    .gauge1{
        display: block;
        max-width: 40%;
        font-size: 8px ;
    } 
  
  .card{
     display: block;
      }
  body {
    margin-right: 0px;
    margin-left: 0px;
    font-size: 8px ;
    line-height: 1.3;
    background: #fff !important;
    color: #000;
}
.main{
   max-width: 75%;
}
  

  .col-2{
    max-width: 11%;
  }
  .col{
    font-size: 8px ;
    
 }
 
 rect{
   fill-opacity:0.0;
   transform: translate(-50px, -50px);
      box-sizing: content-box;
    }

 
 svg{
padding-right:100px;
max-height: 300px;
padding-bottom: 0%;
margin-bottom: 0%;
/* float:right; */
   transform:scale(0.7) translate(-50px, -110px) ;
   
  
} 



/** Seitenränder einstellen */       
@page { size: auto;  margin: 0mm; }
 .sidebar,.breadcrumb{
display: none;
}
}


  .wrapper {
    max-width: 400px;
    max-height:100px;
    margin: 0 auto;
  }
  #chart-doughnut-01
  {
       margin-right: 100px;
       float: right;
  }
   #chart-doughnut-02
  {
       margin-right: 100px;
       float: right;
  }
   #chart-doughnut-03
  {
       margin-right: 100px;
       float: right;
  }
</style>

