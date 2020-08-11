<template>
    <div id="app">
        <!-- <div class='wrapper'> -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" style="text-align:left"> {{ this.get_text('kpi_quick_view@gaugechart@l')}}

                        {{ periodicity}}
                        <!-- {{this.kpi}} -->
                                                                    <!-- {{this.$store.state.kpi_value[0]}} -->

                        <b-dropdown id="dropdown-1" text="" class="m-md-2" auto-close="disabled">
                            <b-dropdown-form style="width:300px;">
                                <b-form-group horizontal :label="get_text('mtp@gaugechart@l')">
                                    <b-form-select v-model="mtp_date" :options="mtp_options"
                                                   v-on:change="getSelectedMTP()">
                                        <option slot="first" :value="null">-- اختر --</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-form style="width: 300px;">
                                <b-form-group horizontal :label="get_text('periodicity@gaugechart@l')">
                                    <b-form-select v-model="periodicity" :options="periodicity_options" v-on:change="getSelectedMTP()">
>
                                        {{periodicity}}
                                        <option slot="first" :value="null">-- اختر --</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-dropdown-form>
                        </b-dropdown>
                        <table align="right">
                            <tr>
                                <td><strong> {{ this.get_text('mtp@gaugechart@l') }}</strong></td>
                                <td>
                                    &nbsp; &nbsp;
                                    {{this.from_mtp}}
                                   
                                </td>
                                <td>
                                    &nbsp; &nbsp;
                                    <!-- {{ this.$store.getters.kpi_value.length > 0 ?
                                    this.$store.getters.kpi_value[0]['mtp_end_name'] : '' }} -->
                                   {{this.to_mtp}}
                                </td>
                                <td>
                                    &nbsp;&nbsp;
                                    <strong>{{this.get_text('up_to_date_status@gaugechart@l') }}</strong>
                                    &nbsp;&nbsp;<span v-html="getUpToDateStatus()"></span>
                                </td>
                            </tr>
                        </table>
                        <button id="myPrntbtn" v-on:click="loaded"><i class="fa fa-print "></i></button>
                    </div>
                    <div class="card-body">
                        <b-container class="bv-example-row">
                            <b-row>

                                <b-col cols="2">
                                    <strong>

                                        {{ this.get_text('kpi_name@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['kpi_name']: '' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('org_unit@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['unit_name']: '' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('as_of_date@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['data_as_of_date']: '' }}
                                </b-col>

                            </b-row>
                            <br>
                            <b-row>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('last_value_date@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['last_value_date']: '' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('last_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['last_value']: '' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('last_year_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['prev_year_value']: '' }}
                                </b-col>
                            </b-row>
                            <br>
                            <br>
                            <b-row>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('value_targetted@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['target_value']: '' }}
                                  <span v-if= "this.$store.state.kpi_value[0]['value_type'] ==1 ">%</span>
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('to_target@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{this.target_diff}}
                                </b-col>
                                <b-col cols="2">
                                    <strong> {{ this.get_text('upcoming_value_date@gaugechart@l') }}</strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['next_value_date']: '' }}
                                </b-col>
                            </b-row>
                        </b-container>
                        <br>
                        <br>
                        <br>
                        <b-container class="bv-example-row" dir="ltr">
                            <b-row>
                                <b-col class="donut">
                                    <strong style="float:left" class="donut-head"> {{ this.get_text('metrics@gaugechart@l') }}</strong>
                                    <br>
                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">
                                                <div v-if=" this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1 ">
                                                {{ this.min_allowed1() }}
                                                </div>
                                                <div v-else>
                                                    {{ this.min_allowed1() }}%
                                                </div>

                                            </div>
                                            <div v-if="this.min_allowed1()">
                                                <doughnut-example1 :chartdata=this.min_allowed1() :improved=this.improved1()
                                                                   chartId="chart-doughnut-01" :height=150 />
                                            </div>
                                        </div>
                                    </b-row>

                                    <!-- <div v-if=" this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1 "
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.min_allowed1()}}
                                    </div> -->

                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">
                                                
                                                  <div v-if=" this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1 ">
                                                 {{this.target1()}}
                                                </div>
                                                <div v-else>
                                                     {{this.target1()}}%
                                                </div>
                                               
                                            </div>
                                            <doughnut-example2 :chartdata=this.target1() :improved=this.improved1() chartId="chart-doughnut-02"
                                                               height="150px"/>
                                        </div>
                                    </b-row>
                                    <!-- <div v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1"
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.target1()}}
                                    </div> -->
                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">
                                                
                                                <div v-if=" this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1 ">
                                                 {{this.improved1()}}
                                                </div>
                                                <div v-else>
                                                     {{this.improved1()}}%
                                                </div>
                                                
                                            </div>
                                            <doughnut-example3 :chartdata=this.improved1() chartId="chart-doughnut-03"
                                                               height="150px"/>
                                        </div>
                                    </b-row>
                                    <!-- <div v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1"
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.improved1()}}
                                    </div> -->
                                    <br>
                                </b-col>
                                <b-col>
                                    <!-- <b-card header="KPI Status"> -->
                                    <b-row>
                                        <b-col>{{ this.get_text('kpi status@gaugechart@l') }}
                                            &nbsp;&nbsp;%
                                            <strong> {{kpi_status}}</strong>&nbsp;
                                            <!-- <span v-html="getKpiStatusColor()"></span> -->
                                        </b-col>
                                        <b-col>{{ this.get_text('to_target@gaugechart@l') }} <strong>
                                            {{target_diff}}</strong>;
                                        </b-col>

                                    </b-row>
                                    <br>
                                    <ejs-circulargauge ref="circulargauge1">
    <e-axes>
        <e-axis startAngle=230 endAngle=130 maximum=120 radius='60%'
                :annotations='annotations' :pointers='pointers' :ranges='ranges'
                :lineStyle='lineStyle' :minorTicks='minorTicks'
                :majorTicks='majorTicks'>
        </e-axis>
    </e-axes>
</ejs-circulargauge>
                                    <!-- <circulargauge ref="circulargauge1" :target=this.target1 :actual=this.actual1                                                  :kpi_status=this.kpi_status></circulargauge> -->
                                  <!-- <circulargauge></circulargauge> -->
                                    <div id="quarter-map1" v-if="periodicity == 3">
                                                                                <!-- {{periodicity}} -->
                                        <b-row v-for="rc in 3" :key="rc">
                                            <b-col v-for="cc in 4" :key="cc"
                                                   style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-white " style="margin-bottom:2px; ">
                                                    <div class="card-body" v-bind:style="styles">
                                                        <div class="quarter-map">{{ get_text('target@gaugechart@l') }}
                                                            %{{a=(quarter_map_values[rc-1]['q'+(cc)+'_value']).toFixed(2)}}
                                                            <!-- {{seta(quarter_map_values[rc-1]['q'+(cc)+'_value'])}} -->
                                                            <span v-if="((quarter_map_values[rc-1]['q'+(cc)+'_target'])-(quarter_map_values[rc-1]['q'+(cc)+'_value']))>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="((quarter_map_values[rc-1]['q'+(cc)+'_target'])-(quarter_map_values[rc-1]['q'+(cc)+'_value']))<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="((quarter_map_values[rc-1]['q'+(cc)+'_target'])-(quarter_map_values[rc-1]['q'+(cc)+'_value']))==0"><i
                                                                    class="fa fa-check"></i></span></div>
                                                        <div class="quarter-map">{{ get_text('actual@gaugechart@l') }}
                                                            %{{(quarter_map_values[rc-1]['q'+(cc)+'_target']).toFixed(2)}}
                                                        </div>
                                                        <div id="progress_bar"
                                                             class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:(quarter_map_values[rc-1]['q'+(cc)+'_value']*100) + '%'}"
                                                                 aria-valuenow="(quarter_map_values[rc-1]['q'+(cc)+'_value']*100)"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
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
                    <div>{{ get_text('target@gaugechart@l') }} %{{a=quarter_map_values[rc-1]['h'+(cc)+'_value']}} <span v-if="quarter_map_values[rc-1]['h'+(cc)+'_target']-a>0"><i class="fa fa-angle-down"></i></span> <span v-else-if="quarter_map_values[rc-1]['h'+(cc)+'_target']-a<0"><i class="fa fa-angle-up"></i></span> <span v-if="quarter_map_values[rc-1]['h'+(cc)+'_target']-a==0"><i class="fa fa-check"></i></span> </div>
                    <div>{{ get_text('actual@gaugechart@l') }} %{{t=quarter_map_values[rc-1]['h'+(cc)+'_target']}}</div>
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
                    <div>{{ get_text('target@gaugechart@l') }} %{{a=quarter_map_values[rc-1]['y'+(cc)+'_value']}} <span v-if="quarter_map_values[rc-1]['y'+(cc)+'_target']-a>0"><i class="fa fa-angle-down"></i></span> <span v-else-if="quarter_map_values[rc-1]['y'+(cc)+'_target']-a<0"><i class="fa fa-angle-up"></i></span> <span v-if="quarter_map_values[rc-1]['y'+(cc)+'_target']-a==0"><i class="fa fa-check"></i></span> </div>
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
    import {CircularGaugePlugin, Annotations} from "@syncfusion/ej2-vue-circulargauge";
    import DoughnutExample1 from './DoughnutExample1.vue';
    import DoughnutExample2 from './DoughnutExample2.vue';
    import DoughnutExample3 from './DoughnutExample3.vue';
    import circulargauge from './circulargauge.vue';
    import {store} from '@/components/gaugecharts/store';
    import moment from 'moment';

    Vue.use(CircularGaugePlugin);
    export default {
        store: store,
        data: function () {
            return {
                periodicity: this.$store.state.periodicity,
                mtp_date: this.$store.state.mtp_date,
                kpi_id: this.$store.state.kpi_id,
                a:'',
                t:'',
                rc:3,
                cc:4,
                actual11:10,
                target11:10,

                  majorTicks: {
                    width: 1, color: '#8c8c8c'
                },
                lineStyle: {width: 2},
                minorTicks: {
                    width: 1, color: '#8c8c8c'
                },
                pointers: [{
                    value: this.target1(),
                    type: 'Marker',
                    markerShape: 'InvertedTriangle',
                    radius: '100%',
                    markerHeight: 15,
                    markerWidth: 15
                },
                    {
                        value: this.actual1(),
                        radius: '60%'
                    }],
                annotations:[{
                    content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('value_targetted@gaugechart@l') + ':'+this.target+'</div>',//currentTemplate,
                    angle: 360,
                    radius: '17%',
                    zIndex: '1',
                },

                    {
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('current@gaugechart@l') + ':'+this.actual+'</div>',//currentTemplate,
                        angle: 90,
                        radius: '3%',
                        zIndex: '1',
                    },

                ],
                ranges: [{

                    start: 0,
                    end:this.actual1(),
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
 beforeMount()   {
            this.$store.dispatch('translation');
             var url = window.location.pathname;
             var kpi_id = url.substring(url.lastIndexOf('/') + 1);
            //  this.$store.dispatch('loadKPIvalue',this.mtp_date, this.kpi_id,this.periodicity);
            this.$store.dispatch('loadKPIvalue', [4, kpi_id, 1]);
            this.$store.dispatch('loadMTP');
        },
    
       
        components: {
            DoughnutExample2,
            DoughnutExample1,
            DoughnutExample3,
            circulargauge,
        },
//         watch: {
//   	mtp_date: {
//     	 handler() {
//                     this.mtpdata= this.mtp_date;
//                     this.getSelectedMTP(this.mtpdata)
//                 },
//                 deep: true
//     }    
//   },

        computed: {
            target_id()
            {
                var kpi_av_value=  this.$store.state.kpi_value.length>0?this.$store.state.kpi_value[0]['kpi_target_id']:''
                return  kpi_av_value; 
                //this.$store.dispatch('loadKPIquarter');

                
            },
 
         
           
            kpi_status() {
                var kpi_value = this.$store.state.kpi_value
                var kpi_status = (kpi_value.length > 0) ? (kpi_value[0]['acc_value'] - this.min_allowed1()) / (kpi_value[0]['target_value'] - this.min_allowed1()) : '';
                if (kpi_status != '') {
                    kpi_status = (kpi_status) ? kpi_status.toFixed(2) : '';
                    return kpi_status;
                }
            },
            mtp_options() {
                var mtp_options = this.$store.state.kpi_mtp.map(function (item) {
                    console.log(item);
                    return {
                        //value: item.id,
                        value: item.value,
                        text: item.text
                    }
                });
                return mtp_options

            },
            periodicity_options() {
                var options = [{value: 1, text: this.get_text('none@gaugechart@l')},
                    {value: 3, text: this.get_text('quarter@gaugechart@l')},
                    {value: 6, text: this.get_text('semi_annual@gaugechart@l')},
                    {value: 12, text: this.get_text('annual@gaugechart@l')},
                    {value: 36, text: this.get_text('every_3_years@gaugechart@l')},]
                return options;
            },
            target_diff() {
                var kpi_name = this.$store.state.kpi_value;
                return (kpi_name.length > 0) ? (kpi_name[0].target_value - kpi_name[0].last_value) : '';
            },
            quarter_map_values(){

              return (this.$store.state.kpi_quarter_map.length>0)?  (this.$store.state.kpi_quarter_map):0
               
                

            },
            styles()
            {
                var styles={
                    'font-size':'11px',
                    'padding-left': '2px',
                    'padding-right': '2px',
                    'padding-top':'2px',
                    'padding-bottom':'2px',
                    'background-color':this.getQuarterMapColor(this.a),
                    'text-align':'center',
                }
                return styles;
            },
             from_mtp()
     {
    //    var kpi_value_from_mtp = this.$store.state.kpi_value
        var from_mtp= this.$store.state.kpi_value.length > 0 ?  this.$store.state.kpi_value[0]['mtp_start_date']: 'hi'
          return from_mtp;
     },
     to_mtp()
     {
    //    var kpi_value = 
        var to_mtp= this.$store.state.kpi_value.length > 0 ?this.$store.state.kpi_value[0]['mtp_end_name']:''
          return to_mtp;
     },
    

        },
       
         watch: {

    //   mtp_date: function () {
    //     if (this.mtp_date == true) {
    //      // this.$store.dispatch('loadKPI')
    //       this.$store.state.kpi_value[0]={}

    //     }
    //   },
    //getSelectedMTP
         },

        methods: {
              actual1() {
                var kpi_name = this.$store.state.kpi_value
                var actual1 = (kpi_name.length > 0 && kpi_name[0]['acc_value']!= null) ? kpi_name[0]['acc_value'].toFixed(2) : '';
                return actual1
            },
           target1() {
                var kpi_target_value = (this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['target_value'] != null) ? (this.$store.state.kpi_value[0]['target_value']).toFixed(2) : '';
              
                return kpi_target_value

            },
             

        getSelectedMTP(){
               // alert(this.periodicity);
                var url = window.location.pathname;
                var kpi_id = url.substring(url.lastIndexOf('/') + 1);
                // this.$store.state.kpi_value[0]={}
               // alert(this.periodicity)
                   this.$store.dispatch('loadKPIvalue', [this.mtp_date,kpi_id,this.periodicity]);
                               this.$store.dispatch('loadKPIquarter',[this.target_id])

                   
       },
   

            get_text(textbit) {
                var transtext = this.$store.state.translations[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if (spliteText.length > 2) {
                        var newTxt = (spliteText[0] + '@' + 'l');
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
            getUpToDateStatus: function () {

                if (this.last_value) {
                    return '<i class="fa fa-check-circle-o fa-lg" style="color:green"></i>'
                }

                else {
                    return '<i class="fa fa-circle-o fa-lg" style="color:red"></i>'
                }


            },
            loaded: function (args) {
                var printButton = document.getElementById("myPrntbtn");
                printButton.style.visibility = 'hidden';
                window.print()
                printButton.style.visibility = 'visible';

            },
            min_allowed1() {
                var kpi_name = this.$store.state.kpi_value;
                var kpi_min_allowed = (kpi_name.length > 0) ? ((kpi_name[0]['target_value']) * (1 - kpi_name[0]['margin_pct'])) : 0;
                var kpi_value_type = (kpi_name.length > 0) ? kpi_name[0]['value_type'] : '';
                // var kpi_improved = (kpi_name.length > 0) ? ((kpi_name[0]['acc_value']) * (1 + kpi_name[0]['margin_pct'])) : ''

                // if (kpi_value_type != 1) {
                //     // kpi_improved=kpi_name[0].improved_value
                //     kpi_min_allowed = (kpi_min_allowed / kpi_improved) * 100
                // }
                kpi_min_allowed = kpi_min_allowed.toFixed(2)
                return kpi_min_allowed
            },
            
            improved1() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = (kpi_name.length > 0) ? (kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct'])) : 0;
                kpi_improved = kpi_improved.toFixed(2)
                return kpi_improved
            },
           
            getKpiStatusRangeColor: function() {

                if(this.kpi_status !='' && this.kpi_status<0)
                    return 'red';

                else if(this.kpi_status !='' && (this.kpi_status>=0) && (this.kpi_status<=84 ))
                    return '#FFA500';

                else if(this.kpi_status !='' && (this.kpi_status>=84.1) && (this.kpi_status<100))
                    return '#90EE90';

                else if(this.kpi_status !='' && (this.kpi_status==100))
                    return 'green';

                else if(this.kpi_status !='' && (this.kpi_status>=101) && (this.kpi_status<=200))
                    return 'blue';

                else if(this.kpi_status !='' && (this.kpi_status>=201))
                    return 'red';


                else
                    return ''

            },

             getQuarterMapColor: function(a) {
                 //alert(a)

                if(this.a !='' && this.a<0)
                    return 'red';

                else if(this.a !='' && (this.a>=0) && (this.a<=84 ))
                    return '#FFA500';

                else if(this.a !='' && (this.a>=84.1) && (this.a<100))
                    return '#90EE90';

                else if(this.a !='' && (this.a==100))
                    return 'green';

                else if(this.a !='' && (this.a>=101) && (this.a<=200))
                    return 'blue';

                else if(this.a !='' && (this.a>=201))
                    return 'red';


                else
                    return ''

            },
 
        }
    }
</script>
<style>
@media print {
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
       transform: scale(0.7) translate(50px,-100px) ;
             
  }

  .row{
    max-height: 50%;
    
  }
  
  .donut-head
  {
 padding-left: 200px;
 margin-left: 10px; 
 transform: scale(0.9);
  }
 
 .donut{ 
   display:block;
   /* padding-left: 300px; */
   margin-left: 10px; 
   /* max-width: 80%; */
   transform: scale(0.7) translate(290px,0px) ;
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
           /* max-width: 80%; */
   /* margin-left:5px; */
    }
 
  
 svg{
padding-right:100px;
max-height: 350px;
/* padding-bottom: 0%;
margin-bottom: 0%;
margin-right: 0%;
padding-right:0%; */

/* float:right; */
   transform:scale(0.5) translate(100px, -110px) ;
   
  
} 



/** Seitenränder einstellen */       
@page { size: auto;  margin: 0mm; }
 .sidebar,.breadcrumb{
display: none;
}
}


</style>
