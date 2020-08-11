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
                            <!--<h5> {{ this.kpivalueData}}</h5>-->
                            <b class="h4"> {{ this.get_text('kpi_name@kpi_values@l')}}: {{ this.kpivalueData.kpiname
                                }}</b><br>
                            <b class="h4"> {{ this.get_text('organization_unit@kpi_values@l') }}: {{
                                this.kpivalueData.orgunit }}</b><br>
                            <b class="h4"> {{ this.get_text('kpi_id@kpi_values@l') }}: {{ this.kpivalueData.kpiid }}</b><br>
                            <b class="h4"> {{ this.get_text('value_type@kpi_def@c') }}: {{ (( this.kpivalueData.value_type == 'Number') ?
                                this.get_text('number@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Percentage') ?
                                this.get_text('percentage@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Ratio') ?
                                this.get_text('ratio@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Rate') ?
                                this.get_text('rate@fg_form@l') : ''
                                ))))
                                }}</b>
                            <!--<b class="h4">{{ this.get_text('KPI Values@kpi_values@l') }}</b>-->

                            <b-button variant="warning" size="md" class="btn float-right" @click="backToList"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_list@kpi_def@l') }}</b></b-button>
                        </div>
                        <div v-if="!$auth.ready() || !this.$store.state.loading">
                            <div style="text-align:center; padding-top:50px;">


                                {{ this.get_text('loading@kpi_values@l') }}
                            </div>
                        </div>
                        <div v-if="$auth.ready() && this.$store.state.loading">
                            <b-row>
                                <b-col md="3">
                                    <b-form-group horizontal :label="this.get_text('filter@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input v-model="filter"
                                                          :placeholder="this.get_text('type_to_search@kpi_values@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{
                                                    this.get_text('clear@l') }}
                                                </b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
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
                                <b-col md="4">
                                    <b-form-group horizontal :label="this.get_text('per_page@l') " class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="kpivalueslists" :fields="fields"
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
                                        <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0"
                                               v-if="$can('kpi-edit')">
                                            <b-button variant="warning" size="sm"
                                                      @click="editKpivalues(data.item, 'edit')"><b><i
                                                    class="icon-pencil icons font-1xl"></i></b></b-button>
                                        </b-col>
                                        <!--<b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"-->
                                        <!--v-if="$can('prctype-edit')">-->
                                        <!--<b-button variant="danger" size="sm"-->
                                        <!--@click="showingdeleteModal = true;  selectTranslation(data.item)">-->
                                        <!--<b><i-->
                                        <!--class="icon-trash icons font-1xl"></i></b></b-button>-->
                                        <!--</b-col>&nbsp;-->
                                    </b-row>
                                </template>
                            </b-table>
                            <nav>
                                <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                                              v-model="currentPage" :prev-text="this.get_text('prev@l')"
                                              :next-text="this.get_text('next@l')"
                                              hide-goto-end-buttons/>
                            </nav>
                            <b-button @click="editdatatable() " class="float-right" variant="primary" size="lg"
                                      type="submit">{{ get_text('submit@kpi_values@l') }}
                            </b-button>

                        </div>
                    </b-card>
                </transition>
                <b-modal :title="get_text('edit@kpi_values@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showingeditModal"
                         hide-footer>
                    <b-form @submit.prevent="updatekpivalues">
                        <b-row>
                            <b-col sm="6" v-if="this.kpivalueData.value_type==='Number'">
                                <b-form-group>
                                    <label for="actualvalue">{{ get_text('actual_value@kpi_values@l') }}<i
                                            class="fa fa-asterisk danger fa-xs"
                                            style="font-size:10px;color:red;"></i></label>
                                    <b-form-input v-if="this.kpivalueData.value_type==='Number'" type="text"
                                                  id="actualvalue" name="actualvalue"
                                                  v-model="actual_value"

                                                  :class="{ 'is-invalid': updated && errors.has('actualvalue') }"></b-form-input>

                                    <div v-if="updated && errors.has('actualvalue')" class="invalid-feedback">{{
                                        errors.first('actualvalue') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6" v-if="this.kpivalueData.value_type!='Number'">
                                <b-form-group>
                                    <label for="actualnumerator">{{ this.kpivalueData.numeratorname }}<i
                                            class="fa fa-asterisk danger fa-xs"
                                            style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="actualnumerator" name="actualnumerator"
                                                  v-model="actual_numerator"

                                                  :class="{ 'is-invalid': updated && errors.has('actualnumerator') }"></b-form-input>

                                    <div v-if="updated && errors.has('actualnumerator')" class="invalid-feedback">{{
                                        errors.first('actualnumerator') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6" v-if="this.kpivalueData.value_type!='Number'">
                                <b-form-group>
                                    <label for="actualdenominator">{{ this.kpivalueData.denominatorname }}<i
                                            class="fa fa-asterisk danger fa-xs"
                                            style="font-size:10px;color:red;"></i></label>
                                    <b-form-input type="text" id="actualdenominator" name="actualdenominator"
                                                  v-model="actual_denominator"

                                                  :class="{ 'is-invalid': updated && errors.has('actualdenominator') }"></b-form-input>

                                    <div v-if="updated && errors.has('actualdenominator')" class="invalid-feedback">{{
                                        errors.first('actualdenominator') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('notes@kpi_values@l')}}</label>
                                    <b-form-textarea id="notes" v-model="notes" rows="8"
                                    >
                                    </b-form-textarea>

                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{
                            get_text('update@kpi_values@l') }}
                        </b-button>
                    </b-form>
                </b-modal>
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
            this.$store.dispatch('loadkpivalues', this.$route.params.id);


        },
        data: () => {
            return {
                kpidatavalues: [],
                tableslist: [],
                tablesdata: [],
                tablecolumnlist: [],
                tablecolumndata: [],
                tablesselect: '',
                selected: null,
                tablecolumns: null,
                keytypeselected: null,
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
                perPage: 10,
                totalRows: 0,
                actual_value: '',
                notes: '',
                kpivalueData: {
                    actual_value: null,
                    notes: null,
                    id: null,
                    kpiname: null,
                    orgunit: null,
                    kpiid: null
                },
                key_typefilter: null,
                priorityInfo: null,
                showingeditModal: false,
                showingViewModal: false,
                showingModal: false,
                showingdeleteModal: false,
                submitted: false,
                updated: false,
                pageOptions: [10, 20, 30],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,

                translationData: '',
                translateData: {
                    key_type: "",
                },
                translation:[],
                sortOptions: []


            }
        },
        beforeMount() {
            // this.loadKpivaluesdata();
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
            this.$store.dispatch('loadkpivalues', this.$route.or.id);

        },
        computed: {
            kpivalueslists() {
                //console.log(this.$store.getters.kpivalues);
                this.kpivaluelistdata = this.$store.getters.kpivalues;
                for (var key in this.kpivaluelistdata) {
                    this.kpidatavalues.push(this.kpivaluelistdata[key]);
                    if (this.kpivaluelistdata[0].value_type == 'Percentage') {
                        this.kpivaluelistdata[key].actual_value + '%';
                    }
                    //alert(this.kpivaluelistdata[key].id);

                }
                this.kpivalueData.kpiname = this.kpivaluelistdata[0].kpiname;
                this.kpivalueData.orgunit = this.kpivaluelistdata[0].subtenant_name;
                this.kpivalueData.kpiid = this.kpivaluelistdata[0].kpiid;
                this.kpivalueData.value_type = this.kpivaluelistdata[0].value_type;
                this.kpivalueData.denominatorname = this.kpivaluelistdata[0].denominatorname;
                this.kpivalueData.numeratorname = this.kpivaluelistdata[0].numeratorname;
                // alert( this.kpivalueData.denominatorname);
                this.items = this.kpidatavalues;
                // alert( this.items);
                var filterData = [];

                filterData = this.items
                this.totalRows = filterData.length;
                //return filterData;

                var keys = [];
                for (var k in this.items[0]) keys.push(k);
                //keys.push('actions');
                keys = keys.filter(e => e !== 'id');
                keys = keys.filter(e => e !== 'kpi_target_id');
                keys = keys.filter(e => e !== 'target_year');
                keys = keys.filter(e => e !== 'target_month');
                // keys = keys.filter(e => e !== 'target_date');
                keys = keys.filter(e => e !== 'kpiname');
                keys = keys.filter(e => e !== 'value_type');
                keys = keys.filter(e => e !== 'subtenant_name');
                keys = keys.filter(e => e !== 'kpiid');
                keys = keys.filter(e => e !== 'numeratorname');
                keys = keys.filter(e => e !== 'denominatorname');
                keys = keys.filter(e => e !== 'created_at');
                keys = keys.filter(e => e !== 'updated_at');
                keys = keys.filter(e => e !== 'deleted_at');

                var arr = [];
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    var test = true;
                    if(keys[i] == 'actual_denominator' || keys[i] == 'actual_numerator' || keys[i] == 'notes' || keys[i] == 'actual_value' || keys[i] == 'actual_date') {
                        test = false;
                    }
                    arr.push({
                        key: keys[i],
                        label: this.get_text(keys[i] + '@kpi_values@c'),
                        sortable: test,
                        resizeable: true,
                        sortDirection: 'desc'
                    });
                }

                arr.push({
                    key: 'actions',
                    label: this.get_text('actions@kpi_values@c'),
                    sortable: false,
                    resizeable: true
                });
                // alert(arr[2].label);
                var numerator = arr[2].label;
                arr[2].label = arr[2].label.replace(arr[2].label, this.kpivalueData.numeratorname);
                arr[3].label = arr[3].label.replace(arr[3].label, this.kpivalueData.denominatorname);
                if (this.kpivalueData.value_type == 'Number') {
                    arr.splice(2, 2);
                }
                this.fields = arr;

                this.sortOptions = this.fields
                  .filter(f => f.sortable)
                  .map(f => {
                    return {text: f.label, value: f.key}
                  })

                return this.$store.getters.kpivalues;

            },
            getRowCount() {
                return this.$store.getters.kpivalues.length
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
            backToList() {
                sessionStorage.removeItem('kpi_id');
                window.location.replace('/kpilist')
            },
            get_text(textbit) {
                var transtext = this.translation[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if (spliteText.length > 2) {
                        var newTxt = (spliteText[0] + '@' + 'l');
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

            editdatatable() {
                Vue.axios.post(`/kpivaluesUpdate`, {kpivalues: this.$store.getters.kpivalues})
                    .then((response) => {
                        if (response.data.code == 400) {
                          this.$store.dispatch('get_text_title', 'error@m');
                          this.$store.dispatch('get_text_message', response.data.msg+'@m');
                          Vue.prototype.$notify.error({
                            title: this.$store.state.title,
                            message: this.$store.state.message,
                            type: 'Error',
                            position: 'top-right'
                          })
                        } else {
                            this.dangerModal = false;
                            this.rejectreasontext = '';
                          this.$store.dispatch('get_text_title', 'success@m');
                          this.$store.dispatch('get_text_message', response.data.msg+'@m');
                          Vue.prototype.$notify.success({
                            title: this.$store.state.title,
                            message: this.$store.state.message,
                            type: 'Success',
                            position: 'top-right'
                          })
                            this.$store.dispatch('loadkpivalues', this.$route.params.id);
                            this.kpivaluelistdata = this.$store.getters.kpivalues;

                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })


            },


            updatekpivalues() {
                this.updated = true;
                // alert("in1");
                // alert(this.actual_value);
                this.$validator.validate().then(valid => {
                    if (valid) {
                        //alert("in2");
                        this.showingeditModal = false;
                        //console.log("xcdds");
                        console.log(this.$store.getters.kpivalues);
                        for (var key in this.$store.getters.kpivalues) {
                            // alert(this.kpivalueData[0].id);
                            //alert(this.actual_value);
                            if (this.kpivalueData.value_type != 'Number') {
                                this.actual_value = (this.actual_numerator / this.actual_denominator);
                            }
                            if (this.kpivalueData.value_type == 'Percentage') {
                                // var actualvalue=this.actual_value;
                              this.actual_value = (this.actual_numerator / this.actual_denominator)*100;
                                this.actual_value = this.actual_value.toFixed(2);
                                this.actual_value = (this.actual_value) + "%";
                            }
                            if (this.kpivalueData.value_type == 'Rate' || this.kpivalueData.value_type == 'Ratio') {
                                // var actualvalue=this.actual_value;
                                this.actual_value = this.actual_value.toFixed(4);

                            }
                            //alert(this.actual_value);
                            if (this.$store.getters.kpivalues[key].id == this.kpivalueData[0].id) {
                                this.$store.getters.kpivalues[key].actual_value = this.actual_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.$store.getters.kpivalues[key].actual_numerator = this.actual_numerator;
                                this.$store.getters.kpivalues[key].actual_denominator = this.actual_denominator;
                                this.$store.getters.kpivalues[key].notes = this.notes;

                                // if(this.notes==='')
                                // this.$store.getters.kpivalues[key].notes='';
                                // else
                                //   this.$store.getters.kpivalues[key].notes=this.notes;

                            }

                        }

                        this.actual_value = '';
                        this.notes = '';
                        this.actual_numerator = '';
                        this.actual_denominator = '';

                        this.$validator.reset();
                    }
                });

            },


            $can(permissionName) {
                // alert(this.$auth.user().allPermissions);
                return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
            },

            editKpivalues(kpivalueid, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/kpivaluesbyId/${kpivalueid.id}`)
                    .then((response) => {
                        if (response.data.code == 401) {
                          this.$store.dispatch('get_text_title', 'error@m');
                          this.$store.dispatch('get_text_message', response.data.msg+'@m');
                          Vue.prototype.$notify.error({
                            title: this.$store.state.title,
                            message: this.$store.state.message,
                            type: 'Error',
                            position: 'top-right'
                          })
                        } else {

                            this.showingeditModal = true
                            this.kpivalueData = response.data.data;
                            console.log(this.kpivalueData);

                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
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
        vertical-align: middle !important;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
    }
</style>
