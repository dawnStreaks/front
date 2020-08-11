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
                            Process List Of <b v-if="processTasks[0]" style="color: #99012d"> {{ processTasks[0].processDefinitionName
                            }}</b>&nbsp;
                            <b-button variant="primary" @click="goBack"><i class="icon-arrow-left icons font-1xl"></i>
                                Back
                            </b-button>
                        </div>
                        <div id="diagramCanvas"></div>
                    </b-card>
                </transition>
            </b-col>
            <b-col cols="12" xl="12">
                <transition name="slide">
                    <b-card>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                Loading...
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal label="Filter" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter" placeholder="Type to Search"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal label="Sort" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="sortBy" :options="sortOptions">
                                                <option slot="first" :value="null">-- none --</option>
                                            </b-form-select>
                                            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                                <option :value="false">Asc</option>
                                                <option :value="true">Desc</option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal label="Per page" class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="processTasks" :fields="fields"
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
                                <template slot="Process" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button @click="editGroupTenant(data.item.id)" variant="primary" size="md" class="btn-pill"><i
                                                class="icon-eye icons font-1xl"></i> Assignement Details
                                        </b-button>
                                    </b-col>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage"
                                              v-model="currentPage" prev-text="Prev" next-text="Next"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
            </b-col>
        </b-row>
    </div>
</template>
<style>

    .djs-container .highlighted .djs-outline {
        stroke-width: 2px !important;
        stroke: transparent !important;
        background: #a9def9 !important;
    }
    .djs-container .highlighted .djs-visual>:nth-child(1) {
        fill: #a9def9 !important;
    }
</style>
<script>
    import {store} from '@/components/process/store/store'

    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import moment from 'moment'

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
        async created() {
            //this.$store.dispatch('loadProcessTasks', this.$route.params.id);
            this.$store.dispatch('loadDefinationStatistic', this.$route.params.id);
            this.$store.state.activeInstance = 0;
            //this.$store.dispatch('loadProcessDefinitionCount', this.$route.params.id);
            const getProfile = await Vue.axios.get(`process-definition/${this.$route.params.id}/statistics`, {
                responseType: 'json'
                    //`process-definition/${processId}/statistics`,
            });
            this.setProfile(getProfile);
            this.$store.dispatch('loadHistoryProcessDefination', this.$route.params.id);
        },
        mounted() {
            //this.$store.dispatch('processDefinitionXML', this.$route.params.id);
        },
        data: () => {
            return {
                fields: [
                    {
                        key: 'id',
                        label: '#',
                        thClass: 'text-center',
                        tdClass: 'text-center'
                    },
                    //{key: 'name', label: 'Name', sortable: true, 'class': 'text-center'},
                    {
                        key: 'startUserId',
                        label: 'Responsible',
                        sortable: true,
                    },
                    {
                        key: 'startTime',
                        label: 'Start Time',
                        sortable: true,
                        formatter: (value, key, item) => {
                            return moment(String(value)).format('DD-MM-Y hh:mm:ss A')
                        }
                    },
                    {
                        key: 'Process',
                        thClass: 'text-center'
                    },
                ],
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                attributes: null
            }
        },
        components: {
            'loading': Loading,
        },
        computed: {
            processTasks() {
                return this.$store.getters.processTasks
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
        methods: {
            goBack() {
                this.$router.go(-1)
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
                return `/process-instance/${id.toString()}`
            },
            editGroupTenant(processId) {
                const processTaskLink = this.processTaskLink(processId);
                this.$router.push(processTaskLink)
            },
            setProfile(response) {
                this.attributes = response.data.process;
                //alert('ssss');
                if(this.attributes) {
                    this.$store.state.taskId = this.attributes.map(function (item) {
                        return {
                            taskId: item.id,
                            instance: item.instances,
                            //value: item.id
                        }
                    });
                    //this.$store.dispatch('processDefinitionXML', this.attributes);
                }
                this.$store.dispatch('processDefinitionXML', this.$route.params.id);
                //console.log(this.attributes);
            },
        },
    }
</script>

<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
