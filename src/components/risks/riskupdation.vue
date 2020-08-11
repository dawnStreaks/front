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
                              <!-- <div class="row"> -->
                                                                <b-link class="card-header-action btn-close" href="#" v-on:click="loaded">
                                  <i class="icon-printer"></i>
                                </b-link>
&nbsp;
                           <b-link :href="'/risklist/'+this.project_id">
                    <b-button variant="primary" size="md" class="btn float-right">
                      <b><i class="icon-plus icons font-1xl"></i> {{ get_text('back_to_list@risk_definition@l') }}</b>
                    </b-button>
                  </b-link>


                                 </div>
                             </div>
                            <div class="card-body">
                <!-- <b-modal :title="get_text('edit@prcType@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal" hide-footer> -->
                            <b-form @submit.prevent="updateRisk">

                                <div class="form-group row">

                                 <div class="col-md-6">
                                          <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_status@risk_definition@c')}}
                                            </label>
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'" v-model="riskData.risk_status" 
                                                       name="risk_status" id="risk_status"  :disabled="true"

                                :options="[
                                            {
                                              text: get_text('open@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('close@risk_definition@l'),
                                              value: 0
                                            },]">                                          
                                        </b-form-select>



                                  </div>
                                  <div class="col-md-6">
                                    <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('closure_date@risk_definition@c')}}
                                  </label>

                                    
                                    <el-date-picker
                                      :disabled="true"
                                      :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"  v-model="riskData.closure_date"
                                      type="date"
                                      id="closure_date"
                                      name="closure_date"
                                      placeholder="dd/mm/yyyy"
                                      format="dd/MM/yyyy"
                                    >
                                    </el-date-picker>

                                  </div>                               
                                   </div>

                                  <div class="form-group row">
                                     <div class="col-md-12">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_description@risk_definition@c')}}
                                  </label>
                                  <textarea :style="$i18n.locale=='en' ? ' width: 87.7%!important;float: right;' : 'width: 87.7%!important;float: left;'"
                                  v-model="riskData.risk_description"
                                  :disabled="riskData.risk_status==0?true:false" 
                                  :placeholder="get_text('enter_description@risk_definition@l')" name="risk_description" id="risk_description" 
                                  :class="{ 'is-invalid': submitted && errors.has('risk_description') }"></textarea>

                                  </div>
                                  </div>
                                  <div class="form-group row">
                                  <div class="col-md-6">
                                                  <label  class="mb-0"  horizontal for="risk_category">{{ get_text('risk_category@risk_definition@c')}}</label>
                                     
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                          name="risk_category" id="risk_category"
                                          v-model="riskData.risk_cat"
                                          :disabled="riskData.risk_status==0?true:false"
                                          :class="{ 'is-invalid': submitted && errors.has('risk_category') }"
                                          :options="this.catoptions1">
                                             <option slot="first" :value="null">{{
                                            get_text('please_select@risk_definition@c') }}
                                          </option>

                                        </b-form-select>
                                    

                                  </div>
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_trigger@risk_definition@c')}}
                                  </label>                                  
                                    <input :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                     class="form-control" type="text" v-model="riskData.risk_trigger"  
                                            :disabled="riskData.risk_status==0?true:false"
                                           name="risk_trigger" id="risk_trigger"
                                             :placeholder="get_text('enter_trigger@risk_definition@l')" 
                                           :class="{ 'is-invalid': submitted && errors.has('risk_trigger') }"  >
                                  </div>
                                  </div>

 <b-modal :title="get_text('add_user@notification@l')" size="lg" ref="vueModel" class="modal-primary"
             v-model="showingUserModal"
             hide-footer>

         <div class="form-group row">
                                     <div class="col-md-6">
                                  <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('sector@risklist@l')}}
                                  </label>                                  

              <treeselect :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
               :placeholder="get_text('please_select@l')" searchable="searchable" :normalizer="normalizer"
                          :options="this.$store.getters.sectors" v-model="notif_sector" @input="loadUser(notif_sector)"/>
              <!--@input="loadUser(notif_roles)"-->
              <div v-if="submitted && errors.has('sector')" class="invalid-feedback">{{
                errors.first('sector') }}
              </div>
          </div>
           <div class="col-md-6">
                                  <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_owner@risklist@c')}}
                                  </label>                                  
              <treeselect :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                          :placeholder="get_text('please_select@l')" searchable="searchable"
                          :options="this.$store.getters.sectorUser" v-model="riskData.risk_owner"
                          :normalizer="normalizerUser"/>
              <div v-if="submitted && errors.has('risk_owner')" class="invalid-feedback">{{
                errors.first('risk_owner') }}
              </div>
          </div>
        </div> 
 <b-button :disabled="riskData.risk_status==0?true:false"
 class="float-right" variant="primary" size="lg" @click="showingUserModal = false;">{{
          get_text('add_user@risk_definition@l') }} 
        </b-button>
    </b-modal>
      <!-- <b-form @submit.prevent="addUsers"> -->

                                <div class="form-group row">
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_owner@risk_definition@c')}}
                                 

                                  </label>                                      
              <treeselect :disabled="true" :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                          :placeholder="get_text('please_select@l')" searchable="searchable" 
                          :options="this.$store.state.userlist" v-model="riskData.risk_owner"
                          :normalizer="normalizerUser"/>
              <div v-if="submitted && errors.has('risk_owner')" class="invalid-feedback">{{
                errors.first('risk_owner') }}
              </div>
                                     
</div>
                                  
                             <button class="btn btn-outline-success right noprint" type="button"  :disabled="riskData.risk_status==0?true:false"
@click="addUsers()">{{ get_text('add@risk_definition@l')}}</button>
                              <!-- </b-form> -->


                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_owner_ext@risk_definition@c')}}

                                  </label>                                      
      <input :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'" 
                                   @input="riskchoice()"  class="form-control" type="text" v-model="riskData.risk_owner_ext"    
                                           name="risk_owner_ext" id="risk_owner_ext" :disabled="risk_owner||riskData.risk_status==0?true:false"                                         

                                             :placeholder="get_text('enter_risk_owner_ext@risk_list@c')" 
                                           :class="{ 'is-invalid': submitted && errors.has('risk_owner_ext') }"  >
                                                                   

                                  </div>
                                </div>

                                <div class="form-group row">
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('propability@risk_definition@c')}}
                                  </label>                                      
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                          name="probability" id="probability"
                                          :disabled="riskData.risk_status==0?true:false"

                                          v-model="riskData.propability"
                                          :class="{ 'is-invalid': submitted && errors.has('probability') }"
                                          :options="[
                                            {
                                              text: get_text('low@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('mid@risk_definition@l'),
                                              value: 2
                                            },
                                            {
                                              text: get_text('high@risk_definition@l'),
                                              value: 3
                                            },
                                           
                                            ]">
                                        <option slot="first" :value="null">{{
                                            get_text('please_select@l') }}
                                          </option>
                                        </b-form-select>

                                  </div>
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('impact@risk_definition@c')}}
                                  </label>                                     
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                          name="impact" id="impact"
                                          v-model="riskData.impact"
                                          :disabled="riskData.risk_status==0?true:false"

                                          :class="{ 'is-invalid': submitted && errors.has('probability') }"
                                          :options="[
                                            {
                                              text: get_text('low@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('mid@risk_definition@l'),
                                              value: 2
                                            },
                                            {
                                              text: get_text('high@risk_definition@l'),
                                              value: 3
                                            },
                                           
                                            ]">
                                          <option slot="first" :value="null">{{
                                            get_text('please_select@l') }}
                                          </option>
                                        </b-form-select>
                                  </div>

                                </div>
                                <div class="form-group row">
                                  <div class="col-md-6">


                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('risk_treatment@risk_definition@c')}}
                                  </label>                                     
                                        <b-form-select :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"
                                          name="risk_treatment" id="risk_treatment"
                                          v-model="riskData.risk_treatment"
                                          :disabled="riskData.risk_status==0?true:false"

                                          :class="{ 'is-invalid': submitted && errors.has('risk_treatment') }"
                                          :options="[
                                            {
                                              text: get_text('accept@risk_definition@l'),
                                              value: 1
                                            },
                                            {
                                              text: get_text('mitigate@risk_definition@l'),
                                              value: 2
                                            },
                                            {
                                              text: get_text('transfer@risk_definition@l'),
                                              value: 3
                                            },
                                             {
                                              text: get_text('avoid@risk_definition@l'),
                                              value: 4
                                            },
                                            ]">
                                        <option slot="first" :value="null">{{
                                            get_text('please_select@l') }}
                                          </option>
                                       </b-form-select>
                                      </div>
                                  <div class="col-md-6">

                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('date_identified@risk_definition@c')}}
                                  </label>
                                     <!-- <el-date-picker
                                      :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"  v-model="riskData.date_identified"
                                      type="date"
                                      id="date_identified"
                                      name="date_identified"
                                      :class="{ 'is-invalid': submitted && errors.has('date_identified') }"
                                      placeholder="dd/mm/yyyy"
                                      format="dd/MM/yyyy HH:mm"
                                     :picker-options="datePickerOptions"
                                            :disabled="riskData.risk_status==0?true:false"

                                    >
                                    </el-date-picker> -->

        <date-picker 
               :style="$i18n.locale=='en' ? ' width: 75%!important;float: right;' : 'width: 75%!important;float: left;'"  v-model="riskData.date_identified"
         :config="options" :disabled="riskData.risk_status==0?true:false"
></date-picker>


                                  </div>
                                </div>
                                
                              
                                <div class="form-group row">
                                  <div class="col-md-12">
                                <label class="mb-0" horizontal :label-align="$i18n.locale=='en' ? 'left' : 'right'">{{ get_text('action_plan@risk_definition@c')}}
                                  </label>
                                  </div>
                                    <div class="col-md-12" >
                                      <ejs-richtexteditor
                                        v-model="riskData.action_plan" name="action_plan" id="action_plan"
                                                          :class="{ 'is-invalid': submitted && errors.has('action_plan') }"
                                                          :readonly="riskData.risk_status==0?true:false"
                                                          ref="defaultRTE" :height="340" :widhth="700"  :enableRtl="$i18n.locale=='ar' ? 'true' : ''"></ejs-richtexteditor>

                                  </div>

                                </div>
                                <b-button :disabled="riskData.risk_status==0?true:false"
                                   class="float-right noprint" variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}</b-button>

                              </b-form>
                              <!-- </b-modal> -->
                            </div>

                          </div>
                        </div>

                      </div>


                          <!-- </div> -->
                </transition>


              

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
  import { RichTextEditorPlugin, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-vue-richtexteditor';

  import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import lang from 'element-ui/lib/locale/lang/en'
  import locale from 'element-ui/lib/locale'

    import 'bootstrap/dist/css/bootstrap.css';
  import datePicker from 'vue-bootstrap-datetimepicker';
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';


    Vue.use(Element);
    Vue.use(Loading);
  Vue.use(RichTextEditorPlugin);
    locale.use(lang)

      Vue.use(datePicker);

  export default {
      store: store,
      provide: 
         {
      richtexteditor: [Toolbar, Link, Image, HtmlEditor, QuickToolbar]
            },
        created() {
         this.$store.dispatch('loadNotificationDefaultData')
         this.loadTenants();
         this.loadprojecttypes();
                         this.$store.dispatch('loaduserlist');
                                         this.$store.dispatch('loadriskcatlist');

         this.loadriskdata(this.$route.params.id);

                  // this.$store.dispatch('loadriskdata',this.$route.params.id)
// console.log(this.$store.state.riskdata);
          //this.isAdmin = ((this.$auth.user().roles.includes('Admin')) ? true : false);
            this.$store.dispatch('translation');
            // if (localStorage.getItem('edit')) {
            //       this.$store.dispatch('loadriskdata',this.project_id)
                                
            //             }

        },
        data: () => {
            return {
              projecttypeoptions:[],
               datePickerOptions: {
                  disabledDate (date) {
                  return date > new Date()
                                 }
                    },

             
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
              // date: ,
        options: {
          format: 'YYYY/MM/DD HH:mm',
          useCurrent: false,
          maxDate:'now'
                  // endDate: '+0d',
        }       ,
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
                priorityInfo: null,
                showingeditModal: true,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                showingUserModal: false,
                submitted: false,
                updated: false,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation:[],

              sortByTenant: null,
              sortByStatus: null,
              sortBySubTenant: null,
    riskData:{
         id:null,
         project_id:null,
         risk_description:null,
         risk_trigger: null,
          risk_cat: null,
          risk_owner:null,
           impact:null,
           propability:null,
             risk_treatment:null,
          risk_status:null,
          created_by:null,
          date_identified:new Date(),
          closure_date:null,
          action_plan:"",




        },
             
            //  errors:null,
              dateerror:"The End date is less than start date",
              numericerrorplanned:'',
              numericerroractual:''



            }
        },
        mounted() {
          //this.$store.dispatch('loadTenants');
// if(this.$store.state.riskdata)
// {
//               console.log(this.$store.state.riskdata);

// console.log('hiiiiiiiiiiiiiiiii');
// }

        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }

        },
        components: {
            'loading': Loading,
              datePicker,

              Treeselect
        },
  beforeDestroy () {
    localStorage.removeItem('notif_sector1');

  },
 computed: {

              // project_id(){
              //   this.$store.state.project_id=this.riskData.project_id

              //                 return this.riskData.project_id

              // },

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

//             id(){
//               return this.$route.params.id
//             },
//             notif_sector(){
//         return localStorage.getItem('notif_sector1')

//             },
// risk_description(){
// return this.$store.getters.riskdata.risk_description
//  },
// risk_status(){
// return this.$store.state.riskdata.risk_status
//  },
// closure_date(){
// return this.$store.state.riskdata.closure_date
//  },
// risk_cat(){
// return this.$store.state.riskdata.risk_cat
//  },
// risk_trigger(){
// return this.$store.state.riskdata.risk_trigger
//  },
// risk_owner(){
//   alert(this.$store.state.riskdata.risk_owner)

// return this.$store.state.riskdata.risk_owner
//  },
// risk_owner_ext(){
// return this.$store.state.riskdata.risk_owner_ext
//  },


// propability(){
// return this.$store.state.riskdata.propability
//  },
// impact(){
// return this.$store.state.riskdata.impact
//  },
// risk_treatment(){
// return this.$store.state.riskdata.risk_treatment
//  },
// date_identified(){
//   return this.$store.state.riskdata.date_identified
//  },

// action_plan(){
//   return this.$store.state.riskdata.action_plan
//  },


},
        methods: {
                     loaded: function(args) {

                window.print()

            },

addUsers(){
this.showingUserModal = true

this.riskData.risk_owner_ext=null
},
riskchoice(){
if(this.riskData.risk_owner) 
this.riskData.risk_owner=null
// alert("hi")

},
// riskchoice1(){
// if(this.risk_owner_ext) 
// this.risk_owner_ext=""

// },

    loadUser(sector) {
        //alert(sector)
        // this.$store.state.isLoading = true;
        Vue.axios.get(`loadKpiOrgUsersNotification1/${sector}/null`)
          .then(response => {
            if (response.data.code == 200) {
              this.$store.state.sectorUser = response.data.data;
            }
            // this.$store.state.isLoading = false;
          });
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
          project_id:null,

                        }
                //         this.$validator.reset();
                //     }
                // });
            },

 loadriskdata(riskid){

            this.$store.state.isLoading = true;
          Vue.axios.get(`/risklist1/${riskid}`)
              .then(response => {
                if (response.data.code == 200) {
                  // this.projectid=response.data.data[0]['id'];
                  this.riskData=response.data.data;
                    //this.risk_description=response.data.data[0]['description'];
console.log(response.data.data);
console.log(this.riskData);
console.log("helppppp");


                  //   this.project_symbol=response.data.projectlist[0]['symbol'];
                  //   this.project_name=response.data.projectlist[0]['name'];
                  //   this.project_start_date=response.data.projectlist[0]['start_dt_base'];
                  //   this.project_end_date=response.data.projectlist[0]['end_dt_base'];
                  //   this.actual_start=response.data.projectlist[0]['start_dt_actual'];
                  //   // this.actual_closure=response.data.projectlist[0]['end_dt_actual'];
                  //   // this.project_importance=response.data.projectlist[0]['importance'];
                  //   // this.project_has_budget=response.data.projectlist[0]['has_budget'];
                  // this.planned_budget="KWD "+response.data.projectlist[0]['budget_base'];
                  // this.spending_total=response.data.projectlist[0]['spending_total'];
                  //   // this.project_completion=response.data.projectlist[0]['progress_total'];
                    // this.project_forcasting=response.data.projectlist[0]['has_forecasting'];
                    // this.project_update_interval=response.data.projectlist[0]['value_period'];
                    // this.project_description=response.data.projectlist[0]['description'];
                    // this.project_has_risk=response.data.projectlist[0]['has_risks'];


                  }

                this.$store.state.isLoading = false;
              })
              .catch((error) => {
                console.log(error)
              })
          },

          loadprojecttypes(){
            Vue.axios.get('/getprojecttypes')
              .then(response => {
                if (response.data.code == 200) {
                  this.projecttypeoptions = response.data.project_types.map(function (item) {
                    return {
                      text: item.name,
                      value: item.id
                    }


                  });
                }
              });
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
            createPriority() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.resetPasswordBtn = true,
                            this.showingModal = false
                        this.$store.dispatch('createPriority', {
                            data: {
                                TypeCode: this.priorityData.TypeCode,
                                PRCType: this.priorityData.PRCType,
                                TypeCodeMin: this.priorityData.TypeCodeMin,
                                TypeCodeMax: this.priorityData.TypeCodeMax,
                            }
                        })
                        this.priorityData = {
                            TypeCode: null,
                            PRCType: null,
                            TypeCodeMin: null,
                            TypeCodeMax: null,
                        }
                        this.$validator.reset();
                    }
                });
            },
            selectPriority(priority) {
                this.priorityData = priority;
            },
            editPriority(priority, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/PriorityType/${priority.idTaskPriorityType}`, priority.PRCTypes)
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
                                this.priorityInfo = response.data.data
                            } else {
                                this.showingeditModal = true
                                this.priorityData = response.data.data
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            updatePriority() {

                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false
                        this.$store.dispatch('updatePriority', {
                            where: this.priorityData.idTaskPriorityType,
                            data: {
                                TypeCode: this.priorityData.TypeCode,
                                PRCType: this.priorityData.PRCType,
                                TypeCodeMin: this.priorityData.TypeCodeMin,
                                TypeCodeMax: this.priorityData.TypeCodeMax,
                            }
                        })
                        this.priorityData = {
                            TypeCode: null,
                            PRCType: null,
                            TypeCodeMin: null,
                            TypeCodeMax: null,
                        }
                        this.$validator.reset();
                    }
                });
            },
            removePriority(priorities) {
                this.$store.dispatch('removePriority', priorities)
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
