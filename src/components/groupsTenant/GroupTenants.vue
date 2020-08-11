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
                          <b class="h4">{{ this.get_text('title@groups@l') }}</b>
                            <b-button variant="success" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('group-create')"><i
                                    class="icon-plus icons font-1xl"></i> {{ this.get_text('add@groups@l') }}
                            </b-button>
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
                                                <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}</b-btn>
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
                                                <option :value="false">{{ this.get_text('asc@l') }}</option>
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
                                     :fixed="fixed" responsive="sm" :items="groups" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage"
                                     :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-description.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="id" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.index + 1 }}
                                    </b-col>
                                </template>
                                <template slot="Actions" slot-scope="data">
                                    <b-row class="text-center">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('group-view')">
                                            <b-button variant="primary" size="sm"
                                                      @click="editGroupTenant(data.item, 'view') "><i
                                                    class="icon-eye icons font-1xl"></i>
                                            </b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" v-if="$can('group-edit')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editGroupTenant(data.item, 'edit')"><i
                                                    class="icon-pencil icons font-1xl"></i>
                                            </b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('group-delete')">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectUser(data.item)"><i
                                                    class="icon-trash icons font-1xl"></i>
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')"                                              :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add@groups@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setGroupData" hide-footer>
                    <b-form @submit.prevent="createGroup">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="name">{{ this.get_text('name@groups@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="groupData.name" :placeholder="get_text('enter_your_name@groups@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('name') }"></b-form-input>
                                    <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="description">{{ this.get_text('description@groups@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-textarea v-validate="'required'" rows="2" name="description" id="description"
                                                     v-model="groupData.description"
                                                     :class="{ 'is-invalid': submitted && errors.has('description') }"
                                                     :placeholder="get_text('enter_description@groups@l')"></b-form-textarea>
                                    <div v-if="submitted && errors.has('description')" class="invalid-feedback">{{
                                        errors.first('description') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ this.get_text('save@groups@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit@groups@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showingeditModal" hide-footer>
                    <b-form @submit.prevent="updateGroup">
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="name">{{ this.get_text('name@groups@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="groupData.name" :placeholder="get_text('enter_your_name@groups@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('name') }"></b-form-input>
                                    <div v-if="updated && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="description">{{ this.get_text('description@groups@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-textarea v-validate="'required'" rows="2" name="description" id="description"
                                                     v-model="groupData.description"
                                                     :class="{ 'is-invalid': updated && errors.has('description@l') }"
                                                     :placeholder="get_text('enter_description@groups@l')"></b-form-textarea>
                                    <div v-if="updated && errors.has('description')" class="invalid-feedback">{{
                                        errors.first('description') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ this.get_text('update@groups@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@groups@l')" size="lg" class="modal-danger" v-model="showingdeleteModal"
                         ok-variant="danger" hide-footer="true">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ this.get_text('are_you_sure_to_delete@groups@l') }} <b>{{groupData.name}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeUser(groupData)">{{ this.get_text('yes@groups@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ this.get_text('no@groups@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal :title="get_text('information@groups@l')" size="md" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.groupInfo">
                        <b-row v-for="(item, index) in this.groupInfo" :key="index">
                            <b-col sm="6">{{ get_text(index+'@groups@c') }}</b-col>
                            <b-col sm="6">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/groupsTenant/store/store'

    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import {Notification} from 'element-ui'
    import VeeValidate from 'vee-validate';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import SelectTree from '@/components/tree/SelectTree';

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
            this.fields=[
                {key: 'id', label: '#', sortable: false, sortDirection: 'description'},
                {key: 'name', label: this.get_text('Name') , sortable: true, 'class': 'text-center'},
                {key: 'description', label: this.get_text('Description')},
                {key: 'Actions', label: this.get_text('Actions')},
            ]

        },*/
        created() {
            this.$store.dispatch('loadGroups')
            this.$store.dispatch('loadParentTenant')
            this.$store.dispatch('loadGroupsTenant')
            //this.$store.dispatch('translation');
        },
        data: () => {
            return {
                fields: [],
                /*fields: [
                    {key: 'id', label: '#', sortable: false, sortDirection: 'description'},
                    {key: 'name', label: 'Name', sortable: true, 'class': 'text-center'},
                    {key: 'description', label: 'Description'},
                    //{key: 'subtenant_id', label: 'Sub Tenent', sortable: true, sortDirection: 'desc'},
                    //{key: 'tenant_user_type_id', label: 'Tenent User Type'},
                    {key: 'Actions'},
                    //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'}
                ],*/
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                groupData: {
                    name: "",
                    description: "",
                    subtenant_id: null,
                    tenant_user_type_id: null,
                },
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
            'child': SelectTree,
        },
        computed: {
            groups() {
                this.fields=[
                    {key: 'id', label: '#', sortable: false, sortDirection: 'description'},
                    {key: 'name', label: this.get_text('name@groups@c') , sortable: true, 'class': 'text-center'},
                    {key: 'description', label: this.get_text('description@groups@c')},
                    {key: 'Actions', label: this.get_text('actions@l')},
                ];
                return this.$store.getters.groups
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
                    this.groupData = {
                        name: "",
                        description: "",
                        subtenant_id: null,
                        tenant_user_type_id: null,
                    }
                }
            }
        },
        methods: {
            setGroupData() {
                this.groupData = {
                    name: "",
                    description: "",
                    subtenant_id: null,
                    tenant_user_type_id: null,
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
            selectUser(groupTenant) {
                console.log(groupTenant);
                this.groupData = groupTenant;
            },
            removeUser(groupTenant) {
                this.$store.dispatch('removeUser', groupTenant)
            },
            createGroup() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.resetPasswordBtn = true,
                            this.showingModal = false
                        this.$store.dispatch('createGroup', {
                            data: {
                                name: this.groupData.name,
                                description: this.groupData.description,
                                subtenant_id: this.groupData.subtenant_id,
                                tenant_user_type_id: this.groupData.tenant_user_type_id,
                            }
                        })
                        this.groupData = {}
                        this.$validator.reset();
                    }
                });
            },
            editGroupTenant(tenentGroup, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/group/${tenentGroup.id}`, tenentGroup.data)
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
                                this.groupInfo = response.data.data
                            } else {
                                this.showingeditModal = true
                                this.groupData = response.data.data
                            }
                            this.$store.state.isLoading = false;
                        }
                    }).catch(error => {
                        console.log(error.response.data.message);
                        this.$store.state.isLoading = false;
                        if (error.response.status == 403){
                            Vue.prototype.$notify.error({
                                title: 'Error',
                                message: error.response.data.message,
                                type: 'Error',
                                position: 'top-right'
                            });
                        }})
                //this.tanentData = tenent;
                //this.showingeditModal= true
                //console.log(data);
            },
            updateGroup() {
                console.log(this.groupData);
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false
                        this.$store.dispatch('updateGroup', {
                            where: this.groupData.id,
                            data: {
                                name: this.groupData.name,
                                description: this.groupData.description,
                                subtenant_id: this.groupData.subtenant_id,
                                tenant_user_type_id: this.groupData.tenant_user_type_id,
                            }
                        })
                        this.groupData = {
                            name: "",
                            description: "",
                            subtenant_id: null,
                            tenant_user_type_id: null,
                        }
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
