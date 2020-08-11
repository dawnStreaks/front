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
              <b class="h4">{{ get_text('title@process_list@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" >
                                <b><i class="icon-plus icons font-1xl"></i> {{ this.get_text('add@prcType@l') }}</b></b-button>
            </div>

            <div v-if="!$auth.ready() || !this.$store.state.loading">
              <div style="text-align:center; padding-top:50px;">
                {{ this.get_text('loading@prcType@l') }}
              </div>
            </div>
            <div v-if="$auth.ready() && this.$store.state.loading">


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
                  <b-form-group horizontal :label="this.get_text('sort@l')" class="mb-0">
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
              <b-row>
                 <b-col>
                            <b-form-group horizontal :label="get_text('sector@l')">
                                <b-form-select v-model="sector" :options="this.$store.state.setTenant"
                                               v-on:change="getSector();">
                                    {{sector}}
                                    <option slot="first" :value="null">-- اختر --</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group horizontal :label="get_text('org_unit@l')">
<!--                                <b-form-select v-model="org_unit" :options="this.$store.state.setSubTenant"-->
<!--                                               v-on:change="getOrg_unit()">-->
<!--                                    {{org_unit}}-->
<!--                                    <option slot="first" :value="null">&#45;&#45; اختر &#45;&#45;</option>-->
<!--                                </b-form-select>-->
                              <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')" searchable="searchable" :options="options" v-model="sortBySubTenant" :normalizer="normalizer"  @input="getOrg_unit" />

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group horizontal :label="get_text('category@process_list@c')">
                                <b-form-select v-model="ProcessCategory" :options="this.$store.state.setProcessCategory"
                                               v-on:change="getSelectedProcessCategory()">
                                    <option slot="first" :value="null">-- اختر --</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>


              </b-row>

                            <b-table  ref="mytable"  @input="initiateclick" :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                       :fixed="fixed" responsive="sm" :items="processlist" :fields="fields1"
                       :current-page="currentPage" :per-page="perPage" :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered"
                         selected-variant="info"
                           @row-clicked="expandAdditionalInfo"
                             @context-changed="clearColor "
                            >
                         <!-- <template slot="id" slot-scope="data">
                           <b-col class="mb-3 mb-xl-0">
                             {{ data.index + 1 }}
                           </b-col>
                            @sort-changed="showinglinkTable=true"

 :busy="isBusy"
                         </template>                        @context-changed="showingchange= true "  -->

                        <template slot="Actions" slot-scope="data">
                                  <b-row class="text-center" style="float: left">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                            <b-button variant="warning" size="sm"
                                                      @click="editProcess(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" ><b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectProcess(data.item)"><b><i class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                    </b-row>
                                </template>


              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                              v-model="currentPage" :prev-text="this.get_text('prev@l')"     :next-text="this.get_text('next@l')"
                              hide-goto-end-buttons/>
              </nav>

            </div>
          </b-card>
        </transition>
                 <b-modal :title="get_text('add@prcType@l')" size="lg" class="modal-primary" v-model="showingModal"  hide-footer>
                    <b-form @submit.prevent="createProcess">
                        <b-row>
                          <b-col sm="6">
                                <b-form-group>
                                    <label for="ProcessName">{{ get_text('process_name@process_list@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                               style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="ProcessName" v-validate="'required'" name="ProcessName"
                                                  v-model="processData.ProcessName" :placeholder="get_text('enter_prc_name@process_list@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('ProcessName') }"></b-form-input>
                                    <div v-if="updated && errors.has('ProcessName')" class="invalid-feedback">{{
                                        errors.first('ProcessName') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Category">{{ get_text('category@process_list@c') }}
                                                            </label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                            name="Category" id="Category"
                                            v-model="processData.Category" placeholder="Enter Category name"
                                            :options="this.$store.state.setProcessCategory">
                                    </b-form-select>
                                    <!-- <div v-if="updated && errors.has('Category')" class="invalid-feedback">{{
                                        errors.first('Category') }}
                                    </div> -->
                                </b-form-group>
                            </b-col>
                           </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}</b-button>
                    </b-form>
                </b-modal>


                <b-modal :title="get_text('edit@prcType@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal"  hide-footer>
                    <b-form @submit.prevent="updateProcess">
                        <b-row>
                          <b-col sm="6">
                                <b-form-group>
                                    <label for="ProcessName">{{ get_text('process_name@process_list@c')}}<i class="fa fa-asterisk danger fa-xs"
                                                               style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="ProcessName1" v-validate="'required'" name="ProcessName"
                                                  v-model="processData.ProcessName" :placeholder="get_text('enter_prc_name@process_list@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('ProcessName') }"></b-form-input>
                                    <div v-if="updated && errors.has('ProcessName')" class="invalid-feedback">{{
                                        errors.first('ProcessName') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Category">{{ get_text('category@process_list@c') }}</label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                            name="Category" id="Category1"
                                            v-model="processData.Category" placeholder="Enter Category name"
                                            :options="this.$store.state.setProcessCategory">
                                    </b-form-select>
                                    <!-- <div v-if="updated && errors.has('Category')" class="invalid-feedback">{{
                                        errors.first('Category') }}
                                    </div> -->
                                </b-form-group>
                            </b-col>

                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('update@prcType@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@prcType@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer>
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcType@l') }} <b>{{processData.ProcessName}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeProcess(processData)">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@prcType@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>


      </b-col>
    </b-row>


<!-- //LINKING PART -->

 <b-row>
      <b-col cols="12" xl="12" ref="formContainer">
        <transition name="slide">
          <b-card>
            <div slot="header">
              <b class="h4">{{ get_text('linked_org_units@process_list@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal1= true;" >
                                <b><i class="icon-plus icons font-1xl"></i> {{ this.get_text('link@process_list@l') }}</b></b-button>
            </div>

            <div v-if="!$auth.ready() || !this.$store.state.loading">
              <div style="text-align:center; padding-top:50px;">
                {{ this.get_text('loading@prcType@l') }}
              </div>
            </div>
            <div v-if="$auth.ready() && this.$store.state.loading">

                <b-table :hover="hover"  :striped="striped" v-show="showinglinkTable" :bordered="bordered" :small="small"
                       :fixed="fixed" responsive="sm" :items="linkedlist" :fields="fields2"
                       :current-page="currentPage1" :per-page="perPage" :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered">
                         <!-- <template slot="id" slot-scope="data">
                           <b-col class="mb-3 mb-xl-0">
                             {{ data.index + 1 }}
                           </b-col>
                         </template> -->
                        <template slot="Actions" slot-scope="data">
                                  <b-row class="text-center" style="float: left">

                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" ><b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal1 = true;  selectLink(data.item)"><b><i class="fa fa-minus-circle"></i></b></b-button>
                                        </b-col>&nbsp;
                                    </b-row>
                                </template>


              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="getRowCount1" :per-page="perPage"
                              v-model="currentPage" :prev-text="this.get_text('prev@l')"     :next-text="this.get_text('next@l')"
                              hide-goto-end-buttons/>
              </nav>

            </div>
          </b-card>
        </transition>
          <b-modal :title="get_text('link@process_list@l')" size="lg" class="modal-primary" v-model="showingModal1"  hide-footer>
                         <!-- @close="setprocessData" hide-footer> -->
                    <b-form @submit.prevent="createLink">
                        <b-row>
                         <b-col sm="6">
                                <b-form-group>
                                    <label for="linkSector">{{ get_text('sector@prcType@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                             v-validate="'required'"
                                            name="linkSector" id="linkSector"
                                            v-model="linkData.linkSector" placeholder="Enter Tenant name"
                                            :class="{ 'is-invalid': updated && errors.has('linkSector') }"
                                            :options="this.$store.state.setTenant1"
                                              v-on:change="getLinkSector()">
                                    </b-form-select>
                                    <div v-if="updated && errors.has('linkSector')" class="invalid-feedback">{{
                                        errors.first('linkSector') }}
                                    </div>
                                </b-form-group>
                            </b-col>

                            <b-col sm="6">
                                <b-form-group>
                                    <label for="linkOrg">{{ get_text('org_unit@prcType@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                             v-validate="'required'"
                                            name="linkOrg" id="linkOrg"
                                            v-model="linkData.linkOrg" placeholder="Enter Subtenant name"
                                            :class="{ 'is-invalid': updated && errors.has('linkOrg') }"
                                            :options="this.$store.state.setSubTenant1">
                                    </b-form-select>
                                    <div v-if="updated && errors.has('linkOrg')" class="invalid-feedback">{{
                                        errors.first('linkOrg') }}
                                    </div>
                                </b-form-group>
                            </b-col>

                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}</b-button>
                    </b-form>
                </b-modal>

                <b-modal :title="get_text('delete@prcType@l')" size="lg" class="modal-danger" v-model="showingdeleteModal1" hide-footer>
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcType@l') }} <b>{{linkData.subtenant_name}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal1 = false; removeLink(linkData)">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal1 = false;">{{ get_text('no@prcType@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>


      </b-col>
    </b-row>


  </div>
</template>

<script>
  import {store} from '@/components/process1/store/store'
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui'
  import $ from 'jquery'
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
      this.$store.dispatch('loadCategory');
      this.$store.dispatch('loadProcessListTable');
    },

    data: () => {

      return {
        isBusy:false,
        selected: null,
        fields1: [],
        button: '',
        currentPage: 1,
        currentPage1: 1,
        perPage: 5,
        totalRows: 0,
        processData: {
         // prc_id:null,
         id:null,
         ProcessName: null,
          Category: null,
          Tenant:null,
        },
        linkData: {
         // prc_id:null,
         id:null,
         linkSector:null,
         linkOrg:null,
        },

                ProcessInfo: null,
                showingeditModal: false,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                 showingModal1: false,
                showingdeleteModal1: false,
                showingTable:true,
                showinglinkTable:true,
                 showingclickChange:false,

        submitted: false,
        updated: false,
        pageOptions: [5, 10, 25, 50, 100],
        // pageOptions1: [5, 10, 25, 50, 100],
        sortBy: 'id',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        translation:[],
        sortByTenant: null,
        sortBySubTenant: null,
       sector: 2,
      org_unit: 6,
      ProcessCategory: null,
       parent: 2,
       oldRow:"",
        options:'',
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

      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }


    },


watch: {
   showingModal: function () {
        if (this.showingModal == true) {
          // this.$store.dispatch('loadRoles')
          this.processData = {}

        }
      },

  showinglinkTable: function(){
    if(this.$store.getters.processlist.length==0)
    {
this.showinglinkTable=false
    }
    else
    this.showinglinkTable=true
// alert('hi')
  },
  showingclickChange: function(){
    // return this.showingclickChange==true?true:false;

    // if(this.$store.state.processlist.length==0)
    // {
// showingclickChange=!this.showingclickChange
// alert('hi')
  }
    },

    computed: {
         isTableSet: function(){

       return this.$store.getters.isTableSet;


      },

            processlist() {

        this.fields1=[
          {key: 'id', label: '#', sortable: true, sortDirection: 'desc'},
          {key: 'name', label: this.get_text('process_name@process_list@c'), sortable: true, sortDirection: 'desc'},
          {key: 'category_name', label: this.get_text('category@process_list@c')},
          {key: 'tenant_name', label: this.get_text('tenant@prcType@c')},
          {key: 'Actions',label: this.get_text('actions@l'),thStyle: { textAlign : this.$i18n.locale=='ar'?'center':""}},


        ];
        if(this.ProcessCategory!=null)
                 {

                    var filterData = this.$store.getters.processlist.filter(data => {

                      var x=data.process_cat!=null?data.process_cat.toString().includes(this.ProcessCategory):"";
                      return x;


                })
                this.totalRows = filterData.length;
                return filterData;
                 } else {
                            var filterData =  this.$store.getters.processlist
                            this.totalRows = filterData.length;
                            // this.totalRows.length>0?this.showinglinkTable=true:this.showinglinkTable=false;
                            return filterData;
            }

      },


      getRowCount() {
                if(this.ProcessCategory!=null)
{
  return this.totalRows
}else{
        this.$store.getters.getRowCount>0?this.showinglinkTable=true:this.showinglinkTable=false
        return this.$store.getters.getRowCount
      }},
      sortOptions() {
        // Create an options list from our fields
        return this.fields1
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      },
    linkedlist() {
        this.fields2=[
          {key: 'sector_name', label: this.get_text('sector@process_list@c')},
          {key: 'subtenant_name', label: this.get_text('org_unit@process_list@c')},
          {key: 'Actions',label: this.get_text('actions@l'),thStyle: { textAlign : this.$i18n.locale=='ar'?'left':""}},


        ];


                            var filterData =  this.$store.state.linkedlist
                            this.totalRows = filterData.length;
                            return filterData;

      },
      getRowCount1() {
        return this.$store.getters.getRowCount1
      },
      sortOptions1() {
        // Create an options list from our fields
        return this.fields2
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      }
    },


    components: {
      'loading': Loading,
      Treeselect
    },
    methods: {
      initiateclick()
      {

        if (!this.$refs.mytable) {
        return;
           }
        this.$nextTick(() => {
                // if(this.showingclickChange==false)

          this.$store.state.initialClick=true
             if(this.showingclickChange==false){
                if(this.$store.state.actualClick==false){
                    this.$store.state.initialClick=true
                    // this.showingclickChange=true
                   }
                  if(this.$store.state.initialClick==true){
                    this.$store.state.actualClick=false
                    // this.showingclickChange==true
                  }
                  }
         if(this.showingclickChange==true){
                   if(this.$store.state.actualClick==true){
                    this.$store.state.initialClick=false
                      this.$store.state.actualClick=false
                      this.showingclickChange=false


                   }
                   if(this.$store.state.initialClick==true){
                    this.$store.state.actualClick=true
                  }
                  }

var x=this.$store.state.actualClick==false?(this.$store.state.initialClick==true && this.$store.state.actualClick==false && this.showingclickChange==false):(this.$store.state.initialClick==true && this.$store.state.actualClick==true && this.showingclickChange==false )

if(x)
{
  //  alert('initiatedclick');

 let myTable = this.$refs.mytable.$el,
            tableBody = myTable.getElementsByTagName('tbody')[0],
            tableRows = tableBody.getElementsByTagName('tr')
            console.log(tableRows[0])
          var tablecol= tableRows[0].getElementsByTagName('td')
          var id=tablecol[0].innerHTML;
        // which.forEach(idx => {
          // alert(this.showingclickChange)
          console.log(tablecol[0].innerHTML);

           this.linkData.id=id;
           this.$store.state.linkingPrcId=this.linkData.id
                this.$store.dispatch('loadLinkedListTable',[this.$store.state.linkingPrcId])
                this.$store.dispatch('loadlinkTenants');


                $(tableRows[0]).css("background-color", "#bee6f2");
                // $(tableRows[0]).css("background-color", "");



         }
         })

      },
      setOldRow(row){
        let myTable = this.$refs.mytable.$el,
            tableBody = myTable.getElementsByTagName('tbody')[0],
            tableRows = tableBody.getElementsByTagName('tr')
         $(tableRows[0]).css("background-color", "");


        this.oldRow=row;
        console.log(this.oldRow)
    //  Vue.set(this.oldRow, "_rowVariant", "");

      },
      clearColor(){

       Vue.set(this.oldRow, "_rowVariant", "");

      },
      expandAdditionalInfo(row) {


              //  this.$nextTick(() => {
                this.showingclickChange=true;
                // this.$nextTick(() => {
              this.$store.state.actualClick=true;
              if(this.$store.state.actualClick==true)//(this.showingclickChange==true)
                  {
                this.linkData.id=row.id;
                this.$store.dispatch('loadLinkedListTable',[this.linkData.id])
                this.$store.dispatch('loadlinkTenants');

                Vue.set(row, "_rowVariant", "info");
      //  alert(this.oldRow)
                if(this.oldRow!="")
                  Vue.set(this.oldRow, "_rowVariant", "");
                   this.setOldRow(row);


}
                // })
this.showingclickChange=true;

},
      setprocessData() {
        this.processData = {
          ProcessName: '',
          Category: ''
        }
      },
      getSector() {
                if (this.sector == null) {
                    this.org_unit = "";
                    this.$store.state.setSubTenant = {};
                     this.$store.dispatch('loadProcessListTable');
                    //  this.initiateclick();


                }
            else{
                this.org_unit = "";
                this.parent = this.sector;
                // this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.sector]);
               // this.$store.dispatch('loadSubTenants', this.sector);
                  this.options='';
                  if (this.sector != null) {
                    this.$store.dispatch('loadSubTenants', tthis.sector);
                    Vue.axios.get('/subtenanttree/' + this.sector)

                      .then(response => {
                        if (response.data.code == 200) {
                          this.options = response.data.subTenants;


                        }
                      });
                  }
                this.$store.dispatch('loadProcessListTableSector', [this.sector]);
                // this.initiateclick();



            }

            },
            getOrg_unit() {
                if (this.org_unit == null) {
                    this.parent = this.sector;
                  this.$store.dispatch('loadProcessListTableSector', [this.sector]);


                }
                else {
                    this.parent = this.org_unit;


                // this.$store.dispatch('loadDashboardValues', [this.mtp_date, this.parent]);
                this.$store.dispatch('loadProcessListTableOrg', [this.parent]);

                }

            },



 getLinkSector() {
                if (this.linkData.linkSector == null) {
                    this.linkData.linkOrg = "";
                    this.$store.state.setSubTenant1 = {};
                     //this.$store.dispatch('loadProcessListTable');

                }
            else{
                this.linkData.linkOrg = "";

                this.$store.dispatch('loadlinkSubTenants', this.linkData.linkSector);
               // this.$store.dispatch('loadProcessListTableSector', [this.linkData.linkSector]);
                     }
            },


 getSelectedProcessCategory() {
                // this.$store.dispatch('loadProcessListTable');
//                                      this.$nextTick(() => {
// this.showinglinkTable=true;                   });


this.processlist;
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
      createProcess() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.resetPasswordBtn = true,
                            this.showingModal = false
                        this.$store.dispatch('createProcess', {
                            data: {
                                //  id:this.processData.id,
                                ProcessName: this.processData.ProcessName,
                                Category: this.processData.Category,
                                Tenant:this.processData.Tenant,
                            }
                        })
                        this.processData = {
                            id:null,
                            ProcessName: null,
                            Category: null,
                            Tenant:null,
                        }
                        this.$validator.reset();
                    }
                });
            },
            selectProcess(ProcessListItem) {
              // console.log(ProcessListItem);
                this.processData = ProcessListItem;
                // alert(this.processData.id);
            },
             selectLink(LinkedListItem) {
              // console.log(ProcessListItem);
                this.linkData = LinkedListItem;
                // alert(this.linkData);
                // console.log(this.linkData);

            },
            editProcess(process, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/processlist1/${process.id}`, process.data)
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
                                this.ProcessInfo = response.data.data
                            } else {
                                this.showingeditModal = true
                                this.processData = response.data.data
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            updateProcess() {
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false
                        this.$store.dispatch('updateProcess', {
                            where: this.processData.id,
                            data: {
                                // id:this.processData.id,
                                ProcessName: this.processData.ProcessName,
                                Category: this.processData.Category,
                                Tenant:this.processData.Tenant,
                            }
                        })
                        this.processData = {
                          //  id:null,
                            ProcessName: null,
                            Category: null,
                            Tenant:null
                        }
                        this.$validator.reset();
                    }
                });
            },

            removeProcess(processData) {
                this.$store.dispatch('removeProcess', processData)
            },

            removeLink(linkData) {
                                //  alert(this.linkData.id)

                this.$store.dispatch('removeLink', [linkData])
                    //  this.$refs.mylinktable.refresh()
                   // this.linkedlist;

            },

            createLink() {
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingModal1 = false
                        this.$store.dispatch('createLink', {
                            where: this.linkData.id,
                            data: {
                                id:this.linkData.id,
                                linkSector: this.linkData.linkSector,
                                linkOrg: this.linkData.linkOrg,
                            }
                        })
                        this.linkData = {
                           id:this.linkData.id,
                            linkSector: null,
                            linkOrg: null,
                        }
                        this.$validator.reset();
                        this.$store.state.setSubTenant1={};
                    }
                });
            },

      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 265px;
  }
  .table-ordinary {
    background-color: white;
}

tr:hover{
     cursor: pointer;
}
</style>
