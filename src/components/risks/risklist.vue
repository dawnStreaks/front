<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col cols="12" xl="12" ref="formContainer">
                <transition name="slide">
                    <b-card>
                        <div slot="header" >
                            <b class="h4" >{{ get_text('title@risklist@l') }}</b>
                 

                             <div class="card-header-actions noprint">
                              <!-- <div class="row"> -->
                            <b-link :href="'/projectlist'" v-if="this.project_id">
                            <b-button variant="primary" size="md" class="btn float-right">
                              <b><i class="icon-plus icons font-1xl"></i> {{ get_text('back_to_project_list@risklist@l') }}</b>
                            </b-button>
                          </b-link>
                             <b-link :href="'/riskdefinition/'+this.project_id+'/'+$store.state.for_insert" v-if="this.sortByprojectCat!=null">
                            <b-button variant="primary" size="md" class="btn float-right">
                              <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add_risk@risklist@l') }}</b>
                            </b-button>
                          </b-link>
                                <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                                  <i class="icon-arrow-up"></i>
                                </b-link>
                                <b-link class="card-header-action btn-close" href="#" v-on:click="loaded">
                                  <i class="icon-printer"></i>
                                </b-link>
                                 </div>
                                <!-- </div> -->

                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                          <div class="noprint">
                      <b-collapse id="collapse1" style="display: block;"  >
                          <b-row>
                            <b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('filter@l')" class="mb-0"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
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
                              <b-form-group horizontal :label="get_text('sort@l')" class="mb-0" label-cols="5"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
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
                              <b-form-group horizontal :label="get_text('per_page@l')" class="mb-0" label-cols="5"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-form-select :options="pageOptions" v-model="perPage"/>
                              </b-form-group>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('sector@risklist@l')" class="mb-0"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-input-group>
                                  <b-form-select v-model="sortByTenant" @change="loadKpiDataSector(sortByTenant)"
                                                 name="sortByTenant" id="sortByTenant"
                                                 :class="{ 'is-invalid': submitted && errors.has('sortByTenant') }"

                                                 :options="this.tenantoptions">
                                    <option slot="first" :value="null">{{
                                      get_text('please_select@l') }}
                                    </option>
                                  </b-form-select>

                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-0" label-cols="5"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-input-group>
                                  <treeselect :disabled="sortByTenant==2" :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')"
                                              :normalizer="normalizer1" searchable="searchable" :options="options" v-model="sortBySubTenant" @input="loadprojectsearch(sortBySubTenant)"
                                  />
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('project_list@risklist@l')" class="mb-0" label-cols="5"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-input-group>
                                  <b-form-select
                                    :plain="true"
                                    value="Please select"
                                    name="project_list" id="project_list"
                                    v-model="sortByprojectCat"
                                    :class="{ 'is-invalid': submitted && errors.has('project_list') }"
                                    :options="this.$store.state.projectlist"
                                   >
                                  </b-form-select>
                                </b-input-group>
                              </b-form-group>
                            </b-col>

                          </b-row>
                          <b-row>
                            <b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('risk_status@risklist@c')" class="mb-0"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-input-group>
                                  <b-form-select
                                    value="Please select"
                                    name="risk_status" id="risk_status"
                                    v-model="risk_status"
                                    :class="{ 'is-invalid': submitted && errors.has('status_operational') }"
                                    :options="[
                                            {
                                              text: get_text('open@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('close@risk_definition@l'),
                                              value: 0
                                            },
                                            ]">
                                      <option slot="first" :value="null">{{get_text('please_select@l') }}</option>
                                  </b-form-select>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
			<b-col md="4" class="my-1">
                              <b-form-group horizontal :label="get_text('priority@risklist@l')" class="mb-0" label-cols="5"
                                            :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                <b-input-group>
                                  <b-form-select
                                    value="Please select"
                                    name="priority" id="priority"
                                    v-model="priority"
                                    :class="{ 'is-invalid': submitted && errors.has('status_operational') }"
                                    :options="[
                                            {
                                              text: get_text('very_low@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('low@risk_definition@l'),
                                               value: 3

                                            },
                                              {
                                              text: get_text('mid@risk_definition@l'),
                                              value: 5

                                            },
                                            {
                                              text: get_text('high@risk_definition@l'),
                                              value: 7
                                            },
                                            {
                                              text: get_text('very_high@risk_definition@l'),
                                              value: 9
                                            }
                                            ]">
                                      <option slot="first" :value="null">{{get_text('please_select@l') }}</option>

                                  </b-form-select>
                                </b-input-group>
                              </b-form-group>
                            </b-col>


                          </b-row>
                           </b-collapse>
                          </div>

                            <b-table  class="my-table" id="myPrntbtn"
 :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="risklist" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">

                                     

                                       <template slot="priority" slot-scope="data">
                                        <b-col class="mb-3 mb-xl-0">
                                             <scan
                                         :style="'background-color:'+getpriorityBadge(data.item.priority)">{{
                                  get_text(getNamepriorityStatus(data.item.priority)+'@risk_definition@l') }}
                                </scan>
                                        </b-col>
                                      </template>  

                                 <template slot="identified_dt" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.item.identified_dt.substring(0,16) }}                                    </b-col>
                                </template>    

                                 <template slot="end_dt" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.item.end_dt!=null?data.item.end_dt.substring(0,16):data.item.end_dt }}                                    </b-col>
                                </template>    

                                       <template slot="risk_cat" slot-scope="data">
                                        <b-col class="mb-3 mb-xl-0">
                                             
                                         {{get_cat(data.item.risk_cat)}}
                                
                                        </b-col>
                                      </template>  
                          <template slot="created_by" slot-scope="data">
                                        <b-col class="mb-3 mb-xl-0">
                                             
                                         {{get_owner_name(data.item.created_by)}}
                                
                                        </b-col>
                                      </template>  

                          <template slot="risk_owner" slot-scope="data">
                                        <b-col class="mb-3 mb-xl-0">
                                             
                                         {{data.item.risk_owner?get_owner_name(data.item.risk_owner):data.item.riks_owner_ext}}
                                
                                        </b-col>
                                      </template>  
                               <template slot="status" slot-scope="data">
                                <b-badge
                                         :variant="getBadge(data.item.status)">{{
                                  get_text(getNameStatus(data.item.status)+'@risk_definition@l') }}
                                </b-badge>
                              </template>
                              <template slot="treatment" slot-scope="data">
                                {{
                                  get_text(getNametreatmentStatus(data.item.treatment)+'@risk_definition@l') }}
                              
                              </template>
                            
                                <template slot="Actions" slot-scope="data">
                                    <b-row class="text-center">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                            <b-button variant="primary" size="sm"
                                            :title="get_text('view@risklist@l')"
                                                      @click="editRisk(data.item, 'view')"><b><i
                                                    class="icon-eye icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;&nbsp;&nbsp;
                                        <!-- <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                            <b-button variant="warning" size="sm"
                                                      @click="editRisk(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                                                            <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-1">
                      <b-link :href="'/riskdefinition/'+data.item.id+'/'+$store.state.for_edit" style="height:28px" @click="this.$store.state.for_edit =true;"
                              class="customClass">
                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                          <b-button variant="warning" size="sm"  :title="get_text('edit@risklist@l')" 
                          ><b><i class="fa fa-edit font-1xl"></i></b></b-button>
                        </b-col>
                      </b-link>
                                        </b-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"><b-button variant="danger" size="sm" :title="get_text('delete@risklist@l')"
                                                      @click="showingdeleteModal = true;  selectRisk(data.item)"><b><i class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                <!-- <b-col v-if="data.item.status==1" cols="2" sm="4" md="2" xl="1" class="mb-xl-0"><b-button variant="danger" size="sm"
                                                      @click="showingcloseriskModal = true;selectRisk(data.item);  "><b><i class="icon-x icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->

                                    </b-row>
                                </template>
                                
                <template slot="Manage" slot-scope="data">
                  <b-dropdown variant="link"
                              toggle-class="($i18n.locale == 'en' ? 'text-center btnClassCustmEn' : 'text-center btnClassCustmAr')"
                              no-caret class="">
                    <template slot="button-content">
                      <button class="btn btn-primary btn-sm">
                        <i class="fa-gears fa font-1xl"></i>
                      </button>
                    </template>
                    <!--{{ data.item.status }}
                    @click="kpiDeletePermanently(data.item.id)"
                    -->
                    <b-dropdown-item
                      v-if="data.item.status==1"
                      @click="showingcloseriskModal = true;selectRisk(data.item);  ">{{
                      get_text('close_risk@risklist@l')
                      }}
                    </b-dropdown-item>

                     <b-dropdown-item
                      v-if="data.item.status==0"
                      @click="showingcloseriskModal = true;selectRisk(data.item);  ">{{
                      get_text('reopen_risk@risklist@l')
                      }}
                    </b-dropdown-item>
                  </b-dropdown>
                    </template>

                               <!-- <template slot="Actions" slot-scope="data">
                                  <b-row class="text-center" style="float: left">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                        <b-button variant=danger size="sm" @click="editRisk(data.item, 'view') "><i
                                         class="icon-eye icons font-1xl"></i>
                                             </b-button>
                                    </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                            <b-button variant="warning" size="sm"
                                                      @click="editRisk(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" ><b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectRisk(data.item)"><b><i class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                    </b-row>
                                </template> -->
                            
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage" class="noprint"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')"                                              :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>

                </transition>
 <b-modal :title="get_text('close_risk_title@holiday@l')" size="lg" class="modal-danger" v-model="showingcloseriskModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{riskData.status==1? get_text('are_you_sure_to_close_risk@l'):get_text('are_you_sure_to_reopen_risk@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingcloseriskModal = false;closeRisk() ">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingcloseriskModal = false;">{{ get_text('no@prcType@l') }} 
                            </button>
                        </b-col>
                    </div>
                </b-modal>



                 <b-modal :title="get_text('view@prcType@l')" size="lg" class="modal-info" v-model="showingViewModal"  hide-footer="true">
          <!-- ok-variant="info"  ok-title="موافق" cancel-title="إلغاء"> -->
          <div class="modalcontent" v-if="this.riskInfo "> 
              <b-row v-for="(item, index) in this.riskInfo" :key="index">
                  <b-col v-if="index!='propability' && index!='impact'" sm="4">{{  get_text(index+'@risklist@c') }}</b-col>
                  <b-col v-if="index!='propability' && index!='impact'" sm="8">{{display(index,item)}}</b-col>
              </b-row>
          </div>
                     <button class="btn btn-outline-success right" @click="showingViewModal = false;">{{ get_text('ok@risk_definition@l') }}</button>
          
          

        </b-modal>
                <b-modal :title="get_text('delete@prcType@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer>
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcType@l') }} ?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeRisk(riskData)">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@prcType@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>





            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/risks/store/store'
    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    //import {Notification} from 'element-ui'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Treeselect from "@riophae/vue-treeselect";

    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
      import lang from 'element-ui/lib/locale/lang/en'
  import locale from 'element-ui/lib/locale'



    Vue.use(Element);
    Vue.use(Loading);
      locale.use(lang);



    export default {
        store: store,
            provide: {

    },

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
                this.$store.dispatch('loadNotificationDefaultData');
                this.$store.dispatch('loaduserlist');
                this.$store.dispatch('loadriskcatlist');
                this.loadTenants();
                            if(this.$route.params.id!="undefined" && this.sortByprojectCat==null)
                    this.sortByprojectCat=this.$route.params.id

console.log(this.$store.state.foredit)
          //this.$store.dispatch('translation');
            this.$store.dispatch('loadrisklist');


           // this.$store.dispatch('loadGroups')
        },
        data: () => {
            return {
                selected: null,
                risk_status:1,
                fields: [],
                button: '',
                currentPage: 1,
                perPage: 15,
                totalRows: 0,
//                 cat_options:[
          
// { value: 1, text: 'Scope Creep'},
// { value: 2, text: 'Budget Risk'},
// { value: 3, text: 'Resistance to change'},
// { value: 4, text: 'Integration Risk'},
// { value: 5, text: 'Resource Risk'},
// { value: 6, text: 'Contract Risk'},
// { value: 7, text: 'Disputes'},
// { value: 8, text: 'Sponsor Support'},
// { value: 9, text: 'Technology Risk'},
// { value: 10, text: 'Schedule Risk'},
// { value: 11, text: 'Project Dependencies'},
// { value: 12, text: 'Project Assumptions'},
// { value: 13, text: 'Skills Risk'},
// { value: 14, text: 'Architecture Risk'},
// { value: 15, text: 'Stakeholders'},
// { value: 16, text: 'Operations Risk'},
// { value: 17, text: 'Benefit Shortfall'},
// { value: 18, text: 'Health & Safety'},
// { value: 19, text: 'Legal Risk'},
// { value: 20, text: 'Quality Risk'},
// { value: 21, text: 'Requirements Quality'},
// { value: 22, text: 'Project Complexity'},
// { value: 23, text: 'Force Majeure'},
// { value: 24, text: 'Supplier Risk'},
// { value: 25, text: 'Regulatory Risk'},
// { value: 26, text: 'Procurement Risk'},
// { value: 27, text: 'Security Risk'},
// { value: 28, text: 'Project Estimates'},
// { value: 29, text: 'Political Risk'},
// { value: 30, text: 'Design Risk'},
// { value: 31, text: 'Infrastructure Risk'},
// { value: 32, text: 'Reputational Risk'},
// { value: 33, text: 'Partner Risk'},
// { value: 34, text: 'Information Security Risk'},
// { value: 35, text: 'Facility Risk'},
//  { value: 36, text: 'Project Planning Risk'},
//         ],
               
                priorityInfo: null,
                showingeditModal: false,
                showingViewModal: false,
                showingUserModal: false,
                showingModal: false,
                showingdeleteModal: false,
                showingcloseriskModal:false,
                submitted: false,
                updated: false,
                pageOptions: [15, 25, 50],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation:[],
              sortByTenant:null,
              sortBySubTenant:null,
              sortByprojectCat:null,
              sortByprojectop:null,
              options:'',
              projecttypeoptions:'',
              tenantoptions:'',
              normalizer(node) {
                return {
                  id: node.id,
                  label: node.name,
                  children: node.tree,
                }
              },
 normalizer1(node) {
                return {
                  id: node.id,
                  label: node.name,
                  children: node.tree,
                }
              },

                normalizerUser(node) {
          return {
            id: node.id,
            label: node.name+' ('+node.email+')',
            //children: node.tree,
          }
        },
		project_list:"",
    priority:null,
    riskData:{
         id:null,
         risk_description:null,
         risk_trigger: null,
          risk_cat: null,
          risk_owner:null,
           impact:null,
           propability:null,
             risk_treatment:null,
          risk_status:null,
          created_by:null,
          date_identified:null,
          closure_date:null,
          action_plan:"",




        },
    riskInfo:{
         id:null,
         risk_description:null,
         risk_trigger: null,
          risk_cat: null,
          risk_owner:null,
          risk_owner_ext:null,
          priority:null,
          risk_treatment:null,
          risk_status:null,
          created_by:null,
          date_identified:null,
          closure_date:null,
          action_plan:"",




        },
                notif_sector: null,
notif_users:null,

		
             
            }
        },
        beforeMount() {
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
 // linkid(){
          //       if(this.$route.params.id!="undefined" && this.sortByprojectCat==null)

          // },
          beforeDestroy () {
                    localStorage.setItem('notif_sector1', notif_sector);


  },
        computed: {
         
           project_id(){
                if(this.$route.params.id!="undefined" && this.sortByprojectCat==null)
                    this.sortByprojectCat=this.$route.params.id
                    this.$store.state.project_id=this.sortByprojectCat

                    return this.sortByprojectCat
                     //!=null?this.sortByprojectCat:this.$route.params.id
            },
            catoptions1(){
                        var usersData = this.$store.state.riskcatlist.map(function (item) {
            
            return {
             //value: item.id,
             value: item.id,
              text: item.name            }
          });
          // console.log(usersData);
          return usersData;

            },
            risklist() {
                this.fields=[
                    {key: 'id', label: '#', sortable: true, sortDirection: 'desc'},
                    {key: 'description', label:this.get_text('risk_description@risklist@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'risk_trigger', label: this.get_text('risk_trigger@risklist@c')},
                    {key: 'risk_cat', label:this.get_text('risk_cat@risklist@c')},
                    {key: 'risk_owner', label:this.get_text('risk_owner@risklist@c')},
                    {key: 'priority', label:this.get_text('priority@risklist@c')},
                    {key: 'treatment', label:this.get_text('risk_treatment@risklist@c')},
                    {key: 'status', label:this.get_text('risk_status@risklist@c')},
                    {key: 'created_by', label:this.get_text('created_by@risklist@c')},
                    {key: 'identified_dt', label:this.get_text('date_identified@risklist@c')},
                    {key: 'end_dt', label:this.get_text('closure_date@risklist@c')},
                   // {key: 'next_reading_dt', label: this.get_text('next_updation_date@project_list@c')},
                  {key: 'Actions', label: this.get_text('actions@l')},
                  {key: 'Manage', label: this.get_text('manage@l'), thClass: 'text-center'},

                ];
                // console.log(this.$store.state.risklist);
                   var filterData =  this.$store.state.risklist
                  if(this.risk_status!=null)
                     {                           
                         filterData = filterData.filter(data => {
                        return data.status==this.risk_status
                    })
                               
                     }
                     if(this.priority!=null)
                     {                           
                         filterData = filterData.filter(data => {

                      data  = this.priorityfilter(data.impact,data.propability)
           
                       return data
                    })
                     }
                    
                     if(this.sortByprojectCat!=null)
                     {                           
                         filterData = filterData.filter(data => {
                                              
                        
                         return data.project_id==this.sortByprojectCat
                    })
                               
                     }
                

                     if( this.sortByTenant!=null)
                     {                           
                         filterData = filterData.filter(data => {
                        return data.sector_id==this.sortByTenant
                    })
                               
                     }
                      if( this.sortBySubTenant!=null)
                     {                           
                         filterData = filterData.filter(data => {
                        return data.subtenant_id==this.sortBySubTenant
                    })
                     }
                   

                   
                    this.totalRows = filterData.length;

                return filterData;
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
            // showingeditModal: function () {
            //     if (this.showingeditModal == false) {
            //         this.$store.dispatch('loadPriorities')
            //         this.priorityData = {}
            //     }
            // }
        },
        components: {
            'loading': Loading,
             Treeselect
        },
        methods: {
addUsers(){
this.showingUserModal = true
this.riskData.risk_owner_ext=null
},
    // addUsers() {
    //     this.$store.state.isLoading = true;
    //     Vue.axios({
    //       url: `/selectUser/${this.notif_users}`,
    //       method: 'GET',
    //     }).then(response => {
    //       console.log(response.data.user)
    //       this.$store.state.userList.push(response.data.user[0]);
    //       this.$store.getters.userIds.push(this.notif_users);
    //       this.showingUserModal = false;
    //       this.$store.state.isLoading = false;
    //     });
    //   },


            loadUser(sector) {
        //alert(sector)
        this.$store.state.isLoading = true;
        Vue.axios.get(`loadKpiOrgUsersNotification1/${sector}/null`)
          .then(response => {
            if (response.data.code == 200) {
              this.$store.state.sectorUser = response.data.data;
            }
            this.$store.state.isLoading = false;
          });
      },
          get_cat(item)
          {
var filterData1 = this.catoptions1.filter(data => {
                        return data.value==item});
                                //  console.log(filterData1[0]);
                        var x=filterData1.length>0? filterData1[0].text:"";
                        return x;
          },

get_owner_name(item)
          {
var filterData1 = this.$store.state.userlist.filter(data => {
                        return data.id==item});
                                //  console.log(filterData1[0]);
                        var x=filterData1.length>0? filterData1[0].name:"";
                        return x;
          },

display(index,item){

  switch(index){
    case 'risk_status':
      return  this.get_text(this.getNameStatus(item)+'@risk_definition@l');
      break;
   case 'priority':
        return this.get_text(this.getNamepriorityStatus(item)+'@risk_definition@l') ;
      break;
       case 'risk_treatment':
        //  console.log(this.cat_options);
      return  this.get_text(this.getNametreatmentStatus(item)+'@risk_definition@l') ;

      break;
      case 'risk_cat':
        //  console.log(this.cat_options);
          var filterData1 = this.catoptions1.filter(data => {
                        return data.value==item});
                                //  console.log(filterData1[0]);
                        var x=filterData1.length>0? filterData1[0].text:"";
                        return x;

      // return  this.get_text(this.getNametreatmentStatus(item)+'@risk_list@l') ;

      break;
  default:
    return item;
    break;
  }


},

           priorityfilter (impact1,propability1) {
             var priority1=impact1*propability1;
        switch (this.priority) {
          case 1:
          if(priority1==1||priority1==2)
          {
            return true;
           }
            
             break;

             case 3:
          if(priority1==3||priority1==4)
          {
            return true;
           }
            
             break;
             case 3:
          if(priority1==3||priority1==4)
          {
            return true;
           }
            
             break;
             case 5:
          if(priority1==5||priority1==6)
          {
            return true;
           }
            
             break;
             case 7:
          if(priority1==7||priority1==8)
          {
            return true;
           }
            
             break;
        
         case 9:
          if(priority1==9)
          {
            return true;
           }
            
             break;
        }
        },

 loaded: function(args) {
                var printButton = document.getElementById("myPrntbtn");
                // printButton.style.visibility = 'hidden';
                $('table td:nth-child(12)').hide();
                 $('table th:nth-child(12)').hide();
                  $('table td:nth-child(13)').hide();
                 $('table th:nth-child(13)').hide();


                window.print()
                // printButton.style.visibility = 'visible';
                 $('table td:nth-child(12)').show();
                 $('table th:nth-child(12)').show();
                 $('table td:nth-child(13)').show();
                 $('table th:nth-child(13)').show();


            },

        editRisk(risk, value = null) {
        this.$store.state.isLoading = true;
        Vue.axios.get(`/risklist1/${risk.id}`, risk.data)
          .then((response) => {
            if (response.data.code == 401) {
              Vue.prototype.$notify.error({
                title: 'Error',
                message: response.data.msg,
                type: 'Error',
                position: 'top-right'
              })
            } else {
              if (value == 'view') {
                this.showingViewModal = true;
                this.riskInfo = response.data.data;
                // console.log(this.riskInfo);
                //this.rolesInfo.permissions = response.data.permissionId;
                //this.rolesInfo.permissions = response.data.permissionVal;
              } else {
                this.showingeditModal = true
                this.riskData = response.data.data
//                 console.log(this.riskData);
//                     localStorage.setItem('edit', 1);
//                                     this.$store.state.riskdata=response.data.data;

// alert(this.$store.state.riskdata[0]);
//                 //this.roleData.permissions = response.data.permissionId;
                // this.rolePermission = response.data.ped;
              }
              this.$store.state.isLoading = false;
            }
          }).catch(error => {
          // console.log(error.response.data.message);
          this.$store.state.isLoading = false;
          if (error.response.status == 403) {
            Vue.prototype.$notify.error({
              title: 'Error',
              message: error.response.data.message,
              type: 'Error',
              position: 'top-right'
            });
          }
        })
        //this.tanentData = tenent;
        //this.showingeditModal= true
        //console.log(data);
      },
   updateRisk() { 
                this.updated = true;
                // this.$validator.validate().then(valid => {
                //     if (valid) {
                      // alert(bye);
                        this.showingeditModal = false
                        this.$store.dispatch('updateRisk', {
                            where: this.riskData.id,
                            data: {
                             
                            //  id:this.riskData.id,
                            risk_description:this.riskData.risk_description,
                            risk_trigger: this.riskData.risk_trigger,
                            risk_cat:this.riskData.risk_cat,
                            risk_owner:this.riskData.risk_owner,
                            risk_owner_ext:this.riskData.risk_owner_ext,

                            impact:this.riskData.impact,
                            propability:this.riskData.propability,
                            risk_treatment:this.riskData.risk_treatment,
                            risk_status:this.riskData.risk_status,
                            created_by:this.riskData.created_by,
                            date_identified:this.riskData.date_identified,
                            closure_date:this.riskData.closure_date,
                            action_plan:this.riskData.action_plan,

                            }
                        })
                        this.riskData = {
                            //  id:null,
         description:null,
         risk_trigger: null,
          risk_cat: null,
          risk_owner:null,
          risk_owner_ext:null,
           impact:null,
           propability:null,
          risk_treatment:null,
          risk_status:null,
          created_by:null,
          date_identified:null,
          closure_date:null,
          action_plan:""

                        }
                //         this.$validator.reset();
                //     }
                // });
            },

            removeRisk(riskData) {
              // alert()
                this.$store.dispatch('removeRisk', riskData)
            },

  selectRisk(riskItem) {
              // console.log(StrategyListItem);
                this.riskData = riskItem;
            },

             closeRisk() {
              // console.log(StrategyListItem);
                // this.riskData = riskItem;
if(this.riskData.status==0)
{
     this.riskData.closure_date=null;//new Date().toLocaleString();
                this.riskData.status=1;

}
else{
                this.riskData.closure_date=new Date().toLocaleString();
                this.riskData.status=0;
}
                // alert(this.riskData.closure_date);
                // this.showingcloseriskModal = false
                        this.$store.dispatch('updateRisk', {
                            where: this.riskData.id,
                            data: {
                             
                            //  id:this.riskData.id,
                            risk_description:this.riskData.description,
                            risk_trigger: this.riskData.risk_trigger,
                            risk_cat:this.riskData.risk_cat,
                            risk_owner:this.riskData.risk_owner,
                            risk_owner_ext:this.riskData.risk_owner_ext,
                            impact:this.riskData.impact,
                            propability:this.riskData.propability,
                            risk_treatment:this.riskData.treatment,
                            risk_status:this.riskData.status,
                            created_by:this.riskData.created_by,
                            date_identified:this.riskData.identified_dt,
                            closure_date:this.riskData.closure_date,
                           action_plan:this.riskData.action_plan,
                           project_id:this.riskData.project_id,

                            }
                        })
                        this.riskData = {
                            //  id:null,
         description:null,
         risk_trigger: null,
          risk_cat: null,
          risk_owner:null,
          risk_owner_ext:null,
           impact:null,
           propability:null,
          risk_treatment:null,
          risk_status:null,
          created_by:null,
          date_identified:null,
          closure_date:null,
          action_plan:"",
          project_id:""



                        }
                //      
              // alert(this.riskData.id);
            },
          projectlistoptions() {
           // var usersData = this.$store.state.leaveType

          var usersData = this.$store.state.projectlist.map(function (item) {
            
            return {
             //value: item.id,
             value: item.id,
              text: item.name            }
          });
          // console.log(usersData);
          return usersData;
        },
          // loadprojectlistsearch(val){

          //           localStorage.setItem('project_id', this.sortByprojectCat);
          // },


          loadprojectsearch(val){
                    // localStorage.setItem('project_id', this.sortByprojectCat);
                    // alert(this.sortByprojectCat);
            this.$store.dispatch('loadprojectearch', [this.sortByTenant,this.sortBySubTenant]);
            // this.$store.dispatch('loadrisklist');

          },
          loadTenants(){
            Vue.axios({
              url: 'loadTenantsministry',
              method: 'GET'
            })
              .then(response => {
                if (response.data.code == 200) {
                  this.tenantoptions = response.data.tenants.map(function (item) {
                    return {
                      text: item.name,
                      value: item.id
                    }
                  });

                }
              });
          },
          removeEmptyNode(nodes) {
            if(!nodes || nodes.length === 0)
              return;

            nodes.forEach(function(node) {

              if(node.tree.length === 0) {
                // alert(node)
                delete node.tree;
              } else {
                // alert(node.tree)
                //this.removeEmptyNode(node.tree);
                node.tree.forEach(function(node) {

                  if(node.tree.length === 0) {
                    // alert(node)
                    delete node.tree;
                  } else {
                    // alert(node.tree)
                    //this.removeEmptyNode(node.tree);
                    node.tree.forEach(function(node) {

                      if(node.tree.length === 0) {
                        // alert(node)
                        delete node.tree;
                      } else {
                        // alert(node.tree)
                        this.removeEmptyNode(node.tree);
                      }
                    });

                  }
                });
              }

            });
          },
          loadKpiDataSector(sector) {
            this.loadprojectsearch(this.sortByTenant);
            this.options='';
            if(!this.isAdmin && this.sortBySubTenant == null) {
              Vue.axios.get('/subtenanttree/' + this.$auth.user().subtenant_id)

                .then(response => {
                  if (response.data.code == 200) {this.loadTenants()
                    this.options = response.data.tree;

                    this.removeEmptyNode(this.options);

                  }
                });
            } else {
              Vue.axios.get('/subtenanttree/' + this.sortByTenant)

                .then(response => {
                  if (response.data.code == 200) {
                    this.options = response.data.subTenants;

                    this.removeEmptyNode(this.options);

                  }
                });
              this.$store.dispatch('loadKpiDataSector', sector);
            }
            localStorage.setItem('session_sector', sector);
            // this.$store.dispatch('loadUser', sector);

          },
          getpriorityBadge(status) {

            return (
              (status == 1) ? "#FFFF00" :
                ((status == 2) ? "#FFFF00" :
              ((status == 3) ? "#FFD700" :
                ((status == 4) ? "#FFD700" :
                ((status == 5) ? "#FFA500" :
                ((status == 6) ? "#FFA500" :
                ((status == 7) ? "#FF4500" :
                ((status ==8) ? "#FF4500" :
                
                ((status == 9) ? "#FF0000" :" "))))))))

            );
          },


          getNameStatus(status) {
           // alert(status)
            return (
              (status == 0) ? "close" :"open"
                  
                
            );
          },
          getNamepriorityStatus(status) {
          
            return (
              (status == 1) ? "very_low" :
                ((status == 2) ? "very_low" :
                ((status == 3) ? "low" :
                ((status == 4) ? "low" :
                ((status == 5) ? "mid" :
                ((status == 6) ? "mid" :
                ((status == 7) ? "high" :
                ((status == 8) ? "high" :
                ((status == 9) ? "very_high" :" "))))))))

            );
          },

           getNametreatmentStatus(status) {
          
            return (
              (status == 1) ? "accept" :
                ((status == 2) ? "mitigate" :
                ((status == 3) ? "transfer" :
                ((status == 4) ? "avoid" :""
                )))

            );
          },

           
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
                return status == 0 ? 'success': 'danger'
            },
            getName(status) {
                return status == '1' ? 'Active' : status == '0' ? 'Deactive' : 'primary'
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

.my-table.table-wrapper { overflow: auto !important; }
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

  @media print {
    .table {
      width: 100%;
      margin-bottom: 1rem;
      color: #23282c;
      /* transform:scale(0.5); */

    }

    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #c8ced3;
            /* transform:scale(0.5); */

    }

    table th, .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #c8ced3;
            /* transform:scale(0.5); */

    }

    /* tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    table td:nth-child(11){
   display:none;
} */
        .sidebar,.breadcrumb,.noprint{
                      display: none;
        }
  }

</style>

<style>
  @import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
