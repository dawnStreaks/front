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
                          <b class="h4">  {{ get_text('title@roleAndPremission@l') }}</b>
                            <b-button variant="success" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('role-create')"><i
                                    class="icon-plus icons font-1xl"></i>{{ get_text('add@roleAndPremission@l') }}
                            </b-button>
                        </div>
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
                                     :fixed="fixed" responsive="sm" :items="roles" :fields="fields"
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
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('role-view')">
                                            <b-button variant="primary" size="sm"
                                                      @click="editGroupTenant(data.item, 'view') "><i
                                                    class="icon-eye icons font-1xl"></i>
                                            </b-button>
                                        </b-col>
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" v-if="$can('role-edit')">
                                            <b-button variant="warning"  size="sm"
                                                      @click="editGroupTenant(data.item, 'edit')"><i
                                                    class="icon-pencil icons font-1xl"></i>
                                            </b-button>
                                        </b-col>
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('role-delete')">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectUser(data.item)"><i class="icon-trash icons font-1xl"></i>
                                            </b-button>
                                        </b-col>
                                    </b-row>
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
                <b-modal :title="get_text('edit@roleAndPremission@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showingeditModal" hide-footer>
                    <b-form @submit.prevent="updateGroup">
                        <b-row>
                            <b-col sm="12">
                                <b-form-group>
                                    <label for="name">{{ get_text('name@roleAndPremission@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="roleData.name" :placeholder="get_text('enter_your_name@roleAndPremission@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('name') }"></b-form-input>
                                    <div v-if="updated && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" lg="12">
                                <b-card>
                                    <div slot="header">
                                        {{ get_text('permissions@roleAndPremission@l') }}
                                    </div>
                                    <b-card no-body>
                                        <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
                                            <b-tab v-for="(data, key, index) in objects" :key="index"  >
                                                <template slot="title">
                                                    {{ (key) | uppercase}}
                                                </template>
                                                <b-form-checkbox-group stacked id="permissions" name="permission[]" :plain="true" v-model="roleData.permissions">
                                                    <b-form-checkbox v-for="(item, index) in data" :key="index" :value="item.id">
                                                        {{ (item.name) }}
                                                    </b-form-checkbox>
                                                </b-form-checkbox-group>
                                            </b-tab>
                                        </b-tabs>
                                    </b-card>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('update@roleAndPremission@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('add@roleAndPremission@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setRoleData" hide-footer>
                    <b-form @submit.prevent="createGroup">
                        <b-row>
                            <b-col sm="12">
                                <!--{{ permissions }}-->
                                <b-form-group>
                                    <label for="name">{{ get_text('name@roleAndPremission@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                                 style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="roleData.name" :placeholder="get_text('enter_your_name@roleAndPremission@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('name') }"></b-form-input>
                                    <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" lg="12">
                                <b-card>
                                    <div slot="header">
                                        {{ get_text('permissions@roleAndPremission@l') }}
                                    </div>
                                    <b-card no-body>
                                        <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
                                            <b-tab v-for="(data, key, index) in objects" :key="index"  >
                                                <template slot="title">
                                                    {{ (key) | uppercase}}
                                                </template>
                                                <b-form-checkbox-group stacked id="permissions" name="permission[]" :plain="true" v-model="roleData.permissions">
                                                    <b-form-checkbox v-for="(item, index) in data" :key="index" :value="item.id">
                                                        {{ item.name }}
                                                    </b-form-checkbox>
                                                </b-form-checkbox-group>
                                            </b-tab>
                                        </b-tabs>
                                    </b-card>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@roleAndPremission@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@roleAndPremission@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer="true"
                         ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ get_text('are_you_sure_to_delete@roleAndPremission@l') }} <b>{{roleData.name}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeUser(roleData)">{{ get_text('yes@roleAndPremission@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ get_text('no@roleAndPremission@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal title="Role Information" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.rolesInfo ">
                        <b-row v-for="(item, index) in this.rolesInfo " :key="index">
                            <b-col sm="4">{{ get_text(index+'@roles@c') }}</b-col>
                            <b-col sm="8">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/roles/store/store'

    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import VeeValidate from 'vee-validate';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import SelectTree from '@/components/tree/SelectTree';

    Vue.use(Loading);
    Vue.use(Element);
    const dict = {
        custom: {
            name: {
                required: 'The Name field is required'
            },
            subtenant_id: {
                required: () => 'The Tenant field is required'
            },
            description: {
                required: () => 'The Description field is required'
            },
            tenant_user_type_id: {
                required: () => 'The Tenant Users Type field is required'
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
        created() {
            this.$store.dispatch('loadRoles')
            this.$store.dispatch('loadPermissions')
            this.$store.dispatch('loadRoleObject')
            //this.$store.dispatch('translation');
        },
        data: () => {
            return {
                fields: [
                   /* {key: 'id', label: '#', sortable: false, sortDirection: 'description'},
                    {key: 'name', label: 'Name', sortable: true, 'class': 'text-center'},
                    {key: 'Actions', },*/
                    //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center', visible: false }
                ],
                button: '',
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                roleData: {
                    name: "",
                    permissions: [],
                },
                showingeditModal: false,
                showingModal: false,
                showingdeleteModal: false,
                showingViewModal: false,
                submitted: false,
                updated: false,
                rolesInfo: null,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                rolePermission: null,
                tabIndex: [0, 0],
                translation:[],
                tabs: [
                    'Calculator',
                    'Shopping cart',
                    'Charts'
                ]
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
            roles() {
                this.fields = [
                    {key: 'id', label: '#', sortable: false, sortDirection: 'description'},
                    {key: 'name', label: this.get_text('name@Roles@c'), sortable: true, 'class': 'text-center'},
                    {key: 'Actions', label: this.get_text('actions@l')},
                ];
                return this.$store.getters.roles
            },
            permissions() {
                return this.$store.getters.permissions
            },
            objects() {
                return this.$store.getters.objects
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
                    this.$store.dispatch('loadRoles')
                    this.roleData = {
                        name: "",
                        permissions: [],
                    }
                }
            }
        },
        methods: {
            setRoleData() {
                this.roleData = {
                    name: "",
                    permissions: [],
                }
            },
            get_text (textbit) {

                var transtext=this.translation[this.$i18n.locale][textbit];
                if(transtext){
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
                this.roleData = groupTenant;
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
                                name: this.roleData.name,
                                permission: this.roleData.permissions,
                            }
                        })
                        this.roleData = {
                            name: "",
                            permissions: [],
                        }
                        this.$validator.reset();
                    }
                });
            },
            editGroupTenant(tenentGroup, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/roles/${tenentGroup.id}`, tenentGroup.data)
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
                                this.rolesInfo = response.data.data;
                                //this.rolesInfo.permissions = response.data.permissionId;
                                this.rolesInfo.permissions = response.data.permissionVal;
                            } else {
                                this.showingeditModal = true
                                this.roleData = response.data.data
                                this.roleData.permissions = response.data.permissionId;
                                // this.rolePermission = response.data.ped;
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
                console.log(this.roleData);
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false
                        this.$store.dispatch('updateGroup', {
                            where: this.roleData.id,
                            data: {
                                name: this.roleData.name,
                                permission: this.roleData.permissions,
                            }
                        })
                        this.roleData = {
                            name: "",
                            permissions: [],
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
        filters: {
            uppercase: function(v) {
                return v.charAt(0).toUpperCase() + v.slice(1);
            }
        }
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
