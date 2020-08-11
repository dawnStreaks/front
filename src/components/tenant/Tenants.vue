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
                          <b class="h4">{{ get_text('title@subtenant@l') }}</b>

                          <b-button variant="success" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('subtenant-create')"><i class="icon-plus icons font-1xl"></i> {{ this.get_text('add@subtenant@l') }} </b-button>
                          <b-button variant="success" style="margin-right:20px;" size="md" class="btn float-right" @click="orgchart()" v-if="$can('subtenant-create')"><i class="icon-plus icons font-1xl"></i> {{ get_text('organization_chart@subtenant@l') }}</b-button>
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                {{ get_text('loading@subtenant@l') }}
                            </div>
                        </div>
                        <div class="custom-tree-container" v-if="$auth.ready() && this.$store.state.loading">
                            <div class="block">
                                <el-input :placeholder="get_text('filter@l')" v-model="filterText"></el-input>
                                <hr>
                                <el-tree :data="tanents" :props="defaultProps" show-checkbox="" node-key="id"  default-expand-all :filter-node-method="filterNode" :expand-on-click-node="false" :render-content="renderContent" ref="tree2" empty-text="Not Found" >
                                </el-tree>
                                <!-- default-expand-all -->
                            </div>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add@subtenant@l')" size="lg"  class="modal-primary" v-model="showingModal"  @close="tanentData = null" hide-footer>
                    <b-form @submit.prevent="createTanent">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="name">
                                        {{ get_text('name@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-input type="text" v-validate="'required'"  name="name" id="name" v-model="tanentData.name" :placeholder="get_text('enter_your_name@subtenant@l')" :class="{ 'is-invalid': submitted && errors.has('name') }"></b-form-input>
                                    <div v-if="submitted && errors.has('name')" class="invalid-feedback">
                                        {{ errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">
                                        {{ get_text('parent@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-select v-model="tanentData.id" :options="this.$store.state.parents"
                        :disabled="(this.parentDis) ? true : false">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@subtenant@l') }}</option>
                                        </template>
                                        <child :tree="this.$store.getters.tanents"></child>
                                    </b-form-select>
                                    <!-- <div v-if="submitted && errors.has('id')" class="invalid-feedback">{{ errors.first('id') }}</div> -->
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="description">
                                        {{ get_text('description@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-textarea rows="2" v-validate="'required'"  name="description"  id="description" v-model="tanentData.description" :class="{ 'is-invalid': submitted && errors.has('description') }" :placeholder="get_text('enter_description@subtenant@l')"></b-form-textarea>
                                    <div v-if="submitted && errors.has('description')" class="invalid-feedback">
                                        {{ errors.first('description') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@subtenant@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit@subtenant@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal" hide-footer >
                    <b-form @submit.prevent="updateTanent">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="name">
                                        {{ get_text('name@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-input type="text" v-validate="'required'"  name="name" id="name" v-model="tanentData.name" :placeholder="get_text('enter_your_name@subtenant@l')" :class="{ 'is-invalid': updated && errors.has('name') }"></b-form-input>
                                    <div v-if="updated && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">
                                        {{ get_text('parent@@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-select v-model="tanentData.parent_id">
                                        <template slot="first">
                                            <option :value="null">{{ get_text('please_select@subtenant@l') }}</option>
                                        </template>
                                        <child :tree="this.$store.getters.tanents"></child>
                                    </b-form-select>
                                    <!--
                                      v-validate="'required'"  name="id" :class="{ 'is-invalid': updated && errors.has('id') }"
                                       <div v-if="updated && errors.has('id')" class="invalid-feedback">{{ errors.first('id') }}</div> -->
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="description">
                                        {{ get_text('description@subtenant@l') }}
                                        <i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i>
                                    </label>
                                    <b-form-textarea rows="2" v-validate="'required'"  name="description"  id="description" v-model="tanentData.description" :class="{ 'is-invalid': updated && errors.has('description') }" :placeholder="get_text('enter_description@subtenant@l')"></b-form-textarea>
                                    <div v-if="updated && errors.has('description')" class="invalid-feedback">
                                        {{ errors.first('description') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('update@subtenant@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@subtenant@l')" size="lg"  class="modal-danger" v-model="showingdeleteModal" hide-footer="true" ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ this.get_text('are_you_sure_to_delete@subtenant@l') }} <b>{{tanentData.name}}</b>?</h3>
                        <b-col md="12" class="text-center">
                            <button class="btn btn-outline-danger left" @click="showingdeleteModal = false; removeTanent(tanentData)">{{ this.get_text('yes@subtenant@l') }}</button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ this.get_text('no@subtenant@l') }}</button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal :title="get_text('information@subtenant@l')" size="md"  class="modal-info" v-model="showingViewModal" ok-variant="info">
                    <div class="modalcontent" v-if="this.tenantInfo">
                        <b-row v-for="(item, index) in this.tenantInfo" :key="index">
                            <b-col sm="6">{{ get_text(index) }}</b-col>
                            <b-col sm="6">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { store } from '@/components/tenant/store/store'
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import { Notification } from 'element-ui'
import VeeValidate from 'vee-validate';
import SelectTree from '@/components/tree/SelectTree';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);
Vue.use(Element);

import rtlcsss from 'rtlcss';
rtlcsss.process("body { direction:ltr; }");

const dict = {
    custom: {
        name: {
            required: 'The Sub Tenant Name field is required'

        },
        // id: {
        //   required: () => 'The Sub Tenant field is required.'
        // },
        description: {
            required: () => 'The Description field is required'
        },
    }
};
VeeValidate.Validator.localize('en', dict);
let id = 1000;
export default {
    name: 'tables',
    store:store,
    created () {
        this.$store.dispatch('loadTanent')
        this.$store.dispatch('translation')
    },
    components: {
        'child': SelectTree,
        'loading': Loading
    },
    data: () => {
        return {
          filterText: '',
          button: '',
          tanentData: {
              name: null,
              description: null,
              id: null,
              parent_id: null,
          },
          tenantInfo: null,
          parentDis: false,
          showingeditModal: false,
          showingModal:false,
          showingdeleteModal: false,
          showingViewModal: false,
          submitted: false,
          updated: false,
          getValues: null,
          defaultProps: {
            children: 'tree',
            name: 'name'
          },
          vvvvv: '',
          tenantdataarray:[],
          tanentDataparam:'',
            translation:[]
        }
    },
    beforeMount() {
        if (localStorage.getItem('translation')) {
            this.translation = JSON.parse(localStorage.getItem('translation'));
        }
    },
    computed: {
        tanents () {
            return JSON.parse(JSON.stringify(this.$store.getters.tanents))
        },
        getRowCount() {
            return this.$store.getters.getRowCount
        },
    },
    watch: {
        showingeditModal: function(){
            if(this.showingeditModal == false){
                this.$store.dispatch('loadTanent')
                this.tanentData= {
                    name: null,
                    description: null,
                    id: null,
                    parent_id: null,
                }
            }
        },
        showingModal:function() {
            if(this.showingModal == false){
                this.tanentData = {
                    name: null,
                    description: null,
                    id: null,
                    parent_id: null,
                },
                this.parentDis = false
            }
        },
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    methods: {
        $can(permissionName) {
            // alert(this.$auth.user().allPermissions);
            return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
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
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        append(tenent, value = null) {
            if(value == 'add') {
                this.parentDis = true;
            }
            this.showingModal= true;
            this.tanentData = {
                name: null,
                description: null,
                id: tenent.id,
                parent_id: null,
            }
        },
      orgchart() {

          var current = this.$refs.tree2.getCheckedKeys();
          var current1 = this.$refs.tree2.getHalfCheckedKeys();

          const vals = ([...current, ...current1]);
          this.tanentDataparam=vals;

          if(this.tanentDataparam==""){
              Vue.prototype.$notify.error({
                  title: this.get_text('error@m'),
                  message: this.get_text('please select tenant@m'),
                  type: 'Error',
                  position: 'top-right'
              })
              return false;
          }
       //console.log(this.tanentData);
        //window.location.href = 'Orgchart';
          this.$store.state.isLoading = true;
        Vue.axios.get(`/tenantdataorg/${this.tanentDataparam}`)
           .then((response) => {
           this.tenantdataarray = response.data.subTenants;
             this.$router.push({name: 'orgchart', params: { test: this.tenantdataarray} })

           })
           .catch((error) => {
               Vue.prototype.$notify.error({
                   title: 'Error',
                   message: 'Oops Something went wrong',
                   type: 'Error',
                   position: 'top-right'
               })
           })
          this.$store.state.isLoading = false;
        // this.$router.push({name: 'Orgchart', params: { test: "fdfdfdf"} })
        // this.$router.push({path: 'Orgchart', params: { test: this.tenantdataarray}})
    },
        editTenant(tenent, value=null) {

            this.$store.state.isLoading=true;
            Vue.axios.get(`/tenant/${tenent.id}`, tenent.data)
            .then((response) => {
                if(response.data.code == 401) {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                } else {
                    if(value == 'view') {
                        this.showingViewModal = true;
                        this.tenantInfo = response.data.data
                    } else {
                        this.showingeditModal= true
                        this.tanentData = response.data.data
                    }
                    this.$store.state.isLoading=false;
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        renderContent(h, { node, data, store }) {
            return (<span class="custom-tree-node">
                <span>{node.data.name}</span>
                <span>
            { this.$can('subtenant-view') ?
                    <el-button size="mini" type="warning" icon="el-icon-view" circle on-click={ () => this.editTenant(data, 'view') }></el-button> : null }
            { this.$can('subtenant-create') ?
                    <el-button size="mini" type="success" icon="el-icon-plus" circle on-click={ () => this.append(data, "add") }></el-button> : null }
                { this.$can('subtenant-edit') ?
                    <el-button size="mini" type="primary" icon="el-icon-edit" circle on-click={ () => this.editTenant(data, 'edit') }></el-button> : null }
                    { this.$can('subtenant-delete') ?
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle on-click={ () => this.remove(node, data) }></el-button> : null }
                </span>
            </span>);
        },
        selectTanent(user){
            console.log(user);
			this.tanentData = user;
        },
        remove (node, data) {
            this.showingdeleteModal = true
            this.selectTanent(data)
        },
        removeTanent (user) {
            this.$store.dispatch('removeTanent', user)
        },
        updateTanent () {
            this.updated = true;
            this.submitted = false;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.showingeditModal = false
                    this.$store.dispatch('updateTanent', {
                        where: this.tanentData.id,
                        data: {
                          name: this.tanentData.name,
                          description: this.tanentData.description,
                          parent_id: this.tanentData.parent_id
                        }
                    })
                    this.tanentData = {}
                    this.$validator.reset();
                }
            });
        },
        createTanent() {
            this.submitted = true;
            this.updated = false;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.resetPasswordBtn= true,
                    this.showingModal = false,
                    this.$store.dispatch('createTanent', {
                        data: {
                          parent_id: this.tanentData.id,
                          name: this.tanentData.name,
                          description: this.tanentData.description ,
                        }
                    });
                    this.tanentData = {}
                    this.$validator.reset();
                }
            });
        }
    },
}
</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content {
    padding: 2% 0% 2% 0%;
    border: 1px solid seashell
  }
  span.el-tree-node__expand-icon.el-icon-caret-right.expanded, span.el-tree-node__expand-icon.el-icon-caret-right {
    color: black;
}
span.el-tree-node__expand-icon.el-icon-caret-right.is-leaf {
  color: transparent;
}
.el-tree-node:focus>.el-tree-node__content {
    background-color: #d1cacc;
}
</style>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
