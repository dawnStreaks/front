<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col cols="12" xl="12" ref="formContainer">
                <transition name="slide">
                     <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-header">
                                 <b class="h4" >{{ get_text('title@risk_definition@l') }}</b>
                                    <div class="card-header-actions noprint">

                                <b-link class="card-header-action btn-close" href="#" v-on:click="loaded">
                                  <i class="icon-printer"></i>
                                </b-link>

                              <!-- <div class="row"> -->
                           <b-link :href="'/risklist/'+this.linkid">
                    <b-button variant="primary" size="md" class="btn float-right">
                      <b><i class="icon-plus icons font-1xl"></i> {{ get_text('back_to_risk_list@risk_definition@l') }}</b>
                    </b-button>
                  </b-link>


                                 </div>

                            </div>
                              <div class="card-body">
                <!-- <b-modal :title="get_text('edit@prcType@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal" hide-footer> -->
                              <b-form  @submit.prevent="for_edit_function">
                              <!-- <b-form v-if="!$route.params.edit" @submit.prevent="createriskdefinition"> -->

                                <div class="form-group row">

                                                                   <div class="form-group row">

   <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">description
                                    <i class="fa fa-asterisk danger fa-xs"
                                       style="font-size:10px;color:red;"></i>
                                  </label>                                  
                                    <input :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                     class="form-control" type="text" v-model="quoteData.description"    v-validate="'required'"
                                           name="description" 
                                             :placeholder="enter description" 
                                           :class="{ 'is-invalid': errors.has('risk_trigger') }"  >
                                  </div>
                                  <div class="col-md-6">
                                                  <label  class="mb-0"  horizontal for="partNo">partNo<i class="fa fa-asterisk danger fa-xs"  style="font-size:10px;color:red;"></i></label>
                                     
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                          v-validate="'required'"
                                          name="partNo" id="partNo"
                                          v-model="quoteData.partNo"
                                          :class="{ 'is-invalid': errors.has('partNo') }"
                                          :options="this.catoptions1">
                                             <option slot="first" :value="null">{{
                                            get_text('please_select@risk_definition@c') }}
                                          </option>

                                        </b-form-select>
                                    

                                  </div>
                               
                                  </div>

 
                                <div class="form-group row">
                                <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">Quantity
                                    <i class="fa fa-asterisk danger fa-xs"
                                       style="font-size:10px;color:red;"></i>
                                  </label>                                  
                                    <input :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                     class="form-control" type="text" v-model="quoteData.quantity"    v-validate="'required'"
                                           name="quantity" id="quantity"                                 
                                             :placeholder="enter quantity" 
                                           :class="{ 'is-invalid': errors.has('risk_trigger') }"  >
                                  </div>

                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">unitPrice
                                                                      <!-- <i v-if="!risk_owner" class="fa fa-asterisk danger fa-xs"
                                       style="font-size:10px;color:red;"></i> -->

                                  </label>                                      
      <input :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                     class="form-control" type="text" v-model="quoteData.unitPrice"    @input="riskchoice()"
                                           name="unitPrice" id="unitPrice"

                                             :placeholder="get_text('enter_risk_owner_ext@risk_definition@l')" 
                                           :class="{ 'is-invalid': errors.has('unitPrice') }"  >
                                                                   

                                  </div>
                                </div>

                                <div class="form-group row">
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">Unit
                                    <i class="fa fa-asterisk danger fa-xs"
                                       style="font-size:10px;color:red;"></i>
                                  </label>                                      
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
	                                  :disabled="riskData.risk_status==0?true:false" 
                                          v-validate="'required'"
                                          name="probability" id="probability"
                                          v-model="riskData.propability"
                                          :class="{ 'is-invalid': errors.has('probability') }"
                                          :options="[
                                            {
                                              text: Packet,
                                              value: 1
                                            },
                                            {
                                              text: No,
                                              value: 2
                                            },
                                          
                                           
                                            ]">
                                        <option slot="first" :value="null">{{
                                            get_text('please_select@l') }}
                                          </option>
                                        </b-form-select>

                                  </div>
                                

                                </div>
                             
                                <b-button 
                                    :disabled="riskData.risk_status==0?true:false"
                                      class="float-right noprint"  variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}
				</b-button>

                              </b-form>
                              <!-- </b-modal> -->
                            </div>

                          </div>
                        </div>

                      </div>


                          <!-- </div> -->
                </transition>

 <b-modal :title="get_text('validation_title@risk_definition@l')" size="lg" class="modal-danger"  v-model="showingRiskOwnerModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{get_text('please_enter_either_risk_owner_or_ext@risk_definition@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingRiskOwnerModal = false;">{{ get_text('ok@risk_definition@l') }}
                            </button>&nbsp;
                            <!-- <button class="btn btn-outline-success right" @click="showingRiskOwnerModal = false;">{{ get_text('no@prcType@l') }} 
                            </button> -->
                        </b-col>
                    </div>
                </b-modal>
 <b-modal :title="get_text('validation_title@risk_definition@l')" size="lg" class="modal-danger"  v-model="showingActionPlanModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{get_text('please_enter_action_plan@risk_definition@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingActionPlanModal = false;">{{ get_text('ok@risk_definition@l') }}
                            </button>&nbsp;
                            <!-- <button class="btn btn-outline-success right" @click="showingRiskOwnerModal = false;">{{ get_text('no@prcType@l') }} 
                            </button> -->
                        </b-col>
                    </div>
                </b-modal>

 <b-modal :title="get_text('validation_title@risk_definition@l')" size="lg" class="modal-danger"  v-model="showingRiskDescriptionModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{get_text('please_enter_risk_description@risk_definition@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingRiskDescriptionModal = false;">{{ get_text('ok@risk_definition@l') }}
                            </button>&nbsp;
                            <!-- <button class="btn btn-outline-success right" @click="showingRiskOwnerModal = false;">{{ get_text('no@prcType@l') }} 
                            </button> -->
                        </b-col>
                    </div>
                </b-modal>
              
 <b-modal :title="get_text('validation_title@risk_definition@l')" size="lg" class="modal-danger"  v-model="showingDateIdentifiedModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{get_text('please_enter_date_identified@risk_definition@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingDateIdentifiedModal = false;">{{ get_text('ok@risk_definition@l') }}
                            </button>&nbsp;
                            <!-- <button class="btn btn-outline-success right" @click="showingRiskOwnerModal = false;">{{ get_text('no@prcType@l') }} 
                            </button> -->
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
    // import datetime from 'vuejs-datetimepicker';
    //import {Notification} from 'element-ui'
  import 'bootstrap/dist/css/bootstrap.css';
  import datePicker from 'vue-bootstrap-datetimepicker';
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
  import { RichTextEditorPlugin, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-vue-richtexteditor';

  import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import lang from 'element-ui/lib/locale/lang/en'
  import locale from 'element-ui/lib/locale'

    Vue.use(Element);
    Vue.use(Loading);
  Vue.use(RichTextEditorPlugin);
    locale.use(lang)
      Vue.use(datePicker);


  export default {
      store: store,
    provide: {
      richtexteditor: [Toolbar, Link, Image, HtmlEditor, QuickToolbar]
    },
        created() {
         this.$store.dispatch('loadNotificationDefaultData')
         this.loadTenants();
        //  this.loadprojecttypes();
         this.$store.dispatch('loaduserlist');
         this.$store.dispatch('loadriskcatlist');
        //  this.$store.dispatch('loadriskdata',this.$route.params.id)
            this.$store.dispatch('translation');
            this.loadriskdata(this.$route.params.id);
this.riskData.project_id=this.$route.params.id

        },
        data: () => {
            return {
              projecttypeoptions:[],
    //               datePickerOptions: {
    //   disabledDate (date) {
    //     return date > new Date()
    //   }
    // },
//               cat_options:[
          
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

              normalizer(node) {
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
         notif_sector: null,
         notif_users:null,
      
           selected: null,
                fields: [
                    /*{key: 'idTaskPriorityType', label: '#', sortable: true, sortDirection: 'desc'},
                    {key: 'Type', label: 'Type Name'},
                    {key: 'TypeCodeMin', label: 'Min', sortable: true, sortDirection: 'desc'},
                    {key: 'TypeCodeMax', label: 'Max', sortable: true, sortDirection: 'desc'},
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
                    PRCType: null,
                    TypeCodeMin: null,
                    TypeCodeMax: null,
                },
                priorityInfo: null,
                showingeditModal: true,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                showingUserModal: false,
                showingRiskOwnerModal: false,
                showingActionPlanModal: false,
                showingRiskDescriptionModal: false,
                showingDateIdentifiedModal: false,
                submitted: false,
                updated: false,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation:[],
        options: {
          format: 'YYYY/MM/DD HH:mm',
          useCurrent: false,
          maxDate:'now'
                  // endDate: '+0d',
        }       ,

              sortByTenant: null,
              sortByStatus: null,
              sortBySubTenant: null,
             quoteData:{
         id:null,

         description:"",
         quantity:null,
          part_No: null,
          unit:null,
          unitPrice:null,
         




        },
        //  x:null,    
              
             
            



            }
        },
        mounted() {
          //this.$store.dispatch('loadTenants');
if(this.$store.state.riskdata)
{
              console.log(this.$store.state.riskdata);

console.log('hiiiiiiiiiiiiiiiii');
}

        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }

        },
        components: {
            'loading': Loading,
                // datetime, 
              datePicker,
              Treeselect
        },

 computed: {
   for_edit(){
return this.$route.params.edit
   },

   proj_route_id()
   {
return this.$route.params.id
   },
            linkid(){
            //   if(this.$route.params.edit==false){
            //   // this.$store.state.project_id=this.$route.params.id
            // this.riskData.project_id= this.proj_route_id
            //   }
                      // this.$store.state.project_id=this.riskData.project_id
                  // if(this.$route.params.edit==true){

                  //       this.x=this.riskData.project_id
                    
                  // }
                  return this.riskData.project_id;

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

 },

        methods: {
          for_edit_function()
          {
            if(this.$route.params.edit=="true")
              return this.updateRisk()
              else

                 return this.createriskdefinition()
          },
       
 loadriskdata(riskid){

            this.$store.state.isLoading = true;
          Vue.axios.get(`/risklist1/${riskid}`)
              .then(response => {
                if (response.data.code == 200) {
                  // this.projectid=response.data.data[0]['id'];
                  this.riskData=response.data.data;
                    //this.risk_description=response.data.data[0]['description'];
                    }
                this.$store.state.isLoading = false;
              })
              .catch((error) => {
                console.log(error)
              })
          },

riskchoice(){
if(this.riskData.risk_owner!=null) 
this.riskData.risk_owner=null
},

           loaded: function(args) {

                window.print()

            },

addUsers(){
this.showingUserModal = true
this.riskData.risk_owner_ext=null
},
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
          createriskdefinition() {
            if(this.riskData.risk_owner==null && this.riskData.risk_owner_ext==null)
            {
this.showingRiskOwnerModal=true;
            }
  else if(this.riskData.action_plan=="")
            {
this.showingActionPlanModal=true;
            }
else if(this.riskData.risk_description=="")
            {
this.showingRiskDescriptionModal=true;
            }

else if(this.riskData.date_identified==null)
            {
this.showingDateIdentifiedModal=true;
            }

else{
            this.submitted = true;
            this.$validator.validate().then(valid => {
              if (valid) {
                this.$store.dispatch('createRisk', {
                  pid:this.$route.params.id,
                  data: {
                    // created_by:this.$auth.user().id,
                    project_id:this.$route.params.id,
                    risk_status: this.riskData.risk_status,
                    closure_date: this.riskData.closure_date,
                    risk_description: this.riskData.risk_description,
                    risk_category: this.riskData.risk_cat,
                    risk_trigger: this.riskData.risk_trigger,
                    risk_owner: this.riskData.risk_owner,
                    risk_owner_ext: this.riskData.risk_owner_ext,
                    propability:this.riskData.propability,
                    impact: this.riskData.impact,
                    risk_treatment: this.riskData.risk_treatment,
                    date_identified: this.riskData.date_identified,
                    action_plan:this.riskData.action_plan,
                   
                  }
                })

                this.$validator.reset();
              }
            });
                      //  window.location.replace('/risklist/'+this.riskData.project_id)

            }

          },


updateRisk() { 
                this.updated = true;
               if((this.riskData.risk_owner==null ||this.riskData.risk_owner=="")  && (this.riskData.risk_owner_ext==null ||this.riskData.risk_owner_ext==""))
                    {
this.showingRiskOwnerModal=true;
            }
  else if(this.riskData.action_plan==null||this.riskData.action_plan=="")
            {
this.showingActionPlanModal=true;
            }
else if(this.riskData.risk_description==""||this.riskData.risk_description==null)
            {
                // alert(this.riskData.risk_description)

this.showingRiskDescriptionModal=true;
            }

else if(this.riskData.date_identified==null||this.riskData.date_identified=="")
            {
this.showingDateIdentifiedModal=true;
            }
else{

                        this.showingeditModal = false
                         this.$validator.validate().then(valid => {
                         if (valid) {
                          this.$store.dispatch('updateRisk', {
                            where: this.riskData.id,
                            pid:this.riskData.project_id,
                            data: {
                             
                            //  id:this.riskData.id,
                            risk_description:this.riskData.risk_description,
                            risk_trigger: this.riskData.risk_trigger,
                            risk_cat:this.riskData.risk_cat,
                            risk_owner:this.riskData.risk_owner,
                            risk_owner_ext:this.riskData.risk_owner_ext,
                            project_id:this.riskData.project_id,
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
                          
                                           this.$validator.reset();
                   		}
              });
                      
                                                  // window.location.replace('/risklist/'+this.riskData.project_id)

		}
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

            /*this.sortByTenant = ((this.$auth.user().roles.includes('Admin')) ? null : this.$auth.user().sector_id);
            if(!this.$auth.user().roles.includes('Admin') && this.sortBySubTenant != '') {
              this.loadKpiDataSector(this.sortByTenant)
            }
            */
            this.options='';
            if(!this.isAdmin && this.sortBySubTenant == null) {
              Vue.axios.get('/subtenanttree/' + this.$auth.user().subtenant_id)

                .then(response => {
                  if (response.data.code == 200) {this.loadTenants()
                    this.options = response.data.tree;

                    this.removeEmptyNode(this.options);

                  }
                });
             // this.sortBySubTenant = this.$auth.user().subtenant_id;

             // this.$store.dispatch('loadKpiDataOrgUnit', this.sortBySubTenant);
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
            //this.$store.dispatch('loadSubTenants', sector);

          },
            setPriorityRange() {
                this.priorityData = {}
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
                return status == 1 ? 'success' : status === 0 ? 'warning' : 'primary'
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
    .modal-header .close {
        padding: 0 !important;
        margin: 0 !important;
    }
    .leftpadding{
      padding-left:6%;
    } .rightpadding{
      padding-right:6%;
    }

      @media print {
    
        .sidebar,.breadcrumb,.noprint{
                      display: none;
        }
  }

</style>
<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
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
