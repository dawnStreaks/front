<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>

        <b-col cols="12" xl="12" md="12">

            <!--<b-card>-->
                <!--<div slot="header">-->
                    <!--<b class="h4"> {{ this.get_text('title@trans_table@l') }}</b>-->

                <!--</div>-->
              <b-modal id="abc" :title="get_text('add@prcType@l')" size="lg" class="modal-primary" v-model="showingModal"  @show="resetModal"
                       @close="setPriorityData" hide-footer>
                <b-form @submit.prevent="createTranslation">


                    <b-row >
                        <b-col md="6">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('key_type@trans_table@l') }}: </label>
                            <b-form-select  name="keytypeselected" v-validate="'required'" v-model="keytypeselected" :options="[
                                            {
                                              text: get_text('please_select@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('column@trans_table@l'),
                                              value: 'c'
                                            }, {
                                              text:get_text('label@trans_table@l'),
                                              value: 'l'
                                            }, {
                                              text: get_text('message@trans_table@l'),
                                              value: 'm'
                                            }]" class="" :class="{ 'is-invalid': submitted && errors.has('keytypeselected') }">


                            </b-form-select>
                            <div v-if="submitted && errors.has('keytypeselected')" class="invalid-feedback">{{
                                errors.first('keytypeselected') }}
                            </div>
                        </b-col>
                      <b-col md="6" v-if="keytypeselected === 'l'">
                        <label :label-cols="3"
                               :horizontal="true">{{ this.get_text('key_position@trans_table@l') }}: </label>
                        <b-form-input type="text" :placeholder="get_text('key_position@trans_table@l')" id="keypositionl"
                                      name="keypositionl" v-model="keypositionl"  :class="{ 'is-invalid': submitted && errors.has('keypositionl') }"></b-form-input>
                        <div v-if="submitted && errors.has('keypositionl')" class="invalid-feedback">{{
                          errors.first('keypositionl') }}
                        </div>
                      </b-col>
                        <b-col md="6" v-if="keytypeselected === 'c'">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('key_position@trans_table@l') }}: </label>
                            <b-form-select name="selected" v-model="selected" :options="tableslist" class="" :class="{ 'is-invalid': submitted && errors.has('selected') }" @input="getcolumndata" v-validate="'required'" >

                                <template slot="first">
                                    <option :value="null">-- {{ this.get_text('please_select@trans_table@l') }} --</option>
                                </template>

                            </b-form-select>
                            <div v-if="submitted && errors.has('selected')" class="invalid-feedback">{{
                                errors.first('selected') }}
                            </div>
                        </b-col>
                        <b-col md="6" v-if="keytypeselected === 'c'">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('key_name@trans_table@l') }} </label>
                            <b-form-select name="tablecolumns" id="basicSelect" v-model="tablecolumns"
                                           :plain="true"
                                           :options="tablecolumnlist" v-valiate="'required'"
                                           :class="{ 'is-invalid': submitted && errors.has('tablecolumns') }">
                                <template slot="first">
                                    <option :value="null">-- {{ this.get_text('please_select@trans_table@l') }} --</option>
                                </template>
                            </b-form-select>
                            <div v-if="submitted && errors.has('tablecolumns')" class="invalid-feedback">{{
                                errors.first('tablecolumns') }}
                            </div>
                        </b-col>
                        <b-col md="6" v-if="keytypeselected != 'c'">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('key_name@trans_table@l') }}: </label>
                            <b-form-input type="text" :placeholder="get_text('key_name@trans_table@l')" id="keyname" v-model="keyname" name="keyname" v-validate="'required'" :class="{ 'is-invlid': submitted && errors.has('keyname') }">
                            </b-form-input>
                            <div v-if="submitted && errors.has('keyname')" class="invalid-feedback">{{
                                errors.first('keyname') }}
                            </div>
                        </b-col>
                        <b-col md="6">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('english_value@trans_table@l') }}: </label>
                            <b-form-input type="text" :placeholder="get_text('english_text@trans_table@l')" id="keynameEn"
                                          name="keynameEn" v-model="keynameEn" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('keyname') }"></b-form-input>
                            <div v-if="submitted && errors.has('keynameEn')" class="invalid-feedback">{{
                                errors.first('keynameEn') }}
                            </div>
                        </b-col>
                        <b-col md="6">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('arabic_value@trans_table@l') }}: </label>
                            <b-form-input type="text" :placeholder="get_text('arabic_text@trans_table@l')" id="keynameAr"
                                          name="keynameAr" v-model="keynameAr" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('keyname') }"></b-form-input>
                            <div v-if="submitted && errors.has('keynameAr')" class="invalid-feedback">{{
                                errors.first('keynameAr') }}
                            </div>
                        </b-col>
                        <b-col md="6">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('short_english_value@trans_table@l') }}: </label>
                            <b-form-input type="text" :placeholder="get_text('short_english_value@trans_table@l')" id="keynameshortEn" name="keynameshortEn" v-model="keynameshortEn"></b-form-input>
                        </b-col>
                        <b-col md="6">
                            <label :label-cols="3"
                                   :horizontal="true">{{ this.get_text('short_arabic_value@trans_table@l') }}: </label>
                            <b-form-input type="text" :placeholder="get_text('short_arabic_value@trans_table@l')" id="keynameshortAr"
                                          name="keynameshortAr" v-model="keynameshortAr"></b-form-input>
                            <input type="hidden" :placeholder="get_text('shortArabicValue@trans_table@l')" id="keynameshortAr" v-model="keyid"></input>
                        </b-col>
                    </b-row>
                    <div slot="footer" style="padding-top:20px;">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{
                            this.get_text('submit@trans_table@l') }}
                        </b-button>
                        <b-button style="margin:10px;" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{
                            this.get_text('reset@trans_table@l') }}
                        </b-button>
                    </div>
                </b-form>
              </b-modal>

          <b-modal id="abc" :title="get_text('edit@prcType@l')" size="lg" class="modal-primary" v-model="showingeditModal"
                   @close="setPriorityData" hide-footer>
            <b-form @submit.prevent="createTranslation">


              <b-row >
                <b-col md="6">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('key_type@trans_table@l') }}: </label>
                  <b-form-select  name="keytypeselected" v-validate="'required'" v-model="keytypeselected" :options="[
                                            {
                                              text: get_text('please_select@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('column@trans_table@l'),
                                              value: 'c'
                                            }, {
                                              text:get_text('label@trans_table@l'),
                                              value: 'l'
                                            }, {
                                              text: get_text('message@trans_table@l'),
                                              value: 'm'
                                            }]" class="" :class="{ 'is-invalid': submitted && errors.has('keytypeselected') }">


                  </b-form-select>
                  <div v-if="submitted && errors.has('keytypeselected')" class="invalid-feedback">{{
                    errors.first('keytypeselected') }}
                  </div>
                </b-col>
                <b-col md="6" v-if="keytypeselected === 'l'">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('key_position@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('key_position@trans_table@l')" id="keypositionl"
                                name="keypositionl" v-model="keypositionl"  :class="{ 'is-invalid': submitted && errors.has('keypositionl') }"></b-form-input>
                  <div v-if="submitted && errors.has('keypositionl')" class="invalid-feedback">{{
                    errors.first('keypositionl') }}
                  </div>
                </b-col>
                <b-col md="6" v-if="keytypeselected === 'c'">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('key_position@trans_table@l') }}: </label>
                  <b-form-select name="selected" v-model="selected" :options="tableslist" class="" :class="{ 'is-invalid': submitted && errors.has('selected') }" @input="getcolumndata" v-validate="'required'" >

                    <template slot="first">
                      <option :value="null">-- {{ this.get_text('please_select@trans_table@l') }} --</option>
                    </template>

                  </b-form-select>
                  <div v-if="submitted && errors.has('selected')" class="invalid-feedback">{{
                    errors.first('selected') }}
                  </div>
                </b-col>
                <b-col md="6" v-if="keytypeselected === 'c'">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('key_name@trans_table@l') }} </label>
                  <b-form-select name="tablecolumns" id="basicSelect" v-model="tablecolumns"
                                 :plain="true"
                                 :options="tablecolumnlist" v-valiate="'required'"
                                 :class="{ 'is-invalid': submitted && errors.has('tablecolumns') }">
                    <template slot="first">
                      <option :value="null">-- {{ this.get_text('please_select@trans_table@l') }} --</option>
                    </template>
                  </b-form-select>
                  <div v-if="submitted && errors.has('tablecolumns')" class="invalid-feedback">{{
                    errors.first('tablecolumns') }}
                  </div>
                </b-col>
                <b-col md="6" v-if="keytypeselected != 'c'">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('key_name@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('key_name@trans_table@l')" id="keyname" v-model="keyname" name="keyname" v-validate="'required'" :class="{ 'is-invlid': submitted && errors.has('keyname') }">
                  </b-form-input>
                  <div v-if="submitted && errors.has('keyname')" class="invalid-feedback">{{
                    errors.first('keyname') }}
                  </div>
                </b-col>
                <b-col md="6">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('english_value@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('english_text@trans_table@l')" id="keynameEn"
                                name="keynameEn" v-model="keynameEn" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('keyname') }"></b-form-input>
                  <div v-if="submitted && errors.has('keynameEn')" class="invalid-feedback">{{
                    errors.first('keynameEn') }}
                  </div>
                </b-col>
                <b-col md="6">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('arabic_value@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('arabic_text@trans_table@l')" id="keynameAr"
                                name="keynameAr" v-model="keynameAr" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('keyname') }"></b-form-input>
                  <div v-if="submitted && errors.has('keynameAr')" class="invalid-feedback">{{
                    errors.first('keynameAr') }}
                  </div>
                </b-col>
                <b-col md="6">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('short_english_value@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('short_english_value@trans_table@l')" id="keynameshortEn" name="keynameshortEn" v-model="keynameshortEn"></b-form-input>
                </b-col>
                <b-col md="6">
                  <label :label-cols="3"
                         :horizontal="true">{{ this.get_text('short_arabic_value@trans_table@l') }}: </label>
                  <b-form-input type="text" :placeholder="get_text('short_arabic_value@trans_table@l')" id="keynameshortAr"
                                name="keynameshortAr" v-model="keynameshortAr"></b-form-input>
                  <input type="hidden" :placeholder="get_text('shortArabicValue@trans_table@l')" id="keynameshortAr" v-model="keyid"></input>
                </b-col>
              </b-row>
              <div slot="footer" style="padding-top:20px;">
                <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{
                  this.get_text('submit@trans_table@l') }}
                </b-button>
                <b-button style="margin:10px;" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{
                  this.get_text('reset@trans_table@l') }}
                </b-button>
              </div>
            </b-form>
          </b-modal>
            <!--</b-card>-->

        </b-col>

        <b-row>
            <b-col cols="12" xl="12" ref="formContainer">
                <transition name="slide">
                    <b-card>
                        <div slot="header">
                            <b class="h4">{{ this.get_text('translations_list@trans_table@l') }}</b>
                          <b-button variant="primary" size="md" class="btn float-right" @click="showingModal= true" v-if="$can('translations-create') ">
                            <b><i class="icon-plus icons font-1xl"></i> {{ this.get_text('add@prcType@l') }}</b></b-button>

                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">
                                {{ this.get_text('loading@trans_table@l') }}
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="3" >
                                    <b-form-group horizontal :label="this.get_text('filter@trans_table@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter"
                                                          :placeholder="this.get_text('type_to_search@trans_table@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{
                                                    this.get_text('clear@l') }}
                                                </b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" >
                                    <b-form-group>

                                        <b-form-select
                                                v-model="key_typefilter" :placeholder="get_text('enter_type@trans_table@l')"
                                                :class="{ 'is-invalid': submitted && errors.has('TypeCode') }"
                                                :options="[
                                            {
                                              text: get_text('please_select@trans_table@l'),
                                              value: null
                                            },
                                            {
                                              text: get_text('column@trans_table@l'),
                                              value: 'Column'
                                            }, {
                                              text: get_text('label@trans_table@l'),
                                              value: 'Label'
                                            }, {
                                              text: get_text('message@trans_table@l'),
                                              value: 'Message'
                                            }]">
                                        </b-form-select>
                                        <div v-if="submitted && errors.has('type')" class="invalid-feedback">{{
                                            errors.first('type') }}
                                        </div>
                                    </b-form-group>
                                </b-col>
                                <b-col md="3">
                                    <b-form-group horizontal :label="this.get_text('sort@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="sortBy" :options="sortOptions">
                                                <option slot="first" :value="null">-- {{ this.get_text('none@l') }} --
                                                </option>
                                            </b-form-select>
                                            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                                                <option :value="false">{{ this.get_text('asc@l') }}</option>
                                                <option :value="true">{{ this.get_text('desc@l') }}
                                                </option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" >
                                    <b-form-group horizontal :label="this.get_text('per_page@l') " class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive :items="translations" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <template slot="status" slot-scope="data">
                                    <b-badge :variant="getBadge(data.item.status)">{{ getName(data.item.status) }}
                                    </b-badge>
                                </template>
                                <template slot="actions" slot-scope="data">
                                    <b-row class="text-center">
                                        <!--<b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prctype-delete')">-->
                                        <!--<b-button variant="primary" size="sm"-->
                                        <!--@click="editPriority(data.item, 'view') "><b><i-->
                                        <!--class="icon-eye icons font-1xl"></i></b></b-button>-->
                                        <!--</b-col>&nbsp;-->
                                        <b-col cols="3" sm="4" md="3" xl="2" class="mb-3 mb-xl-0"
                                               v-if="$can('translations-view')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editTranslationdata(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                        <b-col cols="2" sm="6" md="2" xl="1" class="mb-xl-0"
                                               v-if="$can('translations-edit')">
                                            <b-button variant="danger" size="sm"
                                                      @click="showingdeleteModal = true;  selectTranslation(data.item)">
                                                <b><i
                                                        class="icon-trash icons font-1xl"></i></b></b-button>
                                        </b-col>&nbsp;
                                    </b-row>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')"
                                              :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                        </div>
                    </b-card>
                </transition>
                <b-modal title="Delete Priority" size="lg" class="modal-danger" v-model="showingdeleteModal"
                         ok-variant="danger">
                    <div class="modalcontent">
                        <h3 class="text-center">{{ this.get_text('are_you_sure_to_delete@@trans_table@l') }} ?</h3>
                        <b-col md="12" class="text-center">

                            <button class="btn btn-outline-danger left"
                                    @click="showingdeleteModal = false; deleteTabledata(translationData)">{{
                                this.get_text('yes@trans_table@l') }}
                            </button>&nbsp;
                            <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{
                                this.get_text('no@trans_table@l') }}
                            </button>
                        </b-col>
                    </div>
                </b-modal>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/store'
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
            this.$store.dispatch('loadTranslations');

        },
        data: () => {
            return {
                tableslist: [],
                tablesdata: [],
                tablecolumnlist: [],
                tablecolumndata: [],
                tablesselect: '',
                selected: null,
                tablecolumns: null,
                keytypeselected: null,
                keypositionl:null,
                keyname: '',
                keynameEn: '',
                keynameAr: '',
                keynameshortEn: '',
                keynameshortAr: '',
                keyid: '',
                items: '',

                fields: '',
                button: '',
                currentPage: 1,
                perPage: 50,
                totalRows: 0,
                priorityData: {
                    TypeCode: null,
                    Type: null,
                },
                key_typefilter: null,
                priorityInfo: null,
                showingeditModal: false,
                showingViewModal: false,
                showingModal: false,
                showingeditModal: false,
                showingdeleteModal: false,
                submitted: false,
                updated: false,
                pageOptions: [50, 100, 150],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translationdatae: '',
                translationData: '',
                translateData: {
                    key_type: "",
                },
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        mounted() {
            this.loadTranslationsdata();
            Vue.axios.get('tables')
                .then(response => {

                    this.tablesdata = response.data.data;
                    for (var key in this.tablesdata) {

                        this.tableslist.push(this.tablesdata[key].name)

                    }

                })


        },
        computed: {
            translations() {
                this.items = this.$store.getters.translationsdatalist;
                var filterData = [];
                if (this.key_typefilter != null) {
                    filterData = this.$store.getters.translationsdatalist.filter(data => {
                        return data.key_type.includes(this.key_typefilter)
                    })
                    this.totalRows = filterData.length;
                    //return filterData;
                } else {
                    filterData = this.$store.getters.translationsdatalist
                    this.totalRows = filterData.length;
                    //return filterData;
                }
                var keys = [];
                for (var k in this.items[0]) keys.push(k);
                keys.push('actions');
                keys = keys.filter(e => e !== 'id');
                keys = keys.filter(e => e !== 'created_at');
                keys = keys.filter(e => e !== 'updated_at');
                keys = keys.filter(e => e !== 'deleted_at');
                var arr = [];
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    arr.push({
                        key: keys[i],
                        label: this.get_text(keys[i]+'@trans_table@c'),
                        sortable: true,
                        resizeable: true
                    });
                }
                this.fields = arr;
                return filterData;
                // return this.$store.getters.translationsdatalist
            },
            getRowCount() {
                return this.$store.getters.translationsdatalist.length;
            },
            sortOptions() {
                // Create an options list from our fields
                // return this.fields
                //   .filter(f => f.sortable)
                //   .map(f => {
                //     return {text: f.label, value: f.key}
                //   })
            }
        },
        watch: {
            showingeditModal: function () {
                if (this.showingeditModal == false) {
                    this.$store.dispatch('loadTranslations')
                    this.priorityData = {}
                }
            }
        },
        components: {
            'loading': Loading
        },
        methods: {

          resetModal() {
            this.keytypeselected = 'null',
              this.selected = '',
              this.tablecolumns = '',
              this.keyname = '',
              this.keynameEn = '',
              this.keynameAr = '',
              this.keynameshortEn = '',
              this.keynameshortAr = '',
              this.keyid = '';
            this.keypositionl='';
            this.$validator.reset();
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
            loadTranslationsdata() {

                Vue.axios.get('loadtranslations')
                    .then(response => {
                        this.items = response.data.data;
                        var keys = [];
                        for (var k in this.items[0]) keys.push(k);
                        keys.push('actions');
                        keys = keys.filter(e => e !== 'id');
                        keys = keys.filter(e => e !== 'created_at');
                        keys = keys.filter(e => e !== 'updated_at');
                        var arr = [];
                        var len = keys.length;
                        for (var i = 0; i < len; i++) {
                            arr.push({
                                key: keys[i],
                                label: this.get_text(keys[i]+'@trans_table@c'),
                                sortable: true,
                                resizeable: true
                            });
                        }
                        this.fields = arr;
                        return this.$store.getters.translationsdatalist
                    })
            },

            getcolumndata() {
                Vue.axios.get('gettablecolumns/' + this.selected)
                    .then(response => {

                        this.tablecolumndata = response.data;
                        for (var key in this.tablecolumndata) {

                            this.tablecolumnlist.push(this.tablecolumndata[key])

                        }

                    })


            },
            $can(permissionName) {
                // alert(this.$auth.user().allPermissions);
                return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
            },
            createTranslation() {
                this.submitted = true;
                //alert(this.$auth.user().tenant_id);
                this.$validator.validate().then(valid => {
                    if (valid) {
                        // this.resetPasswordBtn = true,
                        this.showingModal = false
                        this.showingeditModal = false
                        if(this.selected==null){
                          this.selected=this.keypositionl;
                        }

                        this.$store.dispatch('createTranslation', {
                            data: {
                                TranslationType: this.keytypeselected,
                                TranslationPos: this.selected,
                                TableName: this.tablecolumns,
                                Keyname: this.keyname,
                                EngValue: this.keynameEn,
                                ArValue: this.keynameAr,
                                EngsValue: this.keynameshortEn,
                                ArsValue: this.keynameshortAr,
                                TenantId: this.$auth.user().tenant_id,
                                KeyId: this.keyid,
                            }
                        })
                        // this.$store.dispatch('loadTranslations');
                        //    this.translations=this.$store.getters.translations;
                        this.loadTranslationsdata();
                        this.keytypeselected = 'null',
                            this.selected = '',
                            this.tablecolumns = '',
                            this.keyname = '',
                            this.keynameEn = '',
                            this.keynameAr = '',
                            this.keynameshortEn = '',
                            this.keynameshortAr = '',
                            this.keyid = '';
                            this.keypositionl='';
                        this.$validator.reset();

                    }
                });
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
            selectTranslation(translation) {
                this.translationData = translation;
            },
            selectPriority(priority) {
                this.priorityData = priority;
            },
            editTranslationdata(tabledataedit, value = null) {

                this.$store.state.isLoading = true;
                this.showingeditModal = true;
                 //console.log(document.getElementByName("modal-title"));
              console.log(document.getElementsByClassName(".modal-title").text);

                Vue.axios.get(`/translationdatabyId/${tabledataedit.id}`)
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

                                this.translationdatae = response.data[0];
                                this.keyid = this.translationdatae.id
                                this.keytypeselected = this.translationdatae.key_type;


                                if (this.translationdatae.key_type === 'c') {
                                    this.tablecolumns = this.translationdatae.key_name;
                                    this.selected = this.translationdatae.key_pos;
                                } else {
                                    this.keyname = this.translationdatae.key_name;
                                    this.keypositionl=this.translationdatae.key_pos;
                                }
                                this.keynameEn = this.translationdatae.value_en;
                                this.keynameAr = this.translationdatae.value_ar;
                                this.keynameshortEn = this.translationdatae.svalue_en;
                                this.keynameshortAr = this.translationdatae.svalue_ar;
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
            deleteTabledata(tabledataedit, value = null) {
                this.showingeditModal = false;
                this.showingeditModal = false;
                Vue.axios.delete(`/translationdatadelete/${tabledataedit.id}`).then(response => {


                    if (response.data.code == 200) {
                        this.loadTranslationsdata();
                        this.$store.dispatch('loadTranslations');


                    } else {

                        Vue.prototype.$notify.error({
                            title: 'Error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right'
                        })
                    }
                })
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

<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
