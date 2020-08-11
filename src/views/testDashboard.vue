<template>
  <div class="animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>
    <div class="card" id="dropdown1">

      <div class="card-header">
        <div class="row">
          <div class="col-md-11">

          </div>
          <div class="col-md-1" style="text-align:right">
            <b-link class="card-header-action btn-minimize" v-b-toggle.my-collapse>
              <i class="icon-arrow-up"></i>
              <!-- <span class="when-opened">Close</span> <span class="when-closed">Open</span> My Collapse -->
            </b-link>
            <!-- Content here -->

            <b-link class="card-header-action btn-close" id="myPrntbtn" v-on:click="loaded"><i
              class="icon-printer"></i></b-link>
          </div>
        </div>

      </div>
      <b-collapse id="my-collapse">

        <div class="card-body">

          <b-row>

            <b-col>
              <b-form-group horizontal :label="get_text('sector@l')">
                <b-form-select v-model="sector" :options="this.$store.state.setTenant"
                               v-on:change="getSector()">
                  {{sector}}
                  <option slot="first" :value="null">-- اختر --</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group horizontal :label="get_text('org_unit@l')">
<!--                <b-form-select v-model="org_unit" :options="this.$store.state.setSubTenant"-->
<!--                               v-on:change="getOrg_unit()">-->
<!--                  {{org_unit}}-->
<!--                  <option slot="first" :value="null">&#45;&#45; اختر &#45;&#45;</option>-->
<!--                </b-form-select>-->
                <treeselect :dir="rtl ? 'rtl' : 'ltr'" :options="options" :value="null"
                            :normalizer="normalizer"   :placeholder="get_text('please_select@l')" @input="getOrg_unit()" searchable="searchable"
                            v-model="org_unit"/>

              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group horizontal :label="get_text('mtp@l')">
                <b-form-select v-model="mtp_date" :options="mtp_options"
                               v-on:change="getSelectedMTP()">
                  <option slot="first" :value="null">-- اختر --</option>
                </b-form-select>
              </b-form-group>
            </b-col>


          </b-row>
          <!-- </b-card> -->

        </div>
      </b-collapse>
    </div>

    <b-row>
      <b-col sm="4" lg="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp; <span class="text-white">{{get_text('active_inactive@statistics@l')}} </span>&nbsp;&nbsp;
            <i class="fas fa-star-half-alt"></i>
            <!--<div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[50, 50, 50, 50, 50, 50]"
                                        height="90"/>
            </div>-->
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">{{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.activeCount:''}}
              </div>
              <!--  -->
              <div class="text-muted small">{{get_text('active@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.notActiveCount:''}}
              </div>
              <div class="text-muted small">{{get_text('inactive@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="4" lg="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp; <span class="text-white">{{get_text('uptodate_notuptodate@statistics@l')}} </span>
            &nbsp;&nbsp;
            <i class="fas fa-route"></i>
            <!--<div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-02" :data="[50,50,50,50,50,50]" height="90"/>
            </div>-->
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.uptodateCount:''}}
              </div>
              <div class="text-muted small">{{get_text('up_to_date@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.notUpdatetodate:''}}
              </div>
              <div class="text-muted small">{{get_text('not_up_to_date@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="4" lg="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp;<span class="text-white">{{get_text('efficiency_strategy@statistics@l')}} </span>&nbsp;&nbsp;
            <i class="fas fa-chess-knight"></i>
            <!--<div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-03" :data="[50,50,50,50,50,50]" height="90"/>
            </div>-->
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.efficiencyCount:''}}
              </div>
              <div class="text-muted small">{{get_text('efficiency@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.strategyCount:''}}
              </div>
              <div class="text-muted small">{{get_text('strategy@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </b-col>

    </b-row>
    <div class="row">
      <div class="col-4 col-lg-4">
        <div class="card">
          <div class="card-body p-0 d-flex align-items-center">
            <i class="fa fa-thermometer-full bg-danger p-4 font-2xl mr-3"></i>
            <div>
              <div class="text-value-sm text-danger">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.highCount:''}}
              </div>
              <div class="text-muted font-weight-bold small">{{get_text('high@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 col-lg-4">
        <div class="card">
          <div class="card-body p-0 d-flex align-items-center">
            <i class="fa fa-thermometer-half bg-danger p-4 font-2xl mr-3"></i>
            <div>
              <div class="text-value-sm text-danger">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.midCount:''}}
              </div>
              <div class="text-muted font-weight-bold small">{{get_text('mid@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 col-lg-4">
        <div class="card">
          <div class="card-body p-0 d-flex align-items-center">
            <i class="fa fa-thermometer-quarter bg-danger p-4 font-2xl mr-3"></i>
            <div>
              <div class="text-value-sm text-danger">
                {{this.$store.state.static_dashboard_table_value.length > 0
                ?this.$store.state.static_dashboard_counts.lowCount:''}}
              </div>
              <div class="text-muted font-weight-bold small">{{get_text('low@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div><!--/.row-->


    <b-row>
      <b-col md="12">
        <b-card :header="get_text('org_unit@statistics@l')">
          <div slot="header">
            <i class="fa fa-plus-square" style="margin-top: 0.2em; cursor: pointer; font-size: 22px" @click='expand' title="Expand"
               v-if="showExDe"></i>
            <i class="fa fa-minus-square" style="margin-top: 0.2em; cursor: pointer; font-size: 22px" @click='collapse'
               title="Collapse" v-else></i>&nbsp;
            <b class="h4">{{ get_text('org_unit@statistics@l') }}<!--{{ $t('greeting') }}--></b>

            <div class="float-right">
              <input type="checkbox" style="margin-top: -3px;"
                     @change="getAllVals($event)"
                     v-model="getallval"
                     value="1"
                     variant="primary"
                     size="md"
                     class="btn">
              &nbsp;
              <div class="float-right"> {{ get_text('check_all_unit@statistics@l') }} &nbsp;
                <!-- <button @click='expand' title="Expand" v-if="showExDe"><i class="fa fa-plus-square"></i>
                 </button>
                 <button @click='collapse' title="Collapse" v-else><i class="fa fa-minus-square"></i></button>-->
              </div>
            </div>
          </div>

          <div class="control-section" style="overflow: auto">
            <div class="content-wrapper" v-if="this.$store.getters.static_dashboard_table_value.length > 0">
              <!--<dashboardPivotTable ref="circulargauge1" :kpivlaues=dashboard_table_val
                                   :translation="this.translation"></dashboardPivotTable>-->
              <!--<dashboardTreeGrid ref="circulargauge1"
                                 :kpivlaues=dashboard_table_val>
              </dashboardTreeGrid>-->
              <ejs-treegrid v-if="this.$store.getters.static_dashboard_table_value.length > 1"
                            :dataSource='this.$store.getters.static_dashboard_table_value'
                            idMapping='sub_id'
                            parentIdMapping='sub_parent'
                            hasChildMapping='true'
                            :treeColumnIndex='0'
                            ref="grid"
                            :enableCollapseAll="false"
                            :gridLines="lines"
                            :allowResizing= 'true'
              >
                <!--:toolbar='toolbar'-->
                <e-columns>
                  <e-column field='sub_name' :headerText='this.get_text("org_name@statistics@c")'
                            width='200' :textAlign="$i18n.locale=='en' ? 'left' : 'right'"></e-column>
                  <e-column field='unit_count' :headerText="this.get_text('unit_count@statistics@c')" width='70'
                            :template="unitcounttemplate" textAlign='center'></e-column>
                  <e-column field='kpi_count' :headerText="this.get_text('kpi_count@statistics@c')" width='70' :template="kpicounttemplate"
                            textAlign='center'></e-column>
                  <e-column field='kpi_eff' :headerText='this.get_text("by_efficiency@statistics@c")' width='80'
                            :template="efficiencytemplate"
                  textAlign='center'></e-column>
                  <!--<e-column field='by_strategy' :headerText="this.get_text('by_strategy@statistics@c')" width='80'
                            textAlign='center'></e-column>-->
                  <e-column field='kpi_up_to_date' :headerText="this.get_text('by_uptodate@statistics@c')" width='80'
                            textAlign='center'
                            :template="uptodatetemplate"></e-column>
                  <e-column field='kpi_active' :headerText="this.get_text('by_active@statistics@c')" width='75'
                            textAlign='center'
                            :template="activetemplate"></e-column>
                  <e-column field='kpi_importance_h' :headerText="this.get_text('by_importance@statistics@c')"
                            width='90' textAlign='center'
                            :template="importancetemplate"></e-column>
                </e-columns>
              </ejs-treegrid>

              <ejs-treegrid v-else
                            :dataSource='this.$store.getters.static_dashboard_table_value'
                            :height='400'
              >
                <!--:toolbar='toolbar'-->
                <e-columns>
                  <e-column field='sub_name' :headerText='this.get_text("org_name@statistics@c")'
                            width='200'></e-column>
                  <e-column field='kpi_count' :headerText="this.get_text('kpi_count@statistics@c')" width='70' :template="kpicounttemplate"
                            textAlign='center'></e-column>
                  <e-column field='kpi_eff' :headerText='this.get_text("by_efficiency@statistics@c")' width='80' :template="efficiencytemplate"
                            textAlign='center'></e-column>
                  <!--<e-column field='by_strategy' :headerText="this.get_text('by_strategy@statistics@c')" width='80'
                            textAlign='center'></e-column>-->
                  <e-column field='kpi_up_to_date' :headerText="this.get_text('by_uptodate@statistics@c')" width='80'
                            textAlign='center'
                            :template="uptodatetemplate"></e-column>
                  <e-column field='kpi_active' :headerText="this.get_text('by_active@statistics@c')" width='80'
                            textAlign='center'
                            :template="activetemplate"></e-column>
                  <e-column field='kpi_importance_h' :headerText="this.get_text('by_importance@statistics@c')"
                            width='90' textAlign='center'
                            :template="importancetemplate"></e-column>
                </e-columns>
              </ejs-treegrid>
            </div>
          </div>
            <b-alert variant="success" show :variant="dark" v-if="this.$store.state.strategyCount !=
            '0' && this.sector != '2'
            && this.parent !='2'"
                     style="width: 100%;">&nbsp;
                <div style="margin-left: 1%; margin-right: 1%;" :style="$i18n.locale=='en' ? 'float: right; ' : 'float: left;'">{{
                  this.get_text('stratrgy_count_note@statistics@m') }} : {{
                  this.$store.state.strategyCount }}
                </div>
            </b-alert>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>
<!--<template>
  <div>
    <div class="control-section" style="overflow: auto">
      <div class="content-wrapper">
        <ejs-pivotview id="pivotview" :dataSourceSettings="dataSourceSettings" :gridSettings="gridSettings" :width="width" :height="height">
        </ejs-pivotview>
      </div>
    </div>

  </div>
</template>-->
<script lang="ts">
  import Vue from "vue";
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import {store} from '../views/dashboard/store';
  import SocialBoxChartExample from './dashboard/SocialBoxChartExample';
  //import dashboardPivotTable from './dashboard/dashboardPivotTable';
  //import dashboardTreeGrid from './dashboard/dashboardTreeGrid';
  //import treeselect from '../treeselect/treeselect'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import {Button} from "@syncfusion/ej2-buttons";

  Vue.use(Loading);
  import {TreeGridPlugin, Toolbar, Page, Resize} from
      "@syncfusion/ej2-vue-treegrid";
  import {QueryCellInfoEventArgs, Column, getObject, ActionEventArgs} from '@syncfusion/ej2-grids';
  import {addClass, isNullOrUndefined} from '@syncfusion/ej2-base';
  import th from "element-ui/src/locale/lang/th";

  Vue.use(TreeGridPlugin);

  export default {
    store: store,
    name: 'dashboard',
    components: {
      SocialBoxChartExample,
      //dashboardPivotTable,
      //dashboardTreeGrid,
      'loading': Loading,
      Treeselect
    },
    data: () => {
      return {
        translation: [],
        getallval: false,
        sector: 2,
        org_unit: 6,
        options:'',
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.tree,
          }
        },
        mtp_date: 4,
        parent: 2,
        mtp: '',
        selected: 'Month',
        tableFields: [],
        filterSettings: {type: 'Excel'},
        //toolbar: ['Print'],
        pageSettings: {pageCount: 4},
        lines: 'Vertical',
        enableCollapseAll: 'true',
        showExDe: false,
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
        uptodatetemplate: function () {
          return {
            template: Vue.component('uptodatetemplate', {
              template:
                `
                <div class="image" style="display: inline">
                  <div style="width: 100%">
                    <div style="float: left;width: 25%;">
                      <i class="fa fa-check-square" aria-hidden="true" style="color: green"></i>
                    </div>
                    <div style="float: left;width: 25%;">
                      <strong class="text-left"> {{ (data.kpi_up_to_date) ? data.kpi_up_to_date : 0 }}</strong>&nbsp;&nbsp;
                    </div>
                    <div style="float: left;width: 25%;">
                      <i class="fa fa-window-close" aria-hidden="true" style="color: red"></i>
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
      };
    },
    sockets: {
      /*message(data) {
        //let message = JSON.parse(data);
        //console.log(message);
        this.$store.dispatch('newMessageNotification', data);
      },*/
      dashboard(data) {
        /*alert('ttt');
          let message = JSON.parse(data);
          console.log(message);*/
        this.$store.dispatch('realTimeUpdateDashboard', [this.mtp_date, this.sector]);
        this.$store.dispatch('realTimeDashboardTable', [this.mtp_date, this.sector]);
      }
    },
    beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
      //  this.$store.dispatch('loadDashboardValues');
    },
    beforeCreate() {
      //this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.sector]);
      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');
      this.$store.dispatch('loadStaticDashboardTable', [this.mtp_date, this.sector]);

    },
    computed:
      {
        dashboard_table_val() {
          this.tableFields = [
            {key: 'sub_name', label: this.get_text('org_name@statistics@c')},
            {
              key: 'kpi_count',
              label: this.get_text('kpi_count@statistics@c'),
              sortable: true,
              sortDirection: 'asc'
            },
            {key: 'process_count', label: this.get_text('by_efficiency@statistics@c')},
            {key: 'strategy_count', label: this.get_text('by_strategy@statistics@c')},
            {key: 'up_to_date_count', label: this.get_text('by_uptodate@statistics@c')},
            {key: 'active_count', label: this.get_text('by_active@statistics@c')},

          ];

          var filterData = this.$store.state.static_dashboard_table_value
          this.totalRows = filterData.length;
          return filterData
        },
        mtp_options() {
          var mtp_options = this.$store.state.dashboard_mtp.map(function (item) {
            return {
              value: item.value,
              text: item.text
            }
          });
          return mtp_options

        },
      },
    provide: {
      treegrid: [Page, Toolbar, Resize]
    },
    methods: {
      expand: function () {
        this.showExDe = false;
        this.$refs.grid.ej2Instances.expandAll();
      },
      collapse: function () {
        this.showExDe = true;
        this.$refs.grid.ej2Instances.collapseAll();
      },
      getAllVals(val) {
        //alert(this.getallval)
        this.$store.dispatch('loadStaticDashboardTable', [this.mtp_date, this.sector, this.getallval]);
      },
      getSector() {
        this.options='';
        this.showExDe = false;
        if (this.sector == null) {
          this.org_unit = "";
          this.$store.state.setSubTenant = {};
        }

        this.org_unit = "";
        this.parent = this.sector;
        //alert(this.sector);
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.sector]);
        this.$store.dispatch('loadSubTenants', this.sector);

        Vue.axios.get('/subtenanttree/' + this.sector)

          .then(response => {
            if (response.data.code == 200) {
              this.options = response.data.subTenants;


            }
          });

        this.$store.dispatch('loadStaticDashboardTable', [this.mtp_date, this.sector, this.getallval]);

        // var targetVal = (typeof this.target_id != "undefined" && this.target_id != '') ? this.target_id : 0;
        // if (this.showingdropModal) {
        //     this.$refs.dropdown.hide(true)
        //     showingdropModal = false;
        // }
      },
      getOrg_unit() {
        this.showExDe = false;
        if (this.org_unit == null) {
          this.parent = this.sector;
        } else {
          this.parent = this.org_unit;

        }
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.parent]);
        this.$store.dispatch('loadStaticDashboardTable', [this.mtp_date, this.parent]);


      },

      getSelectedMTP() {
        this.showExDe = false;
        // alert(this.parent)
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.parent]);
        this.$store.dispatch('loadStaticDashboardTable', [this.mtp_date, this.parent]);


      },
      loaded: function (args) {
        var printButton = document.getElementById("myPrntbtn");
        printButton.style.visibility = 'hidden';
        var dropButton = document.getElementById("dropdown1");
        dropButton.style.visibility = 'hidden';

        window.print()
        printButton.style.visibility = 'visible';
        dropButton.style.visibility = 'visible';

      },
      get_text(textbit) {
        if ((typeof this.translation[this.$i18n.locale][textbit] != "undefined" && this.translation[this.$i18n.locale][textbit] != null)) {
          return this.translation[this.$i18n.locale][textbit];
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
      flag(value) {
        return 'flag-icon flag-icon-' + value
      }
    }
  };
</script>

<style>
  td.e-rowcell.e-focus.e-selectionbackground.e-active {
    font-weight: bold !important;
  }
  td.e-rowcell.e-selectionbackground.e-active {
    font-weight: bold !important;
  }
  .e-row[aria-expanded="false"], tr[aria-expanded="true"] {
    font-weight: bold;
  }
  .e-grid .e-headercell, .e-grid .e-detailheadercell {
    font-weight: bold;
    color: black;
  }
  /* csslint ignore:start */
  /*.e-grid .e-headercelldiv {
    text-align: center !important;
  }

  td.e-rowcell.e-valuescontent.e-summary.e-gtot {
    text-align: center;
  }

  .e-popup-open {
    background-color: #7aa6da !important;
  }*/

  /* csslint ignore:end */
</style>
