<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col cols="12" xl="12">
                <transition name="slide">
                    <b-card>
                        <div slot="header" v-if="this.$route.params.id == 1">
                            <b-button variant="warning" size="md" class="btn float-right" @click="backToList"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_list@kpi_def@l') }}</b></b-button>
                            <b-button v-if="showmindmap==1" variant="warning" size="md" class="btn float-right"
                                      @click="mindmap"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_map@kpi_def@l') }}</b></b-button>
                        </div>
                        <div slot="header" v-if="this.$route.params.id == 3 || this.$route.params.id == 2">
                            <b class="h4"> {{ this.get_text('name@kpi_def@c')}}: {{ this.$store.state.kpi_name
                                }}</b><br>
                            <b class="h4"> {{ this.get_text('symbol@kpi_def@c') }}: {{
                                this.$store.state.kpi_symbol }}</b>
                            <b-button v-if="showmindmap==1" variant="warning" size="md" class="btn float-right"
                                      @click="mindmap"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_map@kpi_def@l') }}</b></b-button>
                            <b-button variant="warning" size="md" class="btn float-right" @click="backToList"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_list@kpi_def@l') }}</b></b-button>

                        </div>
                        <!--<div slot="header">
                            <b-button variant="primary" @click="goBack"><i class="icon-arrow-left icons font-1xl"></i>Back
                            </b-button>
                        </div>-->
                        <div v-if="this.$store.state.type == 'f'">
                            <!--{{ this.$store.state.nom_value}}-->
                            <!--{{ this.$store.getters.getChild }}-->
                            <form action="" @submit.prevent="onSubmit">
                                <legend>{{ get_text(this.$store.state.formData[1]['groups'][0]['legends']+'@fg_form@l')
                                    }}
                                </legend>
                                <!--@validated="setValidState"-->
                                <vue-form-generator :model="this.$store.state.model"
                                                    :schema="this.$store.state.formData[1]"
                                                    :options="formOptions"
                                                    :ref="index">
                                </vue-form-generator>
                            </form>
                        </div>
                        <div v-else-if="this.$store.state.type == 'w'">
                            <mycomponent :routepath="this.$route.params.id" :model="this.$store.state.model"
                                         :db_name="this.$store.state.db_name"
                                         :tree="this.$store.state.formData"/>
                        </div>
                    </b-card>
                </transition>
            </b-col>
        </b-row>
        <b-row v-if="this.$store.state.is_kpi != true && this.$store.state.is_linked == 'false' && this.$store.state.next_form_id== null">
            <b-col cols="12" xl="12">
                <b-card>
                    <b-row>
                        <b-col md="4" class="my-1">
                            <b-form-group horizontal :label="get_text('filter@l')" class="mb-0">
                                <b-input-group>
                                    <b-form-input v-model="filter" :placeholder="get_text('type_to_search@fg_form@l')"/>
                                    <b-input-group-append>
                                        <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l') }}
                                        </b-btn>
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
                    <b-table id="tabledatas" responsive="sm"
                             :items="tableData"
                             :fields="fields"
                             :current-page="currentPage"
                             :per-page="perPage"
                             :filter="filter" sort-by.sync="sortBy"
                             :sort-description.sync="sortDesc"
                             :sort-direction="sortDirection" @filtered="onFiltered">
                        <template slot="Actions" slot-scope="data">
                            <b-row class="text-center">
                                <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                                    <b-button variant="warning" size="sm" @click="editTabledata(data.item, 'edit')"
                                    ><b><i
                                            class="icon-pencil icons font-1xl"></i></b></b-button>
                                </b-col>&nbsp;
                                <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                    <b-button variant="danger" size="sm"
                                              @click="showingdeleteModal = true;selectfromdata(data.item)"
                                    ><b><i
                                            class="icon-trash icons font-1xl"></i></b></b-button>
                                </b-col>
                            </b-row>
                            <!--<b-modal title="Edit Form Data" size="lg" ref="vueModel" class="modal-primary"
                                     v-model="showingeditModal"
                                     hide-footer>
                                <b-form @submit.prevent="updateformdata">
                                    <b-row>
                                        <b-col sm="6">
                                            <b-form-group>
                                                <label for="Name">Name<i class="fa fa-asterisk danger fa-xs"
                                                                         style="font-size:10px;color:red;"></i></label>
                                                <b-form-input type="text" id="TypeCodeMin" v-validate="'required'"
                                                              name="TypeCodeMin"
                                                              v-model="tableeditadata"
                                                              placeholder="Enter your Min Value"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-button class="float-right" variant="primary" size="lg" type="submit">UPDATE
                                    </b-button>
                                </b-form>
                            </b-modal>-->
                            <b-modal title="Delete Form Data" size="lg" class="modal-danger"
                                     v-model="showingdeleteModal"
                                     ok-variant="danger">
                                <div class="modalcontent">
                                    <h3 class="text-center">{{get_text('are_you_sure_to_delete@fg_form@m')}}?</h3>
                                    <b-col md="12" class="text-center">

                                        <button class="btn btn-outline-danger left"
                                                @click="showingdeleteModal = false; deleteTabledata(tableformdata, 'delete')">
                                            {{ get_text('YES@fg_form@l') }}
                                        </button>&nbsp;
                                        <button class="btn btn-outline-success right"
                                                @click="showingdeleteModal = false;">{{ get_text('NO@fg_form@l')}}
                                        </button>
                                    </b-col>
                                </div>
                            </b-modal>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="totalRows" aria-controls="tabledatas"
                                      :per-page="get_text('per_page@l')" v-model="currentPage"
                                      :prev-text="get_text('prev@fg_form@l')" :next-text="get_text('next@fg_form@l')"
                                      hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
        <!--{{ searchViewModal }} === {{ this.$store.getters.getShow }}-->
        <div v-if="this.$store.getters.getShow == true" v-model="showdata"></div>

        <b-modal ref="my-modal" :title="get_text('msg_label_should_you_proceed_to_recording_kpi_target@fg_form@l')"
                 size="lg" class="modal-info" v-model="searchViewModal"
                 ok-variant="info" :cancel-title="get_text('just_save@fg_form@l')"
                 :ok-title="get_text('continue@fg_form@l')" @ok="goToNext" @cancel="goToList">
            {{ get_text('msg_body_should_you_proceed_to_recording_kpi_target@fg_form@l') }}
            <!--<button class="btn btn-outline-danger left"
                    @click="goToNext">YES
            </button>&nbsp;-->
        </b-modal>

        <div v-if="this.$store.getters.getHistoryShow == true && this.$route.params.id ==3"
             v-model="showhistorydata"></div>
        <b-modal ref="my-modal" :title="get_text('msg_label_should_you_proceed_to_recording_kpi_target@fg_form@l')"
                 size="lg" class="modal-info" v-model="searchHistoryModal"
                 ok-variant="info" :cancel-title="get_text('just_save@fg_form@l')"
                 :ok-title="get_text('continue@fg_form@l')" @ok="goToHistory" @cancel="backForm">
            {{ get_text('msg_body_should_you_proceed_to_recording_kpi_target@fg_form@l') }}
        </b-modal>
        <div v-if="this.$route.params.id == 1" v-model="showhistorydatavaluetype"></div>
        <b-modal ref="my-modal" :title="get_text('msg_label_should_you_proceed_to_recording_kpi_target@fg_form@l')"
                 size="lg" class="modal-info" v-model="searchHistoryvalutypeModal"
                 ok-variant="hidden">
            {{ get_text('kpi_history_value_type_message@fg_form@l') }}
        </b-modal>


        <!--<b-modal ref="my-modal" :title="get_text('KPIInformation@fg_form@l')" size="lg" class="modal-info" v-model="searchHistoryModal"-->
        <!--ok-variant="info" :cancel-title="get_text('cancel@fg_form@l')"   @cancel="backForm">-->
        <!--{{ get_text('KPIHistoryMessage@@fg_form@ll') }}-->
        <!--</b-modal>-->
    </div>
</template>
<style>
    .vue-form-generator .form-control.min_value, .vue-form-generator .form-control.max_value {
        color: #FF0000 !important;
        font-weight: bold !important;
    }

    input[type=text]:disabled {
        background: #E4E5E6;
    }

    .addYellow .field-wrap input {
        background: #f6f7c1;
    }

    .submit_Data {
        cursor: not-allowed !important;
        pointer-events: none !important;
    }

    .display-inline label {
        display: inline !important;
    }

    .btn.btn-hidden {
        display: none;
    }

    .form-group.has-success.col-sm-12.addBorderClass.field-select {
        /*border-bottom: 1px solid;
        border-top: 1px solid;
        border-style: ridge;
        padding-top: 1%;*/
        font-size: 16px;
        font-weight: bold;
        background-color: #F0F3F5;
    }

    .form-group.has-success.col-sm-12.addBorderClass.field-select label span {
        font-weight: bold;
    }

    .form-group.has-success.col-sm-12.addBorderClass.field-select > div > select {
        display: none;
    }

    .skipEn .field-wrap {
        float: right;
    }

    .skipAr .field-wrap {
        float: left;
        display: grid;
    }

    .submitEn .field-wrap {
        float: left;
    }

    .submitEn {
        padding-left: 0;
    }

    .submitAr {
        padding-right: 0;
    }

    .vue-form-generator .skipEn input, .vue-form-generator .skipAr input {
        color: #fff !important;
        background-color: #e3392d !important;
        border-color: #e3392d !important;
    }

    /*.submitEn {
        margin-left: 92% !important;
    }
    .submitAr {
        margin-right: 92% !important;;
    }*/
</style>
<script>
    import {store} from '@/components/store'
    import GetFormDA from '@/components/GetFormDA';
    import Vue from 'vue'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import 'vue-form-generator/dist/vfg.css'
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import VueFormGenerator from "vue-form-generator";

    // let key = 'Item 1';
    //sessionStorage.setItem(key, 'demo');
    Vue.use(VueFormGenerator);
    Vue.use(Loading);

    export default {
        name: 'tables',
        store: store,

        data: () => {
            return {
                showmindmap: 0,
                tableeditadata: '',
                finalModel: {},
                activeTabIndex: 0,
                searchViewModal: false,
                searchHistoryModal: false,
                searchHistoryvalutypeModal: false,
                Datadetails: '',
                /*model: {
                    db_name: '',
                    tenant_id: 0,
                },*/
                count: 0,
                index: '',
                formOptions: {
                    validationErrorClass: "has-error",
                    validationSuccessClass: "has-success",
                    //validateAfterLoad: true,
                    validateAfterChanged: true,
                },
                items: '',
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                tableformdata: '',
                showingeditModal: false,
                showingdeleteModal: false,
                fields: [],
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                translation: []
            }
        },
        // beforeRouteEnter(to, from, next) {
        //   let vm = this;
        //   next(vm => {
        //     // this.prevRoute = to.params.name
        //     // vm.prevRoute=from,
        //     alert(from.path)
        //     console.log(from) // this is the Vue instance
        //   })
        //
        // },
        components: {
            'loading': Loading,
            FormWizard,
            TabContent,
            mycomponent: GetFormDA
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
            //alert(this.$route.params.kpi);
            if (this.$route.params.kpi) {
                this.$store.state.is_kpi = true;
                sessionStorage.setItem('kpi_id', this.$route.params.kpi);
                /* if(this.$store.state.type == 'f') {
                     this.editTabledata(this.$route.params.kpi);
                 } else {
                     this.editTabledata12(this.$route.params.kpi);
                 }*/

            }
            //alert(sessionStorage.getItem('kpi_id'));
            if (typeof this.$route.params.kpi == 'undefined' && !sessionStorage.getItem('kpi_id')) {
                sessionStorage.removeItem('kpi_id')
            }
            //if(this.$route.params.kpi)
            this.$store.dispatch('loadFormData', this.$route.params.id);
            if (!this.$store.state.is_kpi) {
                this.$store.commit('loadTableData', [this.$route.params.id]);
            }
        },
        created() {
            //this.$store.dispatch('translation');
        },
        mounted() {
            //alert(document.referrer);
            if (document.referrer.indexOf("mindmap") > -1) {
                this.showmindmap = 1;
            } else {
                this.showmindmap = 0;
            }
            if (sessionStorage.getItem('kpi_id')) {
                //alert('in')
                this.$store.state.model.kpi_id = sessionStorage.getItem('kpi_id');
                //sessionStorage.removeItem('kpi_id');
            }

            if (this.$route.params.kpi) {
                this.editTabledata(this.$route.params.kpi);
            }
            this.$store.state.model.tenant_id = this.$auth.user().tenant_id;
            if (!this.$store.state.is_kpi) {
                Vue.axios.get('/fg_form_tabledata/' + this.$route.params.id)
                    .then((response) => {
                        this.Datadetails = response.data;
                        this.items = this.Datadetails;
                        var keys = [];
                        for (var k in this.items[0]) keys.push({
                            'key': k,
                            'label': this.get_text(k + '@' + this.$store.state.db_name + '@c')
                        });
                        keys.push({'key': 'Actions', 'label': this.get_text('actions@fg_form@l')});
                        keys = keys.filter(e => e.key !== 'id');
                        keys = keys.filter(e => e.key !== 'created_at');
                        keys = keys.filter(e => e.key !== 'updated_at');
                        this.fields = keys;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        computed: {
            tableData() {

                var filterData = this.$store.state.tableData;
                this.totalRows = filterData.length;
                //alert(this.totalRows)
                return filterData;
            },
            showdata() {
                //alert('in');
                this.searchViewModal = this.$store.state.searchViewModal;
                this.$store.state.searchViewModal = false
            },
            showhistorydata() {
                //alert('in');
                this.searchHistoryModal = this.$store.state.searchHistoryModal;
                this.$store.state.searchHistoryModal = false
            },
            showhistorydatavaluetype() {
                //alert('in');
                this.searchHistoryvalutypeModal = this.$store.state.searchHistoryvalutypeModal;
                this.$store.state.searchHistoryvalutypeModal = false
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
            setValidState(isValid) {
                /*this.$store.state.isValid = false;
                var base_y_value = $(".base_y_value").val();
                var y1_value = $(".y1_value").val();
                var y2_value = $(".y2_value").val();
                var y3_value = $(".y3_value").val();
                var max_value = $(".max_value").val();
                var array = [base_y_value, y1_value, y2_value,y3_value];
                var grater = Math.max.apply(Math, array);
                max_value = grater > max_value ? grater : max_value;
                this.$store.state.model.max_value = max_value;*/
            },
            mindmap() {
                //sessionStorage.removeItem('kpi_id');
                window.location.replace('/mindmap')
            },
            backToList() {
                localStorage.setItem('isSession', 'true');
                sessionStorage.removeItem('kpi_id');
                window.location.replace('/kpilist')
            },
            goToList() {
                sessionStorage.removeItem('kpi_id');
                window.location.replace('/kpilist')
            },
            goToHistory() {
                window.location.replace('/kpivalueshistory/' + this.$route.params.kpi);
            },
            backForm() {
                this.$store.state.model.target_determining_method = '';
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
            processTaskLink(id) {
                this.$store.state.processInstance = [];
                return `/newFormGenerator/${id.toString()}`
            },
            goToNext(processId) {
                this.$store.state.searchViewModal = false;
                const processTaskLink = this.processTaskLink(this.$store.state.next_form_id);
                window.location.replace(processTaskLink);
            },
            selectfromdata(dataitem) {
                this.tableformdata = dataitem;
            },
            goBack() {
                this.$router.go(-1)
            },
            editTabledata(tabledataedit, value = null) {
                //alert('sdfsdfsdf');
                const editId = (tabledataedit.id) ? tabledataedit.id : tabledataedit;

                this.$store.state.isLoading = true;
                Vue.axios.get(`/tabledatabyId/${this.$route.params.id}/${editId}`)
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
                                if (typeof response.data[0] != "undefined") {
                                    console.log(response.data[0]);
                                    this.$store.state.model = response.data[0];
                                }
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            /*onSubmit: function () {
                alert('Yay. Done!');
                Vue.axios.post(`/fg_form`, this.model).then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        console.log('Created user', response.data.code, 'from the server')
                        Vue.prototype.$notify({
                            title: 'Success',
                            message: response.data.msg,
                            type: 'success',
                            position: 'top-right'
                        });
                        this.$refs.tabledatas.reload();
                        commit('CREATED_USER', user.data)
                    } else {
                        Vue.prototype.$notify.error({
                            title: 'Error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right'
                        })
                    }
                })
            },*/
            updateformdata: function () {
                this.showingeditModal = false;
                Vue.axios.post(`/tableeditadataid/${this.$route.params.id}/${this.tableeditadataid}/${this.tableeditadata}`).then(response => {
                    this.$store.commit('loadTableData', [this.$route.params.id]);
                    if (response.data.code == 200) {

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
            deleteTabledata(tabledataedit, value = null) {
                this.showingeditModal = false;
                this.showingeditModal = false;
                Vue.axios.delete(`/tabledatadelete/${this.$route.params.id}/${tabledataedit.id}`).then(response => {
                    this.$store.commit('loadTableData', [this.$route.params.id]);
                    if (response.data.code == 200) {

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
            getRowCount(items) {
                return items.length
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        },
        filters: {
            uppercase: function (v) {
                return v.charAt(0).toUpperCase() + v.slice(1);
            }
        }
    }
</script>
