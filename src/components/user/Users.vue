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
                            <b class="h4">{{ get_text('title@Users@l') }}</b>
                            <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('user-create')">
                                <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add@Users@l') }}</b></b-button>
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                {{ get_text('loading@l') }}
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('filter@l')" class="mb-0 text-right">
                                        <b-input-group>
                                            <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('sort@l')" class="mb-0 text-right" label-cols="5" >
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
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('sector@kpi_def@l')" class="mb-0" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                        <b-input-group>
                                            <b-form-select v-model="sortByTenant" @change="loadKpiDataSector(sortByTenant, sortBySubTenant)" :options="this.$store.state.setTenant">
                                                <option slot="first" :value="null">{{
                                                    get_text('please_select@kpi_def@l') }}
                                                </option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-0" label-cols="5" :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                                        <b-input-group>
                                            <b-form-select v-model="sortBySubTenant" @change="loadKpiDataOrgUnit(sortBySubTenant, sortByTenant)"
                                                           :options="this.$store.state.setSubTenant">
                                                <option slot="first" :value="null">{{
                                                    get_text('please_select@kpi_def@l')
                                                    }}
                                                </option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="users" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="id" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0">
                                        {{ data.index + 1 }}
                                    </b-col>
                                </template>
                                <template slot="name" slot-scope="data">
                                    {{ data.item.name }} {{ data.item.last_name}}
                                </template>
                                <template slot="status" slot-scope="data">
                                    <b-badge :variant="getBadge(data.item.status)">{{ getName(data.item.status) }}
                                    </b-badge>
                                </template>
                                <template slot="Actions" slot-scope="data">
                                    <b-row class="text-center">
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('user-view')">
                                            <b-button variant="primary" size="sm"
                                                      @click="editUser(data.item, 'view') "><b><i
                                                    class="icon-eye icons font-1xl"></i> </b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0" v-if="$can('user-edit')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editUser(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('user-delete')">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectUser(data.item)"><b><i
                                                    class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>
                                    </b-row>
                                    <!--<b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="primary" size="md" class="btn-pill"
                                                  @click="editUser(data.item, 'view') "><b><i
                                                class="icon-eye icons font-1xl"></i> View</b></b-button>
                                    </b-col>-->
                                </template>
                                <!--<template slot="Edit" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="warning" size="md" class="btn-pill"
                                                  @click="editUser(data.item, 'edit')"><b><i
                                                class="icon-pencil icons font-1xl"></i> Edit</b></b-button>
                                    </b-col>
                                </template>
                                <template slot="Delete" slot-scope="data">
                                    <b-col class="mb-3 mb-xl-0 text-center">
                                        <b-button variant="danger" size="md" class="btn-pill"
                                                  @click="showingdeleteModal = true;  selectUser(data.item)"><b><i
                                                class="icon-trash icons font-1xl"></i> Delete</b></b-button>
                                    </b-col>
                                </template>-->
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="this.totalRows" :per-page="perPage"
                                              v-model="currentPage" :prev-text="get_text('prev@l')" :next-text="get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('add@Users@l')" size="lg" class="modal-primary" v-model="showingModal"
                         @close="setUserData" hide-footer>
                    <b-form @submit.prevent="createUser">
                        <b-row>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="name">{{ get_text('name@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="userData.name" :placeholder="get_text('enter_your_name@Users@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('name') }"></b-form-input>
                                    <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="second_name">{{ get_text('second_name@Users@l') }}</label>
                                    <b-form-input type="text" id="second_name" v-model="userData.second_name"
                                                  :placeholder="get_text('enter_your_second_name@Users@l')"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="last_name">{{ get_text('last_name@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                       style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="last_name" id="last_name"
                                                  v-model="userData.last_name"
                                                  :class="{ 'is-invalid': submitted && errors.has('last_name') }"
                                                  :placeholder="get_text('enter_your_last_name@Users@l')"></b-form-input>
                                    <div v-if="submitted && errors.has('last_name')" class="invalid-feedback">{{
                                        errors.first('last_name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="email">{{ get_text('email@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                              style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required|email'" name="email" id="email"
                                                  v-model="userData.email" :placeholder="get_text('enter_your_email@Users@l')"
                                                  :class="{ 'is-invalid': submitted && errors.has('email') }"></b-form-input>
                                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{
                                        errors.first('email') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="phone_internal">{{ get_text('phone_internal@Users@l') }}</label>
                                        <b-form-input type="number" name="phone_internal" id="phone_internal"
                                                  v-model="userData.phone_internal" :placeholder="get_text('enter_your_phone_internal@Users@l')" pattern="^\d{4}-\d{3}-\d{4}$" maxlength="4"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="status">{{ get_text('status@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                 style="font-size:10px;color:red;"></i></label>
                                    <b-form-select id="status"
                                                   :plain="true"
                                                   value="Please select"
                                                   v-validate="'required'" name="status"
                                                   :class="{ 'is-invalid': submitted && errors.has('status') }"
                                                   v-model="userData.status"
                                                   :options="[
                    {
                      text: get_text('please_select@Users@l'),
                      value: null
                    },
                    {
                      text: get_text('active@Users@l'),
                      value: '1'
                    }, {
                      text: get_text('deactive@Users@l'),
                      value: '0'
                    }]">
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('status')" class="invalid-feedback">{{
                                        errors.first('status') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="sector_id">{{ get_text('sector_id@Users@l') }}<i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.sector_id" @change="getsubtenants(userData.sector_id)" id="sector_id" v-validate="'required'" name="sector_id"
                                                   :options="this.$store.state.setTenant"
                                                   :class="{ 'is-invalid': submitted && errors.has('sector_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }} </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('sector_id')" class="invalid-feedback">{{
                                        errors.first('sector_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="subtenant_id">{{ get_text('tenant@Users@l') }}<i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.subtenant_id" id="subtenant_id"
                                                   v-validate="'required'" name="subtenant_id"
                                                   :options="this.$store.state.setSubTenant"
                                                   :class="{ 'is-invalid': submitted && errors.has('subtenant_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }} </option>
                                        </template>
                                        <!--<child :tree="this.$store.state.parents"></child>-->
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('subtenant_id')" class="invalid-feedback">{{
                                        errors.first('subtenant_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="user_type">{{ get_text('roles@Users@l') }}<i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.user_type"
                                                   id="user_type"
                                                   :multiple="true"
                                                   :options="this.$store.state.groupTanent"
                                                   v-validate="'required'" name="user_type"
                                                   :class="{ 'is-invalid': submitted && errors.has('user_type') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }}</option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('user_type')" class="invalid-feedback">{{
                                        errors.first('user_type') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="subtenant_user_group_id">{{ get_text('tenant_user_group@Users@l') }}<i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.subtenant_user_group_id"
                                                   id="subtenant_user_group_id"
                                                   :plain="true"
                                                   :multiple="true"
                                                   :options="this.$store.state.groups"
                                                   v-validate="'required'" name="subtenant_user_group_id"
                                                   :class="{ 'is-invalid': submitted && errors.has('subtenant_user_group_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }} </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('subtenant_user_group_id')" class="invalid-feedback">
                                        {{ errors.first('subtenant_user_group_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ get_text('save@Users@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('edit@Users@l')" size="lg" ref="vueModel" class="modal-primary" v-model="showingeditModal"
                         hide-footer>
                    <b-form @submit.prevent="updateUser">
                        <b-row>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="name">{{ this.get_text('name@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                             style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="name" id="name"
                                                  v-model="userData.name" :placeholder="get_text('enter_your_name@Users@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('name') }"></b-form-input>
                                    <div v-if="updated && errors.has('name')" class="invalid-feedback">{{
                                        errors.first('name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="second_name">{{ this.get_text('second_name@Users@l') }}</label>
                                    <b-form-input type="text" id="second_name" v-model="userData.second_name"
                                                  :placeholder="get_text('enter_your_second_name@Users@l')"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="last_name">{{ this.get_text('last_name@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                       style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" v-validate="'required'" name="last_name" id="last_name"
                                                  v-model="userData.last_name" :placeholder="get_text('enter_your_last_name@Users@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('last_name') }"></b-form-input>
                                    <div v-if="updated && errors.has('last_name')" class="invalid-feedback">{{
                                        errors.first('last_name') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="email">{{ this.get_text('email@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                               style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="email" v-validate="'required|email'" name="email"
                                                  v-model="userData.email" :placeholder="get_text('enter_your_email@Users@l')"
                                                  :class="{ 'is-invalid': updated && errors.has('email') }"></b-form-input>
                                    <div v-if="updated && errors.has('email')" class="invalid-feedback">{{
                                        errors.first('email') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="phone_internal">{{ get_text('phone_internal@Users@l') }}</label>
                                    <b-form-input type="number" name="phone_internal" id="phone_internal"
                                                  v-model="userData.phone_internal" :placeholder="get_text('enter_your_phone_internal@Users@l')" pattern="^\d{4}-\d{3}-\d{4}$" maxlength="4"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4">
                                <b-form-group>
                                    <label for="status">{{ this.get_text('status@users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                 style="font-size:10px;color:red;"></i></label>
                                    <b-form-select id="status"
                                                   :plain="true"
                                                   value="Please select"
                                                   v-model="userData.status"
                                                   v-validate="'required'" name="status"
                                                   :class="{ 'is-invalid': updated && errors.has('status') }"
                                                   :options="[
                    {
                      text: get_text('please_select@l'),
                      value: null
                    },
                    {
                      text: get_text('active@Users@l'),
                      value: '1'
                    }, {
                      text: get_text('deactive@Users@l'),
                      value: '0'
                    }]">
                                    </b-form-select>
                                    <div v-if="updated && errors.has('status')" class="invalid-feedback">{{
                                        errors.first('status') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">{{ get_text('sector_id@Users@l') }}<i class="fa fa-asterisk danger fa-xs" style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.sector_id" @change="getsubtenants(userData.sector_id)"
                                                   v-validate="'required'" name="sector_id"
                                                   :options="this.$store.state.setTenant"
                                                   :class="{ 'is-invalid': submitted && errors.has('sector_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }} </option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('sector_id')" class="invalid-feedback">{{
                                        errors.first('sector_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">{{ get_text('tenant@Users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.subtenant_id"
                                                   v-validate="'required'" name="subtenant_id"
                                                   :options="this.$store.state.setSubTenant"
                                                   :class="{ 'is-invalid': submitted && errors.has('subtenant_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@Users@l') }} </option>
                                        </template>
                                        <!--<child :tree="this.$store.state.parents"></child>-->
                                    </b-form-select>
                                    <div v-if="submitted && errors.has('subtenant_id')" class="invalid-feedback">{{
                                        errors.first('subtenant_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">{{ this.get_text('roles@Users@l')}}<i class="fa fa-asterisk danger fa-xs"
                                                                          style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.user_type"
                                                   :multiple="true"
                                                   :options="this.$store.state.groupTanent"
                                                   v-validate="'required'" name="user_type"
                                                   :class="{ 'is-invalid': updated && errors.has('user_type') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ this.get_text('please_select@Users@l')}}</option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="updated && errors.has('user_type')" class="invalid-feedback">{{
                                        errors.first('user_type') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="status">{{ get_text('tenant_user_group@users@l') }}<i class="fa fa-asterisk danger fa-xs"
                                                                           style="font-size:10px;color:red;"></i></label>
                                    <b-form-select v-model="userData.subtenant_user_group_id"
                                                   :plain="true"
                                                   :multiple="true"
                                                   :options="this.$store.state.groups"
                                                   v-validate="'required'" name="subtenant_user_group_id"
                                                   :class="{ 'is-invalid': updated && errors.has('subtenant_user_group_id') }">
                                        <template slot="first">
                                            <option :value="null" disabled>{{ get_text('please_select@users@l') }}</option>
                                        </template>
                                    </b-form-select>
                                    <div v-if="updated && errors.has('subtenant_user_group_id')" class="invalid-feedback">{{
                                        errors.first('subtenant_user_group_id') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{ this.get_text('update@Users@l') }}</b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('delete@Users@l')" size="lg" class="modal-danger" v-model="showingdeleteModal" hide-footer="true" ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ this.get_text('are_you_sure_to_delete@Users@l') }} <b>{{userData.name}}</b>?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; removeUser(userData)">{{ this.get_text('yes@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{ this.get_text('no@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
                <b-modal title="user_information@Users@l" size="lg" class="modal-info" v-model="showingViewModal"
                         ok-variant="info">
                    <div class="modalcontent" v-if="this.userInfo">
                        <b-row v-for="(item, index) in this.userInfo" :key="index">
                            <b-col sm="6">{{ get_text(index+'@Users@c') }}</b-col>
                            <b-col sm="6">{{ item }}</b-col>
                        </b-row>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/user/store/store'
    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import {Notification} from 'element-ui'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import SelectTree from '@/components/tree/SelectTree';
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
            this.$store.dispatch('loadUsers')
            this.$store.dispatch('loadTenants');
            this.$store.dispatch('loadParentTenant')
            this.$store.dispatch('loadGroups')
            this.$store.dispatch('loadGroupsTenant')
            //this.$store.dispatch('translation');
        },
        mounted(){

        },
        data: () => {
            return {
                selected: null,
                fields: [
                    /*{key: 'id', label: '#', sortable: false, sortDirection: 'desc'},
                    {key: 'name', label: 'Name', sortable: true, sortDirection: 'desc'},
                    {key: 'email', label: 'Email', sortable: true, sortDirection: 'desc'},
                    {key: 'status'},
                    {key: 'Actions', thClass: 'text-center', tdClass: 'text-center'},*/
                    //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'}
                ],
                button: '',
                currentPage: 1,
                perPage: 50,
                totalRows: 0,
                userData: {
                    name: null,
                    email: null,
                    second_name: null,
                    last_name: null,
                    phone_internal: null,
                    subtenant_user_group_id: [],
                    status: 1,
                    user_type: [],
                    subtenant_id: null,
                    sector_id: null
                },
                userInfo: null,
                showingeditModal: false,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                submitted: false,
                updated: false,
                pageOptions: [10, 25, 50, 100],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translation:[],
                sortByTenant: null,
                sortBySubTenant: null,
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        computed: {
            users() {
                this.fields=[
                    {key: 'id', label: '#', sortable: false, sortDirection: 'desc'},
                    {key: 'subname', label: this.get_text('subtenant_name@Users@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'name', label: this.get_text('name@Users@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'email', label: this.get_text('email@Users@c'), sortable: true, sortDirection: 'desc'},
                    {key: 'phone_internal', label: this.get_text('phone_internal@Users@l'), sortable: true, sortDirection: 'desc'},
                    {key: 'status',label: this.get_text('status@Users@c')},
                    {key: 'Actions',label: this.get_text('actions@l'), thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Edit', thClass: 'text-center', tdClass: 'text-center'},
                    //{key: 'Delete', thClass: 'text-center', tdClass: 'text-center'}
                ];

                /*if (this.sortByTenant != null && this.$store.getters.users.length > 0) {
                    //this.$store.dispatch('loadSubTenants', this.sortByTenant);
                    var filterData = [];
                    filterData = this.$store.getters.users.filter(data => {
                        //return data.sector_id.toString().includes(this.sortByTenant)
                        return data.sector_id != null ? data.sector_id.toString().includes(this.sortByTenant) : ''
                    })
                    this.totalRows = filterData.length;
                    return filterData;
                } else {*/
                    var filterData = this.$store.getters.users;
                    this.totalRows = filterData.length;
                    //alert(this.totalRows)
                    return filterData;
                //}

                //return this.$store.getters.users;


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
                    this.$store.dispatch('loadUsers')
                    this.userData = {
                        name: null,
                        email: null,
                        second_name: null,
                        last_name: null,
                        phone_internal: null,
                        subtenant_user_group_id: [],
                        status: 1,
                        user_type: [],
                        subtenant_id: null,
                        sector_id: null,
                    }
                }
            }
        },
        components: {
            'loading': Loading,
            'child': SelectTree,
        },
        methods: {
            loadKpiDataSector(sector, orgUnit) {
                this.$store.dispatch('loadSubTenants', sector);
                this.$store.dispatch('loadKpiSectorUsers', [sector, orgUnit]);
            },
            loadKpiDataOrgUnit(orgUnit, sector) {
                this.$store.dispatch('loadKpiOrgUsers', [orgUnit, sector]);
            },
            getsubtenants(sector){
                if (sector != null) {
                    this.$store.dispatch('loadSubTenants', sector);
                }
            },
            setUserData() {
                this.userData= {
                    name: null,
                    email: null,
                    second_name: null,
                    last_name: null,
                    phone_internal: null,
                    subtenant_user_group_id: [],
                    status: 1,
                    user_type: [],
                    subtenant_id: null,
                    sector_id: null
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
            createUser() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.resetPasswordBtn = true,
                            this.showingModal = false
                        this.$store.dispatch('createUser', {
                            data: {
                                name: this.userData.name,
                                second_name: this.userData.second_name,
                                last_name: this.userData.last_name,
                                phone_internal: this.userData.phone_internal,
                                status: this.userData.status,
                                email: this.userData.email,
                                subtenant_id: this.userData.subtenant_id,
                                sector_id: this.userData.sector_id,
                                subtenant_user_group_id: this.userData.subtenant_user_group_id,
                                user_type: this.userData.user_type
                            }
                        });
                        this.userData = {
                            name: null,
                            email: null,
                            second_name: null,
                            last_name: null,
                            phone_internal: null,
                            subtenant_id: null,
                            sector_id: null,
                            user_type: null,
                            status: 1
                        };
                        this.$validator.reset();
                    }
                });
            },
            selectUser(user) {
                this.userData = user;
            },
            editUser(user, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/user/${user.id}`, user.data)
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
                                this.userInfo = response.data.data
                            } else {
                                this.showingeditModal = true
                                this.userData = response.data.data
                                if(typeof this.userData.sector_id != "undefined" && this.userData.sector_id != null) {
                                    this.$store.dispatch('loadSubTenants', this.userData.sector_id);
                                }
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            updateUser() {
                this.updated = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false
                        this.$store.dispatch('updateUser', {
                            where: this.userData.id,
                            data: {
                                name: this.userData.name,
                                second_name: this.userData.second_name,
                                last_name: this.userData.last_name,
                                phone_internal: this.userData.phone_internal,
                                status: this.userData.status,
                                email: this.userData.email,
                                subtenant_id: this.userData.subtenant_id,
                                sector_id: this.userData.sector_id,
                                subtenant_user_group_id: this.userData.subtenant_user_group_id,
                                user_type: this.userData.user_type
                            }
                        })
                        this.userData = {
                            name: null,
                            email: null,
                            second_name: null,
                            last_name: null,
                            subtenant_user_group_id:  [],
                            status: 1
                        }
                        this.$validator.reset();
                    }
                });
            },
            removeUser(user) {
                this.$store.dispatch('removeUser', user)
            },
            getBadge(status) {
                return status == 1 ? 'success' : status === 0 ? 'warning' : 'primary'
            },
            getName(status) {
                return status == '1' ? this.get_text('active@l') : status == '0' ? this.get_text('inactive@l') : 'primary'
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
