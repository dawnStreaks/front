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
                            <b class="h4">{{ get_text('title@prcType@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('prctype-create')">
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
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="priorities" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="status" slot-scope="data">
                                    <b-badge :variant="getBadge(data.item.status)">{{ getName(data.item.status) }}
                                    </b-badge>
                                </template>
                                <template slot="Actions" slot-scope="data">
                                    <b-row class="text-center">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prctype-delete')">
                                            <b-button variant="primary" size="sm"
                                                      @click="editPriority(data.item, 'view') "><b><i
                                                    class="icon-eye icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prctype-view')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editPriority(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" v-if="$can('prctype-edit')"><b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectPriority(data.item)"><b><i class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                    </b-row>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')"                                              :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add@prcType@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setPriorityData" hide-footer>
                    <b-form @submit.prevent="createPriority">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCode">{{ get_text('prc_type@prcType@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                            v-validate="'required'"
                                            name="TypeCode" id="TypeCode"
                                            v-model="priorityData.TypeCode"
                                            :class="{ 'is-invalid': submitted && errors.has('TypeCode') }"
                                            :options="[
                                            {
                                              text: get_text('please_select@prcType@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('priority@prcType@l'),
                                              value: 'Priority'
                                            }, {
                                              text: get_text('risk@prcType@l'),
                                              value: 'Risk'
                                            }, {
                                              text: get_text('complexity@prcType@l'),
                                              value: 'Complexity'
                                            }]">
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('TypeCode')" class="invalid-feedback">{{
                                        errors.first('TypeCode') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('type@prcType@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                              style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="Type" id="Type"
                                                  v-model="priorityData.Type" :placeholder="get_text('enter_prc_type_name@prcType@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('Type') }"></b-form-input>
                                    <div v-if="submitted && errors.has('Type')" class="invalid-feedback">{{
                                        errors.first('Type') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@prcType@l')}}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit@prcType@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal"
                         hide-footer>
                    <b-form @submit.prevent="updatePriority">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCode">{{ get_text('prc_type@prcType@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-select
                                            :plain="true"
                                            value="Please select"
                                            name="TypeCode" id="TypeCode" disabled
                                            v-model="priorityData.TypeCode" placeholder="Enter your name"
                                            :class="{ 'is-invalid': updated && errors.has('TypeCode') }"
                                            :options="[
                                            {
                                              text: get_text('please_select@prcType@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('priority@prcType@l'),
                                              value: 'Priority'
                                            }, {
                                              text: get_text('risk@prcType@l'),
                                              value: 'Risk'
                                            }, {
                                              text: get_text('complexity@prcType@l'),
                                              value: 'Complexity'
                                            }]">
                                    </b-form-select>
                                    <div v-if="updated && errors.has('TypeCode')" class="invalid-feedback">{{
                                        errors.first('TypeCode') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('type@prcType@l')}}<i class="fa fa-asterisk danger fa-xs"
                                                               style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="Type" v-validate="'required'" name="Type"
                                                  v-model="priorityData.Type" :placeholder="get_text('enter_prc_type_name@prcType@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('Type') }"></b-form-input>
                                    <div v-if="updated && errors.has('Type')" class="invalid-feedback">{{
                                        errors.first('Type') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('update@prcType@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@prcType@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer="true"
                         ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcType@l') }} <b>{{priorityData.name}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removePriority(priorityData)">{{ get_text('yes@prcType@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@prcType@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal :title="get_text('information@prcType@l')" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.priorityInfo">
                        <b-row v-for="(item, index) in this.priorityInfo" :key="index">
                            <b-col sm="6">{{ get_text(index+'@PRCType'+'@c') }}</b-col>
                            <b-col sm="6">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/priority/store/store'
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
        created() {
            //this.$store.dispatch('translation');
            this.$store.dispatch('loadPriorities');
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
                showingeditModal: false,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                submitted: false,
                updated: false,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation:[]
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
        computed: {
            priorities() {
                this.fields=[
                    {key: 'IdPRCType', label: '#', sortable: true, sortDirection: 'desc'},
                    {key: 'TypeCode', label: this.get_text('type_code@prcType@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'Type', label: this.get_text('type@prcType@c')},
                    {key: 'Actions',label: this.get_text('actions@l')},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'View', thClass: 'text-center', tdClass: 'text-center'}
                ];
                return this.$store.getters.priorities;
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
            showingeditModal: function () {
                if (this.showingeditModal == false) {
                    this.$store.dispatch('loadPriorities')
                    this.priorityData = {}
                }
            }
        },
        components: {
            'loading': Loading
        },
        methods: {
            setPriorityData() {
                this.priorityData = {
                    TypeCode: '',
                    Type: ''
                }
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
                                Type: this.priorityData.Type,
                            }
                        })
                        this.priorityData = {
                            TypeCode: null,
                            Type: null,
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
                Vue.axios.get(`/PRCTypes/${priority.IdPRCType}`, priority.PRCTypes)
                    .then((response) => {
                        if (response.data.code == 401) {
                            Vue.prototype.$notify.error({
                                title: this.get_text('Error@m'),
                                message: this.get_text(response.data.msg+'@m'),
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
                            where: this.priorityData.IdPRCType,
                            data: {
                                TypeCode: this.priorityData.TypeCode,
                                Type: this.priorityData.Type,
                            }
                        })
                        this.priorityData = {
                            TypeCode: null,
                            Type: null,
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
</style>
<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
