<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col cols="12" xl="12">
                <transition name="slide">
                    <b-card>
                          <div slot="header">
              <b class="h4">{{ get_text('title@holiday@l') }}</b>
              &nbsp;
                            <!-- <button v-on:click="scrape">Greet</button> -->
                             <b-button variant="primary" size="md" class="btn float-right" @click="scrapModal= true;" >
                                <b><i class="icon-plus icons font-1xl"></i> {{ get_text('scrap@holiday@l') }}</b></b-button>
&nbsp;&nbsp;
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" >
                                <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add@prcType@l') }}</b></b-button>
                                &nbsp;
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                <!-- Loading Holiday Data... -->
                                                {{ get_text('loading@prcType@l') }}

                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('filter@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter" :placeholder="this.get_text('type_to_search@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" class="my-1">
                                    <b-form-group horizontal :label="get_text('year@holiday@c')" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="yearfilter"  :options="this.$store.state.year">                         
                                                <option slot="first" :value="null">-- اختر --</option>
                                            </b-form-select>
                                            
                                          
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" class="my-1">
                                    <b-form-group horizontal :label="get_text('per_page@l')" class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="roles" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage"
                                     :filter="filter"                                     
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="id" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{(perPage*(currentPage-1))+ data.index + 1 }}                                    </b-col>
                                </template>                             
                                 <!-- <div v-if="$auth.check('Admin')"> -->

                                <template slot="Actions" slot-scope="data"  > 
                                    <b-row class="text-center" style="float:left;margin-left:30%" >
                                    
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                                            <b-button variant="warning" size="sm"
                                                      @click="editGroupTenant(data.item, 'edit')"><i
                                                    class="icon-pencil icons font-1xl"></i>
                                            </b-button>
                                        </b-col>&nbsp;
                                        <!--v-if="$can('role-delete')"-->
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectUser(data.item)"><i
                                                    class="icon-trash icons font-1xl"></i>
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </template>
                                 <!-- </div> -->
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')" :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add_title@holiday@l')" size="md" class="modal-primary" v-model="showingModal" hide-footer>
                         <!-- <@close="roleData = {}" hide-footer> -->
                    <b-form @submit.prevent="createGroup">
                        <b-row>
                            <!-- <b-col sm="012" v-if="$auth.check('Manager') || $auth.check('Admin')"> -->
                               <b-col sm="12">
                                <b-form-group>
                                    <label for="year">{{ get_text('year@holiday@l')}}<i class="fa fa-asterisk danger fa-xs"  style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="roleData.year"
                                                   :options="this.$store.state.year"
                                                   v-validate="'required'" name="year"
                                                   :class="{ 'is-invalid': submitted && errors.has('year') }"
                                                   >
                                        <template slot="first">
                                            <option :value="null" disabled>&#45;&#45; -- اختر --
                                                &#45;&#45;
                                            </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('year')" class="invalid-feedback">{{
                                        errors.first('year') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="12">
                                <b-form-group>
                                     <!-- <input type="radio" v-model="x" value="one">
                                     <input type="radio" v-model="x" value="two">
                                     <div v-show="x === 'one'"> -->
                                    <label for="holiday">{{ get_text('holiday_name@holiday@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="roleData.hid"
                                                    @change="tt"
                                                   :options="allholidays"
                                                   v-validate="'required'" name="holiday"
                                                   :class="{ 'is-invalid': submitted && errors.has('user') }">
                                        <template slot="first">
                                            <option :value="null" disabled>&#45;&#45; -- اختر --
                                                &#45;&#45;
                                            </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('holiday')" class="invalid-feedback">{{
                                        errors.first('holiday') }}
                                    </div>
                                    <!-- </div> -->
                                    <!-- <div>
                                        <div v-show="x === 'two'">
                                        <b-form-input v-model="h_name" placeholder="Enter holiday name"></b-form-input>
                                        <div class="mt-2">Value: {{ h_name }}</div>
                                        </div>
                                    </div> -->

                                </b-form-group>
                            </b-col>
                         </b-row>
                        <b-row>
                            <b-col sm="12">
                          <!-- <div v-if="this.$store.state.daterequired"> -->
                                <b-form-group>
                                    <label for="hol_date">{{ get_text('holiday_date@holiday@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                                style="font-size:10px;color:red;"></i></label>
                                    <el-date-picker
                                            id="from"
                                            v-model="roleData.hol_date"
                                            type="date"
                                            name="hol_date"
                                            style="direction: rtl"
                                            align="right"
                                            value-format="yyyy-MM-dd"
                                            v-validate="'required'"
                                            :class="{ 'is-invalid': submitted && errors.has('hol_date') }">
                                    </el-date-picker>

                                    <div v-if="submitted && errors.has('hol_date')" class="invalid-feedback">{{
                                        errors.first('hol_date') }}
                                    </div>
                                </b-form-group>
                          <!-- </div>                                            placeholder="تاريخ"
  -->
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit_title@holiday@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showingeditModal" hide-footer>
                    <b-form @submit.prevent="updateGroup">
                        <b-row>
                            
                            <b-col sm="12">
                                <b-form-group>
                                    <label for="year">{{get_text('year@holiday@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                                   style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="roleData.year"
                                                   :options="this.$store.state.year"
                                                   v-validate="'required'" name="yearedit"
                                                   :class="{ 'is-invalid': updated && errors.has('yearedit') }">
                                        <template slot="first">
                                            <option :value="null" disabled>&#45;&#45; -- اختر --
                                                &#45;&#45;
                                            </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="updated && errors.has('yearedit')" class="invalid-feedback">{{
                                        errors.first('yearedit') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                         <b-col sm="12">
                                <b-form-group>
                                    <label for="holiday">{{get_text('holiday_name@holiday@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="roleData.hid"
                                                    @change="tt"
                                                   :options="allholidays"
                                                   v-validate="'required'" name="holiday"
                                                   :class="{ 'is-invalid': submitted && errors.has('user') }">
                                        <!-- <template slot="first">
                                            <option :value="null" disabled>&#45;&#45; -- اختر --
                                                &#45;&#45;
                                            </option>
                                        </template> -->
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('holiday')" class="invalid-feedback">{{
                                        errors.first('holiday') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12">
                            <!-- <div v-if="this.$store.state.daterequired"> -->

                                <b-form-group>
                                    <label for="hol_date">{{get_text('hol_date@holiday@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                                style="font-size:10px;color:red;"></i></label>
                                    <el-date-picker
                                            id="from"
                                            v-model="roleData.hol_date"
                                            type="date"
                                            name="hol_dateedit"
                                            style="direction: rtl"
                                            align="right"
                                           
                                            value-format="yyyy-MM-dd"
                                            v-validate="'required'"
                                            
                                            :class="{ 'is-invalid': updated && errors.has('hol_dateedit') }">
                                    </el-date-picker>

                                    <div v-if="updated && errors.has('hol_dateedit')" class="invalid-feedback">{{
                                        errors.first('hol_dateedit') }}
                                    </div>
                                </b-form-group>
                            <!-- </div>                                             placeholder="date"
-->
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{get_text('update@prcType@l')}}</b-button>                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete_title@holiday@l')" size="lg" class="modal-danger" v-model="showingdeleteModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcType@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeHoliday(rolesInfo)">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@prcType@l') }} 
                            </button>
                        </b-col>
                    </div>
                </b-modal>

                                <b-modal :title="get_text('scrap_title@holiday@l')" size="lg" class="modal-danger" v-model="scrapModal"  hide-footer="true">
                         <!-- ok-variant="danger" ok-title="موافق" cancel-title="إلغاء"> -->
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete_existing_holidays_and_add_scrapped_holidays@prcType@l') }} </h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="scrapModal = false; scrape(yearfilter);">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="scrapModal = false;">{{ get_text('no@prcType@l') }} 
                            </button>
                        </b-col>
                    </div>
                </b-modal>


                <!-- <b-modal title="بيانات العطلة" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info"  ok-title="موافق" cancel-title="إلغاء">
                    <div class="modalcontent" v-if="this.rolesInfo ">
                        <b-row v-for="(item, index) in this.rolesInfo " :key="index">
                            <b-col sm="4">{{ index }}</b-col>
                            <b-col sm="8">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal> -->
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/holidays/store'

    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import VeeValidate from 'vee-validate';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    //import BRow from "bootstrap-vue/src/components/layout/row";
    //import SelectTree from '@/components/tree/SelectTree';
    import lang from 'element-ui/lib/locale/lang/ar'
    import locale from 'element-ui/lib/locale'

    locale.use(lang);
    Vue.use(Loading);
    Vue.use(Element);
    const dict = {
        custom: {
            name: {
                required: 'The Name field is required.'
            },
            subtenant_id: {
                required: () => 'The Tenant field is required.'
            },
            description: {
                required: () => 'The Description field is required.'
            },
            tenant_user_type_id: {
                required: () => 'The Tenant Users Type field is required.'
            }
        }
    };
    VeeValidate.Validator.localize('en', dict);

    export default {
        name: 'tables',
        store: store,
        props: {
            caption: {
                type: String,
                default: 'Holiday'
            },
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
            },
         
         
        },
        created() {
            // fields: {
            //      console.log();
        
            // if(!this.$auth.check('Admin')){
            // this.fields.class=d-none;
            // }
            // console.log(this.fields);
            // return this.fields
            // },
            this.$store.dispatch('loadVacations');
            //this.$store.dispatch('loadSupervisions');
            this.$store.dispatch('loadHolidays');
            this.$store.dispatch('loadYear');
            //this.$store.dispatch('loadRoleObject')
        },
          
        data: () => {
            
            return {
                fields: [],
                button: '',
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                roleData: {
                    hid: "",
                    //name:"",

                    hol_date:"",// new Date('2018-06-22'),
                    year: new Date().getFullYear(),
                },
                showingeditModal: false,
                showingModal: false,
                showingdeleteModal: false,
                scrapModal:false,
                // showingViewModal: false,
                submitted: false,
                updated: false,
                rolesInfo: null,
                rolesDate:null,
                pageOptions: [5, 10, 15],
                year:[],
                sortBy: 'hol_date',
                sortDesc: false,
                sortDirection: 'ascending',
                filter: null,
                yearfilter:new Date().getFullYear(),
                rolePermission: null,
                x: 'one',

            }
        },
        components: {
          //  BRow,
            'loading': Loading,
            //'child': SelectTree,
        },
        
        computed: {
        //     fields1(){
        //    this.fields=[
        //             {key: 'id', label: '#', sortable: false, sortDirection: 'ascending', 'class': 'text-center'},
        //             {key: 'year', label: this.get_text('year@holiday@c'), sortable: true, 'class': 'text-center'},
        //             {key: 'name', label:this.get_text('holiday_name@holiday@c'), sortable: true, 'class': 'text-center'},
        //             {key: 'hol_date', label: this.get_text('hol_date@holiday@c'), sortable: true,'class': 'text-center'},
        //             {key: 'Actions', label: this.get_text('actions@l'),'class': 'text-center' },
        //             // {key: 'Actions', label: 'العملية','class': 'text-center', thClass: 'd-none', tdClass: 'd-none'  },
                    
        //             //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
        //             //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center', visible: false }
        //         ]

          
        //     console.log(this.fields);
        //     return this.fields
        //     },
    
            roles() {
                  this.fields=[
                    {key: 'id', label: '#', sortable: false, sortDirection: 'ascending', 'class': 'text-center'},
                    {key: 'year', label: this.get_text('year@holiday@c'), sortable: true, 'class': 'text-center'},
                    {key: 'name', label:this.get_text('holiday_name@holiday@c'), sortable: true, 'class': 'text-center'},
                    {key: 'hol_date', label: this.get_text('hol_date@holiday@c'), sortable: true,'class': 'text-center'},
                    {key: 'Actions', label: this.get_text('actions@l'),'class': 'text-center' },
                    // {key: 'Actions', label: 'العملية','class': 'text-center', thClass: 'd-none', tdClass: 'd-none'  },
                    
                    //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center', visible: false }
                ]
                if(this.yearfilter!=null)
                     {
                       //  alert(this.yearfilter);
                        var filterData = this.$store.getters.roles.filter(data => {
                        return data.year.toString().includes(this.yearfilter)
                    })
                    this.totalRows = filterData.length;
                    return filterData; 
                     } else {
                                var filterData =  this.$store.getters.roles
                                this.totalRows = filterData.length;
                                return filterData;
                }
            },

  
            allholidays() {
                   return this.$store.state.allholidays;
              
            },
         
   //     set: function(fields1){
//      if(this.$auth.check('Admin')){
//    this.fields= [
//                       {key: 'id', label: this.tCol('id'), sortable: false, sortDirection: 'ascending', 'class': 'text-center'},
//                     {key: 'year', label: this.tCol('year'), sortable: true, 'class': 'text-center'},
//                     {key: 'name', label: this.tCol('name'), sortable: true, 'class': 'text-center'},
//                     {key: 'hol_date', label: this.tCol('hol_date'), sortable: true,'class': 'text-center'},
//                     //{key: 'Actions', label: 'العملية','class': 'text-center' },
//                      {key: 'Actions', label: this.tCol('Actions'),'class': 'd-none'  },
//     ]    
                
//      }
      
    //  fields(){
        
    //         if(!this.$auth.check('Admin')){
    //         this.fields.class=d-none;
    //         }
    //         console.log(this.fields);
    //         return this.fields
    //         },
               
                 
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {text: f.label, value: f.key}
                    })
            },
         },
        // created: {
        //  fields(){
        
        //     if(!this.$auth.check('Admin')){
        //     this.fields.class=d-none;
        //     }
        //     console.log(this.fields);
        //     return this.fields
        //     },
        //  },

    beforeMount() {
  
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
     

    },
  
   watch: {
scrapModal:function(){
    if(this.scrapModal==true){
        //  this.$store.dispatch('loadHolidays');
            // this.$store.dispatch('loadYear');
    }
},


            showingModal: function () {
                if (this.showingModal == false) {
                    // this.$store.dispatch('loadRoles')
                        this.roleData.hid="",                
                     this.roleData.hol_date="",// new Date('2018-06-22'),
                    this.roleData.year=new Date().getFullYear()
                
                }
            },
              showingeditModal: function () {
                if (this.showingeditModal == false) {
                    this.$store.dispatch('loadRoles')
                        this.roleData.hid="",                
                     this.roleData.hol_date="",// new Date('2018-06-22'),
                    this.roleData.year=new Date().getFullYear()
                
                }
            }, 

            // showingeditModal: function () {
            //     if (this.showingeditModal == false) {
            //         //this.$store.dispatch('loadRoles')
            //         this.roleData = {}
            //     }
            // },
            // showingViewModal: function () {
            //     if (this.showingViewModal == false) {
            //        // this.$store.dispatch('loadRoles')
            //         this.roleData = {}
            //     }
            // },
            //  showingdeleteModal: function () {
            //         if (this.showingdeleteModal == false) {
            //             if (this.$store.state.deleterequired== true) {

            //          this.roleData.hid="",                
            //          this.roleData.hol_date="",// new Date('2018-06-22'),
            //         this.roleData.year=new Date().getFullYear()
            //     }
            //         }
         //},
             
        },

        methods: {


      scrape(yearfilter) {
        // this.$store.state.isLoading = true;
        Vue.axios.get(`/scrape/${yearfilter}`)
          .then((response) => {
                            if (response.data.code == 200) {
                                        // this.scrapModal=true;

                    console.log('Created Group', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'نجاح',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })

            }
          }).catch(error => {
          console.log(error.response.data.message);
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
        // this.$store.dispatch('loadHolidays');
        //     this.$store.dispatch('loadYear');
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

             tCol(colName) {
                 var label = {id:"#", year:'السنة', name:'العطلة', hol_date:'تاريخ',Actions:'العمل'};
                 alert(label);
                colname= this.label+'.'+colName;
                alert(this.colname);
                return this.colname;
                },
            $can(permissionName) {
                if (permissionName != '') {
                    // alert(this.$auth.user().allPermissions);
                    return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
                }
            },
            selectUser(groupTenant) {
                console.log(groupTenant);
                this.rolesInfo = groupTenant;
            },
            removeHoliday(groupTenant) {
                this.$store.dispatch('removeHoliday', groupTenant)
                                

            },
            createGroup() {
          
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                            this.showingModal = false
                        this.$store.dispatch('createGroup', {
                            data: {
                                year: this.roleData.year,
                                hid: this.roleData.hid,
                                hol_date: this.roleData.hol_date,
                            }
                        })
                 //      this.roleData = {};
                       // this.roleData.hid="",                
                        //this.roleData.hol_date="",// new Date('2018-06-22'),

                     //this.roleData.year=new Date().getFullYear()
                        this.$validator.reset();
                    }
                });
           // }
            },
            editGroupTenant(tenentGroup, value = null) {
             
             console.log(tenentGroup);
                this.$store.state.isLoading = true;
                Vue.axios.get(`/holiday/${tenentGroup.id}`, tenentGroup.data)
                    .then((response) => {
                        if (response.data.code == 401) {
                            Vue.prototype.$notify.error({
                                title: 'Error',
                                message: response.data.msg,
                                type: 'Error',
                                position: 'top-right'
                            })
                        // } else {
                        //     if (value == 'view') {
                        //         this.showingViewModal = true;
                        //         this.rolesInfo = response.data.data;
                        //         //this.rolesInfo.permissions = response.data.permissionId;
                        //         //this.rolesInfo.permissions = response.data.permissionVal;
                        //     }
                        } else {
                                this.showingeditModal = true;
                                this.roleData = response.data.data;
                                //this.roleData.permissions = response.data.permissionId;
                                // this.rolePermission = response.data.ped;
                            }
                            this.$store.state.isLoading = false;
                        //}
                    }).catch(error => {
                    console.log(error.response.data.message);
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
                
                },
            updateGroup() {
                console.log(this.roleData);
                //             var str1 = JSON.stringify(this.roleData);
                // console.log(str1);
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false;
                        this.$store.dispatch('updateGroup', {
                            where: this.roleData.id,
                            data: {
                                hid: this.roleData.hid,
                                hol_date: this.roleData.hol_date,
                                year: this.roleData.year,
                            }
                        })
                        //this.roleData = {}
                        this.$validator.reset();
                    }
                });
            },
            userLink(id) {
                return `groups/${id.toString()}`
            },
            rowClicked(groupTenant) {
                const userLink = this.userLink(groupTenant.id)
                this.$router.push({path: userLink})
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            tt(id){
                //alert(roleData.year);
                Vue.axios.get(`/date/${id}/${this.roleData.year}`)
                    .then((response) => {
                      
                        if (response.data.code == 200) {
                          //this.$store.state.daterequired= true
                            this.roleData.hol_date = response.data.data;
                            //
                            console.log( this.roleData.hol_date);

                        }
                       
                    }).catch(error => {
                    console.log(error.response.data.message);
                                        
                })
                //this.tanentData = tenent;
                //this.showingeditModal= true
                //console.log(data);
            },                

          ganttchart() {
           
            window.location.href = 'ganttchart';
          },
        },
        // filters: {
        //     uppercase: function (v) {
        //         return v.charAt(0).toUpperCase() + v.slice(1);
        //     }
        // }
    }
</script>
<style>
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        width: 100%;
    }
    .modal-footer button.btn.btn-secondary {
        margin-left: 1%;
    }

    .el-picker-panel__content.el-date-range-picker__content.is-left {
        float: right;
    }

    button.el-picker-panel__icon-btn.el-icon-d-arrow-left {
        float: right;
    }
    button.el-picker-panel__icon-btn.el-icon-arrow-left {
        float: right;
    }

    button.el-picker-panel__icon-btn.el-icon-d-arrow-right {
        float: left;
    }
    button.el-picker-panel__icon-btn.el-icon-arrow-right {
        float: left;
    }

    .is-invalid {
        border-color: #f86c6b;
        padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);
    }
    .is-invalid:hover {
        border-color: #f86c6b;
    }

    legend {
        text-align: end;
    }

    .demo .nav {
        height: 15em !important;
        overflow: scroll;
        overflow-x: hidden;
        display: -webkit-box !important;
    }

    .form-check-label {
        margin-right: 4%;
    }

    .modal-header .close {
        padding: 0;
        margin: 0;
    }

    .el-notification__closeBtn {
        padding: 0;
        margin: 0;
        right: 90% !important;
    }

    @media (max-width: 430px) {
        .form-check-label {
            margin-right: 21%;
        }
    }

    @media (max-width: 575px) {
        .newCardBody legend {
            text-align: unset;
        }

        legend {
            text-align: unset;
        }

    }
</style>
<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>