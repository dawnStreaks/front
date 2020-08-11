<template>
  <div class="app animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>


    <div class="card" id="dropdown1">
      <div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">

        <b-link v-if="this.routelink" :href=this.routelink variant="warning" size="md" class="btn float-right"

                style="background-color:#ffc107;margin-top: 0.5%;"
                :class="($i18n.locale=='en' ? 'ltrclassbck' : 'rtlclassbck')">
          <b><i class="fa fa-arrow-left"></i>{{
            get_text('back@department_performance@l') }}</b></b-link>
      </div>
      <div class="card-header">
        {{
        get_text('title@section_performance@l') }}
        <div class="card-header-actions">
          <div class="row">
            <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
              <i class="icon-arrow-up"></i>
            </b-link>
            <b-link class="card-header-action btn-close" href="#" v-on:click="printdeptperf('sectiontreemap')">
              <i class="icon-printer"></i>
            </b-link>
          </div>
        </div>
      </div>

      <b-collapse id="collapse1" style="display: block;">
        <div class="card-body">
          <b-row>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('sector@section_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="this.$store.state.setTenant" @change="getsubtenants(sortByTenant)"
                                 v-model="sortByTenant">
                    <option :value="null" slot="first">{{
                      get_text('please_select@section_performance@l') }}
                    </option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('subtenant@section_performance@l')" horizontal>
<!--                <b-input-group>-->
<!--                  <b-form-select :options="this.$store.state.setSubTenant" @change="getsectiontreemap"-->
<!--                                 v-model="sortBySubTenant">-->
<!--                    <option :value="null" slot="first">{{-->
<!--                      get_text('please_select@section_performance@l')-->
<!--                      }}-->
<!--                    </option>-->
<!--                  </b-form-select>-->
<!--                </b-input-group>-->
                <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')" searchable="searchable" :options="options" v-model="sortBySubTenant" :normalizer="normalizer"  @input="getsectiontreemap" />

              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('mtp@section_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="this.$store.state.kpi_mtp" @change="getsectiontreemap" v-model="sortByMtp">

                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('year_no@section_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="[
                                            {
                                              text: get_text('please_select@section_performance@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('year1@section_performance@l'),
                                              value: '1'
                                            }, {
                                              text: get_text('year2@section_performance@l'),
                                              value: '2'
                                            }, {
                                              text: get_text('year3@section_performance@l'),
                                              value: '3'
                                            },


                                            ]" @change=""
                                 v-model="sortByyearno">

                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('as_of_period@section_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="[
                                            {
                                              text: get_text('please_select@kpi_def@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('1st_quarter@section_performance@l'),
                                              value: 'Q1'
                                            }, {
                                              text: get_text('2nd_quarter@section_performance@l'),
                                              value: 'Q2'
                                            }, {
                                              text: get_text('3rd_quarter@section_performance@l'),
                                              value: 'Q3'
                                            },
                                            {
                                              text: get_text('4th_quarter@section_performance@l'),
                                              value: 'Q4'
                                            },
                                            {
                                              text: get_text('1st_biannual@section_performance@l'),
                                              value: 'H1'
                                            },
                                            {
                                              text: get_text('2nd_biannual@section_performance@l'),
                                              value: 'H2'
                                            },
                                            {
                                              text: get_text('annual@section_performance@l'),
                                              value: 'Y'
                                            }

                                            ]" @change="getsectiontreemap"
                                 v-model="sortByasofperiod">

                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>


          </b-row>
        </div>
      </b-collapse>
    </div>
    <div id="sectiontreemap" v-if="this.dataSource">
      <!--                   <div id="sectiontreemap" >-->

      <b-row>
        <b-col lg="4" sm="4">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              &nbsp;&nbsp; <span class="text-white">{{get_text('period@section_performance@l')}} </span>&nbsp;&nbsp;
              <i class="fas fa-info"></i>
              <div class="chart-wrapper">
                <!--                <social-box-chart-example :data="[50, 50, 50, 50, 50, 50]" chartId="box-chart-01"-->
                <!--                                          height="90"/>-->
              </div>
            </div>
            <div class="brand-card-body">
              <div>
                <div class="text-value">{{ get_text(this.yearselect)}}({{ get_text(this.periodselect)}})
                </div>
                <!--  -->
                <div class="text-muted small">{{get_text('period@section_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ this.totalkpi}}
                </div>
                <div class="text-muted small">{{get_text('kpi_count@section_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4" sm="4">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              &nbsp;&nbsp; <span class="text-white">{{get_text('uptodate_nonuptodate@section_performance@l')}} </span>&nbsp;&nbsp;
              <i class="fas fa-route"></i>
              <div class="chart-wrapper">
                <!--                <social-box-chart-example :data="[50, 50, 50, 50, 50, 50]" chartId="box-chart-01"-->
                <!--                                          height="90"/>-->
              </div>
            </div>
            <div class="brand-card-body">
              <div>
                <div class="text-value">{{ this.uptodatecount}}
                </div>
                <!--  -->
                <div class="text-muted small">{{get_text('uptodate@section_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ this.nonuptodatecount}}
                </div>
                <div class="text-muted small">{{get_text('nonuptodatecount@section_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4" sm="4">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              &nbsp;&nbsp; <span
              class="text-white">{{get_text('performing_nonperforming@section_performance@l')}} </span>
              &nbsp;&nbsp;
              <i class="fas fa-star-half-alt"></i>
              <div class="chart-wrapper">
                <!--                <social-box-chart-example :data="[50,50,50,50,50,50]" chartId="box-chart-02" height="90"/>-->
              </div>
            </div>
            <div class="brand-card-body">
              <div>
                <div class="text-value"> {{ this.performingkpicount}}
                </div>
                <div class="text-muted small">{{get_text('performing@section_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ this.nonperformingkpicount}}
                </div>
                <div class="text-muted small">{{get_text('non_performing@section_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>


      </b-row>
      <b-row style="background-color: #ffffff;margin:0;padding-top:10px;">

        <div class="col-lg-9 control-section" style="padding-top: 20px;direction: ltr">
          <div style=""
               class="text-muted font-weight-bold">{{this.get_text('section_performance@section_performance@l')}}
          </div>
          <!--       <ejs-treemap ref="treemap" id='layout-container' :load='load' align="center" :titleSettings='titleSettings' :rangeColorValuePath='rangeColorValuePath' format='n' useGroupingSeparator='useGroupingSeparator' :dataSource='dataSource' :leafItemSettings='leafItemSettings' :tooltipSettings='tooltipSettings' :weightValuePath='weightValuePath'></ejs-treemap>-->
          <ejs-treemap v-if="$i18n.locale=='en'" :enableRtl='enableRtl1' :renderDirection='renderDirection1'
                       :dataSource='dataSource' :leafItemSettings='leafItemSettingsval' :load='load'
                       :rangeColorValuePath='rangeColorValuePath'
                       :tooltipSettings='tooltipSettingsval' :weightValuePath='weightValuePath' align="center"
                       format='n'
                       id='layout-container' ref="treemap" useGroupingSeparator='useGroupingSeparator'></ejs-treemap>
          <ejs-treemap v-if="$i18n.locale=='ar'" :enableRtl='enableRtl' :renderDirection='renderDirection'
                       :dataSource='dataSource' :leafItemSettings='leafItemSettingsval1' :load='load'
                       :rangeColorValuePath='rangeColorValuePath'
                       :tooltipSettings='tooltipSettingsval1' :weightValuePath='weightValuePath' align="center"
                       format='n'
                       id='layout-container' ref="treemap" useGroupingSeparator='useGroupingSeparator'></ejs-treemap>

        </div>

        <div class="col-lg-3 property-section">


          <div class="text-muted font-weight-bold"
               style="padding-bottom:0px;margin-bottom:0px;padding-top: 10px;font-size: 0.875rem;color:#000000">
            {{this.get_text('unit_performance@department_performance@l')}}
          </div>

          <div class='wrapper' style="margin-top: 10px;border: 0px solid #c8ced3;">


            <ejs-circulargauge :enablePointerDrag='enablePointerDrag'

                               :tooltip='tooltip' align='center' id='tooltip-container' style='display:block'>
              <e-axes>
                <e-axis :annotations='annotations' :endAngle=90 :labelStyle='labelStyle' :lineStyle='lineStyle'
                        :majorTicks='majorTicks' :minorTicks='minorTicks' :radius='gaugeradius' :ranges='ranges'
                        :startAngle=270 maximum=100 minimum=0>
                  <e-pointers>
                    <e-pointer :animation='animation' :cap='cap' :color='color' :radius='pointerRadius'
                               :value='this.unitperformance'></e-pointer>
                  </e-pointers>
                </e-axis>
              </e-axes>
            </ejs-circulargauge>
            <div align="center" class="card" style="border:0px">
              {{ this.unitperformance+"%" }}
            </div>
            <div class="card" style="border: 0px" :class="($i18n.locale=='en' ? 'ltrclass' : 'rtlclass')">
              <div class="card-body p-0 d-flex align-items-center"
                   style="border: 1px solid #c8ced3;border-radius: 0.25rem;">
                <div style="width:20%;background-color: #cc163e;">&nbsp;
                </div>
                <div style="width:20%;background-color: #ffbd35">&nbsp;
                </div>
                <div style="width:20%;background-color: #f9ea60">&nbsp;
                </div>
                <div style="width:20%;background-color: #4dbb63">&nbsp;
                </div>
                <div style="width:20%;background-color: #1c8c44">&nbsp;
                </div>
              </div>
              <div class="card-body p-0 d-flex align-items-center" style="font-size:11px;border:0px">
                <div align="center" style="width:20%;">{{this.get_text('very_poor@section_performance@l')}}
                </div>
                <div align="center" style="width:20%;">{{this.get_text('poor@section_performance@l')}}
                </div>
                <div align="center" style="width:20%;">{{this.get_text('fair@section_performance@l')}}
                </div>
                <div align="center" style="width:20%;">{{this.get_text('good@section_performance@l')}}
                </div>
                <div align="center" style="width:20%;">{{this.get_text('excellent@section_performance@l')}}
                </div>
              </div>
            </div>

            <div class="card" style="margin-top:10px;">
              <div class="card-body p-0 d-flex align-items-center">
                <i class="fas fa-chart-line bg-danger p-4 font-2xl mr-3" style="background-color: #00aced !important;

                color: #fff;"></i>

                <div>
                  <div class="text-muted font-weight-bold" style="font-size: 0.875rem;">
                    {{get_text('unit_progress@section_performance@l')}}
                  </div>
                  <div class="text-value-sm text-danger">
                    <div class="text-value-sm" style="color:#00aced">{{this.unitprogress+"%"}}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>


        </div>
        <b-col style="margin-bottom:10px;margin-top:5px;"
               :class="this.type!=1 ? 'col-lg-9 property-section' : 'col-lg-8 property-section' ">
          <div class="text-value">{{get_text('issue_date@section_performance@l')}} : {{ this.currentdate}}</div>


        </b-col>
        <b-col style="margin-bottom:10px;">
          <div :class="($i18n.locale=='en' ? 'ltrclassicons' : 'rtlclassicons')" class="text-value"><i style="color:red"
                                                                                                       class="fas fa-exclamation-circle fa-1x"></i>
            : {{get_text('icon_legend_missing_readings@l')}}
            <br> <i style="color:red" class="fas fa-exclamation-triangle fa-1x"> </i> :
            {{get_text('icon_legend_wrong_perf_or_prog_data@l')}}

          </div>
        </b-col>

      </b-row>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {TreeMapPlugin, TreeMapTooltip, RenderingMode} from "@syncfusion/ej2-vue-treemap";
  import {CircularGaugePlugin, GaugeTooltip, Annotations} from "@syncfusion/ej2-vue-circulargauge";
  import {store} from '@/components/unitperformance/store';
  import SocialBoxChartExample from '../../views/dashboard/SocialBoxChartExample';
  //import treeselect from '../treeselect/treeselect'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  Vue.use(CircularGaugePlugin);
  Vue.use(TreeMapPlugin);
  let contentVue = Vue.component("contentTemplate", {
    template: '<div style="color:#ffffff" ><i v-if="data.kpi_up_to_date==0" class="fas fa-exclamation-circle fa-2x"></i><i v-if="data.debug_show_icon==1" style="color:#ffffff" class="fas fa-exclamation-triangle fa-2x"></i><br><a style="color:#ffffff;font-weight: bold" :href="+data.link">Quick View</a></div>',
    data() {
      return {
        data: {},

      };
    }
  });

  let contentTemplate = function () {
    return {template: contentVue};
  };
  export default {
    store: store,
    components: {
      SocialBoxChartExample,
      Treeselect
    },
    data: function () {

      return {
        annotations: [{
          content: '', zIndex: '1', angle: 180
        }],
        gaugeradius: '100%',
        startAngle: 240,
        endAngle: 120,
        lineStyle: {
          width: 0
        },
        majorTicks: {
          color: 'white',
          offset: -5,
          height: 12
        },
        minorTicks: {
          width: 0
        },

        labelStyle: {

          format: '{value}%',

          useRangeColor: false,
          font: {
            color: '#424242',
            size: '13px',
            fontFamily: 'Roboto'
          }
        },
        value: this.unitperformance,
        pointerRadius: '70%',
        color: '#5c9eb7',
        cap: {
          radius: 10,
          border: {
            color: '#5c9eb7',
            width: 5
          }
        },
        animation: {
          enable: true,
          duration: 1500
        },
        ranges: [{
          start: 0,
          end: 20,
          startWidth: 10,
          endWidth: 10,
          radius: '102%',
          color: '#cc163e',
        }, {
          start: 20,
          end: 40,
          radius: '102%',
          startWidth: 10,
          endWidth: 10,
          color: '#ffbd35',
        },
          {
            start: 40,
            end: 60,
            radius: '102%',
            startWidth: 10,
            endWidth: 10,
            color: '#f9ea60',
          },
          {
            start: 60,
            end: 80,
            radius: '102%',
            startWidth: 10,
            endWidth: 10,
            color: '#4dbb63',
          },
          {
            start: 80,
            end: 100,
            radius: '102%',
            startWidth: 10,
            endWidth: 10,
            color: '#1c8c44',
          }
        ],
        tooltip: {
          type: ['Pointer', 'Range', 'Annotation'],
          enable: true,
          enableAnimation: false,
          annotationSettings: {template: '<div>CircularGauge</div>'},
          rangeSettings: {fill: 'red'}
        },
        enablePointerDrag: true,

        showdepartment: 0,
        dataSource: '',

        palette: ["#f44336", "#29b6f6", "#ab47bc", "#ffc107", "#5c6bc0", "#009688"],


        weightValuePath: 'importance',
        renderDirection: 'TopRightBottomLeft',
        enableRtl: true,
        renderDirection1: 'TopLeftBottomRight',
        enableRtl1: false,

        rangeColorValuePath: 'performance',


        leafItemSettings1: {
          labelPath: 'KPIdata',
          labelPosition: 'TopRight',
          labelStyle: {
            color: '#000000'
          },

          labelTemplate: contentTemplate,
          border: {
            color: '#000000',
            width: 0.5
          },


          labelFormat: '<a href "">${KPIdata}</a><br>${performancetxt}<br>Weight : ${adjustedweight}<br>${progress}',
          colorMapping: [
            {
              from: 80,
              to: 100,
              color: '#1c8c44'
            },
            {
              from: 60,
              to: 80,
              color: '#4dbb63'
            },
            {
              from: 40,
              to: 60,
              color: '#f9ea60'
            },
            {
              from: 20,
              to: 40,
              color: '#ffbd35'
            },
            {
              from: 0,
              to: 20,
              color: '#cc163e'
            }
          ],
        },

        layoutModedata: [
          {Id: 'Squarified', level: 'Squarified'},
          {Id: 'SliceAndDiceHorizontal', level: 'Horizontal'},
          {Id: 'SliceAndDiceVertical', level: 'Vertical'},
          {Id: 'SliceAndDiceAuto', level: 'Auto'}],
        labelsfields: {text: 'level', value: 'Id'},
        layoutModeplaceholder: 'Select layoutMode type',
        layoutModewidth: 120,
        directionModedata: [
          {Id: 'TopLeftBottomRight', level: 'TopLeftBottomRight'},
          {Id: 'TopRightBottomLeft', level: 'TopRightBottomLeft'},
          {Id: 'BottomLeftTopRight', level: 'BottomLeftTopRight'},
          {Id: 'BottomRightTopLeft', level: 'BottomRightTopLeft'}],
        directionfields: {text: 'level', value: 'Id'},
        directionModeplaceholder: 'Select layoutMode type',
        directionModewidth: 115,
        name: '',
        translation: [],
        sortByTenant: null,
        sortBySubTenant: null,
        sortByusers: null,
        sortByyearno: null,
        sortByasofperiod: null,
        sortByMtp: 4,
        totalkpi: 0,
        acheivedcount: 0,
        uptodatecount: 0,
        unitperformance: 0,
        unitprogress: 0,
        performingkpicount: 0,
        nonperformingkpicount: 0,
        nonacheivedcount: 0,
        nonuptodatecount: 0,
        currentdate: '',
        //titleSettings: this.treemaptitle(),
        treemapttletext: '',
        periodtext: '',
        periodselect: '',
        yearselect: '',
        sectorback: '',
        supervisionback:'',
        ministryback:'',
        options:'',
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.tree,
          }
        },
      }
    },
    provide: {
      circulargauge: [GaugeTooltip, Annotations],
      treemap: [TreeMapTooltip]
    },
    mounted() {

      if (document.referrer.indexOf("departmentperformance") > -1) {
        this.showdepartment = 1;
      } else {
        this.showdepartment = 0;
      }
      var currentDate = new Date();

      console.log(currentDate);

      var currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      this.currentdate = currentDateWithFormat;
      //alert(currentDateWithFormat);
    },
    created() {

      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');


    },
    computed: {
      tooltipSettingsval() {
        var tooltipSettings = {
          visible: true,
          /*format: '<div><p>'+this.get_text("symbol@section_performance@l") + " : " + "${KPIdata}<br>" +
            this.get_text("performance@section_performance@l") + " : " + "${performancetxt}<br>" +
            this.get_text("weight@section_performance@l") +" : " + "${adjustedweight}<br>" +
            this.get_text("progress@section_performance@l") + " : " + "${progress}<br>"+
            this.get_text("name@section_performance@l") + ' :${KPIname}<br>' +
            this.get_text("weighted_performance@section_performance@l") + ' : ${weightedperformance}</p></div>',
        */
          template:
            '<div style="opacity: 0.9;padding-left:30px;padding-right:30px; border:2px solid;background-color:#403d39; color: #ffffff; width:auto; white-space: nowrap;">' +
            '<p style="padding-left:30px;padding-right:30px; text-align: left">' + this.get_text("symbol@section_performance@l") + ':${KPIdata}<br></bt>' +
            this.get_text("performance@section_performance@l") + ':${performancetxt}<br>' +
            this.get_text("weight@section_performance@l") + ':${adjustedweight}<br>' +
            this.get_text("progress@section_performance@l") + ':${progress}<br>' +
            this.get_text("name@section_performance@l") + ':(${KPIname})<br>' +
            this.get_text("weighted_performance@section_performance@l") + ':${weightedperformance}' +
            '</p></div>',
        }
        return tooltipSettings;
      },
      tooltipSettingsval1() {
        var tooltipSettings = {
          visible: true,
          enable: true,
          /*templet: '<div><p dir="ltr">'+this.get_text("symbol@section_performance@l") + " : " + "${KPIdata}<br>" +
            this.get_text("performance@section_performance@l") + " : " + "${performancetxt}<br>" +
            this.get_text("weight@section_performance@l") +" : " + "${adjustedweight}<br>" +
            this.get_text("progress@section_performance@l") + " : " + "${progress}<br>"+
            this.get_text("name@section_performance@l") + ' :${KPIname}<br>' +
            this.get_text("weighted_performance@section_performance@l") + ' : ${weightedperformance}</p></div>',
          */
          template:
            '<div style="padding-left:30px;padding-right:30px;opacity: 0.9; direction: rtl;border:2px solid;background-color:#403d39; color: #ffffff; width:auto; white-space: nowrap;">' +
            '<p style="padding-left:30px;padding-right:30px;text-align: right">' + this.get_text("symbol@section_performance@l") + ':${KPIdata}<br></bt>' +
            this.get_text("performance@section_performance@l") + ':${performancetxt}<br>' +
            this.get_text("weight@section_performance@l") + ':${adjustedweight}<br>' +
            this.get_text("progress@section_performance@l") + ':${progress}<br>' +
            this.get_text("name@section_performance@l") + ':(${KPIname})<br>' +
            this.get_text("weighted_performance@section_performance@l") + ':${weightedperformance}' +
            '</p></div>',

        }
        return tooltipSettings;
      },
      leafItemSettingsval1() {
        /*directionModedata: [
          {Id: 'TopLeftBottomRight', level: 'TopLeftBottomRight'},
          {Id: 'TopRightBottomLeft', level: 'TopRightBottomLeft'},
          {Id: 'BottomLeftTopRight', level: 'BottomLeftTopRight'},
          {Id: 'BottomRightTopLeft', level: 'BottomRightTopLeft'}],*/
        var leafItemSettings = {
          labelPath: 'KPIdata',
          labelPosition: 'TopRight',
          labelStyle: {
            color: '#000000',
            //size: '13px'
          },

          labelTemplate: '<div align="center">${button}<br><a style="color:#ffffff;font-weight: bold" href= "${link}">' + this.get_text('quick_view@section_performance@l') + '</a></div>',
          templatePosition: 'center',
          border: {
            color: '#000000',
            width: 0.5
          },


          labelFormat: this.get_text("symbol@section_performance@l") + " :" + "${KPIdata}<br>" +
            this.get_text("performance@section_performance@l") + " : " + "(${performancetxt})<br>" +
            this.get_text("weight@section_performance@l") + " : " + "(${adjustedweight})<br>" +
            this.get_text("progress@section_performance@l") + " : " + "(${progress})",
          colorMapping: [
            {
              from: 80,
              to: 100,
              color: '#1c8c44'
            },
            {
              from: 60,
              to: 80,
              color: '#4dbb63'
            },
            {
              from: 40,
              to: 60,
              color: '#f9ea60'
            },
            {
              from: 20,
              to: 40,
              color: '#ffbd35'
            },
            {
              from: 0,
              to: 20,
              color: '#cc163e'
            }
          ],
        };
        return leafItemSettings;
      },

      leafItemSettingsval() {
        var leafItemSettings = {
          labelPath: 'KPIdata',
          labelPosition: 'TopLeft',
          labelStyle: {
            color: '#000000'
          },

          // labelTemplate: contentTemplate,
          labelTemplate: '<div align="center">${button}<br><a style="color:#ffffff;font-weight: bold" href= "${link}">' + this.get_text('quick_view@section_performance@l') + '</a></div>',
          templatePosition: 'center',

          border: {
            color: '#000000',
            width: 0.5
          },


          labelFormat: this.get_text("symbol@section_performance@l") + ": " + "${KPIdata}<br>" + this.get_text("performance@section_performance@l") + ": " + "${performancetxt}<br>" + this.get_text("weight@section_performance@l") + ": " + "${adjustedweight}<br>" + this.get_text("progress@section_performance@l") + ": " + "${progress}",
          colorMapping: [
            {
              from: 80,
              to: 100,
              color: '#1c8c44'
            },
            {
              from: 60,
              to: 80,
              color: '#4dbb63'
            },
            {
              from: 40,
              to: 60,
              color: '#f9ea60'
            },
            {
              from: 20,
              to: 40,
              color: '#ffbd35'
            },
            {
              from: 0,
              to: 20,
              color: '#cc163e'
            }
          ],
        };
        return leafItemSettings;
      },
      treemaptitle() {
        var treemapttletext = {
          text: this.get_text('section_performance@section_performance@l'),
          textStyle: {size: '0.875rem'},
          position: 'Left'
        };
        return treemapttletext;
      }


    },
    beforeMount() {
      // alert(this.$auth.user().subtenant_id);
      var routeparams = this.$route.query.query;
      if (routeparams) {
        var routeparamsarr = routeparams.split(",");
        this.sortBySubTenant = routeparamsarr[0];
        this.sortByMtp = routeparamsarr[1];
        this.sortByasofperiod = routeparamsarr[2];
        this.sortByyearno = routeparamsarr[3];
        // (routeparamsarr[5]);alert
        if (routeparamsarr[5]) {
          var sectioncase = routeparamsarr[5].split("=");
          // alert(sectioncase[1]);
          // this.sectorback=sectioncase;
          if (sectioncase) {
            this.showdepartment = 1;
            this.routelink = "departmentperformance?query=" + sectioncase[1] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "sectionreport";
            this.supervisionback="super";
            if(sectioncase[0]=="supervision")
            {

              this.routelink = "departmentperformance?query=" + sectioncase[1] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + routeparamsarr[4] + ',2,' + "sector,"+routeparamsarr[6];
              this.supervisionback="supervision";
            }
          } else {
            this.routelink = 'departmentperformance?query=' + this.$route.query.query;
            this.supervisionback="";
          }
        } else {
          this.routelink = 'departmentperformance?query=' + this.$route.query.query;
        }
        if (routeparamsarr[6]){
//alert(routeparamsarr[6]);
       //   this.routelink = "../ministrydepartmentperformance/ministry dashboard-6?query=" + 2 + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',backtoministry';
          this.ministryback="ministry";
          if(routeparamsarr[6]=="fromministry"){
            this.routelink = "../ministrydepartmentperformance/ministry dashboard-6?query=" + 2 + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',backtoministry';

          }
        }
        this.getsectiontreemap();
        //alert( this.supervisionback);
      }
//alert(this.sectorback);

      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));

      }
    },
    methods: {
      getperfprog() {
        this.$store.dispatch('loadperfprog');


      },

      getsectors(subtenant) {

        Vue.axios.get('/loadSection/' + subtenant)
          .then(response => {
            if (response.data.code == 200) {
              //this.state.loading = true,
              this.sortByTenant = response.data.id;
              this.$store.dispatch('loadSubTenants', this.sortByTenant);
              this.sortBySubTenant = response.data.child_subtenant_id;

            }
          });


      },

      getsubtenants() {
        this.options='';
        if (this.sortByTenant != null) {
          // this.$store.dispatch('loadSubTenantsdept', this.sortByTenant);
          // this.sortBySubTenant = '';

          Vue.axios.get('/subtenanttree/'+this.sortByTenant)

            .then(response => {
              if (response.data.code == 200) {

                this.options = response.data.subTenants;
              //  alert( JSON.stringify(response.data.subTenants));


              }
            });
          this.getdeptsectiontreemap();
        }

      },
      getsectiontreemap() {
//this.name=this.get_text("name@l");

        if (this.sortByasofperiod == 'Q1') {
          this.periodselect = '1st_quarter@section_performance@l';
        }
        if (this.sortByasofperiod == 'Q2') {
          this.periodselect = '2nd_quarter@section_performance@l'
        }
        if (this.sortByasofperiod == 'Q3') {
          this.periodselect = '3rd_quarter@section_performance@l'
        }
        if (this.sortByasofperiod == 'Q4') {
          this.periodselect = '4th_quarter@section_performance@l'
        }
        if (this.sortByasofperiod == 'H1') {
          this.periodselect = '1st_biannual@section_performance@l'
        }
        if (this.sortByasofperiod == 'H2') {
          this.periodselect = '2nd_biannual@section_performance@l'
        }
        if (this.sortByasofperiod == 'Y') {
          this.periodselect = 'annual@section_performance@l'
        }
        if (this.sortByyearno == '1') {
          this.yearselect = 'year1@section_performance@l'
        }
        if (this.sortByyearno == '2') {
          this.yearselect = 'year2@section_performance@l'
        }
        if (this.sortByyearno == '3') {
          this.yearselect = 'year3@section_performance@l'
        }

        //  this.periodtext=his.yearselect+"-"+this.periodselect;
        Vue.axios.get('sectionkpireport/' + [this.sortBySubTenant, this.sortByMtp, this.sortByasofperiod, this.sortByyearno,this.supervisionback,this.ministryback])

          .then(response => {
            if (response.data.code == 200) {
              this.dataSource = response.data.kpishowdata;
              this.totalkpi = response.data.totalkpi;
              this.acheivedcount = response.data.acheivedcount;
              this.uptodatecount = response.data.uptodatecount;
              this.unitperformance = response.data.unitperformance;
              this.unitprogress = response.data.unitprogress;
              this.performingkpicount = response.data.performingkpicount;
              this.nonperformingkpicount = response.data.nonperformingkpicount;
              this.nonacheivedcount = response.data.nonacheivedcount;
              this.nonuptodatecount = response.data.nonuptodatecount;


            }
          });
      },
      get_text(textbit) {
        var transtext = this.translation[this.$i18n.locale][textbit];
        if (transtext) {
          return transtext;
        } else {
          var spliteText = (textbit.split("@"));
          if (spliteText.length > 2) {
            var newTxt = (spliteText[0] + '@' + 'l');
            var transtext1 = this.translation[this.$i18n.locale][newTxt];
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
      printdeptperf(deptperfdiv) {

        var dropButton = document.getElementById("dropdown1");
        dropButton.style.visibility = 'hidden';

        window.print()

        dropButton.style.visibility = 'visible';

        return true;

        // window.location.reload(true);
      },
    }
  }

</script>
<style>
  .ltrclassicons {
    float: left
  }

  .rtlclassicons {
    float: right;
    direction: rtl;
  }

  .wrapper {
    min-width: 100%;
    height: 69%;
    margin-top: 18px;

  }


  .pb-0, .py-0 {
    padding-bottom: 30px !important;
  }

  .text-value-lg {
    font-size: 14px !important;
    font-weight: 100;
  }

  .card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
  }

  .mb-1, .my-1 {
    margin-bottom: 0.05rem !important;
  }

  .mt-1, .my-1 {
    margin-top: 0.05rem !important;
  }

  .form-group {
    margin-bottom: 0.25rem !important;;
  }

  .text-value {
    font-size: 0.801rem !important;
  }

  #tooltip-container_svg {
    height: 250px !important;
  }

  .ltrclass {
    direction: ltr;
  }

  .rtlclass {
    direction: ltr;
  }

  .ltrclassbck {
    margin-right: 7%;
  }

  .rtlclassbck {
    margin-left: 7%;
  }

  #treemap {
    min-height: 709px !important;
  }

  @media print {

    canvas {

      max-width: 100%;
    }

    .table-responsive {

      overflow-x: visible !important;
      display: block;
      width: 100%;
    }

    .col-lg-9 {
      max-width: 65%;
    }

    #tooltip-container_svg {
      height: 250px !important;
      width: 150%;
    }

    .col-lg-3 {
      max-width: 35%;
    }

    #treemap {

      max-width: 50%;
    }

    #treemap_svg {
      max-width: 200%;
    }


    @page {
      size: A4;
      margin: 0mm;
      margin-top: -180px;
    }

    .wrapper {
      max-width: 25%;
    }

    /* .brand-card-header .bg-twitter {
background-color:#000000 !important;
} */
    /* .brand-card-header {
          background-color:#000000 !important;
         } */
    body {
      /* -webkit-print-color-adjust: exact !important; */
      color-adjust: exact;
      /* -webkit-print-color-adjust: exact; */
    }

    .fa {
      color: #fff;
      color-adjust: exact;

    }

    .sidebar, .breadcrumb, .app-footer {
      display: none;
      margin-bottom: 0px;
      margin-top: 0px;
    }

    /* #card-chart-01, #card-chart-02 {
width: 100% !important;
} */
    .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
      display: none;
    }
  }
</style>

