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
                            <b class="h4">{{ get_text('title@prcRange@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('prcrange-create')">
                                <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add@prcRange@l') }} </b></b-button>
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                {{ get_text('loading@prcRange@l') }}
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('filter@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('sort@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="sortBy" :options="sortOptions">
                                                <option slot="first" :value="null">{{ get_text('none@l') }} </option>
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
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prcrange-view')">
                                            <b-button variant="primary" size="sm"
                                                      @click="editPriority(data.item, 'view') "><b><i
                                                    class="icon-eye icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" v-if="$can('prcrange-edit')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editPriority(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prcrange-delete')">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectPriority(data.item)"><b><i
                                                    class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>
                                    </b-row>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                                              v-model="currentPage" :prev-text="get_text('prev@l')" :next-text="get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add@prcRange@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setPriorityRange" hide-footer>
                    <b-form @submit.prevent="createPriority">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('type@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                 style="font-size:10px;color:red;"></i></label>
                                    <b-form-select id="PRCType"
                                                   v-validate="'required'"
                                                   :plain="true"
                                                   name="PRCType"
                                                   v-model="priorityData.PRCType"
                                                   :class="{ 'is-invalid': submitted && errors.has('PRCType') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@prcRange@l') }} </option>
                                        </template>
                                        <optgroup v-for="(group, name) in this.$store.state.priorityTypeName" :label="name">
                                            <option v-for="option in group" :value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </optgroup>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('PRCType')" class="invalid-feedback">{{
                                        errors.first('PRCType') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCodeMin">{{ get_text('min_value@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="TypeCodeMin" v-validate="'required'" name="TypeCodeMin"
                                                  v-model="priorityData.TypeCodeMin" :placeholder="get_text('enter_your_min_value@prcRange@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('TypeCodeMin') }"></b-form-input>
                                    <div v-if="submitted && errors.has('TypeCodeMin')" class="invalid-feedback">{{
                                        errors.first('TypeCodeMin') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCodeMax">{{ get_text('max_value@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="TypeCodeMax" v-validate="'required'" name="TypeCodeMax"
                                                  v-model="priorityData.TypeCodeMax" :placeholder="get_text('enter_your_max_value@prcRange@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('TypeCodeMax') }"></b-form-input>
                                    <div v-if="submitted && errors.has('TypeCodeMax')" class="invalid-feedback">{{
                                        errors.first('TypeCodeMax') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@prcRange@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit@prcRange@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal"
                         hide-footer>
                    <b-form @submit.prevent="updatePriority">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('type@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                 style="font-size:10px;color:red;"></i></label>
                                    <b-form-select  v-validate="'required'"
                                                    name="PRCType"
                                                    :plain="true" v-model="priorityData.PRCType"
                                                    :class="{ 'is-invalid': updated && errors.has('PRCType') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@prcRange@l') }} </option>
                                        </template>
                                        <optgroup v-for="(group, name) in this.$store.state.priorityTypeName" :label="name">
                                            <option v-for="option in group" :value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </optgroup>
                                    </b-form-select>
                                    <div v-if="updated && errors.has('PRCType')" class="invalid-feedback">{{
                                        errors.first('PRCType') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCodeMin">{{ get_text('min_value@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="TypeCodeMin" v-validate="'required'" name="TypeCodeMin"
                                                  v-model="priorityData.TypeCodeMin" :placeholder="get_text('enter_your_min_value@prcRange@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('TypeCodeMin') }"></b-form-input>
                                    <div v-if="updated && errors.has('TypeCodeMin')" class="invalid-feedback">{{
                                        errors.first('TypeCodeMin') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="TypeCodeMax">{{ get_text('max_value@prcRange@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="TypeCodeMax" v-validate="'required'" name="TypeCodeMax"
                                                  v-model="priorityData.TypeCodeMax" :placeholder="get_text('enter_your_max_value@prcRange@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('TypeCodeMax') }"></b-form-input>
                                    <div v-if="updated && errors.has('TypeCodeMax')" class="invalid-feedback">{{
                                        errors.first('TypeCodeMax') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('update@prcRange@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@prcRange@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer="true"
                         ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@prcRange@l') }} <b>{{priorityData.Type}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removePriority(priorityData)">{{ get_text('yes@prcRange@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@prcRange@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal :title="get_text('information@prcRange@l')" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.priorityInfo">
                        <b-row v-for="(item, index) in this.priorityInfo" :key="index">
                            <b-col sm="6">{{ get_text(index+'@PRCType'+'@c') }}</b-col>
                            <b-col sm="6">{{ item  }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/priority/store/rangeStore'
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
            this.$store.dispatch('loadPriorities');
            this.$store.dispatch('loadPriorityType');
            //this.$store.dispatch('translation');
        },
        data: () => {
            return {
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
        mounted() {
            this.fields=[
                {key: 'idTaskPriorityType', label: '#', sortable: true, sortDirection: 'desc'},
                {key: 'Type', label: this.get_text('type@TaskPriorityType@c')},
                {key: 'TypeCodeMin', label: this.get_text('type_code_min@TaskPriorityType@c'), sortable: true, sortDirection: 'desc'},
                {key: 'TypeCodeMax', label: this.get_text('type_code_max@TaskPriorityType@c'), sortable: true, sortDirection: 'desc'},
                {key: 'Actions',label: this.get_text('actions@l')},
                //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'},
                //{key: 'View', thClass: 'text-center', tdClass: 'text-center'}
            ]

        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        computed: {
            priorities() {
                this.fields=[
                    {key: 'idTaskPriorityType', label: '#', sortable: true, sortDirection: 'desc'},
                    {key: 'Type', label: this.get_text('type@TaskPriorityType@c')},
                    {key: 'TypeCodeMin', label: this.get_text('type_code_min@TaskPriorityType@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'TypeCodeMax', label: this.get_text('type_code_max@TaskPriorityType@c'), sortable: true, sortDirection: 'desc'},
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
</style>
<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
