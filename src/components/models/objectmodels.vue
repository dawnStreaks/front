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
                            <b class="h4">{{ this.get_text('title@ObjectModel@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true"  v-if="$can('models-create')">
                                <b><i class="icon-plus icons font-1xl"></i> {{ this.get_text('add@ObjectModel@l') }}</b></b-button>
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                {{ this.get_text('loading@l') }}
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('filter@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{ this.get_text('clear@l') }}</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('sort@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="sortBy" :options="sortOptions">
                                                <option slot="first" :value="null">{{ this.get_text('none@l') }}</option>
                                            </b-form-select>
                                            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                                <option :value="false">{{ this.get_text('asc@l') }}
                                                </option>
                                                <option :value="true">{{ this.get_text('desc@l') }}</option>
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
                                     :fixed="fixed" responsive="sm" :items="object" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="Edit" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="warning" size="md" class="btn-pill"
                                                  @click="editPriority(data.item, 'edit')"><b><i
                                                class="icon-pencil icons font-1xl"></i> {{ this.get_text('edit@l') }}</b></b-button>
                                    </b-col>
                                </template>
                                <template slot="Delete" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="danger" size="md" class="btn-pill"
                                                  @click="showingdeleteModal = true;  selectPriority(data.item)"><b><i
                                                class="icon-trash icons font-1xl"></i> {{ this.get_text('delete@l') }}</b></b-button>
                                    </b-col>
                                </template>
                                <template slot="View" slot-scope="data"  v-if="$can('models-view')">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="primary" size="md" class="btn-pill"
                                                  @click="editPriority(data.item, 'view') "><b><i
                                                class="icon-eye icons font-1xl"></i> {{ get_text('view@l') }}</b></b-button>
                                    </b-col>
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
                <b-modal :title="get_text('add@ObjectModel@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setObjectData" hide-footer>
                    <b-form @submit.prevent="createPriority">
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label for="name">{{ get_text('name@ObjectModel@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                    style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="objectData.name" :placeholder="get_text('enter_object_name@ObjectModel@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('name') }"></b-form-input>
                                    <div v-if="submitted && errors.has('Type')" class="invalid-feedback">{{
                                        errors.first('Type') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ this.get_text('save@ObjectModel@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('information@ObjectModel@l')" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.objectInfo">
                        <b-row v-for="(item, index) in this.objectInfo" :key="index">
                            <b-col sm="6">{{ get_text(index+'@object_model@c') }}</b-col>
                            <b-col sm="6">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/models/store'
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
        /*mounted(){
            this.fields= [
                {key: 'id', label: '#'},
                {key: 'name', label: this.get_text('Object Name'), sortable: true, sortDirection: 'desc'},
                {key: 'View', label: this.get_text('View'),thClass: 'text-center', tdClass: 'text-center'}
            ]
        },*/
        created() {
            this.$store.dispatch('loadObjects');
            //this.$store.dispatch('translation');
        },
        data: () => {
            return {
                selected: null,
                fields: [
                    /*{key: 'id', label: '#'},
                    {key: 'name', label: 'Object Name', sortable: true, sortDirection: 'desc'},
                    {key: 'View', thClass: 'text-center', tdClass: 'text-center'}*/
                ],
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                objectData: {
                    name: null,
                },
                objectInfo: null,
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
        computed: {
            object() {
                this.fields= [
                    {key: 'id', label: '#'},
                    {key: 'name', label: this.get_text('name@object_model@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'View', label: this.get_text('view@l'),thClass: 'text-center', tdClass: 'text-center'}
                ]
                return this.$store.getters.object;
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
        watch: {},
        components: {
            'loading': Loading
        },
        methods: {
            setObjectData() {
                this.objectData = {}
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
                                name: this.objectData.name,
                            }
                        })
                        this.objectData = {
                            name: null,
                        }
                        this.$validator.reset();
                    }
                });
            },
            selectPriority(priority) {
                this.objectData = priority;
            },
            editPriority(priority, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/object_models/${priority.id}`, priority.id)
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
                                this.objectInfo = response.data.objectModel
                            } else {
                                //this.showingeditModal = true
                                this.objectData = response.data.objectModel
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
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
