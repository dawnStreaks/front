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
                            <!--Process List Of <b v-if="processTasks[0]" style="color: #99012d"> {{ processTasks[0].processDefinitionName
                            }}</b>&nbsp;-->
                            <b-button variant="primary" @click="goBack"><i class="icon-arrow-left icons font-1xl"></i>
                                {{ get_text('back@processInstance@l') }}
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
                                {{ get_text('loading@l') }}
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
                                    <b-form-group horizontal :label="get_text('per page@l')" class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="processInstance" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage"
                                     :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="ids" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.index + 1 }}
                                    </b-col>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage"
                                              v-model="currentPage" :prev-text="get_text('prev@l')" :next-text="get_text('next@l')"
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
            this.$store.state.isLoading = true;
            //this.$store.dispatch('translation');
            this.$store.dispatch('loadProcessInstanceUserTask', this.$route.params.id);
            const getProfile = await Vue.axios.get(`singleprocessinstance/${this.$route.params.id}`, {
                responseType: 'json'
            });
            const setTask = await Vue.axios.get(`process-instance/${this.$route.params.id}/activity-instance`, {
                responseType: 'json'
            });

            this.setProfile(getProfile);
            this.setTask(setTask);
        },
        mounted() {
            this.$store.state.activeInstance = 0;
        },
        data: () => {
            return {
                fields: {},
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                attributes: null,
                translation:[]
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        components: {
            'loading': Loading,
        },
        computed: {
            processInstance() {
                this.fields = [
                    {
                        key: 'ids',
                        label: '#',
                        thClass: 'text-center',
                        tdClass: 'text-center'
                    },
                    //{key: 'name', label: 'Name', sortable: true, 'class': 'text-center'},
                    {
                        key: 'name',
                        label: 'Activity',
                        sortable: true,
                    },
                    {
                        key: 'assignee',
                        label: 'Assignee',
                        sortable: true,
                    },
                    {
                        key: 'owner',
                        label: 'Owner',
                        sortable: true,
                    },
                    {
                        key: 'created',
                        label: 'Creation Date',
                        sortable: true,
                    },
                    {
                        key: 'due',
                        label: 'Due Date',
                        sortable: true,
                    },
                    {
                        key: 'followUp',
                        label: 'Follow Up Date',
                        sortable: true,
                    },
                    {
                        key: 'priorityvalue',
                        label: 'Priority',
                        sortable: true,
                    },
                    {
                        key: 'delegationState',
                        label: 'Delefation State',
                        sortable: true,
                    },
                    {
                        key: 'InstanceIdformat',
                        label: 'Task ID',
                        sortable: true,
                    },
                ];
                return this.$store.getters.processInstance
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
            setProfile(response) {
                this.attributes = response.data.process.definitionId;
                if(this.attributes) {
                    this.$store.dispatch('processDefinitionXML', this.attributes);
                }
                //console.log(this.attributes);
            },
            setTask(response) {
                this.attributes = response.data.process.childActivityInstances;
                if(this.attributes) {
                    this.$store.state.taskId = this.attributes.map(function (item) {
                        return {
                            taskId: item.activityId,
                            instance: 1,
                            //value: item.id
                        }
                    });
                    //this.$store.dispatch('processDefinitionXML', this.attributes);
                }
                //console.log(this.attributes);
            },
            // processTaskLink (id) {
            //     return `/process-instance/${id.toString()}`
            // },
           /* editGroupTenant(processId) {
                //const processTaskLink = this.processTaskLink(processId);
                //this.$router.push({path: processTaskLink})
                //return `process-instance/${processId}`
                this.$store.state.isLoading = true;
                Vue.axios.get(`/processinstance/${processId}`)
                    .then((response) => {

                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }*/
        },
    }
</script>

<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }

    html, body, #canvas {
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .diagram-note {
        background-color: rgba(66, 180, 21, 0.7);
        color: White;
        border-radius: 5px;
        font-family: Arial;
        font-size: 12px;
        padding: 5px;
        min-height: 16px;
        width: 50px;
        text-align: center;
    }

    .needs-discussion:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: rgba(66, 180, 21, 0.7) !important; /* color elements as red */
    }

    .djs-overlay.djs-overlay-note {
        left: 0 !important;
    }

    .activity-bottom-left-position.instances-overlay {
        position: absolute !important;
        left: -0.7em !important;
        bottom: -0.25em !important;
    }

    .instance-count {
        cursor: pointer;
    }
</style>
