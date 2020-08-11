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
                          <b class="h4">  {{ this.get_text('title@ProcessList@l') }}</b>
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
                                            <b-form-input v-model="filter" :placeholder="get_text('type to search@l')"/>
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
                                                <option slot="first" :value="null">{{ get_text('none@l') }}</option>
                                            </b-form-select>
                                            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                                <option :value="false">{{ get_text('asc@l') }}</option>
                                                <option :value="true">{{  get_text('desc@l') }}</option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('per page@l')" class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="process" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage"
                                     :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="id" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.index + 1 }}
                                    </b-col>
                                </template>
                                <template slot="Process" slot-scope="data" v-if="$can('process-view')">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="primary" size="md" class="btn-pill"
                                                  @click="editGroupTenant(data.item.id) "><i
                                                class="icon-eye icons font-1xl"></i> {{ get_text('process details@l') }}
                                        </b-button>
                                    </b-col>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage"
                                              v-model="currentPage" :prev-text="get_text('prev@l')"  :next-text="get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('information@ProcessList@l')" size="md" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="">
                        {{ this.get_text('view process information@l') }}
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/process/store/store'

    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import {Notification} from 'element-ui'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import SelectTree from '@/components/tree/SelectTree';

    Vue.use(Loading);
    Vue.use(Element);

    export default {
        name: 'tables',
        store: store,
        props: {
            caption: {
                type: String,
                default: 'Users'
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
            }
        },
        /*mounted() {
            this.fields= [
                {key: 'id', label: '#', thClass: 'text-center' , tdClass: 'text-center'},
                {key: 'name', label: this.get_text('Process Name'), sortable: true, },
                {key: 'resource', label: this.get_text('Process Resource')},
                {key: 'Process', label: this.get_text('Process'),thClass: 'text-center' , tdClass: 'text-center'},
            ]

        },*/
        created() {
            this.$store.dispatch('loadProcess');
            //this.$store.dispatch('translation');
        },
        data: () => {
            return {
                fields: [
                    /*{key: 'id', label: '#', thClass: 'text-center' , tdClass: 'text-center'},
                    {key: 'name', label: 'Process Name', sortable: true, },
                    {key: 'resource', label: 'Process Resource'},
                    {key: 'Process', thClass: 'text-center' , tdClass: 'text-center'},*/
                ],
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                showingeditModal: false,
                showingModal: false,
                showingdeleteModal: false,
                showingViewModal: false,
                submitted: false,
                updated: false,
                groupInfo: null,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        components: {
            'loading': Loading,
            'child': SelectTree,
        },
        computed: {
            process() {
                this.fields= [
                    {key: 'id', label: '#', thClass: 'text-center' , tdClass: 'text-center'},
                    {key: 'name', label: this.get_text('process name@l'), sortable: true, },
                    {key: 'resource', label: this.get_text('process resource@l')},
                    {key: 'Process', label: this.get_text('process@l'),thClass: 'text-center' , tdClass: 'text-center'},
                ];
                return this.$store.getters.process
            },
            // getRowCount() {
            //   return this.$store.getters.getRowCount
            // },
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
                    this.$store.dispatch('loadGroups')
                    this.groupData = {}
                }
            }
        },
        methods: {
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
            selectUser(groupTenant) {
                console.log(groupTenant);
                this.groupData = groupTenant;
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            processTaskLink (id) {
                this.$store.state.processInstance = [];
                return `process-defination/${id.toString()}`
            },
            editGroupTenant(processId) {
                const processTaskLink = this.processTaskLink(processId);
                this.$router.push({path: processTaskLink})
            }
        },
    }
</script>

<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
