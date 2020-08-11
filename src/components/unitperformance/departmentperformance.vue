<template>
  <div class="app animated fadeIn">

    <div class="card" id="dropdown1">
      <div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">

        <b-link v-if="this.routeparams && this.type!=1 || this.showback==1" :href=this.routelink variant="warning" size="md"
                class="btn float-right"

                style="background-color:#ffc107;margin-top: 0.5%;"
                :class="($i18n.locale=='en' ? 'ltrclassbck' : 'rtlclassbck')">
          <b><i class="fa fa-arrow-left"></i>{{
            get_text('back@department_performance@l') }}</b></b-link>
      </div>
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

      <b-collapse id="collapse1" style="display: block;">
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
                <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')" searchable="searchable" :options="options" v-model="sortBySubTenant"   @input="getdeptsectiontreemap" />
              </b-form-group>
            </b-col>
            <!--            <b-col class="my-1" md="4">-->
            <!--              <b-form-group :label="get_text('subtenant@section_performance@l')" horizontal>-->
            <!--                <b-input-group>-->
            <!--                  <b-form-select :options="this.$store.state.setSubTenant" @change="getsectiontreemap"-->
            <!--                                 v-model="sortBySubTenant">-->
            <!--                    <option :value="null" slot="first">{{-->
            <!--                      get_text('please_select@section_performance@l')-->
            <!--                      }}-->
            <!--                    </option>-->
            <!--                  </b-form-select>-->
            <!--                </b-input-group>-->
            <!--              </b-form-group>-->
            <!--            </b-col>-->
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
    <!--    <loading :active.sync="!this.$store.state.isLoading"-->
    <!--             :can-cancel="true"-->
    <!--             :is-full-page="this.$store.state.fullPage"></loading>-->

    <!--    <div v-if="this.$store.state.isloading">-->
    <!--      <div style="text-align:center; padding-top:50px;">-->
    <!--        {{ this.get_text('loading@l') }} {{ this.$store.state.isloading }}-->
    <!--      </div>-->
    <!--    </div>-->
    <div id="sectiontreemap" v-if="this.dataSource123">
      <!--                        <div id="sectiontreemap" >-->

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
                <div class="text-muted small">{{get_text('unit_count@department_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4" sm="4">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              &nbsp;&nbsp; <span class="text-white">{{get_text('performing_nonperforming_units@department_performance@l')}} </span>&nbsp;&nbsp;
              <i class="fas fa-route"></i>
              <div class="chart-wrapper">
                <!--                <social-box-chart-example :data="[50, 50, 50, 50, 50, 50]" chartId="box-chart-01"-->
                <!--                                          height="90"/>-->
              </div>
            </div>
            <div class="brand-card-body">
              <div>
                <div class="text-value">{{ this.performingkpicount}}
                </div>
                <!--  -->
                <div class="text-muted small">{{get_text('performing_units@department_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ this.nonperformingkpicount}}
                </div>
                <div class="text-muted small">{{get_text('non_performing_units@department_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="4" sm="4">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              &nbsp;&nbsp; <span
              class="text-white">{{get_text('best_least_performance@department_performance@l')}} </span>
              &nbsp;&nbsp;
              <i class="fas fa-star-half-alt"></i>
              <div class="chart-wrapper">
                <!--                <social-box-chart-example :data="[50,50,50,50,50,50]" chartId="box-chart-02" height="90"/>-->
              </div>
            </div>
            <div class="brand-card-body">
              <div>
                <div class="text-value"> {{ this.kpibestperforming}}%
                  <i v-if="this.debug_show_icon_best==1" style="color:red"
                     class="fas fa-exclamation-triangle fa-1x"></i>
                </div>
                <div class="text-muted small">{{get_text('best_performance@department_performance@l')}}</div>
              </div>
              <div>
                <div class="text-value">
                  {{ this.kpileastperforming}}%
                  <i v-if="this.debug_show_icon_least==1" style="color:red"
                     class="fas fa-exclamation-triangle fa-1x"></i>

                </div>
                <div class="text-muted small">{{get_text('least_performance@department_performance@l')}}</div>
              </div>
            </div>
          </div>
        </b-col>


      </b-row>
      <b-row style="background-color: #ffffff;margin:0;padding-top:10px;">

        <div :class="this.type!=1 ? 'col-lg-9 control-section' : 'col-lg-8 control-section' "
             style="padding-top: 20px;direction: ltr;">
          <!--          <div v-if="this.type==1" style="margin-left: 15px;margin-top: -10px;font-size: 0.875rem;color:#000000"-->
          <!--               class="text-muted font-weight-bold">{{this.get_text('sector_performance@department_performance@l')}}-->
          <!--          </div>-->
          <div style="margin-left: 15px;margin-top: -10px;font-size: 0.875rem;color:#000000"
               class="text-muted font-weight-bold">{{this.get_text('org_unit_performance@department_performance@l')}}
          </div>
          <!--          <div v-if="this.type==0" style="margin-left: 15px;margin-top: -10px;font-size: 0.875rem;color:#000000"-->
          <!--               class="text-muted font-weight-bold">{{this.get_text('department_performance@department_performance@l')}}-->
          <!--          </div>-->
          <!--       <ejs-treemap ref="treemap" id='layout-container' :load='load' align="center" :titleSettings='titleSettings' :rangeColorValuePath='rangeColorValuePath' format='n' useGroupingSeparator='useGroupingSeparator' :dataSource='dataSource' :leafItemSettings='leafItemSettings' :tooltipSettings='tooltipSettings' :weightValuePath='weightValuePath'></ejs-treemap>-->
          <!--          <ejs-treemap v-if="$i18n.locale=='en'" :enableRtl='enableRtl1' :renderDirection='renderDirection1'-->
          <!--                       :dataSource='dataSource' :leafItemSettings='leafItemSettingsval' :load='load'-->
          <!--                       :rangeColorValuePath='rangeColorValuePath'-->
          <!--                       :tooltipSettings='tooltipSettingsval' :weightValuePath='weightValuePath' align="center"-->
          <!--                       format='n'-->
          <!--                       id='layout-container' ref="treemap" useGroupingSeparator='useGroupingSeparator'></ejs-treemap>-->
          <!--          <ejs-treemap v-if="$i18n.locale=='ar'" :enableRtl='enableRtl' :renderDirection='renderDirection'-->
          <!--                       :dataSource='dataSource' :leafItemSettings='leafItemSettingsval1' :load='load'-->
          <!--                       :rangeColorValuePath='rangeColorValuePath'-->
          <!--                       :tooltipSettings='tooltipSettingsval' :weightValuePath='weightValuePath' align="center"-->
          <!--                       format='n'-->
          <!--                       id='layout-container' ref="treemap" useGroupingSeparator='useGroupingSeparator'></ejs-treemap>-->
          <ejs-treemap id="treemap" v-if="$i18n.locale=='en'" :enableRtl='enableRtl1'
                       :rangeColorValuePath='rangeColorValuePath' :dataSource='dataSource123'
                       :enableDrillDown='enableDrillDown' :weightValuePath='weightValuePath' :levels='levelsettings'
                       :tooltipSettings='tooltipSettingsval' :drillDownView='drillDownView'
                       :leafItemSettings='leafItemSettingsval'></ejs-treemap>
          <ejs-treemap id="treemap" v-if="$i18n.locale=='ar'" :enableRtl='enableRtl'
                       :rangeColorValuePath='rangeColorValuePath' :dataSource='dataSource123'
                       :enableDrillDown='enableDrillDown' :weightValuePath='weightValuePath' :levels='levelsettings1'
                       :tooltipSettings='tooltipSettingsval1' :drillDownView='drillDownView'
                       :leafItemSettings='leafItemSettingsval1'></ejs-treemap>
          <!--
               <ejs-treemap id='container' ref='treemap' align="center" :load='load' :drillStart='drillStart' :tooltipRendering='tooltipRendering' :palette='palette' :titleSettings='titleSettings' :enableDrillDown='enableDrillDown' format='n' :useGroupingSeparator='useGroupingSeparator' :dataSource='dataSource' :weightValuePath='weightValuePath' :tooltipSettings='tooltipSettings' :leafItemSettings='leafItemSettings' :levels='levels'></ejs-treemap>-->
          <b-card style="border: 0px solid #c8ced3;padding-left: 10px;padding-right: 10px;" id="deptreport"
                  v-if="this.type==1" :header="get_text('departments_startegic_kpi_goals@department_performance@l')">


            <table :style="$i18n.locale=='ar' ? 'direction:rtl' : 'direction:ltr' " style="border: 0px solid #ccc;"
                   class="table table-bordered table-responsive">

              <thead>
              <tr style="border: 0px solid #c8ced3;">

                <th style="width: 30%;fixed:true; border: 0px solid #c8ced3;">
                  {{get_text('department_name@department_performance@l')}}
                </th>
                <th style="width: 30%;fixed:true; border: 0px solid #c8ced3;">
                  {{get_text('strategic_kpi_name@department_performance@l')}}
                </th>
                <th style="width: 30%;fixed:true; border: 0px solid #c8ced3;">
                  {{get_text('kpi_performance@department_performance@l')}}
                </th>
                <th width="70px;" style="width: 50%;fixed:true;border: 0px solid #c8ced3;">
                  {{get_text('kpi_progress@department_performance@l')}}
                </th>
              </tr>
              </thead>
              <tbody style="border: 0px solid #c8ced3;">

              <tr style="border: 0px solid #c8ced3;" v-for="departments in this.kpistrategic_sector"
                  :key="departments[0].sub_id">
                <td style="border: 0px solid #c8ced3;"><a style="color:#000000"
                                                          :href="'departmentperformance?query='+'section='+sortBySubTenant+','+sortByMtp+','+sortByasofperiod+','+sortByyearno+','+departments[0].sub_id">{{
                  departments[0].sub_name }}</a></td>
                <td style="width:50%;fixed:true;border: 0px solid #c8ced3;"><a
                  style="color:#000000;border: 0px solid #c8ced3;"
                  :href="'gaugechart/'+departments[0].kpi_id+'?query='+sortBySubTenant+','+sortByMtp+','+sortByasofperiod+','+sortByyearno">{{
                  departments[0].kpi_name }} </a></td>
                <td style="border: 0px solid #c8ced3;">
                  <div v-if="(departments[0].kpi_perf*100)>=0 && (departments[0].kpi_perf*100)<20 " class="progress-bar"
                       role="progressbar"
                       :style="'width:'+(departments[0].kpi_perf*100)+'%'+';background-color: #cc163e;'"
                       :aria-valuenow="(departments[0].kpi_perf*100)" aria-valuemin="0" aria-valuemax="100">{{
                    (departments[0].kpi_perf*100).toFixed(2) }}%
                  </div>
                  <div v-if="(departments[0].kpi_perf*100)>=20 && (departments[0].kpi_perf*100)<40 "
                       class="progress-bar" role="progressbar"
                       :style="'width:'+(departments[0].kpi_perf*100)+'%'+';background-color: #ffbd35;'"
                       :aria-valuenow="(departments[0].kpi_perf*100)" aria-valuemin="0" aria-valuemax="100">{{
                    (departments[0].kpi_perf*100).toFixed(2) }}%
                  </div>
                  <div v-if="(departments[0].kpi_perf*100)>=40 && (departments[0].kpi_perf*100)<60" class="progress-bar"
                       role="progressbar"
                       :style="'width:'+(departments[0].kpi_perf*100)+'%'+';background-color: #f9ea60;'"
                       :aria-valuenow="(departments[0].kpi_perf*100)" aria-valuemin="0" aria-valuemax="100">{{
                    (departments[0].kpi_perf*100).toFixed(2) }}%
                  </div>
                  <div v-if="(departments[0].kpi_perf*100)>=60 && (departments[0].kpi_perf*100)<80" class="progress-bar"
                       role="progressbar"
                       :style="'width:'+(departments[0].kpi_perf*100)+'%'+';background-color: #4dbb63;'"
                       :aria-valuenow="(departments[0].kpi_perf*100)" aria-valuemin="0" aria-valuemax="100">{{
                    (departments[0].kpi_perf*100).toFixed(2) }}%
                  </div>
                  <div v-if="(departments[0].kpi_perf*100)>=80 && (departments[0].kpi_perf*100)<100 "
                       class="progress-bar" role="progressbar"
                       :style="'width:'+(departments[0].kpi_perf*100)+'%'+';background-color: #1c8c44;'"
                       :aria-valuenow="(departments[0].kpi_perf*100)" aria-valuemin="0" aria-valuemax="100">{{
                    (departments[0].kpi_perf*100).toFixed(2) }}%
                  </div>

                  <!--                  <span v-if="(departments[0].kpi_perf*100)>=0 && (departments[0].kpi_perf*100)<20 " style="width: 40px;display: inline-block;background-color: #cc163e;">&nbsp;-->
                  <!--                  </span>-->
                  <!--                  <span v-if="(departments[0].kpi_perf*100)>=20 && (departments[0].kpi_perf*100)<40 "style="width: 40px;display: inline-block;background-color: #ffbd35">&nbsp;-->
                  <!--                  </span>-->
                  <!--                  <span v-if="(departments[0].kpi_perf*100)>=40 && (departments[0].kpi_perf*100)<60 "style="width: 40px;display: inline-block;background-color: #f9ea60">&nbsp;-->
                  <!--                  </span>-->
                  <!--                  <span v-if="(departments[0].kpi_perf*100)>=60 && (departments[0].kpi_perf*100)<80 " style="width: 40px;display: inline-block;background-color: #4dbb63">&nbsp;-->
                  <!--                  </span>-->
                  <!--                  <span v-if="(departments[0].kpi_perf*100)>=80 && (departments[0].kpi_perf*100)<100 " style="width: 40px;display: inline-block;background-color: #1c8c44">&nbsp;-->
                  <!--                  </span>-->

                </td>
                <td v-if="debug_progmode==0 && departments[0].kpi_prog<0" style="border: 0px solid #c8ced3;">0% <i
                  v-if="debug_progmode==0" style="color:red" class="fas fa-exclamation-triangle fa-1x"></i>
                </td>
                <td v-if="departments[0].kpi_prog>=0" style="border: 0px solid #c8ced3;">{{
                  (departments[0].kpi_prog*100).toFixed(2) }}%
                </td>
              </tr>

              </tbody>


            </table>
          </b-card>


        </div>

        <div :class="this.type!=1 ? 'col-lg-3 property-section' : 'col-lg-4 property-section'">
          <div class="text-muted font-weight-bold"
               style="padding-bottom:0px;margin-bottom:0px;padding-top: 10px;font-size: 0.875rem;color:#000000">
            {{this.get_text('unit_performance@department_performance@l')}}
          </div>

          <div :class="this.type!=1 ? 'wrapperdept' : 'wrapper'"
               style="margin-top: 10px;border: 1px solid #c8ced3;" align="center">

            <!--             <ejs-circulargauge >-->
            <!--               <e-axes>-->
            <!--                 <e-axis startAngle= 270 endAngle= 90  radius= '80%' :pointers = 'pointers' :ranges='ranges' :lineStyle= 'lineStyle'>-->
            <!--                 </e-axis>-->
            <!--               </e-axes>-->
            <!--             </ejs-circulargauge>-->

            <ejs-circulargauge :class="this.type==1 ? 'circulargaugestyle' : 'circulargaugestylenosector'" :enablePointerDrag='enablePointerDrag'
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

            <div class="card" style="margin-top:40px;margin-bottom: 5px;">
              <div class="card-body p-0 d-flex align-items-center">
                <i class="fas fa-chart-line bg-danger p-4 font-2xl mr-3" style="background-color: #00aced !important;

                color: #fff;"></i>

                <div>
                  <div class="text-muted font-weight-bold" style="font-size: 0.875rem;">
                    {{get_text('unit_progress@section_performance@l')}}
                  </div>
                  <div class="text-value-sm text-danger">

                    <div class="text-value-sm" style="color:#00aced">
                      <div :class="($i18n.locale=='en' ? 'ltrprogressclass' : 'rtlprogressclass')">{{this.unitprogress+"%"}}
                      <i v-if="this.debug_show_icon_prog==1" style="color:red"
                         class="fas fa-exclamation-triangle fa-1x"></i>
                    </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <b-card id="tablecard" style="padding: 0.25rem;boder:0px" v-if="this.type==1 && this.kpistrategicvalues!=''"
                    :header="get_text('target_kpi_goals@department_performance@l')">


              <table id="righttable" :class="($i18n.locale=='en' ? 'textleftalign' : 'textrightalign')"
                     style="border: 0px solid #ccc;" v-if="this.type==1 && this.kpistrategicvalues!=''"
                     class="table table-bordered table-responsive">

                <thead>
                <tr>

                  <th style="width: 100%;fixed:true;border:0px;">
                    {{get_text('strategic_kpi_name@department_performance@l')}}
                  </th>
                  <th style="width: 20%;fixed:true;border:0px;">
                    {{get_text('kpi_performance@department_performance@l')}}
                  </th>
                  <th style="width: 20%;fixed:true;border:0px;">
                    {{get_text('kpi_progress@department_performance@l')}}
                  </th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="kpistrategic_kpival in this.kpistrategicvalues">
                  <td style="border:0px;"><a style="color:#000000"
                                             :href="'gaugechart/'+kpistrategic_kpival.kpigoalkpiid+'?query='+sortBySubTenant+','+sortByMtp+','+sortByasofperiod+','+sortByyearno">{{
                    kpistrategic_kpival.kpigoalname }}</a></td>
                  <td style="border:0px;">
                    <div v-if="(kpistrategic_kpival.kpigoalperf)>=0 && (kpistrategic_kpival.kpigoalperf)<20 "
                         class="progress-bar" role="progressbar"
                         :style="'width:'+(kpistrategic_kpival.kpigoalperf)+'%'+';background-color: #cc163e;'"
                         :aria-valuenow="(kpistrategic_kpival.kpigoalperf)" aria-valuemin="0" aria-valuemax="100">{{
                      (kpistrategic_kpival.kpigoalperf)}}%
                    </div>
                    <div v-if="(kpistrategic_kpival.kpigoalperf)>=20 && (kpistrategic_kpival.kpigoalperf)<40 "
                         class="progress-bar" role="progressbar"
                         :style="'width:'+(kpistrategic_kpival.kpigoalperf)+'%'+';background-color: #ffbd35;'"
                         :aria-valuenow="(kpistrategic_kpival.kpigoalperf)" aria-valuemin="0" aria-valuemax="100">{{
                      (kpistrategic_kpival.kpigoalperf)}}%
                    </div>
                    <div v-if="(kpistrategic_kpival.kpigoalperf)>=40 && (kpistrategic_kpival.kpigoalperf)<60"
                         class="progress-bar" role="progressbar"
                         :style="'width:'+(kpistrategic_kpival.kpigoalperf)+'%'+';background-color: #f9ea60;'"
                         :aria-valuenow="(kpistrategic_kpival.kpigoalperf)" aria-valuemin="0" aria-valuemax="100">{{
                      (kpistrategic_kpival.kpigoalperf)}}%
                    </div>
                    <div v-if="(kpistrategic_kpival.kpigoalperf)>=60 && (kpistrategic_kpival.kpigoalperf)<80"
                         class="progress-bar" role="progressbar"
                         :style="'width:'+(kpistrategic_kpival.kpigoalperf)+'%'+';background-color: #4dbb63;'"
                         :aria-valuenow="(kpistrategic_kpival.kpigoalperf)" aria-valuemin="0" aria-valuemax="100">{{
                      (kpistrategic_kpival.kpigoalperf)}}%
                    </div>
                    <div v-if="(kpistrategic_kpival.kpigoalperf)>=80 && (kpistrategic_kpival.kpigoalperf)<100 "
                         class="progress-bar" role="progressbar"
                         :style="'width:'+(kpistrategic_kpival.kpigoalperf)+'%'+';background-color: #1c8c44;'"
                         :aria-valuenow="(kpistrategic_kpival.kpigoalperf)" aria-valuemin="0" aria-valuemax="100">{{
                      (kpistrategic_kpival.kpigoalperf) }}%
                    </div>

                    <!--                  <span v-if="(departments[0].kpi_perf*100)>=0 && (departments[0].kpi_perf*100)<20 " style="width: 40px;display: inline-block;background-color: #cc163e;">&nbsp;-->
                    <!--                  </span>-->
                    <!--                  <span v-if="(departments[0].kpi_perf*100)>=20 && (departments[0].kpi_perf*100)<40 "style="width: 40px;display: inline-block;background-color: #ffbd35">&nbsp;-->
                    <!--                  </span>-->
                    <!--                  <span v-if="(departments[0].kpi_perf*100)>=40 && (departments[0].kpi_perf*100)<60 "style="width: 40px;display: inline-block;background-color: #f9ea60">&nbsp;-->
                    <!--                  </span>-->
                    <!--                  <span v-if="(departments[0].kpi_perf*100)>=60 && (departments[0].kpi_perf*100)<80 " style="width: 40px;display: inline-block;background-color: #4dbb63">&nbsp;-->
                    <!--                  </span>-->
                    <!--                  <span v-if="(departments[0].kpi_perf*100)>=80 && (departments[0].kpi_perf*100)<100 " style="width: 40px;display: inline-block;background-color: #1c8c44">&nbsp;-->
                    <!--                  </span>-->

                  </td>
                  <td style="border:0px;">{{ (kpistrategic_kpival.kpigoalprog) }}%</td>
                </tr>

                </tbody>


              </table>
            </b-card>

            <div style="height:200px;" v-if="!this.kpistrategic_kpi"></div>
            <div v-if="!this.kpistrategic_kpi"></div>
            <div v-if="!this.kpistrategic_kpi"></div>
            <div v-if="!this.kpistrategic_kpi"></div>
            <div v-if="!this.kpistrategic_kpi"></div>
            <div v-if="!this.kpistrategic_kpi"></div>
            <div v-if="this.type==0 && this.kpistrategic_kpi" class="text-muted font-weight-bold"
                 style="font-size: 0.875rem;color:#000000">
              {{get_text('kpi_goals@department_performance@l')}}
            </div>

            <span v-if="this.type==0 && this.kpistrategic_kpi">{{ this.kpistrategic_kpi}}</span>
            <div v-if="this.type==0 && this.kpistrategic_perf" class="brand-card">
              <div class="brand-card-header" style="background-color: #00aced;"><i
                class="glyphicon glyphicon-dashboard"></i>
                <div class="chart-wrapper">
                  <div class="">
                    <div class="chartjs-size-monitor">
                      <div class="chartjs-size-monitor-expand">
                        <div class=""></div>
                      </div>
                      <div class="chartjs-size-monitor-shrink">
                        <div class=""></div>
                      </div>
                    </div>
                    <canvas id="box-chart-02" width="284" height="80"
                            style="display: block; height: 90px; width: 318px;" class="chartjs-render-monitor"></canvas>
                  </div>
                </div>
              </div>
              <div class="brand-card-body" style="padding: 1.75rem 0px;">
                <div>
                  <div class="text-value">
                    {{ this.kpistrategic_perf}}%
                  </div>
                  <div v-if="this.type==0 " class="text-uppercase text-muted small">
                    {{get_text('kpi_performance@department_performance@l')}}
                  </div>
                </div>
                <div>
                  <div v-if="this.type!=2" dir="ltr" class="text-value">

                    {{ this.kpistrategic_prog }}% <i v-if="this.debug_show_icon_progstrategic==1" style="color:red"
                                                     class="fas fa-exclamation-triangle fa-1x"></i>
                  </div>
                  <div v-if="this.type==0  " class="text-uppercase text-muted small">
                    {{get_text('kpi_progress@department_performance@l')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <b-col style="margin-bottom:10px;margin-top:10px;"
               :class="this.type!=1 ? 'col-lg-9 property-section' : 'col-lg-8 property-section' ">
          <div style="margin-left:20px;margin-right:20px;" class="text-value">{{get_text('issue_date@section_performance@l')}} : {{ this.currentdate}}</div>


        </b-col>
        <b-col style="margin-bottom:10px;margin-top:10px;">
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
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  //import treeselect from '../treeselect/treeselect'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


  Vue.use(CircularGaugePlugin);
  Vue.use(TreeMapPlugin);
  Vue.use(Loading);
  let contentVue = Vue.component("contentTemplate", {
    // template: '<div   v-if="data.calc_level!=0"><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">show section report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">show section report</a><br><div align="center" style="margin-top:0px;" v-if="data.debug_show_icon==1"><i v-if="data.debug_show_icon==1" style="color:#ffffff;margin-top:290px;" class="fas fa-exclamation-triangle fa-2x"></i></div></div>',
    //template: '<div   v-if=""><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">show section report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">show section report</a><br><div align="center" style="margin-top:0px;" v-if="data.debug_show_icon==1 || data.debug_show_icon_prog_tool == 1"><i v-if="data.debug_show_icon==1 || data.debug_show_icon_prog_tool == 1" style="color:#ffffff;margin-top:290px;" class="fas fa-exclamation-triangle fa-2x"></i></div></div>',
    template: '<div   v-if=""><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">show supervision report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.supervisionlink">show supervision report</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">show section report</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">show section report</a><br></div>',


    data() {
      return {
        data: {},

      };
    }
  });
  let contentVuear = Vue.component("contentTemplatear", {
    template: '<div  v-if=""  style="direction:rtl;margin-left:-150px;"><div v-if="data.type!=2"><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.supervisionlink">عرض أداء المراقبة</a><a v-if="data.kpi_color==1" style="#57595d;font-size:16px;" :href="data.supervisionlink">عرض أداء المراقبة</a><br/></div><a v-if="data.kpi_color==0" style="color:#ffffff;font-size:16px;" :href="data.link">عرض أداء القسم</a><a v-if="data.kpi_color==1" style="color:#57595d;font-size:16px;" :href="data.link">عرض أداء القسم</a></div>',
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


        dataSource: '',
        dataSource123: '',
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
        Tenantvalue:null,
        options:'',
        sortByusers: null,
        sortByyearno: null,
        sortByasofperiod: null,
        sortByMtp: 4,
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
        subtenanttype: '',
        deptFields: '',
        routeparams: '',
        routelink: '',
        kpistrategicvalues: '',
        debug_show_icon_best: 0,
        debug_show_icon_least: 0,
        debug_show_icon_prog: 0,
        debug_progmode: 0,
        debug_show_icon_progstrategic: 0,
        debug_show_icon_prog_tool: 0,
        showback:0


      }
    },
    provide: {
      circulargauge: [GaugeTooltip, Annotations],
      treemap: [TreeMapTooltip]
    },
    mounted() {

      var currentDate = new Date();

      console.log(currentDate);

      var currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      this.currentdate = currentDateWithFormat;
      //alert(currentDateWithFormat);
    },
    created() {

      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');
      // this.test()


    },
    computed: {


      levelsettings() {
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
              groupPath: 'sectorname', drillDownView: true, templatePosition: 'center', colorMapping: [
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
              ], drillDownView: true, border: {color: 'black', width: 0.5},
            },

            {
              groupPath: 'supervisionname',
              drillDownView: true,
              headerTemplate: '<div style="margin-top: 20px;">${button}</div>',
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
              groupPath: 'deptname',
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
              headerTemplate: '<div style="margin-top: 20px;">${button}</div> <div style="margin-top: 20px;">${sectorlink}</div>',
              drillDownView: true,
              border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'supervisionname',
              drillDownView: true,
              headerTemplate: '<div style="margin-top: 20px;">${button}</div>',
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
              ], border: {color: 'black', width: 0.5}, drillDownView: true, headerAlignment: 'Far'
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
              ], border: {color: 'black', width: 0.5}, drillDownView: true, headerAlignment: 'Far'
            },
            {
              groupPath: 'supervisionname',
              templatePosition: 'Top Right',
              headerTemplate: '<div  style="margin-top: 20px;">${buttonar}</div>',
              drillDownView: true,
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
              border: {color: 'black', width: 0.5},
              headerAlignment: 'Far'
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
              groupPath: 'deptname',
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
              templatePosition: 'Top Right',
              headerAlignment: 'Far',
              drillDownView: true,
              headerTemplate: '<div style="margin-top: 20px;">${buttonar}</div> <div style="margin-top: 20px;">${sectorlinkar}</div>',
              border: {color: 'black', width: 0.5}
            },
            {
              groupPath: 'supervisionname',
              templatePosition: 'Top Right',
              headerTemplate: '<div  style="margin-top: 30px;">${buttonar}</div>',
              drillDownView: true,
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
              border: {color: 'black', width: 0.5},
              headerAlignment: 'Far'
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
        this.sortBySubTenant = routeparamsarr[4];
        // alert( routeparamsarr[0]);
        var sectioncase = routeparamsarr[0].split("=");
       // alert(routeparamsarr[5]);
        this.sortByMtp = routeparamsarr[1];
        this.sortByasofperiod = routeparamsarr[2];
        this.sortByyearno = routeparamsarr[3];

        if (sectioncase) {
          this.routelink = "departmentperformance?query=" + sectioncase[1] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "sectionreport";

        }

        if (routeparamsarr[5] && routeparamsarr[5]!="fromministry") {
          // alert("not dept");
          this.sortBySubTenant = routeparamsarr[0];
          //this.sortByTenant=routeparamsarr[4];
          if (routeparamsarr[6] == "sector") {
            this.type = 1;
            this.routelink = "departmentperformance?query=" + routeparamsarr[7] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "sectionreport";

          }
          if (routeparamsarr[6] == "dept") {
            this.type = 0;
            this.routelink = "departmentperformance?query=" + routeparamsarr[4] + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',' + 1 + ',' + "departmentreport";

          }
          if (routeparamsarr[5] == "supervision" || routeparamsarr[5] == 2) {
            this.type = 2;
          }
          if (routeparamsarr[5] == "sectionreport") {
            this.sortBySubTenant = '';
            this.sortByTenant = routeparamsarr[0];


          }
          // if (routeparamsarr[5] == "fromministry") {
          //  // this.sortBySubTenant = '';
          //  // this.sortByTenant = routeparamsarr[0];
          //   alert("minstry");
          // }

        }
        if(routeparamsarr[5] && routeparamsarr[5]=="fromministry") {
          this.showback=1;
          this.routelink = "../ministrydepartmentperformance/ministry dashboard-6?query=" + 2 + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',backtoministry';

        }
        if(routeparamsarr[8] && routeparamsarr[8]=="fromministry") {
          this.showback=1;
          this.routelink = "../ministrydepartmentperformance/ministry dashboard-6?query=" + 2 + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',backtoministry';

        }
        if(routeparamsarr[7] && routeparamsarr[7]=="fromministry") {
          this.showback=1;
          this.routelink = "../ministrydepartmentperformance/ministry dashboard-6?query=" + 2 + ',' + this.sortByMtp + ',' + this.sortByasofperiod + ',' + this.sortByyearno + ',backtoministry';

        }


        this.getdeptsectiontreemap();
      }
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));

      }
    },
    methods: {

      // drillStart: function (args) {
      //
      //   args.treemap.levels[2].drillDownView = true;
      //
      // },
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

                this.options = response.data.subTenantsdept;
                //alert( JSON.stringify(response.data.subTenants));


              }
            });
          this.getdeptsectiontreemap();
        }

      },
      getdeptsectiontreemap() {
//this.name=this.get_text("name@l");

//alert(this.sortBySubTenant)
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
        // this.sortBySubTenant=42;
        // this.sortByMtp=4;
        // this.sortByasofperiod='Y';
        // this.sortByyearno=1;
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
        if (this.Tenantvalue) {
          Vue.axios.get('getsubtenanttype/' + this.Tenantvalue)

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
                this.$store.state.isLoading = true;

                Vue.axios.get('departmentreport/' + [this.Tenantvalue, this.sortByMtp, this.sortByasofperiod, this.sortByyearno, this.type])

                  .then(response => {
                    if (response.data.code == 200) {
                      this.$store.state.isLoading = true;

                      this.unitperformance = response.data.unitperformance;
                      this.unitprogress = response.data.unitprogress;
                      this.totalkpi = response.data.kpi_count;
                      this.kpistrategic_perf = response.data.kpistrategic_perf;
                      this.kpistrategic_prog = response.data.kpistrategic_prog;
                      this.kpistrategic_kpi = response.data.kpistrategic_kpi;
                      this.kpibestperforming = response.data.kpibestperforming;
                      this.debug_show_icon_best = response.data.debug_show_icon_best;
                      this.kpileastperforming = response.data.kpileastperforming;
                      this.debug_show_icon_least = response.data.debug_show_icon_least;
                      this.debug_show_icon_prog = response.data.debug_show_icon_prog;
                      this.performingkpicount = response.data.performingcount;
                      this.nonperformingkpicount = response.data.nonperformingcount;
                      this.kpistrategicvalues = response.data.kpistrategicvalues;
                      this.dataSource123 = response.data.kpishowdata;

                      this.kpistrategic_sector = response.data.kpistrategic_sector;
                      this.debug_progmode = response.data.debug_progmode;
                      this.debug_show_icon_progstrategic = response.data.debug_show_icon_progstrategic;
                      // this.debug_show_icon_prog_tool=response.data.debug_show_icon_prog_tool;


                      // alert("hii");
                      // alert(this.debug_show_icon_prog)
                    }
                  });

              }
            });
        }

        //   alert(this.sortBySubTenant)
        //  alert("correct"+this.type);


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
  .ltrprogressclass{
    text-align: left;
  }
  .rtlprogressclass{
    text-align: right;
  }
  .ltrclassicons {
    float: left
  }

  .rtlclassicons {
    float: right;
    direction: rtl;
  }

  #treemap_Level_Index_3_Item_Index_1_LabelTemplate {
    width: 100%;
    padding: 0;
    top: 30px !important;

  }

  #treemap_Level_Index_2_Item_Index_1_LabelTemplate {
    width: 100%;
    padding: 0;
    top: 30px !important;

  }

  #treemap_Level_Index_4_Item_Index_1_LabelTemplate {
    width: 100%;
    padding: 0;
    top: 30px !important;

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
  .circulargaugestyle{
    width: 80%;
    /*height:400px*/
  }
  .circulargaugestylenosector{
    width: 80%;
  }


  .wrapper {
    min-width: 100%;
    height: 38%;
    margin-top: 18px;
  }

  .wrapperdept {
    min-width: 100%;
    height: 350px;
    /*margin-top: 18px;*/
  }

  .textleftalign {
    text-align: left;
  }

  .textrightalign {
    text-align: right;
  }

  @media (max-width: 680px) {
    .customCardClass {
      width: 85%;
      margin-left: 0 !important;
    }
  }

  .customCardClass {
    width: 85%;
    margin-left: 0 !important;
  }

  @media (min-width: 1500px) {
    .customCardClass {
      width: 85%;
      margin-left: 0 !important;
    }
  }

  @media (min-width: 1600px) {
    .customCardClass {
      width: 80%;
      margin-left: 0 !important;
    }
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

