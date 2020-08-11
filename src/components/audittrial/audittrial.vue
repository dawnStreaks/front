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
              <b class="h4">{{ get_text('title@audittrial@l') }}</b>
              <div class="card-header-actions">

                <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                  <i class="icon-arrow-up"></i>
                </b-link>
                <b-link href="#" class="card-header-action btn-close" v-on:click="printaudittrial('auditdiv')">
                  <i class="icon-printer"></i>
                </b-link>
              </div>

            </div>

            <div v-if="!$auth.ready() || !this.$store.state.loading">
              <div style="text-align:center; padding-top:50px;">
                {{ this.get_text('loading@prcType@l') }}
              </div>
            </div>

            <div v-if="$auth.ready() && this.$store.state.loading">
              <b-collapse id="collapse1" style="display: none;">
                <b-card-body>


                  <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('sector@kpi_def@l')">
                    <b-input-group>
                      <b-form-select v-model="sortByTenant" @change="loadKpiDataSector(sortByTenant)" :options="this.$store.state.setTenant">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l') }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')">
                    <b-input-group>
<!--                      <b-form-select v-model="sortBySubTenant" @change="loadsuditsearch"-->
<!--                                     :options="this.$store.state.setSubTenant">-->
<!--                        <option slot="first" :value="null">{{-->
<!--                          get_text('please_select@kpi_def@l')-->
<!--                          }}-->
<!--                        </option>-->
<!--                      </b-form-select>-->
                      <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')"
                                  :normalizer="normalizer" searchable="searchable" :options="options" v-model="sortBySubTenant"
                                  @input="loadsuditsearch"/>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('users@kpi_def@l')">
                    <b-input-group>
                      <b-form-select v-model="sortByusers" @change="loadsuditsearch(sortByusers)" :options="this.$store.state.setUsers">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l') }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                  </b-row>
                  <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('screen@audittrial@c')">
                    <b-input-group>
                      <b-form-select v-model="sortByScreen" @change="loadsuditsearch(sortByScreen)" :options="this.$store.state.setScreens">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l') }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('action@audittrial@c')">
                    <b-input-group>
                      <b-form-select
                        @change="loadsuditsearch(sortByactions)"
                        v-model="sortByactions"
                         :options="[
                                            {
                                              text: get_text('please_select@kpi_def@l'),
                                              value: null
                                            },
                                            {
                                              text: 'created',
                                              value: 'created'
                                            }, {
                                              text: 'updated',
                                              value: 'updated'
                                            }, {
                                              text: 'deleted',
                                              value: 'deleted'
                                            }]">
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col>

                  <div md="4" class="my-1">
                    <b-form-group horizontal :label="get_text('date@audittrial@l')">

                  <el-date-picker
                    v-model="value1"
                    @change="datesearch"
                    type="datetimerange"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                   :default-time="['12:00:00']">
                  </el-date-picker>
                    </b-form-group>
                </div></b-col>

              </b-row>

                  <b-row>
                    <b-col md="4" class="my-1">
                      <b-form-group horizontal :label="this.get_text('filter@l')" class="mb-0">
                        <b-input-group>
                          <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                          <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}</b-btn>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" class="my-1">
                      <b-form-group horizontal label="Sort" class="mb-0">
                        <b-input-group>
                          <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">{{ get_text('none@l') }}</option>
                          </b-form-select>
                          <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                            <option :value="false">{{ get_text('asc@l') }}</option>
                            <option :value="true">{{ get_text('desc@l') }}</option>
                          </b-form-select>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="4" class="my-1">
                      <b-form-group horizontal :label="get_text('per_page@l')" class="mb-0">
                        <b-form-select :options="pageOptions" v-model="perPage"/>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-collapse>
              <div id="auditdiv">
              <b-table  :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                       :fixed="fixed" responsive :items="audittrial" :fields="fields"
                       :current-page="currentPage" :per-page="perPage" :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered">
                <template slot="status" slot-scope="data">
                  <b-badge :variant="getBadge(data.item.status)">{{ getName(data.item.status) }}
                  </b-badge>
                </template>

              </b-table>
              </div>
              <nav>
                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                              v-model="currentPage" :prev-text="this.get_text('prev@l')"                                              :next-text="this.get_text('next@l')"
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
  import {store} from '@/components/audittrial/store/store'
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui'
  //import {Notification} from 'element-ui'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import lang from 'element-ui/lib/locale/lang/en'
  import locale from 'element-ui/lib/locale'
  //import treeselect from '../treeselect/treeselect'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  // configure language
  locale.use(lang)

  Vue.use(Loading);
  Vue.use(Element)
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
    created() {
      //this.$store.dispatch('translation');
      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadusers');
      this.$store.dispatch('loadscreen');
      this.$store.dispatch('loadaudittrial');
      this.$store.dispatch('loadSubTenants', this.sortByTenant);

      // this.$store.dispatch('loadGroups')
    },
    data: () => {
      return {
        selected: null,
        fields: [
          /*{key: 'IdPRCType', label: '#', sortable: true, sortDirection: 'desc'},
          {key: 'TypeCode', label: 'PRC Type', sortable: true, sortDirection: 'desc'},
          {key: 'Type', label: 'PRC Type Name'},
          {key: 'Actions'},*/
          //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'},
          //{key: 'View', thClass: 'text-center', tdClass: 'text-center'}
        ],
        button: '',
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        priorityData: {
          TypeCode: null,
          Type: null,
        },
        priorityInfo: null,
        submitted: false,
        updated: false,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        translation:[],
        sortByTenant: null,
        sortBySubTenant: null,
        sortByusers:null,
        sortByScreen:null,
        sortByactions:null,
        options:'',
        pickerOptions: {
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1:'',
        start_date:'',
        end_date:'',

        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.tree,
          }
        },

      }
    },
    beforeMount() {
      var d = new Date();
      var year = d.getFullYear();
      var day = d.getDate();
      var month = d.getMonth();
     // this.value1=[new Date(year, month, day, 0, 0), new Date(year, month, day, 12, 0)];

      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
    },
    /*mounted() {
        this.fields=[
            {key: 'IdPRCType', label: '#', sortable: true, sortDirection: 'desc'},
            {key: 'TypeCode', label: this.get_text('PRC Type'), sortable: true, sortDirection: 'desc'},
            {key: 'Type', label: this.get_text('PRC Type Name')},
            {key: 'Actions',label: this.get_text('Actions')},
            //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'},
            //{key: 'View', thClass: 'text-center', tdClass: 'text-center'}
        ]
    },*/
    computed: {
      audittrial() {
        this.fields=[
          {key: 'no', label: '#', sortable: true, sortDirection: 'desc'},
          {key: 'sectorname', label: this.get_text('sector@audittrial@c'), sortable: true, sortDirection: 'desc'},
          {key: 'orgunit', label: this.get_text('subtenant@audittrial@c'), sortable: true, sortDirection: 'desc'},
          {key: 'name', label: this.get_text('user@audittrial@c'), sortable: true, sortDirection: 'desc'},
          {key: 'event', label: this.get_text('action@audittrial@c')},
          {key: 'auditable_type', label: this.get_text('screen@audittrial@c')},
          {key: 'created_at', label: this.get_text('auditable_date@audittrial@c')},
          {key: 'old_valueslist', label: this.get_text('old_values@audittrial@c'),thClass: 'setwidth'},
          {key: 'new_valueslist', label: this.get_text('new_values@audittrial@c'),thClass: 'setwidth'},

        ];
        return this.$store.getters.audittrial;
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
      'loading': Loading,
      Treeselect


    },
    methods: {
      setPriorityData() {
        this.priorityData = {
          TypeCode: '',
          Type: ''
        }
      },
      datesearch(){
      //   let date = new Date(this.value1);
      //    date.getFullYear() + '-' +
      //     (date.getMonth() +1) + '-' +
      //     date.getDate();
       //alert(this.value1);
       //this.value1 = this.value1.toString();
        //var dateArray=this.value1.split(",");
       // this.$store.dispatch('loadloginDatadate', this.value1);
        this.$store.dispatch('loadaudittrialDataSector', [this.sortByTenant,this.sortBySubTenant,this.sortByusers,this.sortByScreen,this.value1,this.sortByactions]);
      },
      loadsuditsearch(val){
        this.$store.dispatch('loadaudittrialDataSector', [this.sortByTenant,this.sortBySubTenant,this.sortByusers,this.sortByScreen,this.value1,this.sortByactions]);
      },

      loadKpiDataSector(sector) {
        this.options='';
        this.$store.dispatch('loadSubTenants', sector);
       // this.$store.dispatch('loadKpiDataSector',  [this.friendName, this.friendNumber, this.inviteMessage]);
        //this.$store.dispatch('loadaudittrialDataSector', [this.sortByTenant,this.sortBySubTenant,this.sortByusers,this.sortByScreen,this.value1]);
        this.$store.dispatch('loadaudittrialDataSector', [this.sortByTenant,this.sortBySubTenant,this.sortByusers,this.sortByScreen,this.value1,this.sortByactions]);
        Vue.axios.get('/subtenanttree/' + this.sortByTenant)

          .then(response => {
            if (response.data.code == 200) {
              this.options = response.data.subTenants;


            }
          });
      },
      // loadKpiDataOrgUnit(orgUnit) {
      //    this.$store.dispatch('loadloginDataOrgUnit', orgUnit);
      // },
      get_text(textbit) {
        var transtext = this.translation[this.$i18n.locale][textbit];
        if (transtext) {
          return transtext;
        } else {
          var spliteText = (textbit.split("@"));
          if(spliteText.length > 2) {
            var newTxt = (spliteText[0]+'@'+'l');
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

      getBadge(status) {
        return status == 1 ? 'success' : status === 0 ? 'warning' : 'primary'
      },
      getName(status) {
        return status == '1' ? 'Active' : status == '0' ? 'Deactive' : 'primary'
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      printaudittrial(auditdiv)
      {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head><style> tr:nth-child(even) {background-color: #f2f2f2;}\n .table {\n' +
          '        width: 100%;\n' +
          '        margin-bottom: 1rem;\n' +
          '        color:#23282c;\n' +
          '        \n' +
          '      }\n' +
          '      .table thead th {\n' +
          '        vertical-align: bottom;\n' +
          '        border-bottom: 2px solid\n' +
          '        #c8ced3;\n' +
          '      }\n' +
          '      table th, .table td {\n' +
          '        padding: 0.75rem;\n' +
          '        vertical-align: top;\n' +
          '        border-top: 1px solid\n' +
          '        #c8ced3;\n' +
          '      }\n</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById(auditdiv).innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
        return true;

        // window.location.reload(true);
      },
    },
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
    white-space: break-spaces !important;
    cursor: pointer;
    vertical-align: middle !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
  }
  editor--datetimerange.el-input__inner{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
  }


</style>
<style>
  .setwidth {
    min-width: 190px !important;
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
