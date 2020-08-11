<template>
    <div id="app">
        <!-- <div class='wrapper'> -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" style="text-align:left"> {{ this.get_text('kpi_quick_view@gaugechart@l')}}

                        <!-- {{ periodicity}} -->
                        <!-- {{this.kpi}} -->
                        <!-- {{this.$store.state.kpi_value[0]}} -->

                        <b-dropdown id="dropdown-1" text="" class="m-md-2" auto-close="disabled" ref="dropdown">
                            <b-dropdown-form style="width:300px;">
                                <b-form-group horizontal :label="get_text('mtp@gaugechart@l')">
                                    <b-form-select v-model="mtp_date" :options="mtp_options"
                                                   v-on:change=" showingdropModal=false; getSelectedMTP()">
                                        <option slot="first" :value="null">-- اختر --</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-form style="width: 300px;">
                                <b-form-group horizontal :label="get_text('periodicity@gaugechart@l')">
                                    <b-form-select v-model="periodicity" :options="periodicity_options"
                                                   v-on:change="showingdropModal=true; getSelectedMTP()">
                                        
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
                                    <!-- <strong>{{this.get_text('up_to_date_status@gaugechart@l') }}</strong> -->
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
                                        {{ this.get_text('last_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['last_value']: '' }}
                                </b-col>
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
                                        {{ this.get_text('last_year_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['prev_year_value']: '' }}
                                </b-col>
                            </b-row>
                            <br>
                            
                            <b-row>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('value_targetted@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['target_value'].toFixed(2): '' }}
                                    <div v-if="this.$store.state.kpi_value.length > 0">
                                        <span v-if="this.$store.state.kpi_value[0]['value_type'] ==2 ">%</span>
                                    </div>
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
                        <b-container class="bv-example-row" dir="ltr">
                            <b-row>
                                <b-col class="donut">
                                    <strong style="text-align:center;" class="donut-head"> {{
                                        this.get_text('metrics@gaugechart@l') }}</strong>
                                    
                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">
                                                <div v-if=" this.$store.state.kpi_value.length > 0 ">
                                                    <div v-if="this.$store.state.kpi_value[0]['value_type'] !=2">
                                                        {{ this.min_allowed1() }}
                                                    </div>
                                                
                                                <div v-else>
                                                    {{ this.min_allowed1() }}%
                                                </div>
                                                </div>
                                            </div>
                                            <div v-if="this.min_allowed1()">
                                                <doughnut-example1 :chartdata=this.min_allowed1()
                                                                   :improved=this.improved1()
                                                                   chartId="chart-doughnut-01" height="150px"/>
                                            </div>
                                        </div>
                                    </b-row>
`                                    <br>`
                                    <!-- <div v-if=" this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1 "
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.min_allowed1()}}
                                    </div> -->

                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">

                                                <div v-if=" this.$store.state.kpi_value.length > 0">
                                                    <div v-if="this.$store.state.kpi_value[0]['value_type'] !=2">
                                                        {{this.target1()}}
                                                    </div>
                                                
                                                <div v-else>
                                                    %{{this.target1()}}
                                                </div>
                                                </div>
                                            </div>
                                            <doughnut-example2 :chartdata=this.target1() :improved=this.improved1()
                                                               chartId="chart-doughnut-02"
                                                               height="150px"/>
                                        </div>
                                    </b-row>
                                    <br>
                                    <!-- <div v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1"
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.target1()}}
                                    </div> -->
                                    <br>
                                    <b-row>
                                        <div class="chart-wrapper">
                                            <div style="width: 100%; height: 40px; position: relative; top: 50%; right: 100px; margin-top: -20px; line-height:85px; text-align: center; margin-left: 25%">
                                                <div v-if=" this.$store.state.kpi_value.length > 0 ">
                                                    <div v-if="this.$store.state.kpi_value[0]['value_type'] !=2">
                                                        {{this.improved1()}}
                                                    </div>
                                                
                                                <div v-else>
                                                    {{this.improved1()}}%
                                                </div>
                                            </div>
                                            </div>
                                            <doughnut-example3 :chartdata=this.improved1() chartId="chart-doughnut-03"
                                                               height="150px"/>
                                        </div>
                                    </b-row>
                                    <br>
                                    <!-- <div v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=1"
                                         style="text-align:center;">
                                        {{this.get_text('value@gaugechart@l')}}:{{this.improved1()}}
                                    </div> -->
                                    
                                </b-col>
                                <b-col>
                                    <!-- <b-card header="KPI Status"> -->
                                    <b-row>
                                        <b-col style="text-align:center;">{{ this.get_text('kpi performance@gaugechart@l') }}
                                            &nbsp;&nbsp;%
                                            <strong> {{kpi_status}}</strong>&nbsp;
                                            <!-- <span v-html="getKpiStatusColor()"></span> -->
                                        </b-col>
                                        <!-- <b-col>{{ this.get_text('to_target@gaugechart@l') }} <strong>                                                 
                                            {{target_diff}}</strong>
                                        </b-col> -->

                                    </b-row>
                                    <br>

                                    <circulargauge ref="circulargauge1" :target=this.target1() :actual=this.actual1()
                                                   :improved=this.improved2()
                                                   :kpi_status=this.kpi_status></circulargauge>
                                    <!-- <circulargauge></circulargauge> -->

                                    <div class="quarter-map1" v-if="periodicity == 3">
                                        <!-- {{periodicity}} -->
                                        <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map" :key="index">
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                    <div class="card-body" v-bind:style="styles(mapVal['q1_value'])">
                                                        <div class="quarter-map">{{ get_text('target@gaugechart@l') }}
                                                            %{{(mapVal['q1_target'])}}
                                                            <!-- {{seta(mapVal['q'+(cc)+'_value'])}} -->
                                                           <span v-if="((mapVal['q1_target']!=null) && (mapVal['q1_value']!=null))>0">
                                                            <span v-if="((mapVal['q1_target'])-(mapVal['q1_value']))>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="((mapVal['q1_target'])-(mapVal['q1_value']))<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="((mapVal['q1_target'])-(mapVal['q1_value']))==0"><i
                                                                    class="fa fa-check"></i></span>
                                                           </span>
                                                                    </div>
                                                        <div class="quarter-map">{{ get_text('actual@gaugechart@l') }}
                                                            %{{(mapVal['q1_value'])}}
                                                        </div>
                                                        <div id="progress_bar1"
                                                             class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:(mapVal['q1_value']) + '%'}"
                                                                 :aria-valuenow="(mapVal['q1_value'])"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                    <div class="card-body" :style="styles(mapVal['q2_value'])">
                                                        <div class="quarter-map">{{ get_text('target@gaugechart@l') }}
                                                            %{{(mapVal['q2_target'])}}
                                                            <!-- {{seta(mapVal['q'+(cc)+'_value'])}} -->
                                                           <span v-if="((mapVal['q2_target']!=null) && (mapVal['q2_value']!=null))>0">
                                                           <span v-if="((mapVal['q2_target'])-(mapVal['q2_value']))>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="((mapVal['q2_target'])-(mapVal['q2_value']))<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="((mapVal['q2_target'])-(mapVal['q2_value']))==0"><i
                                                                    class="fa fa-check"></i></span>
                                                           </span>
                                                                    </div>
                                                        <div class="quarter-map">{{ get_text('actual@gaugechart@l') }}
                                                            %{{(mapVal['q2_value'])}}
                                                        </div>
                                                        <div id="progress_bar2"
                                                             class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:(mapVal['q2_value']) + '%'}"
                                                                 :aria-valuenow="(mapVal['q2_value'])"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                    <div class="card-body" :style="styles(mapVal['q3_value'])">
                                                        <div class="quarter-map">{{ get_text('target@gaugechart@l') }}
                                                            %{{(mapVal['q3_target'])}}
                                                            <!-- {{seta(mapVal['q'+(cc)+'_value'])}} -->
                                                            <span v-if="((mapVal['q3_target']!=null) && (mapVal['q3_value']!=null))>0">

                                                            <span v-if="((mapVal['q3_target'])-(mapVal['q3_value']))>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="((mapVal['q3_target'])-(mapVal['q3_value']))<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="((mapVal['q3_target'])-(mapVal['q3_value']))==0"><i
                                                                    class="fa fa-check"></i></span>
                                                            </span>
                                                                    </div>
                                                        <div class="quarter-map">{{ get_text('actual@gaugechart@l') }}
                                                            %{{(mapVal['q3_value'])}}
                                                        </div>
                                                        <div id="progress_bar3"
                                                             class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:(mapVal['q3_value']) + '%'}"
                                                                 :aria-valuenow="(mapVal['q3_value'])"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                    <div class="card-body" :style="styles(mapVal['q4_value'])">
                                                        <div class="quarter-map">{{ get_text('target@gaugechart@l') }}
                                                            %{{(mapVal['q4_target'])}}
                                                            <!-- {{seta(mapVal['q'+(cc)+'_value'])}} -->
                                                           <span v-if="((mapVal['q4_target']!=null) && (mapVal['q4_value']!=null))>0">
                                                            <span v-if="((mapVal['q4_target'])-(mapVal['q4_value']))>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="((mapVal['q4_target'])-(mapVal['q4_value']))<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="((mapVal['q4_target'])-(mapVal['q4_value']))==0"><i
                                                                    class="fa fa-check"></i></span>
                                                           </span>
                                                                    </div>
                                                        <div class="quarter-map">{{ get_text('actual@gaugechart@l') }}
                                                            %{{(mapVal['q4_value'])}}
                                                        </div>
                                                        <div id="progress_bar4"
                                                             class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:(mapVal['q4_value']) + '%'}"
                                                                 :aria-valuenow="(mapVal['q4_value'])"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="quarter-map1" v-else-if="periodicity == 6">
                                        <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map" :key="index">
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;">
                                                    <div class="card-body" :style="styles(mapVal['h1_value'])">
                                                        <div>{{ get_text('target@gaugechart@l') }}
                                                            %{{mapVal['h1_target']}}
                                                            <span v-if="((mapVal['h1_target']!=null) && (mapVal['h1_value']!=null))>0">
                                                            <span v-if="mapVal['h1_target']-mapVal['h1_value']>0">
                                                                <i class="fa fa-angle-down"></i>
                                                            </span>
                                                            <span v-else-if="mapVal['h1_target']-mapVal['h1_value']<0">
                                                                <i class="fa fa-angle-up"></i>
                                                            </span>
                                                            <span v-if="mapVal['h1_target']-mapVal['h1_value']==0">
                                                                <i class="fa fa-check"></i>
                                                            </span>
                                                            </span>
                                                        </div>
                                                        <div>{{ get_text('actual@gaugechart@l') }}
                                                            %{{mapVal['h1_value']}}
                                                        </div>
                                                        <div class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:mapVal['h1_value'] + '%'}"
                                                                 v-bind:aria-valuenow="mapVal['h1_value']"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;">
                                                    <div class="card-body" :style="styles(mapVal['h2_value'])">
                                                        <div>{{ get_text('target@gaugechart@l') }}
                                                            %{{mapVal['h2_target']}}
                                                         <span v-if="((mapVal['h2_target']!=null) && (mapVal['h2_value']!=null))>0">
                                                            <span
                                                                    v-if="mapVal['h2_target']-mapVal['h2_value']>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="mapVal['h2_target']-mapVal['h2_value']<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="mapVal['h2_target']-mapVal['h2_value']==0"><i
                                                                    class="fa fa-check"></i></span>
                                                         </span>
                                                                    </div>
                                                        <div>{{ get_text('actual@gaugechart@l') }}
                                                            %{{mapVal['h2_value']}}
                                                        </div>
                                                        <div class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:mapVal['h2_value'] + '%'}"
                                                                 v-bind:aria-valuenow="mapVal['h2_value']"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="quarter-map1" v-else-if="periodicity == 12 || periodicity == 36">
                                        <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map" :key="index">
                                            <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                <div class="card text-black " style="margin-bottom:2px;">
                                                    <div class="card-body" v-bind:style="styles(mapVal['y_value'])">
                                                        <div>{{ get_text('target@gaugechart@l') }}
                                                            %{{mapVal['y_target']}}
                                                             <span v-if="((mapVal['y_target']!=null) && (mapVal['y_value']!=null))>0">
                                                            <span
                                                                    v-if="mapVal['y_target']-mapVal['y_value']>0"><i
                                                                    class="fa fa-angle-down"></i></span> <span
                                                                    v-else-if="mapVal['y_target']-mapVal['y_value']<0"><i
                                                                    class="fa fa-angle-up"></i></span> <span
                                                                    v-if="mapVal['y_target']-mapVal['y_value']==0"><i
                                                                    class="fa fa-check"></i></span>
                                                             </span>
                                                                    </div>
                                                        <div>{{ get_text('actual@gaugechart@l') }}
                                                            %{{mapVal['y_value']}}
                                                        </div>
                                                        <div class="progress progress-white progress-xs my-2">
                                                            <div class="progress-bar" role="progressbar"
                                                                 :style="{width:mapVal['y_value'] + '%'}"
                                                                 v-bind:aria-valuenow="mapVal['y_value']"
                                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="quarter-map1" v-else>
                                        
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
                periodicity: 3,
                mtp_date: 4,
                kpi_id: this.$store.state.kpi_id,
                a: '',
                showingdropModal:false,
                // t:'',
                // rc:3,
                // cc:4,
            }
        },
        
        beforeCreate()
        {
               this.$store.dispatch('translation');
            var url = window.location.pathname;
            var kpi_id = url.substring(url.lastIndexOf('/') + 1);
            this.$store.dispatch('loadMTP');
            this.$store.dispatch('loadKPIvalue', [4, kpi_id, 3]);                          
            
 
        },
        // beforeMount() {
         
        //      var targetVal = (typeof this.target_id != "undefined" && this.target_id != '') ? this.target_id : 0;
        //         this.$store.dispatch('loadKPIquarter', [targetVal])




        // },


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
        watch: {

            a: function () {
                a = this.a
                getQuarterMapColor();


            },
            mtp_date: function () {
                mtp_date = this.mtp_date;
                periodicity = this.periodicity;
                target_id = this.target_id;
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
                //this.$store.dispatch('loadKPIquarter', [this.target_id])
                //this.getSelectedMTP()
            },
            periodicity: function () {
                mtp_date = this.mtp_date;
                periodicity = this.periodicity;
                target_id = this.target_id;
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
               // this.$store.dispatch('loadKPIquarter', [this.target_id])
               // this.getSelectedMTP()
            },
            target_id: function () {

                mtp_date = this.mtp_date;
                periodicity = this.periodicity;
                target_id = this.target_id;
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
                //this.$store.dispatch('loadKPIquarter', [this.target_id])

               // this.getSelectedMTP()

            }
        },
        computed: {
            target_id() {
                var kpi_av_value = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['kpi_target_id'] : ''
                return kpi_av_value;
                //this.$store.dispatch('loadKPIquarter');


            },


            kpi_status() {
                var kpi_value = this.$store.state.kpi_value
                var kpi_status = (kpi_value.length > 0) ?(kpi_value[0]['acc_value'] - this.min_allowed1()) / (kpi_value[0]['target_value'] - this.min_allowed1()) : '';
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
                var options = [,
                    {value: 3, text:this.get_text('quarter@gaugechart@l')},
                    {value: 6, text:this.get_text('semi_annual@gaugechart@l')},
                    {value: 12, text:this.get_text('annual@gaugechart@l')},
                    {value: 36, text:this.get_text('every_3_years@gaugechart@l')},]
                return options;
            },
            target_diff() {
                var kpi_name = this.$store.state.kpi_value;
                return (kpi_name.length > 0) ? (kpi_name[0].target_value - kpi_name[0].last_value).toFixed(2) : '';
            },
            quarter_map_values() {

                return (this.$store.state.kpi_quarter_map.length > 0) ? (this.$store.state.kpi_quarter_map) : ''


            },
            from_mtp() {
                //    var kpi_value_from_mtp = this.$store.state.kpi_value
                var from_mtp = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['mtp_start_date'] : ''
                return from_mtp;
            },
            to_mtp() {
                //    var kpi_value =
                var to_mtp = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['mtp_end_name'] : ''
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
            styles(a) {
               // alert(a);
                var styles = {
                    'font-size': '11px',
                    'padding-left': '2px',
                    'padding-right': '2px',
                    'padding-top': '2px',
                    'padding-bottom': '2px',
                    'background-color': (
                        (a != null && a < 0) ?  "#cc043e" :
                            ((a != null && a >= 0 && a <= 84) ? "#FF3333" :
                                ((a != null && (a >= 84.1) && (a < 100)) ? "#63b23c" :
                                    ((a != null && (a == 100))) ? "#01996d" :
                                        (a != null && (a >= 101) && (a <= 200)) ? "#0475CC" :
                                            ((a != null && (a >= 201)) ? "blue" : ""))))
                    ,
                    'text-align': 'center',
                }
                return styles;
            },
            actual1() {
                var kpi_name = this.$store.state.kpi_value
                var actual1 = (kpi_name.length > 0 && kpi_name[0]['acc_value'] != null) ? kpi_name[0]['acc_value'].toFixed(2) : '';
                return actual1
            },
            target1() {
                // var kpi_name = this.$store.state.kpi_value
                var kpi_target_value = (this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['target_value'] != null) ? (this.$store.state.kpi_value[0]['target_value']).toFixed(2) : '';
                // var kpi_improved = (kpi_name.length > 0) ? (kpi_name[0]['acc_value'] * (1 + kpi_name[0]['margin_pct'])) : '';
                //var kpi_value_type = (kpi_name.length > 0) ? kpi_name[0]['value_type'] : '';
                // if (kpi_value_type != 1) {
                //     kpi_target_value = (kpi_target_value / kpi_improved) * 100
                // }
                // kpi_target_value = kpi_target_value
                return kpi_target_value

            },


            getSelectedMTP() {
                //alert(this.periodicity);
                var url = window.location.pathname;
                var kpi_id = url.substring(url.lastIndexOf('/') + 1);
                // this.$store.state.kpi_value[0]={}
                // alert(this.periodicity)
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
                var targetVal = (typeof this.target_id != "undefined" && this.target_id != '') ? this.target_id : 0;
               // this.$store.dispatch('loadKPIquarter', [targetVal])
              if(this.showingdropModal)
              {
              this.$refs.dropdown.hide(true)
              showingdropModal = false; 
              }

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

                 //  var last_value1= this.$store.state.kpi_value[0]['last_value']

                 if ((this.$store.state.kpi_value[0]['last_value_date']>= this.$store.state.kpi_value[0]['due_value_date']) || (this.$store.state.kpi_value[0]['due_value_date'] == null))
                 {
                     return '<font color="green">'+this.get_text('updated_reading@gaugechart@l')+'</font>' ;
                 }
                // : -> updated_reading (green)
	            else{
                    return '<font color="red">'+this.get_text('out_of_date_reading@gaugechart@l')+'</font>'
                    }//: out_of_date_reading (red)
                // if (this.last_value1) {
                //     return '<i class="fa fa-check-circle-o fa-lg" style="color:#01996d"></i>'
                // }

                // else {
                //     return '<i class="fa fa-circle-o fa-lg" style="color: #cc043e"></i>'
                // }


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

            improved2() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = (kpi_name.length > 0) ? ((kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct']))) : 0;
                kpi_improved = kpi_improved.toFixed(2)
                //maximum=(130/kpi_improved
                return kpi_improved
            },

            getKpiStatusRangeColor: function () {

                if (this.kpi_status != '' && this.kpi_status < 0)
                    return ' #cc043e';

                else if (this.kpi_status != '' && (this.kpi_status >= 0) && (this.kpi_status <= 84))
                    return '#FF3333';

                else if (this.kpi_status != '' && (this.kpi_status >= 84.1) && (this.kpi_status < 100))
                    return '#63b23c';

                else if (this.kpi_status != '' && (this.kpi_status == 100))
                    return '#01996d';

                else if (this.kpi_status != '' && (this.kpi_status >= 101) && (this.kpi_status <= 200))
                    return '#0475CC';

                else if (this.kpi_status != '' && (this.kpi_status >= 201))
                    return 'blue';


                else
                    return ''

            },

            getQuarterMapColor: function (a) {

                if (this.a != '' && this.a < 0)
                    return ' #cc043e';

                else if (this.a != '' && (this.a >= 0) && (this.a <= 84)) {
                    return '#FF3333';
                }

                else if (this.a != '' && (this.a >= 84.1) && (this.a < 100))
                    return '#63b23c';

                else if (this.a != '' && (this.a == 100))
                    return '#01996d';

                else if (this.a != '' && (this.a >= 101) && (this.a <= 200))
                    return '#0475CC';

                else if (this.a != '' && (this.a >= 201))
                    return 'blue';


                else
                    return ''

            },

        }
    }
</script>
<style>
   @media print {
          
         
 .quarter-map1 {
             /* display:block; */
          /* max-height: 50%;
           padding-top: 0%;
           margin-top: 0%;
           padding-bottom: 80%; */
            /* transform: scale(0.5) translate(-100px, -100px); */
            /* margin-right: 100px; */
            padding-right: 100px;

        }
          

          svg {
            padding-right: 100px;
            max-height: 350px;
            /* padding-bottom: 0%;
            margin-bottom: 0%;
            margin-right: 0%;
            padding-right:0%; */

            /* float:right; */
            transform: scale(0.7) translate(80px, -200px);

        }

        .col-2 {
            /* max-width: 11%; */
            font-size: 10px;
        }

        @page {
            size: auto;
            margin: 0mm;
        }

        .sidebar, .breadcrumb {
            display: none;
        }


   }
   .donut-head {
            /* padding-left: 200px;
            margin-left: 10px;
            transform: scale(0.9); */
            text-align: center;
        }
 svg {
            /* padding-right: 100px; */
            max-height: 350px;
            /* padding-bottom: 0%;
            margin-bottom: 0%;
            margin-right: 0%;
            padding-right:0%; */

            /* float:right; */
            transform: scale(0.7) translate(20px, -110px);

        }

 .quarter-map1 {
            /* display:block;
           max-height: 50%;
           padding-top: 0%;
           margin-top: 0%;
           padding-bottom: 80%; */
            transform: scale(0.95) translate(0px, -100px);

        }

        .donut {
            /* display: block; */
            /* padding-left: 300px; */
            /* margin-left: 10px; */
            /* max-width: 80%; */
            text-align: center;
            transform: scale(0.90) translate(-50px, -100px);
        }
        .row{
            max-height: 18%;
        }
        .col-2{
            max-height: 25px;
        }

</style>
