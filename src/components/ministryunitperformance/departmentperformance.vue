<template>
  <div class="animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>
    <div class="card" id="dropdown1" style="margin-bottom: 0.5rem">
<!--      <div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">-->
<!--        <b-link v-if="this.routeparams" :href=this.routelink variant="warning" size="md" class="btn float-right"-->
<!--                style="background-color:#ffc107;margin-top: 0.5%;"-->
<!--                :class="($i18n.locale=='en' ? 'ltrclassbck' : 'rtlclassbck')">-->
<!--          <b><i class="fa fa-arrow-left"></i>{{-->
<!--            get_text('back@department_performance@l') }}</b></b-link>-->
<!--      </div>-->
      <div class="card-header">
        {{
        get_text('title@department_performance@l') }}
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
      <b-collapse id="collapse1" style="display: none;">
        <div class="card-body">
          <b-row>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('sector@department_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="this.$store.state.setTenant" @change="getsubtenants(sortByTenant)"
                                 v-model="sortByTenant">
                    <option :value="null" slot="first">{{
                      get_text('please_select@department_performance@l') }}
                    </option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('subtenant@department_performance@l')" horizontal>
<!--                <b-input-group>-->
<!--                  <b-form-select :options="this.$store.state.setSubTenant" @change="getdeptsectiontreemap"-->
<!--                                 v-model="sortBySubTenant">-->
<!--                    <option :value="null" slot="first">{{-->
<!--                      get_text('please_select@department_performance@l')-->
<!--                      }}-->
<!--                    </option>-->
<!--                  </b-form-select>-->
<!--                </b-input-group>-->
                <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')" searchable="searchable" :options="options" v-model="sortBySubTenant" @input="getdeptsectiontreemap" />

              </b-form-group>
            </b-col>
            <b-col class="my-1" md="4">
              <b-form-group :label="get_text('mtp@department_performance@l')" horizontal>
                <b-input-group>
                  <b-form-select :options="this.$store.state.kpi_mtp" @change="getdeptsectiontreemap"
                                 v-model="sortByMtp">
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


                                            ]" @change="getdeptsectiontreemap"
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

                                            ]" @change="getdeptsectiontreemap"
                                 v-model="sortByasofperiod">
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
    <div id="sectiontreemap" v-if="this.dataSource123">
      <b-row>
        <b-col :lg="countPerfProgKPI" :sm="countPerfProgKPI"  v-for="(perfprog, index) in this.getKpiPerfProg"
               style="padding-left:
         0;" :key="index">
          <div class="brand-card" style="margin-bottom: 0.5rem" :id="'tooltip-target-'+index">
            <div class="customCard brand-card-header bg-twitter">
              &nbsp;&nbsp; <span class="text-white">{{ perfprog.target_name }} </span>&nbsp;&nbsp;
              <i class="fas fa-chess-knight"></i>
              <div class="chart-wrapper">
              </div>
            </div>
            <div class="customCardBody brand-card-body">
              <div>
                <div class="text-value">{{ perfprog.kpi_perf}}%
                </div>
                <div class="text-muted small">{{get_text('kpi_performance@department_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ (perfprog.kpi_prog <=0 ) ? 0 : perfprog.kpi_prog }}% <i
                  v-if="perfprog.kpi_prog <= 0" style="color:red" class="fas fa-exclamation-triangle fa-1x"></i>
                </div>
                <div class="text-muted small">{{get_text('kpi_progress@department_performance@l')}}</div>
              </div>
            </div>
          </div>
          <b-tooltip :target="'tooltip-target-'+index" triggers="hover" style="width: 100%">
            <div style="direction: rtl" v-for="(names, index1) in perfprog.kpi_names"
                 :key="index1">
              <p :style="$i18n.locale == 'en' ? 'text-align: left' : 'text-align: right'">{{ names.kpi_name }}</p>
              <p
                :style="$i18n.locale == 'en' ? 'text-align: left' : 'text-align: right'">{{get_text('kpi_performance@department_performance@l')}} : {{ (names.kpi_perf > 0) ? names.kpi_perf : 0 }}%</p>
              <p
                :style="$i18n.locale == 'en' ? 'text-align: left' : 'text-align: right'">{{get_text('kpi_progress@department_performance@l')}} : {{ (names.kpi_prog > 0) ? names.kpi_prog : 0 }}%</p>
            </div>
          </b-tooltip>
        </b-col>
      </b-row>
      <b-row style="background-color: #ffffff;margin:0;padding-top:10px;">
        <div :class="'col-lg-8 control-section'"
             style="padding-top: 20px;direction: ltr;">
          <div style="margin-left: 15px;margin-top: -10px;font-size: 0.875rem;color:#000000"
               class="text-muted font-weight-bold">{{this.get_text('org_unit_performance@department_performance@l')}}
          </div>
          <ejs-treemap id="treemap" v-if="$i18n.locale=='en'" :enableRtl='enableRtl1'
                       :rangeColorValuePath='rangeColorValuePath' :dataSource='dataSource123'
                       :enableDrillDown='enableDrillDown' :weightValuePath='weightValuePath' :levels='levelsettings'
                       :tooltipSettings='tooltipSettingsval' :drillDownView='drillDownView'
                       :leafItemSettings='leafItemSettingsval'></ejs-treemap>
          <ejs-treemap id="treemap" v-if="$i18n.locale=='ar'" :enableRtl='enableRtl' :drillStart='drillStart'
                       :rangeColorValuePath='rangeColorValuePath' :dataSource='dataSource123'
                       :enableDrillDown='enableDrillDown' :weightValuePath='weightValuePath' :levels='levelsettings1'
                       :tooltipSettings='tooltipSettingsval1' :drillDownView='drillDownView'
                       :leafItemSettings='leafItemSettingsval1'></ejs-treemap>
        </div>
        <div :class="'col-lg-4 property-section'">
          <div class="text-muted font-weight-bold"
               style="padding-bottom:0px;margin-bottom:0px;padding-top: 10px;font-size: 0.875rem;color:#000000">
            {{this.get_text('unit_performance@department_performance@l')}}
          </div>
          <div :class="this.type!=1 ? 'wrapperdept' : 'wrapperdept'"
               style="margin-top: 10px;border: 1px solid #c8ced3;" align="center">
            <ejs-circulargauge :enablePointerDrag='enablePointerDrag' width='80%' height='400px'
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
            <div align="center" class="card" style="border:0px;">
              {{ this.unitperformance+"%" }}
            </div>
            <div class="card customCardClass" style="margin-bottom:0px;border: 0px;margin-left: 35px;margin-right:
            35px;"
                 :class="($i18n.locale=='en' ? 'ltrclass' : 'rtlclass')">
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
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card" style="margin-top:10px;margin-bottom: 0px;">
                <div class="card-body p-0 d-flex align-items-center">
                  <i class="fas fa-chart-line bg-danger p-4 font-2xl mr-3" style="background-color: #00aced !important;

                color: #fff;"></i>
                  <div>
                    <div class="text-muted font-weight-bold" style="font-size: 0.875rem;">
                      {{get_text('unit_progress@section_performance@l')}}
                    </div>
                    <div class="text-value-sm text-danger">
                      <div class="text-value-sm" style="color:#00aced">
                        {{ (this.unitprogress <= 0) ? '0%' : this.unitprogress+"%" }} <i
                        v-if="this.unitprogress <= 0" style="color:red" class="fas fa-exclamation-triangle fa-1x"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="margin-top:10px;margin-bottom: 0px;">
            <div class="col-md-12">
              <div class="brand-card">
                <div class="customCard brand-card-header bg-twitter">
                  &nbsp;&nbsp; <span
                  class="text-white">{{get_text('best_least_performance@department_performance@l')}} </span>
                  &nbsp;&nbsp;
                  <i class="fas fa-star-half-alt"></i>
                  <div class="chart-wrapper">
                  </div>
                </div>
                <div class="customCardBody brand-card-body">
                  <div v-if="!(this.sortByTenant) && !(this.sortBySubTenant)">
                    <div class="text-value"> {{ this.kpisectorbest}}%
                      <i v-if="this.debug_show_icon_sector_best==1" style="color:red"
                         class="fas fa-exclamation-triangle fa-1x"></i>
                    </div>
                    <div class="text-muted small">{{get_text('best_performance@department_performance@l')}}</div>
                  </div>
                  <div v-else>
                    <div class="text-value"> {{ this.kpibestperforming}}%
                      <i v-if="this.debug_show_icon_best==1" style="color:red"
                         class="fas fa-exclamation-triangle fa-1x"></i>
                    </div>
                    <div class="text-muted small">{{get_text('best_performance@department_performance@l')}}</div>
                  </div>
                  <div v-if="!(this.sortByTenant) && !(this.sortBySubTenant)">
                    <div class="text-value">
                      {{ this.kpisectorleast}}%
                      <i v-if="this.debug_show_icon_sector_least==1" style="color:red"
                         class="fas fa-exclamation-triangle fa-1x"></i>

                    </div>
                    <div class="text-muted small">{{get_text('least_performance@department_performance@l')}}</div>
                  </div>
                  <div v-else>
                    <div class="text-value">
                      {{ this.kpileastperforming}}%
                      <i v-if="this.debug_show_icon_least==1" style="color:red"
                         class="fas fa-exclamation-triangle fa-1x"></i>

                    </div>
                    <div class="text-muted small">{{get_text('least_performance@department_performance@l')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
      <b-row style="padding-top:10px;padding: 0.3rem 0.3rem 0rem 0.89rem !important;
      width: 100% !important;background-color:#ffffff !important; margin-top: 0.3rem;" :style="$i18n.locale == 'en' ?
      'margin-left:0%'
      : 'margin-right:0%' ">
        <div class="col-lg-8" style="background-color: #ffffff; height: 320px;" :style="$i18n.locale
        == 'en' ? 'margin-left:0%' : 'margin-right:0%'">
          <b-row>
          <!--<ejs-heatmap id="heatmap" :titleSettings='titleSettings' :xAxis='xAxis' :yAxis='yAxis'
                       :dataSource='dataSourceHeatMap' :paletteSettings='paletteSettings'
                       :cellSettings='cellSettings' :tooltipRender='tooltipRender'
                       :legendSettings='legendSettings' height="250px"></ejs-heatmap>-->
          <div class="col-lg-3" v-for="(perfprog, index) in this.dataSourceGaugeMap"
               style="padding-left:
         0;" :key="index" :style="(index > 6) ? 'padding-top:0.8rem' : ''" align="center">
          <ejs-circulargauge :id="'customizationgauge'+index" :ref="'customizationgauge'+index" style="display:block" height="110"
                             :centerY='centerY1' :tooltip='tooltip1'>
            <e-axes><!--:annotations='annotations1'-->
              <e-axis :ranges='ranges1' :radius='radius1' endAngle=90
                      :endAngle=90 :startAngle=270
                      :majorTicks='majorTicks1' :minorTicks='minorTicks' :lineStyle='lineStyle1'
                      :labelStyle='labelStyle1' minimum=0 maximum=100>
                <e-pointers>
                  <e-pointer :animation='animation' :radius="'90%'" :color="((perfprog.performance == 0) ? '#cc163e' :
                  ((perfprog.performance >= 0 && perfprog.performance < 20) ? '#cc163e' :
                  ((perfprog.performance >=20 && perfprog.performance<40) ? '#ffbd35' :
                  ((perfprog.performance >=40 && perfprog.performance<60) ? '#f9ea60' :
                  ((perfprog.performance >=60 && perfprog.performance<80) ? '#4dbb63' :
                  ((perfprog.performance>=80 && perfprog.performance<100) ? '#1c8c44' : '#1c8c44'))))))"
                             :pointerWidth="'10'" :type="'RangeBar'"
                             :value='perfprog.performance' :cap="cap1"></e-pointer>
                  <e-pointer :animation='animation' :radius="'90%'" :color="'#424242'"  :pointerWidth="9" :value='perfprog.performance' ></e-pointer>
                </e-pointers>
              </e-axis>
            </e-axes>
          </ejs-circulargauge>
            <div  class="card" style="border:0px; margin-top: -15%; margin-bottom:0.3rem !important;">
              {{perfprog.performance}} % <br>{{ perfprog.sub_name }}
            </div>
          </div>
          </b-row>

        </div>
        <div class="col-lg-4" style="padding-right: 0; padding-left: 0;">
          <b-row>
            <b-col lg="12">
          <!--<ejs-chart id="container" height="320px" :tooltip='tooltipBubble' :theme='theme'  :pointRender='pointRender'>-->
              <ejs-chart ref='chart' :theme='theme' style='display:block' align='center' id='chartcontainer' height="320px" :tooltip='tooltipBubble' :animation='animation'
                         :pointRender='pointRenderBubble' :title="$i18n.locale == 'en' ? 'Performance-Progress' : 'رسم بياني الأداء-التقدم'"
                         :legendSettings='legendSettingsBubble'  :primaryXAxis='primaryXAxisBubble'
                         :primaryYAxis='primaryYAxisBubble'>
            <e-series-collection>
              <e-series :dataSource='bubbleChartArray' type='Bubble' size='size' xName='x' yName='y' name='Details'
                        width=2 :marker='markerBubble' minRadius=1  maxRadius=8
              ></e-series>
              <!--<e-series :dataSource='seriesData1' type='Bubble' :showMean='showMean'
                        :boxPlotMode='boxType' size='text' xName='x' yName='y' name='Department' :marker='marker' >
              </e-series>-->

            </e-series-collection>
          </ejs-chart>
            </b-col>
          </b-row>
        </div>
      </b-row>
      <!--{{ localStorage.getItem('tenantName') }}-->
      <b-row style="padding-top:0.3rem;" v-if="this.static_dashboard_table_value.length > 0">
        <div class="col-lg-12">
          <ejs-treegrid :dataSource='this.static_dashboard_table_value'
                        :enableCollapseAll="false"
                        :allowResizing='true'
          >
            <e-columns>
              <e-column field='sub_name' :headerText='this.get_text("org_name@statistics@c")'
                        width='200' :template="orgunittetemplate" :textAlign="$i18n.locale=='en' ? 'left' : 'right'"></e-column>
              <e-column field='unit_count' :headerText="this.get_text('unit_count@statistics@c')" width='70'
                        :template="unitcounttemplate" textAlign='center'></e-column>
              <e-column field='kpi_count' :headerText="this.get_text('kpi_count@statistics@c')" width='70'
                        :template="kpicounttemplate"
                        textAlign='center'></e-column>
              <e-column field='kpi_eff' :headerText='this.get_text("by_efficiency@statistics@c")' width='90'
                        :template="efficiencytemplate"
                        textAlign='center'></e-column>
              <!--<e-column field='by_strategy' :headerText="this.get_text('by_strategy@statistics@c')" width='80'
                        textAlign='center'></e-column>-->
              <e-column field='kpi_up_to_date' :headerText="this.get_text('by_uptodate@statistics@c')" width='90'
                        textAlign='center'
                        :template="uptodatetemplate"></e-column>
              <e-column field='kpi_active' :headerText="this.get_text('by_active@statistics@c')" width='90'
                        textAlign='center'
                        :template="activetemplate"></e-column>
              <e-column field='kpi_importance_h' :headerText="this.get_text('by_importance@statistics@c')"
                        width='100' textAlign='center'
                        :template="importancetemplate"></e-column>
              <e-column field='perf_sum_w' :headerText="this.get_text('unit_performance@statistics@c')"
                        width='90' textAlign='center'
                        :template="perftemplate"></e-column>
              <e-column field='prog_sum_w' :headerText="this.get_text('unit_progress@statistics@c')"
                        width='90' textAlign='center'
                        :template="progtemplate"></e-column>
            </e-columns>
          </ejs-treegrid>
        </div>
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
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import {ChartPlugin, BubbleSeries, Category, Tooltip, BoxAndWhiskerSeries, getSaturationColor, DataLabel} from
      "@syncfusion/ej2-vue-charts";

  //import {HeatMapPlugin, Legend, Adaptor, Tooltip} from '@syncfusion/ej2-vue-heatmap';
  import {TreeGridPlugin, Page, Resize} from "@syncfusion/ej2-vue-treegrid";
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  Vue.use(TreeGridPlugin);
  //Vue.use(HeatMapPlugin);

  Vue.use(ChartPlugin);
  Vue.use(CircularGaugePlugin);
  Vue.use(TreeMapPlugin);
  Vue.use(Loading);

  let selectedTheme = location.hash.split("/")[1];
  selectedTheme = selectedTheme ? selectedTheme : "Material";
  let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

  let materialColors = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
    '#ea7a57', '#404041', '#00bdae'];
  let fabricColors= ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
    '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
  let bootstrapColors =  ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
    '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];

  let contentVue = Vue.component("contentTemplate", {
    // template: '<div   v-if="data.calc_level!=0"><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">show section report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">show section report</a><br><div align="center" style="margin-top:0px;" v-if="data.debug_show_icon==1"><i v-if="data.debug_show_icon==1" style="color:#ffffff;margin-top:290px;" class="fas fa-exclamation-triangle fa-2x"></i></div></div>',
    template:
      '<div><div v-if="data.type!=2"><a v-if="data.kpi_color==0 && data.type !=0" style="color:#ffffff;font-size:16px;" :href="data.departmentlink">show department report</a><a v-if="data.kpi_color==1 && data.type !=0" style="color:#57595d;font-size:16px;" :href="data.departmentlink">show department report</a><br v-if="data.kpi_color==0 && data.type !=0 || data.kpi_color==1 && data.type !=0"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">show section report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">show section report</a><br><div align="center" style="margin-top:0px;" v-if="data.debug_show_icon==1"><i v-if="data.debug_show_icon==1" style="color:#ffffff;margin-top:290px;" class="fas fa-exclamation-triangle fa-2x"></i></div></div>',


    data() {
      return {
        data: {},

      };
    }
  });
  let contentVuear = Vue.component("contentTemplatear", {
    template:
      '<div  v-if=""  style="direction:rtl;margin-left:-150px;"><div v-if="data.type!=2"><a v-if="data.kpi_color==0 && data.type !=0" style="color:#ffffff;font-size:16px;" :href="data.departmentlink">show department report</a><a v-if="data.kpi_color==1 && data.type !=0" style="color:#57595d;font-size:16px;" :href="data.departmentlink">show department report</a><br v-if="data.kpi_color==0 && data.type !=0 || data.kpi_color==1 && data.type !=0"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">عرض أداء المراقبة</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">عرض أداء المراقبة</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">عرض أداء القسم</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">عرض أداء القسم</a></div>',
    // template: '<div  v-if="data.calc_level!=0"  style="direction:rtl;margin-left:-150px;margin-top:-260px;"><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">عرض أداء القسم</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">عرض أداء القسم</a><div align="center" style="margin-top:250px;" v-if="data.debug_show_icon==1"><i v-if="data.debug_show_icon==1" style="color:#ffffff" class="fas fa-exclamation-triangle fa-2x"></i></div></div>',

    data() {
      return {
        data: {},

      };
    }
  });
  let contentVuelevel = Vue.component("contentTemplatelevel", {
    template: '<div> {{ data.button}} </div>',


    data() {
      return {
        data: {},

      };
    }
  });

  let contentTemplate = function () {
    return {template: contentVue};
  };
  let contentTemplatear = function () {
    return {template: contentVuear};
  };
  let contentTemplatelevel = function () {
    return {template: contentVuelevel};
  };
  export default {
    store: store,
    components: {
      SocialBoxChartExample,
      Loading,
      Treeselect
    },
    data: function () {

      return {
        theme: theme,
        centerY1: '60%',
        annotations1: [{
          content: '<div style="color:#666666;font-size:15px;">1800</div>',
          angle: 0,
          zIndex: '1',
          radius: '110%'
        }],
        lineStyle1: { width: 0 },
        radius1: '140%',
        labelStyle1: { font: { size: '0px' } },
        majorTicks1: { width: 0 },
        minorTicks1: { height: 0 },
        ranges1: [{
          start: 0, end: 100,
          radius: '90%',
          startWidth: 10, endWidth: 10,
          color: '#E0E0E0'
        }],
        cap1: { radius: 10, color: '#424242', border: { width: 0 } },
        pointers1: [{
          type: 'RangeBar',
          value: 1200, radius: '90%',
          color: '#FFDD00', animation: { duration: 0 },
          pointerWidth: 10
        }, {
          radius: '90%', value: 1200,
          color: '#424242',
          animation: { duration: 0 },
          pointerWidth: 9,
          cap: { radius: 10, color: '#424242', border: { width: 0 } }
        }],
        uptodatetemplate: function () {
          return {
            template: Vue.component('uptodatetemplate', {
              template:
                  `
                <div class="image" style="display: inline">
                  <div style="width: 100%">
                    <div style="float: left;width: 25%; color: green;">
                      <i class="fa fa-check-square" aria-hidden="true"></i>
                    </div>
                    <div style="float: left;width: 25%;">
                      <strong class="text-left"> {{ (data.kpi_up_to_date) ? data.kpi_up_to_date : 0 }}</strong>&nbsp;&nbsp;
                    </div>
                    <div style="float: left;width: 25%; color: red;">
                      <i class="fa fa-window-close" aria-hidden="true"></i>
                    </div>
                    <div style="float: left;width: 25%;">
                      <strong class="text-right"> {{ (data.not_uptodate) ? data.not_uptodate : 0}}</strong>
                    </div>
                  </div>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        importancetemplate: function () {
          return {
            template: Vue.component('importancetemplate', {
              template:
                  `
                <div class="image" style="display: inline">
                  <div style="width: 100%">
                    <div style="float: left; width: 10%;">
                      <i class="fa fa-thermometer-full" aria-hidden="true" style="color: #f86c6b !important"></i>
                    </div>
                    <div style="float: left; width: 23%;">
                      <strong class="text-left"> {{ (data.kpi_importance_h) ? data.kpi_importance_h : 0 }}</strong>&nbsp;&nbsp;
                    </div>
                    <div style="float: left; width: 10%;">
                      <i class="fa fa-thermometer-half" aria-hidden="true" style="color: #f86c6b !important"></i>
                    </div>
                    <div style="float: left; width: 23%;">
                      <strong class="text-right"> {{ (data.kpi_importance_m) ? data.kpi_importance_m : 0 }}</strong>
                    </div>

                    <div style="float: left; width: 10%;">
                      <i class="fa fa-thermometer-quarter" aria-hidden="true" style="color: #f86c6b !important"></i>
                    </div>
                    <div style="float: left; width: 23%;">
                      <strong class="text-right"> {{ (data.kpi_importance_l) ? data.kpi_importance_l : 0 }}</strong>
                    </div>
                  </div>

                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        activetemplate: function () {
          return {
            template: Vue.component('activetemplate', {
              template:
                  `
                <div class="image" style="display: inline">
                  <div style="width: 100%">
                    <div style="float: left; width: 50%;">
                      <i class="fa fa-circle" aria-hidden="true" style="color: green"></i>
                      <strong class="text-left"> {{ (data.kpi_active) ? data.kpi_active : 0 }}</strong>&nbsp;&nbsp;
                    </div>
                    <div style="float: right; width: 50%;">
                      <i class="fa fa-circle" aria-hidden="true" style="color: red"></i>
                      <strong class="text-right"> {{ (data.not_active) ? data.not_active : 0 }}</strong>
                    </div>
                  </div>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        progtemplate: function () {
          return {
            template: Vue.component('activetemplate', {
              template:
                  `
                <div class="image" style="display: inline">
                  <strong class="text-left"> {{ (data.prog_sum_w) ? data.prog_sum_w +'%' : 0+'%'}}</strong> <i v-if="data.show_icon==1"  style="color:red" class="fas fa-exclamation-triangle fa-1x"></i>&nbsp;&nbsp;
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        perftemplate: function () {
          return {
            template: Vue.component('perftemplate', {
              template:
                  `
                <div v-if="(data.perf_sum_w)===0"
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #cc163e; color:black'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w)}}%
                </div>
                <div v-else-if="(data.perf_sum_w)>=0 && (data.perf_sum_w)<20 "
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #cc163e;'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w)}}%
                </div>
                <div v-else-if="(data.perf_sum_w)>=20 && (data.perf_sum_w)<40 "
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #ffbd35;'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w)}}%
                </div>
                <div v-else-if="(data.perf_sum_w)>=40 && (data.perf_sum_w)<60"
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #f9ea60; color:#57595d'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w)}}%
                </div>
                <div v-else-if="(data.perf_sum_w)>=60 && (data.perf_sum_w)<80"
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #4dbb63;'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w)}}%
                </div>
                <div v-else-if="(data.perf_sum_w)>=80 && (data.perf_sum_w)<100 "
                     class="progress-bar" role="progressbar"
                     :style="'width:'+(data.perf_sum_w)+'%'+';background-color: #1c8c44;'"
                     :aria-valuenow="(data.perf_sum_w)" aria-valuemin="0" aria-valuemax="100">{{
                  (data.perf_sum_w) }}%
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        kpicounttemplate: function() {
          return {
            template: Vue.component('notactivetemplate', {
              template:
                `<div class="image" style="display: inline">
                      <i class="fa fa-street-view" aria-hidden="true" style=""></i>
                      <strong class="text-left"> {{ (data.kpi_count) ? data.kpi_count : 0 }}</strong>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        unitcounttemplate: function() {
          return {
            template: Vue.component('notactivetemplate', {
              template:
                `<div class="image" style="display: inline">
                      <i class="fa fa-sitemap" aria-hidden="true" style=""></i>
                      <strong class="text-left"> {{ (data.unit_count) ? data.unit_count : 0 }}</strong>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        efficiencytemplate: function () {
          return {
            template: Vue.component('notactivetemplate', {
              template:
                `<div class="image" style="display: inline">
                  <div style="width: 100%">
                    <div style="float: left; width: 50%;">
                      <i class="fa fa-cogs" aria-hidden="true" style=""></i>
                      <strong class="text-left"> {{ (data.kpi_eff) ? data.kpi_eff : 0 }}</strong>&nbsp;&nbsp;
                    </div>
                    <div style="float: right; width: 50%;">
                      <i class="fa fa-chess-knight" aria-hidden="true" style=""></i>
                      <strong class="text-right"> {{ (data.by_strategy) ? data.by_strategy : 0 }}</strong>
                    </div>
                  </div>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        orgunittetemplate: function () {
          return {
            template: Vue.component('notactivetemplate', {
              template:
                `<div class="image" style="display: inline">
                    <a style="color:#000000" :href="data.sectorlink">{{ data.sub_name }}</a>
                </div>`,
              data: function () {
                return {data: {}};
              },
            })
          }
        },
        pageSettings: {pageSize: 8},
        bubbleChartArray: [
          {x: 92.2, y: 7.8, size: 1.347, text: 'China'},
          {x: 74, y: 6.5, size: 1.241, text: 'India'},
          {x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia'},
          {x: 99.4, y: 2.2, size: 0.312, text: 'US'},
          {x: 88.6, y: 1.3, size: 0.197, text: 'Brazil'},
          {x: 99, y: 0.7, size: 0.0818, text: 'Germany'},
          {x: 72, y: 2.0, size: 0.0826, text: 'Egypt'},
          {x: 99.6, y: 3.4, size: 0.143, text: 'Russia'},
          {x: 99, y: 0.2, size: 0.128, text: 'Japan'},
          {x: 86.1, y: 4.0, size: 0.115, text: 'Mexico'},
          {x: 92.6, y: 6.6, size: 0.096, text: 'Philippines'},
          {x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria'},
          {x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong'},
          {x: 79.2, y: 3.9, size: 0.162, text: 'Netherland'},
          {x: 72.5, y: 4.5, size: 0.7, text: 'Jordan'},
          {x: 81, y: 3.5, size: 0.21, text: 'Australia'},
          {x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia'},
          {x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan'}
        ],
        //primaryXAxisBubble: this.primaryXAxisBubble,
        //primaryYAxisBubble:
        chartArea: {
          border: {
            width: 0
          }
        },
        //titleBubble: 'test',
        tooltipBubble: {
          enable: true,
          format:
            'Name: <b>${point.text} </b> <br/>Progress: <b>${point.x}% </b> <br/> Performance: <b>${point.y}%</b>'
        },
        legendSettingsBubble: {
          visible: false
        },
        markerBubble: {
          dataLabel: {
            name: 'short',
            visible: true,
            position: 'middel',
            font: { fontWeight: "600px" }
          }
        },
        boxType: "Normal",
        showMean: true,
        marker: {
          visible: true,
          width: 10,
          height: 10
        },
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
        tooltip1: {
          type: ['Pointer', 'Range', 'Annotation'],
          enable: true,
          enableAnimation: false,
          //annotationSettings: {template: '<div>CircularGauge</div>'},
          rangeSettings: {fill: 'red'}
        },
        enablePointerDrag: true,
        //dataSource: '',
        dataSource123: '',
        debug_progmode:0,
        static_dashboard_table_value: [],
        getKpiPerfProg: [],
        countPerfProgKPI : 6,
        fill: '#993399',
        palette: ["#cc163e", "#ffbd35", "#f9ea60", "#4dbb63", "#1c8c44"],
        weightValuePath: 'kpicount',
        enableDrillDown: true,
        drillDownView: true,
        //weightValuePath: 'importance',
        renderDirection: 'TopRightBottomLeft',
        enableRtl: true,
        renderDirection1: 'TopRightBottomLeft',
        enableRtl1: false,

        rangeColorValuePath: 'kpi_perfsum',
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
        Tenantvalue:null,
        sortByyearno: localStorage.getItem('currentYear'),
        sortByasofperiod: 'Q' + localStorage.getItem('currentPeriod'),
        sortByMtp: localStorage.getItem('currentMTP'),
        type: 0,
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
        kpistrategic_perf: '',
        kpistrategic_prog: '',
        kpistrategic_kpi: '',
        kpibestperforming: '',
        kpileastperforming: '',
        kpisectorbest: '',
        kpisectorleast: '',
        subtenanttype: '',
        deptFields: '',
        routeparams: '',
        routelink: '',
        kpistrategicvalues: '',
        debug_show_icon_best: 0,
        debug_show_icon_least: 0,
        debug_show_icon_prog:0,
        debug_show_icon_sector_best: 0,
        debug_show_icon_sector_least: 0,
        dataSourceGaugeMap: [],
        titleSettings: {
          text: 'Sales Revenue per Employee (in 1000 US$)',
          textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
          }
        },
        xAxis: {
          valueType:"Category",
          //opposedPosition:true,
          labelRotation: 10,
          labels: JSON.parse(localStorage.getItem('tenantName')),
        },
        yAxis: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        },
        paletteSettings: {
          palette: [
            {color: '#C06C84'},
            {color: '#6C5B7B'},
            {color: '#355C7D'}
          ],
          type: "Gradient"
        },
        legendSettings: {
          visible: true,
        },
        cellSettings: {
          showLabel: false,
          border: {
            width: 0
          },
          tileType: 'Bubble',
          bubbleType: 'Sector'
        },
      }
    },
    provide: {
      circulargauge: [GaugeTooltip, Annotations],
      treemap: [TreeMapTooltip],
      chart: [BubbleSeries, Tooltip, DataLabel],
      //heatmap:[Legend, Adaptor, Tooltip],
      treegrid: [Page, Resize]
    },
    mounted() {
      var currentDate = new Date();
      console.log(currentDate);
      var currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      this.currentdate = currentDateWithFormat;

      this.getMinistryReport(this.sortByTenant, this.sortBySubTenant, this.sortByMtp, this.sortByasofperiod, this.sortByyearno, this.type);
      //alert(currentDateWithFormat);
    },
    created() {
      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');
      // this.test()
    },
    computed: {
      primaryXAxisBubble() {
         var xAxis = {
           majorGridLines: { width: 0 },
           minimum: 0,
           maximum: 200,
           edgeLabelPlacement: 'Shift',
           title: this.get_text('unit_progress@section_performance@l'),
           interval: 40
         };
         return xAxis
      },
      primaryYAxisBubble () {
        var yAxis = {
          majorTickLines: {
            width: 0
          },
          minimum: 0,
          maximum: 100,
          lineStyle: {
            width: 0
          },
          title: this.get_text('unit_performance@department_performance@l'),
          rangePadding: 'None',
          interval: 10
        }
        return yAxis
      },
      levelsettings() {
        if (this.type == 3) {
          var levels = [
            {
              groupPath: 'ministryname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'sectorname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'deptname', drillDownView: true, headerTemplate:
                '<div style="margin-top: 20px;">${deptsuperlink}</div>', colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'supervisionname', drillDownView: true, headerTemplate:
                '<div style="margin-top: 20px;">${button}</div>',colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
          ];
        }
        if (this.type == 2) {
          var levels = [

            {
              groupPath: 'supervisionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
          ];
        }
        if (this.type == 1) {
          var levels = [
            {
              groupPath: 'sectorname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'deptname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },

            {
              groupPath: 'supervisionname', drillDownView: true, headerTemplate:
                '<div style="margin-top: 20px;">${button}</div>',colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
          ];
        }
        if (this.type == 0) {
          var levels = [
            {
              groupPath: 'deptname', colorMapping: [
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
              ],headerTemplate: '<div style="margin-top: 20px;">${sectorlink}</div>', border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'supervisionname', drillDownView: true, headerTemplate:
                '<div style="margin-top: 20px;">${button}</div>',colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}
            },
          ];
        }

        return levels;
      },
      levelsettings1() {
        if (this.type == 3) {
          var levels = [
            {
              groupPath: 'ministryname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5},drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'sectorname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5},drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'deptname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5},drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'supervisionname', templatePosition: 'Top Right',headerTemplate: '<div  style="margin-top: 20px;">${buttonar}</div>', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
          ];
        }
        if (this.type == 2) {

          var levels = [

            {
              groupPath: 'supervisionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
          ];
        }
        if (this.type == 1) {
          var levels = [
            {
              groupPath: 'sectorname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5},drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'deptname', colorMapping: [
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
              ], border: {color: 'black', width: 0.5},drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'supervisionname', templatePosition: 'Top Right',headerTemplate: '<div  style="margin-top: 20px;">${buttonar}</div>', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
          ];
        }
        if (this.type == 0) {
          var levels = [
            {
              groupPath: 'deptname', colorMapping: [
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
              ], templatePosition: 'Top Right',headerAlignment: 'Far',drillDownView: true,headerTemplate: '<div style="margin-top: 20px;">${buttonar}</div> <div style="margin-top: 20px;">${sectorlinkar}</div>', border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'supervisionname',templatePosition: 'Top Right',headerTemplate: '<div  style="margin-top: 30px;">${buttonar}</div>', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
            {
              groupPath: 'sectionname', drillDownView: true, colorMapping: [
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
              ], border: {color: 'black', width: 0.5}, headerAlignment: 'Far'
            },
          ];
        }

        return levels;
      },
      leafItemSettingsval1() {
        var leafItemSettings = {
          labelPath: '',
          labelPosition: 'Left',
          showLabels: false,
          labelStyle: {size: '18'},
          labelFormat: '',
          labelTemplate: contentTemplatear,
          templatePosition: 'Left',
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
          border: {color: 'black', width: 0.5}
        };

        return leafItemSettings;
      },

      leafItemSettingsval() {
        var leafItemSettings = {
          labelPath: '',
          showLabels: false,
          labelStyle: {size: '18'},
          labelFormat: '',
          labelTemplate: contentTemplate,
          templatePosition: 'Left',
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
          border: {color: 'black', width: 0.5}
        };

        return leafItemSettings;
      },
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
            '<div style="opacity: 0.9;padding-left:15px;padding-right:15px;padding-top: 15px; border:2px solid;background-color:#403d39; color: #ffffff; width:auto; white-space: nowrap;">' +
            this.get_text("performance@department_performance@l") + ' : ${kpi_perfsum} % ${debug_show_icon_perf_tool}<br><br>' +
            this.get_text("progress@department_performance@l") + ' : ${kpi_progsum} %  ${debug_show_icon_progic}<br><br>' +
            this.get_text("unit_count@department_performance@l") + ' : ${unitcount}<br><br>' +
            this.get_text("kpi_count@department_performance@l") + ' : ${kpicount}' +
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
            '<div style="opacity: 0.9;padding-top:15px;padding-left:15px;padding-right:15px;direction: rtl;border:2px solid;background-color:#403d39; color: #ffffff; width:auto; white-space: nowrap;">' +
            '<p style="padding: 2%; text-align: right;">' +
            this.get_text("performance@department_performance@l") + ' : ${kpi_perfsum} % ${debug_show_icon_perf_tool}<br><br>' +
            this.get_text("progress@department_performance@l") + ' : ${kpi_progsum} %  ${debug_show_icon_progic}<br><br>' +
            this.get_text("unit_count@department_performance@l") + ' : ${unitcount}<br><br>' +
            this.get_text("kpi_count@department_performance@l") + ' : ${kpicount}' +


            '</p></div>',

        }
        return tooltipSettings;
      },

      treemaptitle() {
        var treemapttletext = {
          text: this.get_text('department_performance@department_performance@l'),
          textStyle: {size: '0.875rem'},
          position: 'Left'
        };
        return treemapttletext;
      }
    },
    beforeMount() {
      // alert(this.$auth.user().subtenant_id);
      this.routeparams = this.$route.query.query;

     if (this.routeparams) {

       var routeparamsarr = this.routeparams.split(",");
       this.sortBySubTenant = routeparamsarr[0];
       this.sortByMtp = routeparamsarr[1];
       this.sortByasofperiod = routeparamsarr[2];
       this.sortByyearno = routeparamsarr[3];
     }
      //   // alert( routeparamsarr[0]);
      //   var sectioncase = routeparamsarr[0].split("=");
      //
      //   this.sortByMtp = routeparamsarr[1];
      //   this.sortByasofperiod = routeparamsarr[2];
      //   this.sortByyearno = routeparamsarr[3];
      //   if (sectioncase) {
      //     this.routelink = "departmentperformance?query=" + sectioncase[1] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "sectionreport";
      //
      //   }
      //
      //   if (routeparamsarr[5]) {
      //     // alert("not dept");
      //     this.sortBySubTenant = routeparamsarr[0];
      //     //this.sortByTenant=routeparamsarr[4];
      //     if (routeparamsarr[6] == "sector") {
      //       this.type = 1;
      //       this.routelink = "departmentperformance?query=" + routeparamsarr[7] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "sectionreport";
      //
      //     }
      //     if (routeparamsarr[6] == "dept") {
      //       this.type = 0;
      //       this.routelink = "departmentperformance?query=" + routeparamsarr[4] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "departmentreport";
      //
      //     }
      //     if (routeparamsarr[5] == "supervision") {
      //       this.type = 2;
      //     }
      //     if (routeparamsarr[5] == "sectionreport") {
      //       this.sortBySubTenant = '';
      //       this.sortByTenant = routeparamsarr[0];
      //     }
      //   }
        this.getdeptsectiontreemap();

      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));

      }
    },
    methods: {
      pointRenderBubble: function (args) {
//alert(args.point.xValue);
        args.fill= ((args.point.yValue == 0) ? '#cc163e' :
          ((args.point.yValue >= 0 && args.point.yValue < 20) ? '#cc163e' :
            ((args.point.yValue >=20 && args.point.yValue <40) ? '#ffbd35' :
              ((args.point.yValue >=40 && args.point.yValue <60) ? '#f9ea60' :
                ((args.point.yValue >=60 && args.point.yValue <80) ? '#4dbb63' :
                  ((args.point.yValue >=80 && args.point.yValue <100) ? '#1c8c44' : '#1c8c44'))))))

        /*console.log(args.point.xValue);
        let selectedTheme= location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
          args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
          args.fill = materialColors[args.point.index % 10];
        } else {
          args.fill = bootstrapColors[args.point.index % 10];
        }*/
        args.border.color = getSaturationColor(args.fill, -0.6);
      },
      tooltipRender: function(args)
      {
        console.log(args.value);
        args.content = ['Year ' + ' : ' + args.xLabel + '<br/>' + 'Months ' + ' : ' + args.yLabel + '<br/>'
        + 'KPI Prog ' + ' : ' + args.value];
      },
      getMinistryReport(tenant, subtenant, mtp, period, year, type) {
        var sectorID = '';
        if (typeof subtenant != 'undefined' && subtenant != null) {
          sectorID = subtenant
          this.type = 1;
        } else if (typeof tenant != 'undefined' && tenant != null) {
          sectorID = tenant
          this.type = 0;
        } else {
          sectorID = 2;
          this.type = 0;
        }

        if (sectorID) {
          Vue.axios.get('getsubtenanttype/' + sectorID)

            .then(response => {
              if (response.data.code == 200) {

                this.subtenanttype = response.data.subtenanttype;

                if (this.subtenanttype == 5) {
                  this.type = 2;
                }
                if (this.subtenanttype != 5) {
                  this.type = 0;
                }
                if (this.subtenanttype == 2) {
                  this.type = 3;
                }

                if (this.subtenanttype)
                  this.$store.state.isLoading = true;
                Vue.axios.get('ministrydepartmentreport/' + [sectorID, mtp, period, year, this.type])

                  .then(response => {
                    if (response.data.code == 200) {

                      this.unitperformance = response.data.unitperformance;
                      this.unitprogress = response.data.unitprogress;
                      this.totalkpi = response.data.kpi_count;
                      this.kpistrategic_perf = response.data.kpistrategic_perf;
                      this.kpistrategic_prog = response.data.kpistrategic_prog;
                      this.kpistrategic_kpi = response.data.kpistrategic_kpi;
                      this.kpibestperforming = response.data.kpibestperforming;
                      this.debug_show_icon_best=response.data.debug_show_icon_best;
                      this.kpileastperforming = response.data.kpileastperforming;
                      this.debug_show_icon_least=response.data.debug_show_icon_least;
                      this.debug_show_icon_prog=response.data.debug_show_icon_prog;
                      this.performingkpicount = response.data.performingcount;
                      this.nonperformingkpicount = response.data.nonperformingcount;
                      this.kpistrategicvalues = response.data.kpistrategicvalues;
                      this.dataSource123=response.data.kpishowdata;
                      this.kpistrategic_sector = response.data.kpistrategic_sector;
                      this.debug_progmode = response.data.debug_progmode;

                      this.static_dashboard_table_value = response.data.sectorData;
                      this.getKpiPerfProg = response.data.getKpiPerfProg;
                      this.countPerfProgKPI = response.data.countPerfProgKPI;
                      this.dataSourceGaugeMap = response.data.pieChartArray;
                      this.bubbleChartArray = response.data.bubbleChartArray;
                      this.kpisectorbest = response.data.kpisectorbest;
                      this.kpisectorleast = response.data.kpisectorleast;
                      this.debug_show_icon_sector_best = response.data.debug_show_icon_sector_best;
                      this.debug_show_icon_sector_least = response.data.debug_show_icon_sector_least;
                      this.$store.state.isLoading = false;
                      // alert("hii");
                      // alert(this.kpistrategic_sector)
                    }
                  }).catch(error => {
                  this.$store.state.isLoading = false;
                });
              }
            });
        }
      },
      drillStart: function (args) {
        args.treemap.levels[2].drillDownView = true;
      },
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
        if (this.sortByTenant != null) {
          // this.$store.dispatch('loadSubTenantsdept', this.sortByTenant);
          // this.sortBySubTenant = '';
          Vue.axios.get('/subtenanttree/'+this.sortByTenant)

            .then(response => {
              if (response.data.code == 200) {
                this.options = response.data.subTenantsdept;


              }
            });
          this.getdeptsectiontreemap();
        }

      },
      getdeptsectiontreemap() {
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
        this.dataSource123 = '';
        this.type = 0;
        if (this.sortByTenant && !this.sortBySubTenant) {
          // alert("only sector not org unit");
          if(this.sortByasofperiod && this.sortByyearno) {
            //   this.sortBySubTenant = this.sortByTenant;
            this.Tenantvalue = this.sortByTenant;

            this.type = 1;
          }


        }
        else{
          this.Tenantvalue = this.sortBySubTenant;
        }

        var sectorID = '';
        if (typeof this.Tenantvalue != 'undefined' && this.Tenantvalue != null) {
          sectorID = this.Tenantvalue
          this.type = 1;
        } else if (typeof this.Tenantvalue != 'undefined' && this.Tenantvalue != null) {
          sectorID = this.Tenantvalue
          this.type = 0;
        } else {
          sectorID = 2;
          this.type = 3;
        }
        if (sectorID) {
          Vue.axios.get('getsubtenanttype/' + sectorID)
            .then(response => {
              if (response.data.code == 200) {
                this.subtenanttype = response.data.subtenanttype;
                //  alert("type is"+this.subtenanttype);

                if (this.subtenanttype == 5) {
                  this.type = 2;
                }
                if (this.subtenanttype != 5) {
                  this.type = 0;
                }
                if (this.subtenanttype == 3) {
                  this.type = 1;
                }

                if(this.subtenanttype == 2) {
                  this.type = 3;
                }
                this.$store.state.isLoading = true;

                Vue.axios.get('ministrydepartmentreport/' + [sectorID, this.sortByMtp, this.sortByasofperiod, this.sortByyearno, this.type])

                  .then(response => {
                    if (response.data.code == 200) {
                      this.$store.state.isLoading = false;

                      this.unitperformance = response.data.unitperformance;
                      this.unitprogress = response.data.unitprogress;
                      this.totalkpi = response.data.kpi_count;
                      this.kpistrategic_perf = response.data.kpistrategic_perf;
                      this.kpistrategic_prog = response.data.kpistrategic_prog;
                      this.kpistrategic_kpi = response.data.kpistrategic_kpi;
                      this.kpibestperforming = response.data.kpibestperforming;
                      this.debug_show_icon_best=response.data.debug_show_icon_best;
                      this.kpileastperforming = response.data.kpileastperforming;
                      this.debug_show_icon_least=response.data.debug_show_icon_least;
                      this.debug_show_icon_prog=response.data.debug_show_icon_prog;
                      this.performingkpicount = response.data.performingcount;
                      this.nonperformingkpicount = response.data.nonperformingcount;
                      this.kpistrategicvalues = response.data.kpistrategicvalues;
                      this.dataSource123=response.data.kpishowdata;
                      this.kpistrategic_sector = response.data.kpistrategic_sector;
                      this.debug_progmode = response.data.debug_progmode;


                      this.static_dashboard_table_value = response.data.sectorData;
                      this.getKpiPerfProg = response.data.getKpiPerfProg;
                      this.countPerfProgKPI = response.data.countPerfProgKPI;
                      this.dataSourceGaugeMap = response.data.pieChartArray;
                      this.bubbleChartArray = response.data.bubbleChartArray;
                      this.kpisectorbest = response.data.kpisectorbest;
                      this.kpisectorleast = response.data.kpisectorleast;
                    }
                  }).catch(error => {
                  this.$store.state.isLoading = false;
                });
              }
            });
        }
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
      },
    }
  }

</script>
<style>
  #treemap_Level_Index_5_Item_Index_1_LabelTemplate,
  #treemap_Level_Index_5_Item_Index_2_LabelTemplate,
  #treemap_Level_Index_5_Item_Index_3_LabelTemplate,
  #treemap_Level_Index_5_Item_Index_4_LabelTemplate,
  #treemap_Level_Index_4_Item_Index_1_LabelTemplate,
  #treemap_Level_Index_4_Item_Index_1_LabelTemplate,
  #treemap_Level_Index_4_Item_Index_2_LabelTemplate,
  #treemap_Level_Index_4_Item_Index_3_LabelTemplate,
  #treemap_Level_Index_4_Item_Index_4_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_1_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_2_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_3_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_4_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_5_LabelTemplate,
  #treemap_Level_Index_2_Item_Index_6_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_1_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_2_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_3_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_4_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_5_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_6_LabelTemplate,
  #treemap_Level_Index_3_Item_Index_7_LabelTemplate{
    width:100%;
    padding:0;
    top: 30px!important;
  }
  .table th, .table td {
    padding-top: 0.25rem;
    padding-bottom: 0.35rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    border-top: 0px solid #c8ced3;
    border-left: 0px;
    border-right: 0px;
    font-size: 0.855rem;
  }

  #righttable td {
    border-top: 0px solid #c8ced3;
    border-bottom: 0px solid #c8ced3;
  }

  .table {
    border: 0px solid #ccc;
    margin-bottom: 0.1rem;
  }

  .wrapper {
    min-width: 100%;
    height: 38%;
    margin-top: 18px;
  }

  .wrapperdept {
    min-width: 100%;
    height: 325px;
    /*margin-top: 18px;*/
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
    min-height: 538px !important;
  }

  .col-lg-4 {
    padding-right: 10px;
    padding-left: 5px;
  }

  #tooltip-container_svg {
    margin-top: 0px !important;
  }

  .table-responsive {

    overflow-x: visible !important;
  }

  #tablecard {
    padding: 0.25rem !important;
  }

  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.25rem;
  }

  #deptreport .card-header {
    border: 0px !important;
  }

  #tablecard .card-header {

    border-bottom: 0px;
  }

  #tablecard {
    border: 0 !important;
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

    body {
      color-adjust: exact;
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

    .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
      display: none;
    }
  }

  #tooltip-container_svg {
    height: 220px !important;
  }

  .customCard.brand-card-header {
    height: 3.2rem;
  }

  .customCardBody.brand-card-body {
    padding: 0.15rem 0;
  }

  .breadcrumb {
    margin-bottom: 0.5rem;
  }

  .main .container-fluid {
    padding: 0 10px;
  }
  td.e-rowcell {
    color: #505050 !important;
  }
  @media (max-width: 680px){
    .customCardClass {
      width: 85%;
      margin-left: 0 !important;
    }
  }
  .customCardClass {
    width: 85%;
    margin-left: 0 !important;
  }
  @media (min-width: 1500px){
    .customCardClass {
      width: 85%;
      margin-left: 0 !important;
    }
  }
  @media (min-width: 1600px){
    .customCardClass {
      width: 70%;
      margin-left: 0 !important;
    }
  }
  text[id^="chartcontainer_Series_0_"] {
    font-size: 10px;
  }
  /*customCardClass*/
</style>

