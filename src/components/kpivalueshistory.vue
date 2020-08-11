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
                            <b class="h4"> {{ this.get_text('kpi_name@kpi_values@l')}}: {{ this.kpivalueData.kpiname
                                }}</b><br>
                            <b class="h4"> {{ this.get_text('organization_unit@kpi_values@l') }}: {{
                                this.kpivalueData.orgunit }}</b><br>
                            <b class="h4"> {{ this.get_text('kpi_id@kpi_values@l') }}: {{ this.kpivalueData.kpiid }}</b><br>
                            <b class="h4"> {{ this.get_text('value_type@kpi_def@c') }}: {{
                                //this.kpivalueData.value_type
                                (( this.kpivalueData.value_type == 'Number') ?
                                this.get_text('number@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Percentage') ?
                                this.get_text('percentage@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Ratio') ?
                                this.get_text('ratio@fg_form@l') :
                                ((this.kpivalueData.value_type == 'Rate') ?
                                this.get_text('rate@fg_form@l') : ''
                                ))))
                                }}</b>

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
                                                          :placeholder="this.get_text('type_to_search@l')"/>
                                            <b-input-group-append>
                                                <b-btn :disabled="!filter" @click="filter = ''">{{
                                                    this.get_text('clear@l') }}
                                                </b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
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
                              <b-col md="3" class="my-1">
                                <b-form-group horizontal :label="get_text('mtp@kpi_history@l')" class="mb-0">
                                  <b-input-group>
                                    <b-form-select v-model="this.$store.state.setmtp[0].value"
                                                   :options="this.$store.state.setmtp">
                                      <!--<option slot="first" :value="null">{{ get_text('mtp@kpi_def@l')-->
                                      <!--}}-->
                                      <!--</option>-->
                                    </b-form-select>
                                  </b-input-group>
                                </b-form-group>


                              </b-col>

                                <b-col md="3">
                                    <b-form-group horizontal :label="this.get_text('per_page@l') " class="mb-0">
                                        <b-form-select :options="pageOptions" v-model="perPage"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                          <hr class="new1">
                            <b-row>

                                <b-col md="4" class="my-1">
                                    <b-form-group horizontal :label="get_text('base_y_value@kpi_history@l')" class="mb-0">
                                        <b-input-group>
                                            <b-form-input type="text" name="base_y_value" id="base_y_value"
                                                          v-model="base_y_value"
                                                          :placeholder="get_text('enter_base_y_value@kpi_history@l')"></b-form-input>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" class="my-1">
                                    <b-button @click="base_y_valuesave()" class="float-left" variant="primary" size="sm"
                                              type="submit">{{ get_text('submit@kpi_history@l') }}
                                    </b-button>


                                </b-col>
                            </b-row>
                          <hr class="new1">
                          <b-row style="padding-bottom: 10px;)" v-if="this.kpivalueData.value_type==='Number' && this.kpivalueData.value_period < 4">

                            <b-col md="4" v-if="this.yearonetotal!=0">
                              <h5>{{ this.get_text('year1_value_total@kpi_values@l')}}: {{ this.yearonetotal
                                }}</h5></b-col>
                            <b-col md="4" v-if="this.yeartwototal!=0"> <h5>{{ this.get_text('year2_value_total@kpi_values@l')}}: {{ this.yeartwototal
                              }}</h5></b-col>
                            <b-col md="4" v-if="this.yearthreetotal!=0"><h5>{{ this.get_text('year3_value_total@kpi_values@l')}}: {{ this.yearthreetotal
                              }}</h5></b-col>


                          </b-row>
                            <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                                     :fixed="fixed" responsive="sm" :items="kpivalueslists" :fields="fields"
                                     :current-page="currentPage" :per-page="perPage" :filter="filter"
                                     :sort-by.sync="sortBy"
                                     :sort-desc.sync="sortDesc"
                                     :sort-direction="sortDirection"
                                     @filtered="onFiltered">
                                <!--<template slot="status" slot-scope="data">-->
                                <!--<b-badge :variant="getBadge(data.item.status)">{{ getName(data.item.status) }}-->
                                <!--</b-badge>-->
                                <!--</template>-->
                                <template slot="actions" slot-scope="data">

                                    <b-row class="text-center">
                                        <!--<b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0" v-if="$can('prctype-delete')">-->
                                        <!--<b-button variant="primary" size="sm"-->
                                        <!--@click="editPriority(data.item, 'view') "><b><i-->
                                        <!--class="icon-eye icons font-1xl"></i></b></b-button>-->
                                        <!--</b-col>&nbsp;-->
                                        <div>
                                            <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0"
                                                   v-if="$can('kpi-edit')">
                                                <b-button id="editbutton" variant="warning" size="sm"
                                                          @click="editKpivalues(data.item, 'edit')"
                                                          v-bind:class="[$store.state.kpicurrentvaluecount === false ? 'highlight1' : '']">
                                                    <b><i
                                                            class="icon-pencil icons font-1xl"
                                                            v-bind:class="[$store.state.kpicurrentvaluecount === false ? 'highlight1' : '']"></i></b>
                                                </b-button>
                                            </b-col>
                                            <!--<b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"-->
                                            <!--v-if="$can('prctype-edit')">-->
                                            <!--<b-button variant="danger" size="sm"-->
                                            <!--@click="showingdeleteModal = true;  selectTranslation(data.item)">-->
                                            <!--<b><i-->
                                            <!--class="icon-trash icons font-1xl"></i></b></b-button>-->
                                            <!--</b-col>&nbsp;-->
                                        </div>
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
                                      type="submit">{{ get_text('submit@kpi_history@l') }}
                            </b-button>

                        </div>

                    </b-card>
                </transition>
                <b-modal :title="get_text('edit@kpi_history@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showingeditModal"
                         hide-footer>
                    <b-form @submit.prevent="updatekpivalues">
                        <b-row>
                            <b-col sm="6" v-if="this.kpivalueData.value_type==='Number'">
                                <b-form-group>
                                    <label for="actualvalue">{{ get_text('actual_value@kpi_history@l') }}<i
                                            class="fa fa-asterisk danger fa-xs"
                                            style="font-size:10px;color:red;"></i></label>
                                    <b-form-input v-if="this.kpivalueData.value_type==='Number'" type="text"
                                                  id="actualvalue" name="actualvalue"
                                                  v-model="actual_value"
                                                  v-validate="'required'"
                                                  :placeholder="get_text('enter_actual_values@kpi_history@l')"
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
                                                  v-validate="'required'"

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
                                                  v-validate="'required'"

                                                  :class="{ 'is-invalid': updated && errors.has('actualdenominator') }"></b-form-input>

                                    <div v-if="updated && errors.has('actualdenominator')" class="invalid-feedback">{{
                                        errors.first('actualdenominator') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="Type">{{ get_text('notes@kpi_history@l')}}</label>
                                    <b-form-textarea id="notes" v-model="notes" rows="8"
                                    >
                                    </b-form-textarea>

                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="float-right" variant="primary" size="lg" type="submit">{{
                            get_text('update@kpi_history@l') }}
                        </b-button>
                    </b-form>
                </b-modal>
                <b-modal :title="get_text('history@kpi_history@l')" size="lg" ref="vueModel" class="modal-primary"
                         v-model="showmodelhistory" :cancel-title="get_text('cancel@fg_form@l')"
                         :ok-title="get_text('continue@fg_form@l')" @ok="goToNext" @cancel="goToList">
                    {{ get_text('kpi history values saved@m') }}
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
            // alert(this.$store.getters.setmtp);
            // this.$store.dispatch('loadmtp');
            // this.sortByKpiMtp=this.$store.state.setmtp;
        },
        data: () => {
            return {
                base_y_value: '',
                value:0,
                datacount: 1,
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
                perPage: 12,
                totalRows: 0,
                actual_value: '',
                notes: '',
                actual_denominator: '',
                actual_numerator: '',
                kpivalueData: {
                    actual_value: null,
                    notes: null,
                    id: null,
                    kpiname: null,
                    orgunit: null,
                    kpiid: null,
                    targetid: null,
                    value_type:null,
                    value_period:null
                },
                key_typefilter: null,
                priorityInfo: null,
                showingeditModal: false,
                submitted: false,
                updated: false,
                pageOptions: [12, 24, 36],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                translationdatae: '',
                translationData: '',
                translateData: {
                    key_type: "",
                },
                sortByKpiMtp: '',
                isValidationAllowed: false,
                showmodelhistory: false,
                translation: [],
                sortOptions: [],
                yearonetotal:0,
                yeartwototal:0,
                yearthreetotal:0,

            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
            this.$store.dispatch('loadmtp');
            this.kpivalueshistorysave(this.$route.params.id);


        },


        mounted() {
            this.$store.dispatch('loadkpivalueshistory', this.$route.params.id);
            this.kpivaluelistdata = this.$store.state.kpivalueshistory;


        },
        computed: {
            validated() {
                return this.isValidationAllowed && !this.base_y_value
            },
            kpivalueslists() {
              this.yearonetotal=0;this.yeartwototal=0;this.yearthreetotal=0;
                console.log(this.$store.getters.kpivalueshistory);

                this.kpivaluelistdata = this.$store.getters.kpivalueshistory;
                for (var key in this.kpivaluelistdata) {
                  if(this.kpivaluelistdata[key].target_year==1){
                    this.yearonetotal+=parseInt(this.kpivaluelistdata[key].actual_value.replace(/\,/g,''));
                  }if(this.kpivaluelistdata[key].target_year==2){
                    this.yeartwototal+=parseInt(this.kpivaluelistdata[key].actual_value.replace(/\,/g,''));
                  }if(this.kpivaluelistdata[key].target_year==3){
                    this.yearthreetotal+=parseInt(this.kpivaluelistdata[key].actual_value.replace(/\,/g,''));
                  }

                    this.kpidatavalues.push(this.kpivaluelistdata[key]);

                }
                //alert(this.kpivaluelistdata[0].kpiname);
                this.kpivalueData.kpiname = this.kpivaluelistdata[0].kpiname;
                this.kpivalueData.orgunit = this.kpivaluelistdata[0].subtenant_name;
                this.kpivalueData.kpiid = this.kpivaluelistdata[0].kpiid;
                this.kpivalueData.value_type = this.kpivaluelistdata[0].value_type;
                this.kpivalueData.value_period = this.kpivaluelistdata[0].value_period;
                this.kpivalueData.denominatorname = this.kpivaluelistdata[0].denominatorname;
                this.kpivalueData.numeratorname = this.kpivaluelistdata[0].numeratorname;
                this.kpivalueData.targetid = this.kpivaluelistdata[0].targetid;
                if (this.kpivaluelistdata[0].base_y_value != null) {
                   this.base_y_value = this.kpivaluelistdata[0].base_y_value;

                }

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
                keys = keys.filter(e => e !== 'targetid');
                keys = keys.filter(e => e !== 'target_year');
                keys = keys.filter(e => e !== 'target_month');
                // keys = keys.filter(e => e !== 'target_date');
                keys = keys.filter(e => e !== 'kpiname');
                keys = keys.filter(e => e !== 'value_type');
                keys = keys.filter(e => e !== 'subtenant_name');
                keys = keys.filter(e => e !== 'kpiid');
                keys = keys.filter(e => e !== 'numeratorname');
                keys = keys.filter(e => e !== 'denominatorname');
                keys = keys.filter(e => e !== 'base_y_value');
                keys = keys.filter(e => e !== 'value_period');
                keys = keys.filter(e => e !== 'created_at');
                keys = keys.filter(e => e !== 'updated_at');
                keys = keys.filter(e => e !== 'deleted_at');

                var arr = [];
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    var test = true;
                    if(keys[i] == 'actual_denominator' || keys[i] == 'actual_numerator' || keys[i] == 'notes') {
                        test = false;
                    }
                    arr.push({
                        key: keys[i],
                        label: this.get_text(keys[i] + '@kpi_values@c'),
                        sortable: test,
                        resizeable: true
                    });
                }
                arr.push({
                    key: 'actions',
                    label: this.get_text('actions@kpi_values@c'),
                    sortable: false,
                    resizeable: true
                });
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
                //console.log(filterData);
              this.yearonetotal=this.yearonetotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.yeartwototal=this.yeartwototal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.yearthreetotal=this.yearthreetotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return this.$store.getters.kpivalueshistory;
                // return this.$storehttps://www.facebook.com/settings.getters.translationsdatalist
            },
            getRowCount() {
                return this.$store.getters.kpivalueshistory.length
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
            base_y_valuesave() {
                this.isValidationAllowed = true
                //alert(this.base_y_value);
                if (this.base_y_value == '') {
                    //alert("hii");
                    return false;
                }


                Vue.axios.post(`/kpibaseyvaluesave`, {
                    base_y_value: this.base_y_value,
                    targetid: this.kpivalueData.targetid
                })
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

                          this.$store.dispatch('get_text_title', 'success@m');
                          this.$store.dispatch('get_text_message', response.data.msg+'@m');
                          Vue.prototype.$notify.success({
                            title: this.$store.state.title,
                            message: this.$store.state.message,
                            type: 'Success',
                            position: 'top-right'
                          })


                            // this.$store.dispatch('loadPriorities');
                        }


                    })
                    .catch((error) => {
                        console.log(error)
                    })

            },
            goToList() {
                sessionStorage.removeItem('kpi_id');
                window.location.replace('/kpilist')
            },
            goToNext() {
                window.location.replace('/newFormGenerator/3/' + this.$route.params.id)
            },
            kpivalueshistorysave(kpitargetdata) {
                // alert(kpitargetdata);
                this.$store.state.isLoading = true;
                Vue.axios.post(`/kpivalueshistorysave`, {data: kpitargetdata})
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
                        } else if (response.data.code == 202) {
                            this.$store.state.isLoading = false;
                            this.$store.dispatch('loadkpivalueshistory', this.$route.params.id);
                        } else {
                            //       this.showingeditModal = true;

                          this.$store.dispatch('get_text_title', 'success@m');
                          this.$store.dispatch('get_text_message', response.data.msg+'@m');
                          Vue.prototype.$notify.success({
                            title: this.$store.state.title,
                            message: this.$store.state.message,
                            type: 'Success',
                            position: 'top-right'
                          })
                            this.$store.state.isLoading = false;
                            this.$store.dispatch('loadkpivalueshistory', this.$route.params.id);

                            // this.$store.dispatch('loadPriorities');
                        }


                    })
                    .catch((error) => {
                        console.log(error)
                    })


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
                Vue.axios.post(`/kpivaluesUpdate`, {kpivalues: this.$store.getters.kpivalueshistory})
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
                            this.showmodelhistory = true;
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
                            this.$store.dispatch('loadkpivalueshistorycheck', this.$route.params.id);
                            //this.kpivaluelistdata=this.$store.getters.kpivalueshistory;

                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })


            },


            updatekpivalues() {
                //this.submitted = true;

                this.updated = true;

                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.showingeditModal = false;
                        console.log(this.$store.getters.kpivalueshistory);
                        for (var key in this.$store.getters.kpivalueshistory) {
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
                                this.actual_value = this.actual_value.toFixed(8);

                            }

                            if (this.$store.getters.kpivalueshistory[key].id == this.kpivalueData[0].id) {
                                this.$store.getters.kpivalueshistory[key].actual_value = this.actual_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.$store.getters.kpivalueshistory[key].actual_numerator = this.actual_numerator;
                                this.$store.getters.kpivalueshistory[key].actual_denominator = this.actual_denominator;
                                this.$store.getters.kpivalueshistory[key].notes = this.notes;

                            }

                        }

                        this.actual_value = '';
                        this.notes = '';
                        this.actual_numerator = '';
                        this.actual_denominator = '';
                        this.$validator.reset();
                        // note.done = true
                    }
                });

            },


            $can(permissionName) {
                // alert(this.$auth.user().allPermissions);
                return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
            },

            editKpivalues(kpivalueid, value = null) {
                //this.$store.state.isLoading = true;
                // alert(this.base_y_value);

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

                            /*if (response.data.data[0].base_y_value == null) {
                                this.$store.dispatch('get_text_title', 'error@m');
                                this.$store.dispatch('get_text_message', 'please fill the base_y_value' + '@m');
                                Vue.prototype.$notify.error({
                                    title: this.$store.state.title,
                                    message: this.$store.state.message,
                                    type: 'Error',
                                    position: 'top-right'
                                });
                                return false;

                            } else {*/

                                this.actual_value=response.data.data[0].actual_value;
                                this.notes=response.data.data[0].notes;

                                this.base_y_value = response.data.data[0].base_y_value;
                           // }

                            this.showingeditModal = true
                            this.kpivalueData = response.data.data;
                            //alert(response.data.data[0].base_y_value);
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

    .highlight1 {
        opacity: 0.7;
        background-color: #a4b7c1 !important;
        border: none !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
    }
    hr.new1 {
      border-top: 1px solid #c8ced3;
    }
  .tot {
    font-size: 0.975rem;
    font-weight: 400;
    line-height: 1.5;
  }
</style>

