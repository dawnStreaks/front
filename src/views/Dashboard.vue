<template>
  <div class="animated fadeIn">
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
              <b-form-group :label="get_text('sector@l')" horizontal>
                <b-form-select :options="this.$store.state.setTenant" v-model="sector"
                               v-on:change="getSector()">
                  {{sector}}
                  <option :value="null" slot="first">-- اختر --</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="get_text('org_unit@l')" horizontal>
                <!--                                <b-form-select v-model="org_unit" :options="this.$store.state.setSubTenant"-->
                <!--                                               v-on:change="getOrg_unit()">-->
                <!--                                    {{org_unit}}-->
                <!--                                    <option slot="first" :value="null">&#45;&#45; اختر &#45;&#45;</option>-->
                <!--                                </b-form-select>-->

                <treeselect :dir="rtl ? 'rtl' : 'ltr'" :options="options"
                            :placeholder="get_text('please_select@l')" @input="getOrg_unit()" searchable="searchable"
                            v-model="org_unit"/>

              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="get_text('mtp@l')" horizontal>
                <b-form-select :options="mtp_options" v-model="mtp_date"
                               v-on:change="getSelectedMTP()">
                  <option :value="null" slot="first">-- اختر --</option>
                </b-form-select>
              </b-form-group>
            </b-col>


          </b-row>
          <!-- </b-card> -->

        </div>
      </b-collapse>
    </div>

    <b-row>
      <b-col lg="4" sm="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp; <span class="text-white">{{get_text('active_inactive@statistics@l')}} </span>&nbsp;&nbsp;
            <i class="fas fa-star-half-alt"></i>
            <div class="chart-wrapper">
              <social-box-chart-example :data="[50, 50, 50, 50, 50, 50]" chartId="box-chart-01"
                                        height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['active_count']:''}}
              </div>
              <!--  -->
              <div class="text-muted small">{{get_text('active@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.dashboard_value[0]['active_count']?(this.$store.state.dashboard_value[0]['kpi_count']-this.$store.state.dashboard_value[0]['active_count']):''}}
              </div>
              <div class="text-muted small">{{get_text('inactive@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="4" sm="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp; <span class="text-white">{{get_text('uptodate_notuptodate@statistics@l')}} </span>
            &nbsp;&nbsp;
            <i class="fas fa-route"></i>
            <div class="chart-wrapper">
              <social-box-chart-example :data="[50,50,50,50,50,50]" chartId="box-chart-02" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['up_to_date_count']:''}}
              </div>
              <div class="text-muted small">{{get_text('up_to_date@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.dashboard_value[0]['up_to_date_count']?(this.$store.state.dashboard_value[0]['kpi_count']-this.$store.state.dashboard_value[0]['up_to_date_count']):''}}
              </div>
              <div class="text-muted small">{{get_text('not_up_to_date@statistics@l')}}</div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="4" sm="4">
        <div class="brand-card">
          <div class="brand-card-header bg-twitter">
            &nbsp;&nbsp;<span class="text-white">{{get_text('efficiency_strategy@statistics@l')}} </span>&nbsp;&nbsp;
            <i class="fas fa-traffic-light"></i>
            <div class="chart-wrapper">
              <social-box-chart-example :data="[50,50,50,50,50,50]" chartId="box-chart-03" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['process_count']:''}}
              </div>
              <div class="text-muted small">{{get_text('efficiency@statistics@l')}}</div>
            </div>
            <div>
              <div class="text-value">
                {{this.$store.state.dashboard_value[0]['process_count']?this.$store.state.dashboard_value[0]['strategy_count']:''}}
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
              <div class="text-value-sm text-danger">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['imp_hi_count']:''}}
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
              <div class="text-value-sm text-danger">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['imp_mid_count']:''}}
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
              <div class="text-value-sm text-danger">{{this.$store.state.dashboard_value.length > 0
                ?this.$store.state.dashboard_value[0]['imp_low_count']:''}}
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


          <b-table :fields="tableFields" :items="dashboard_table_val" class="mb-0 table-outline" head-variant="light"
                   hover responsive="sm">
            <div slot="sub_name" slot-scope="data">
              <!-- <div class="small text-muted">Last login</div> -->
              <strong>{{data.value}}</strong>
            </div>

            <div slot="kpi_count" slot-scope="data">
              <strong>
                {{data.value}}

              </strong>

            </div>
            <div slot="process_count" slot-scope="data">
              <div class="clearfix">
                <strong>{{data.value}}</strong>

              </div>
              <!-- <b-progress height={} class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></!-->
            </div>

            <div slot="strategy_count" slot-scope="data">
              <div class="clearfix">

                <strong>{{data.value}}</strong>


              </div>
              <!-- <b-progress height={} class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></!-->
            </div>
            <div slot="up_to_date_count" slot-scope="data">
              <div class="clearfix">
                <div>
                                    <span><i aria-hidden="true"
                                             class="fa fa-check-square"></i> <strong>  {{data.value}}</strong></span>
                  &nbsp;<span><i aria-hidden="true" class="fa fa-window-close"></i><strong> {{data.item.kpi_count-data.value}} &nbsp;&nbsp; </strong></span>


                </div>

              </div>
              <!-- <b-progress height={} class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></!{{dashboard_table_val[0].kpi_count-item.value}}-->
            </div>
            <div slot="active_count" slot-scope="data">
              <div class="clearfix">


                <span><i aria-hidden="true" class="fa fa-circle"
                         style="color: green"></i> <strong>  {{data.value}}</strong></span>
                &nbsp;<span><i aria-hidden="true" class="fa fa-circle" style="color: red"></i><strong> {{data.item.kpi_count-data.value}} &nbsp;&nbsp;</strong></span>

                <!-- <b-progress height={} class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></!-->
              </div>
            </div>

          </b-table>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

  import {Callout} from '@coreui/vue'
  import {store} from '@/views/dashboard/store';
  import SocialBoxChartExample from './dashboard/SocialBoxChartExample';
  import Vue from "vue";
  //import treeselect from '../treeselect/treeselect'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    store: store,
    name: 'dashboard',
    components: {
      SocialBoxChartExample,
      Treeselect
    },
    data: function () {
      return {
        translation: [],
        sector: 2,
        org_unit: 6,
        mtp_date: 4,
        parent: 2,
        mtp: '',
        selected: 'Month',
        tableFields: [],
        options: ''


      }
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
      this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.sector]);
      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');
      this.$store.dispatch('loadDashboardTable', [this.mtp_date, this.sector]);

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

          var filterData = this.$store.state.dashboard_table_value
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
    methods: {

      getSector() {
        this.options = '';
        if (this.sector == null) {
          this.org_unit = "";
          this.$store.state.setSubTenant = {};
        }

        this.org_unit = "";
        this.parent = this.sector;
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.sector]);
        this.$store.dispatch('loadSubTenants', this.sector);
        Vue.axios.get('/subtenanttree/' + this.sortByTenant)

          .then(response => {
            if (response.data.code == 200) {
              this.options = response.data.subTenants;


            }
          });
        this.$store.dispatch('loadDashboardTable', [this.mtp_date, this.sector]);


        // var targetVal = (typeof this.target_id != "undefined" && this.target_id != '') ? this.target_id : 0;
        // if (this.showingdropModal) {
        //     this.$refs.dropdown.hide(true)
        //     showingdropModal = false;
        // }
      },
      getOrg_unit() {
        if (this.org_unit == null) {
          this.parent = this.sector;
        } else {
          this.parent = this.org_unit;

        }
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.parent]);
        this.$store.dispatch('loadDashboardTable', [this.mtp_date, this.parent]);


      },

      getSelectedMTP() {
        // alert(this.parent)
        this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.parent]);
        this.$store.dispatch('loadDashboardTable', [this.mtp_date, this.parent]);


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
  }
</script>

<style>
  /* IE fix */
  /* .card-header span { text-align: right }
  .card-header [direction="ltr"] span { text-align: left } */
  @media print {

    canvas {
      max-width: 90%;
    }

    .col-lg-4 {
      max-width: 50%;
    }

    .col-sm-4 {
      max-width: 50%;
    }

    @page {
      size: auto;
      margin: 0mm;
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
