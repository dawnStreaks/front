<template>
  <div class="app animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>
    <b-row>
      <b-col cols="12" xl="12" ref="formContainer">
        <transition name="slide">
          <b-card>
            <div slot="header">
              <b class="h4">{{ get_text('kpi_maintenance@kpi_perf_maintenance@l') }}</b>
              <b-link @click="updateDB(sortByTenant, sortBySubTenant, sortByMtp)">
                <b-button variant="primary" size="md" class="btn float-right">
                  <b><i class="icon-refresh icons font-1xl"></i> {{ get_text('updatedb@kpi_perf_maintenance@l') }}</b>
                </b-button>
              </b-link>
            </div>
            <div v-if="!$auth.ready() || !this.$store.state.loading">
              <div style="text-align:center; padding-top:50px;">
                {{ get_text('loading@kpi_def@l') }}
              </div>
            </div>
            <div v-if="$auth.ready() && this.$store.state.loading">
              <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('filter@l')" class="mb-0" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                      <b-input-group-append>
                        <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l')
                          }}
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('sort@l')" class="mb-0" label-cols="5" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortBy" :options="sortOptions">
                        <option slot="first" :value="null">{{ get_text('please_select@l') }}
                        </option>
                      </b-form-select>
                      <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                        <option :value="false">{{ get_text('asc@l') }}</option>
                        <option :value="true">{{ get_text('desc@l') }}</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('per_page@l')" class="mb-0" label-cols="5" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-form-select :options="pageOptions" v-model="perPage"/>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('sector@kpi_def@l')" class="mb-0" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortByTenant" @change="loadKpiDataSector(sortByTenant, sortByMtp)"
                                     :options="this.$store.state.setTenant">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l') }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-0" label-cols="5" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortBySubTenant"
                                     @change="loadKpiDataOrgUnit(sortByTenant, sortBySubTenant, sortByMtp)"
                                     :options="this.$store.state.setSubTenant">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l')
                          }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('mtp@kpi_def@l')" class="mb-0" label-cols="5" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortByMtp" @change="loadKpiDataOrgUnit(sortByTenant, sortBySubTenant, sortByMtp)"
                                     :options="this.$store.state.kpi_mtp">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l')
                          }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
             <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                       :fixed="fixed" responsive :items="maintenanceObject" :fields="fields"
                       :current-page="currentPage" :per-page="perPage" :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered">
              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="this.totalRows" :per-page="perPage"
                              v-model="currentPage" :prev-text="get_text('prev@kpi_def@l')"
                              :next-text="get_text('next@kpi_def@l')"
                              hide-goto-end-buttons/>
              </nav>
            </div>
          </b-card>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {store} from '@/components/maintenance/store'
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui'
  //import {Notification} from 'element-ui'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  Vue.use(Element);
  Vue.use(Loading);
  export default {
    store: store,
    props: {
      hover: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        kpiDeleteData: {},
        rejectreasontext: '',
        selectkpidata: '',
        dangerModal: false,
        exceptionModal:false,
        selected: null,
        fields: [
          /* {key: 'id', label: '#', sortable: false, sortDirection: 'desc'},
           {key: 'name', label: 'KPI Name', sortable: true, sortDirection: 'desc'},
           {key: 'subtenant_name', label: 'Tenant'},
           {key: 'active_status', label: 'Status'},
           {key: 'Actions'},*/
        ],
        button: '',
        currentPage: 1,
        perPage: 50,
        totalRows: 0,
        sortByTenant: null,
        sortByStatus: null,
        sortBySubTenant: null,
        sortByMtp: 4,
        kpiexceptiondata:null,
        priorityData: {
          TypeCode: null,
          Type: null,
        },
        priorityInfo: null,
        showingeditModal: false,
        showingViewModal: false,
        showingModal: false,
        submitted: false,
        updated: false,
        pageOptions: [10, 20, 50, 100],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        nextreaddate: 0,
        translation:[],
        showingdeleteModal: false,
        kpiname:'',
        symbol:''
      }
    },
    created() {
      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadMTP');
      this.$store.dispatch('loadMaintenance');
    },
    beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
    },
    computed: {
      maintenanceObject() {
        this.fields= [
          {key: 'id', label: '#'},
          {key: 'name', label: this.get_text('name@kpi_perf_maintenance@c')},
          /*{key: 'kpi_id', label: this.get_text('kpi_id@kpi_def@c')},
          {key: 'kpi_target_id', label: this.get_text('kpi_target_id@kpi_def@c'), sortable: true, sortDirection:
              'desc'},*/
          {key: 'kpi_symbol', label: this.get_text('kpi_symbol@kpi_perf_maintenance@c'), sortable: true, sortDirection: 'desc'},
          {key: 'y_perf', label: this.get_text('y_perf@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass: 'text-center'},
          {key: 'y_prog', label: this.get_text('y_prog@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass:
              'text-center'},
          {key: 'q1_perf', label: this.get_text('q_perf@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass:
              'text-center'},
          {key: 'q1_prog', label: this.get_text('q_prog@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass:
              'text-center'},
          {key: 'h1_perf', label: this.get_text('h_perf@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass:
              'text-center'},
          {key: 'h1_prog', label: this.get_text('h_prog@kpi_perf_maintenance@c'),thClass: 'text-center', tdClass:
              'text-center'},
        ]
        var filterData = this.$store.getters.maintenanceData;
        this.totalRows = filterData.length;
        //alert(this.totalRows)
        return filterData;
        //return this.$store.getters.maintenanceData;
      },
      getRowCount() {
        return this.$store.getters.getRowCount
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      }
    },
    watch: {

    },
    components: {
      'loading': Loading
    },
    methods: {
      updateDB(sector, orgUnit, mtp_id) {
        var sectorID = '';
        if(orgUnit) {
          sectorID = orgUnit
        } else if(sector) {
          sectorID = sector
        } else {
          sectorID = 2;
        }
        this.$store.dispatch('updatedb_kpivaluestates', [sectorID, mtp_id]);
      },
      loadKpiDataSector(sector, mtp_id) {
        this.$store.dispatch('loadSubTenants', sector);
        this.$store.dispatch('loadMaintenanceById', [sector, mtp_id]);
      },
      loadKpiDataOrgUnit(sector, orgUnit, mtp_id) {
        var sectorID = '';
        if(orgUnit) {
          sectorID = orgUnit
        } else if(sector) {
          sectorID = sector
        } else {
          sectorID = 2;
        }

        //alert(sector+'=='+orgUnit+'==='+sectorID);
        this.$store.dispatch('loadMaintenanceById', [sectorID, mtp_id]);
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
      $can(permissionName) {
        // alert(this.$auth.user().allPermissions);
        return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
      },
      getName(status) {
        return status == '1' ? 'active' : status == '0' ? 'inactive' : 'danger'
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
  }

</script>
<style>
  .mb-xl-0.col-sm-4.col-md-2.col-xl-1.col-2 {
    margin: 0;
    padding-left: 0px;
    padding-right: 6px;
  }

  .customClass button.btn.btn-secondary.btn-sm {
    background-color: transparent;
  }
  .btnClassCustmAr {
    padding-left: 0px !important;
  }
  .btnClassCustmEn {
    padding-right: 0px !important;
  }
  .trtdrow {
    background: #43a9cc;
    color: #ffffff;
    font-weight: bold;
  }
  .symbolCls {
    white-space: nowrap;
  }
  .modal-header .close {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
    vertical-align: middle !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;

  }

  .b-dropdown {
    margin-top: 0 !important;
  }

  .text-center {
    width: 225px !important;
  }
  .setwidth {
    width: 110px !important;
  }

  .pointerClass {
    pointer-events: none;
    cursor: none;
  }

  @media print
  {
    .table {
      width: 100%;
      margin-bottom: 1rem;
      color:#23282c;

    }
    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid
      #c8ced3;
    }
    table th, .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid
      #c8ced3;
    }
    tr:nth-child(even) {background-color: #f2f2f2;}

  }

</style>
