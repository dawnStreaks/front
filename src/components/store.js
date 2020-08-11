import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from '../plugins/i18n.js';

Vue.use(Vuex);
Vue.use(i18n);
Vue.use(Element);
Vue.prototype.$notify = Notification;
//window.Event = new Vue();

export const store = new Vuex.Store({
    state: {
        isValid: false,
        translations: {
            en: {
                "hello": "Hello World"
            },
            ar: {
                "hello": "Hallo Verden"
            }
        },
        translationsdatalist: '',
        next_form_id: '',
        propTitle: '',
        propSubTitle: '',
        next_form_arg: '',
        is_linked: '',
        is_kpi: false,
        setTenant: [],
        setSubTenant: [],
        setCategory: [],
        setmtp: '',
        setfiscal: [],
        setmtpprev: [],
        kpivalueshistorycount: 1,
        kpihistorycount: 0,
        kpicurrentvaluecount:false,
        kpi_name: '',
        kpi_symbol: '',
        model: {
            db_name: '',
            tenant_id: 0,
            //id: 0,
            importance: 1,
            value_type: null,
            mtp_id: null,
            target_determining_method: null,
            value_periodicity: null,
            value_period: null,
            base_fy: null,
            base_y_value: null,
            annual_rate_h: null,
            y1_value: null,
            y2_value: null,
            y3_value: null,
            y1_rate_p: null,
            y2_rate_p: null,
            y3_rate_p: null,
            y1_q1_value: null,
            y1_q2_value: null,
            y1_q3_value: null,
            y1_q4_value: null,
            y2_q1_value: null,
            y2_q2_value: null,
            y2_q3_value: null,
            y2_q4_value: null,
            y3_q1_value: null,
            y3_q2_value: null,
            y3_q3_value: null,
            y3_q4_value: null,
            q1_pct: null,
            q2_pct: null,
            q3_pct: null,
            q4_pct: null,
            mtp_value: null,
            kpi_id: 0,
            norm_date: '',
            norm_value: '',
            region_origin: '',
            target_start_date: '',
            data_name: '',
            data_subtenant_id: '',
            data_phone_internal: '',
            data_email: '',
            auditing_name: '',
            auditing_subtenant_id: '',
            auditing_phone_internal: '',
            auditing_email: '',
            contact_name: '',
            contact_subtenant_id: '',
            contact_phone_internal: '',
            contact_email: '',
            coordination_name: '',
            coordination_subtenant_id: '',
            coordination_phone_internal: '',
            coordination_email: '',
            number_type: '',
            rounding_decimals: 0
        },
        round_deci:'',
        loading: false,
        groups: [],
        tableData: [],
        groupTanent: [],
        parents: [],
        user_of_data: [],
        user_of_auditing: [],
        isLoading: false,
        fullPage: true,
        city: [],
        db_name: '',
        type: '',
        formData: [],
        searchViewModal: false,
        searchHistoryModal: false,
        searchHistoryvalutypeModal: false,
        //data_name: [], data_subtenant_id: [], data_phone_internal: [], data_email: [],
        //auditing_name: [], auditing_subtenant_id: [], auditing_phone_internal: [], auditing_email: [],
        //contact_name: [], contact_subtenant_id: [], contact_phone_internal: [], contact_email: [],
        //coordination_name: [], coordination_subtenant_id: [], coordination_phone_internal: [], coordination_email: [],
        process_obj: [],
        region_origin: '',
        norm_date: '',
        norm_value: '',
        priorities: '',
        title: '',
        message: '',
        kpivalues: '',
        kpivalueshistory: '',
        kpidefhistories: '',
        notifications: [],
        messageRec: [],
    },
    mutations: {
        NEW_PM_NOTIFICATION(state, message) {
          state.notifications.unshift(message)
          state.messageRec.unshift(message)
            console.log('ssss');
             Vue.axios({
                url: 'kpidefList',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            state.priorities = (response.data.PRCTypes);
                    }
                });
        },
        SET_PRIORITIES(state, priorities) {
            state.priorities = priorities
        },
        SET_KPIVALUES(state, kpivalues) {
            state.kpivalues = kpivalues
        },
        SET_KPIVALUESHISTORY(state, kpivalueshistory) {
            state.kpivalueshistory = kpivalueshistory
        },
        SET_KPIVALUESHISTORYCOUNT(state, kpivalueshistorycount) {
            state.kpivalueshistorycount = kpivalueshistorycount
        },
        SET_KPIVALUECOUNT(state, kpivaluescurrentcount) {
            state.kpicurrentvaluecount = kpivaluescurrentcount
        },
        SET_KPIHISTORIES(state, kpihistory) {
            state.kpidefhistories = kpihistory
        },

        loadTableData(state, [formId]) {
            Vue.axios.get('/fg_form_tabledata/' + formId)
                .then((response) => {
                    this.state.tableData = response.data;
                    this.state.model.target_start_date = this.state.tableData[1].target_start_date;

                })
                .catch((error) => {
                    console.log(error)
                })
        },
        SET_GROUP(state, groups) {
            state.groups = groups
        },
        CREATED_TRANSLATIONS(state, userObject) {
            this.dispatch('loadTranslations')

        },

        SET_TRANSLATIONS(state, translationslist) {
            state.translationsdatalist = translationslist
        },
        SET_GROUP_DATA(state, [data, type, dataValues, processId]) {
            var language = (i18n.locale);
            if (Object.keys(dataValues).length > 0) {
                for (var j = 0; j < Object.keys(dataValues).length; j++) {
                    sessionStorage.setItem(dataValues[j].main + '_sql', dataValues[j].expression);
                }
            }

            var output = [];
            for (var i = 1; i <= Object.keys(data).length; i++) {
                for (var k = 0; k < data[i]['groups'][0]['fields'].length; k++) {
                    /**
                     * Add function for fetch city base on country
                     */
                    if(processId ==1) {
                    const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['label'] + "@kpi_def@c"];

                    var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['label'] + "@kpi_def@c";
                    } else if(processId == 3) {
                        const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['label'] + "@kpi_target@c"];

                        var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['label'] + "@kpi_target@c";
                    } else {
                        var trans = data[i]['groups'][0]['fields'][k]['label'];
                    }

                  const transtextselect = JSON.parse(localStorage.getItem('translation'))[i18n.locale]['please_select' + "@l"];
                  var transtextselectv = (transtextselect) ? transtextselect : "!" + 'please_select' + "@l";
                    Vue.set(data[i]['groups'][0]['fields'][k], 'label', trans);
                    Vue.set(data[i]['groups'][0]['fields'][k], 'placeholder', trans);

                   if (data[i]['groups'][0]['fields'][k]['type']=='select') {
                     Vue.set(data[i]['groups'][0]['fields'][k], 'label', trans);
                     Vue.set(data[i]['groups'][0]['fields'][k]['selectOptions'],'noneSelectedText',transtextselectv);
                   // alert(data[i]['groups'][0]['fields'][k]['selectOptions']['noneSelectedText']);
                    //Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                   // data[i]['groups'][0]['fields'][k]['values']['selected']="sdsdfsdf";

                  }


                    if (data[i]['groups'][0]['fields'][k]['model'] == 'address_country_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchCitiesForCountry', newVal))
                    }
                    /**
                     * Set city base on country id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'address_city_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.city)
                    }

                    if (type == 'f') {
                        if (data[i]['groups'][0]['fields'][k]['buttonText'] == 'submit') {
                            language = ((i18n.locale) == 'en') ? 'col-sm-1 submitEn' : 'col-sm-1 submitAr';

                            const transtextButton = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['buttonText'] + "@fg_form@l"];

                            var transButton = (transtextButton) ? transtextButton : "!" + "submit@l";

                            Vue.set(data[i]['groups'][0]['fields'][k], 'styleClasses', language)
                            Vue.set(data[i]['groups'][0]['fields'][k], 'buttonText', transButton)
                            Vue.set(data[i]['groups'][0]['fields'][k], 'onSubmit', (model) => store.dispatch('onSubmit', [model,'save']))
                        }

                        if (data[i]['groups'][0]['fields'][k]['buttonText'] == 'cancel') {
                            language = ((i18n.locale) == 'en') ? 'col-sm-11 skipEn' : 'col-sm-11 skipAr';

                            const transtextButton = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['buttonText'] + "@fg_form@l"];

                            var transButton = (transtextButton) ? transtextButton : "!" + "cancel@l";

                            Vue.set(data[i]['groups'][0]['fields'][k], 'styleClasses', language)
                            Vue.set(data[i]['groups'][0]['fields'][k], 'buttonText', transButton)

                            Vue.set(data[i]['groups'][0]['fields'][k], 'onSubmit', (model) => store.dispatch('onSubmit', [model,'cancel']))
                        }
                    }

                    /**
                     * Add Function for get sub tenant base on tenant id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'subtenant_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchSectorChild', [newVal, model, sessionStorage.getItem('subtenant_id_sql')]))
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'subtenant_id');
                    }

                    /**
                     * Set sub tenant base on tenant id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'child_subtenant_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchChild', [model]));
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.parents)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'child_subtenant_id');
                    }

                    /**
                     * Add Function for get sub tenant base on tenant id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'scope_table') {
                        const scopData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da]+'@fg_form@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da]+'@fg_form@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da]
                            }
                            scopData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'noneSelectedText', 'sdfsfsddsf');

                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchProcessObject', [newVal, model, sessionStorage.getItem('scope_table_sql')]))
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'value_period') {
                        const valueperiodData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueperiodData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueperiodData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'value_period');
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'value_explanation') {
                        const valueexplanationData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueexplanationData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueexplanationData);

                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchExplation', [newVal, model]))
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'value_1') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'valuesFieldOne');
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'value_2') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'valuesFieldTwo');
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'numerator_name') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'numerator_name');
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'denominator_name') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'denominator_name');
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'importance') {
                        const valueexplanationData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_def@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueexplanationData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueexplanationData);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'prediction_method') {
                        const valueexplanationData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name;

                            const newScopeData = {
                                name: trans + '@l',
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueexplanationData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueexplanationData);
                    }


                    if (data[i]['groups'][0]['fields'][k]['model'] == 'target_determining_method') {
                        const valueperiodData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //alert(data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l');
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueperiodData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueperiodData);
                        //this.state.model.target_determining_method = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        this.state.model.target_determining_method = (typeof this.state.model.target_determining_method != "undefined" && this.state.model.target_determining_method != null) ? this.state.model.target_determining_method : data[i]['groups'][0]['fields'][k]['defaultVal']

                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculation', [newVal, model]))
                    }

                    if(data[i]['groups'][0]['fields'][k]['model'] == 'value_type')  {
                        const valueperiodData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            //alert(data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l');
                            //console.log(data[i]['groups'][0]['fields'][k]['values'][da])
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueperiodData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueperiodData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('kpiDefCheck', [newVal, model]));
                    }


                    if(data[i]['groups'][0]['fields'][k]['model'] == 'number_type')  {
                        const valueperiodData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@fg_form@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueperiodData.push(newScopeData);
                        }
                        //console.log(scopData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueperiodData);
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'number_type');
                    }

                    if(data[i]['groups'][0]['fields'][k]['model'] == 'rounding_decimals')  {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'rounding_decimals');
                    }

                    /*if(data[i]['groups'][0]['fields'][k]['model'] == 'value_type')  {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('kpiDefCheck', [newVal, model]))
                    }*/

                    /**
                     * Set sub tenant base on tenant id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'scope_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.process_obj)
                    }


                    /**
                     * Add Function for get sub tenant base on tenant id
                     */
                  if (data[i]['groups'][0]['fields'][k]['model'] == 'value_period') {
                    var datachanged='value_period';
                    // Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'user_of_data');
                    if(typeof Vue.router.currentRoute.params.kpi != "undefined") {
                      var old = data[i]['groups'][0]['fields'][k]['defaultVal'];
                      Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchUserData', [old, datachanged, model]))
                    }
                    // else{
                    //   Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.value_period)
                    // }
                  }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'user_of_data') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'user_of_data');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.user_of_data)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchUserData', [newVal, 'data', model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'user_of_auditing') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'user_of_auditing');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.user_of_auditing)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchUserData', [newVal, 'auditing', model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'user_of_contact') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'user_of_contact');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchUserData', [newVal, 'contact', model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'user_of_coordination') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'user_of_coordination');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchUserData', [newVal, 'coordination', model]))
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'data_name') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.data_name)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'data_email') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.data_email)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'data_subtenant_id') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.data_subtenant_id)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'data_phone_internal') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.data_phone_internal)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'auditing_name') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.auditing_name)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'auditing_email') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.auditing_email)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'auditing_subtenant_id') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.auditing_subtenant_id)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'auditing_phone_internal') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.auditing_phone_internal)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'contact_name') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.contact_name)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'contact_email') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.contact_email)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'contact_subtenant_id') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.contact_subtenant_id)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'contact_phone_internal') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.contact_phone_internal)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'coordination_name') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.coordination_name)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'coordination_email') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.coordination_email)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'coordination_subtenant_id') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.coordination_subtenant_id)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'coordination_phone_internal') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.coordination_phone_internal)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'benchmarket_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('fetchBenchMarkData', [newVal]))
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'norm_value') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.norm_date)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'norm_date') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.norm_value)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'region_origin') {
                        //Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.region_origin)
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                    }

                    /**
                     * Set sub tenant base on tenant id
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'child_subtenant_id') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => store.state.parents,)
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'target_start_date') {
                        this.state.model.target_start_date = data[i]['groups'][0]['fields'][k]['values'][0]['start_date']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'value_periodicity') {

                        const valueperiodData = [];
                        for (var da in data[i]['groups'][0]['fields'][k]['values']) {
                            const transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_target@l'];

                            var trans = (transtext) ? transtext : "!" + data[i]['groups'][0]['fields'][k]['values'][da].name+'@kpi_target@l';

                            const newScopeData = {
                                name: trans,
                                id: data[i]['groups'][0]['fields'][k]['values'][da].id
                            }
                            valueperiodData.push(newScopeData);
                        }
                        Vue.set(data[i]['groups'][0]['fields'][k], 'values', () => valueperiodData);

                        this.state.model.value_periodicity = (typeof this.state.model.value_periodicity != "undefined" && this.state.model.value_periodicity != null) ? this.state.model.value_periodicity : data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'margin_pct') {
                        this.state.model.margin_pct = (typeof this.state.model.margin_pct != "undefined" && this.state.model.margin_pct != null) ? this.state.model.margin_pct : data[i]['groups'][0]['fields'][k]['defaultVal']

                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'mtp_id') {
                        this.state.model.mtp_id = (typeof this.state.model.mtp_id != "undefined" && this.state.model.mtp_id != null) ? this.state.model.mtp_id : data[i]['groups'][0]['fields'][k]['defaultVal']

                        //this.state.model.mtp_id = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'min_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', data[i]['groups'][0]['fields'][k]['model']);

                        this.state.model.min_value = (typeof this.state.model.min_value != "undefined" && this.state.model.min_value != null) ? this.state.model.min_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0)

                        const transTooltip = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['attributes']['input']['title'] + "@kpi_target@c"];

                        var transTool = (transTooltip) ? transTooltip : "!" + data[i]['groups'][0]['fields'][k]['attributes']['input']['title'] + "@kpi_target@c";

                        Vue.set(data[i]['groups'][0]['fields'][k]['attributes']['input'], 'title', transTool);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'max_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', data[i]['groups'][0]['fields'][k]['model']);

                        this.state.model.max_value = (typeof this.state.model.max_value != "undefined" && this.state.model.max_value != null) ? this.state.model.max_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0)

                        const transTooltip = JSON.parse(localStorage.getItem('translation'))[i18n.locale][data[i]['groups'][0]['fields'][k]['attributes']['input']['title'] + "@kpi_target@c"];

                        var transTool = (transTooltip) ? transTooltip : "!" + data[i]['groups'][0]['fields'][k]['attributes']['input']['title'] + "@kpi_target@c";

                        Vue.set(data[i]['groups'][0]['fields'][k]['attributes']['input'], 'title', transTool);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'base_fy') {
                        this.state.model.base_fy = (typeof this.state.model.base_fy != "undefined" && this.state.model.base_fy != null) ? this.state.model.base_fy : data[i]['groups'][0]['fields'][k]['defaultVal']
                        //this.state.model.base_fy = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'base_y_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'base_y_value');
                        this.state.model.base_y_value = (typeof this.state.model.base_y_value != "undefined" && this.state.model.base_y_value != null) ? this.state.model.base_y_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);

                        //this.state.model.base_y_value = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'max_y_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'max_y_value');
                        this.state.model.max_y_value = (typeof this.state.model.max_y_value != "undefined" && this.state.model.max_y_value != null) ? this.state.model.max_y_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'min_y_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'min_y_value');
                        this.state.model.min_y_value = (typeof this.state.model.min_y_value != "undefined" && this.state.model.min_y_value != null) ? this.state.model.min_y_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'annual_rate_h') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'annual_rate_h');

                        this.state.model.annual_rate_h = (typeof this.state.model.annual_rate_h != "undefined" && this.state.model.annual_rate_h != null) ? this.state.model.annual_rate_h : data[i]['groups'][0]['fields'][k]['defaultVal'];

                        //this.state.model.annual_rate_h = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y1_value = (typeof this.state.model.y1_value != "undefined" && this.state.model.y1_value != null) ? this.state.model.y1_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y1_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y2_value = (typeof this.state.model.y2_value != "undefined" && this.state.model.y2_value != null) ? this.state.model.y2_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y2_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y3_value = (typeof this.state.model.y3_value != "undefined" && this.state.model.y3_value != null) ? this.state.model.y3_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y3_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_q1_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_q1_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y1_q1_value = (typeof this.state.model.y1_q1_value != "undefined" && this.state.model.y1_q1_value != null) ? this.state.model.y1_q1_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);

                        //alert(this.state.model.y1_q1_value)
                        //this.state.model.y1_q1_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_q2_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_q2_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y1_q2_value = (typeof this.state.model.y1_q2_value != "undefined" && this.state.model.y1_q2_value != null) ? this.state.model.y1_q2_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y1_q2_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_q3_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_q3_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y1_q3_value = (typeof this.state.model.y1_q3_value != "undefined" && this.state.model.y1_q3_value != null) ? this.state.model.y1_q3_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y1_q3_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_q4_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_q4_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y1_q4_value = (typeof this.state.model.y1_q4_value != "undefined" && this.state.model.y1_q4_value != null) ? this.state.model.y1_q4_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y1_q4_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_q1_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_q1_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y2_q1_value = (typeof this.state.model.y2_q1_value != "undefined" && this.state.model.y2_q1_value != null) ? this.state.model.y2_q1_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y2_q1_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_q2_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_q2_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y2_q2_value = (typeof this.state.model.y2_q2_value != "undefined" && this.state.model.y2_q2_value != null) ? this.state.model.y2_q2_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y2_q2_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_q3_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_q3_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y2_q3_value = (typeof this.state.model.y2_q3_value != "undefined" && this.state.model.y2_q3_value != null) ? this.state.model.y2_q3_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y2_q3_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_q4_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_q4_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y2_q4_value = (typeof this.state.model.y2_q4_value != "undefined" && this.state.model.y2_q4_value != null) ? this.state.model.y2_q4_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y2_q4_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_q1_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_q1_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y3_q1_value = (typeof this.state.model.y3_q1_value != "undefined" && this.state.model.y3_q1_value != null) ? this.state.model.y3_q1_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);

                        //this.state.model.y3_q1_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_q2_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_q2_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y3_q2_value = (typeof this.state.model.y3_q2_value != "undefined" && this.state.model.y3_q2_value != null) ? this.state.model.y3_q2_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y3_q2_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_q3_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_q3_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y3_q3_value = (typeof this.state.model.y3_q3_value != "undefined" && this.state.model.y3_q3_value != null) ? this.state.model.y3_q3_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y3_q3_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_q4_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_q4_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.y3_q4_value = (typeof this.state.model.y3_q4_value != "undefined" && this.state.model.y3_q4_value != null) ? this.state.model.y3_q4_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (typeof data[i]['groups'][0]['fields'][k]['defaultVal'] != "undefined" && data[i]['groups'][0]['fields'][k]['defaultVal'] != null ? data[i]['groups'][0]['fields'][k]['defaultVal'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0);
                        //this.state.model.y3_q4_value = data[i]['groups'][0]['fields'][k]['defaultVal']
                    }


                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y1_rate_p') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y1_rate_p');
                        //this.state.model.y1_rate_p = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        this.state.model.y1_rate_p = (typeof this.state.model.y1_rate_p != "undefined" && this.state.model.y1_rate_p != null) ? this.state.model.y1_rate_p : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y2_rate_p') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y2_rate_p');
                        //this.state.model.y2_rate_p = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        this.state.model.y2_rate_p = (typeof this.state.model.y2_rate_p != "undefined" && this.state.model.y2_rate_p != null) ? this.state.model.y2_rate_p : data[i]['groups'][0]['fields'][k]['defaultVal'];

                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'y3_rate_p') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'y3_rate_p');
                        this.state.model.y3_rate_p = (typeof this.state.model.y3_rate_p != "undefined" && this.state.model.y3_rate_p != null) ? this.state.model.y3_rate_p : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        //this.state.model.y3_rate_p = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'mtp_value') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'mtp_value');
                        Vue.set(data[i]['groups'][0]['fields'][k], 'disabled', true);
                        this.state.model.mtp_value = (typeof this.state.model.mtp_value != "undefined" && this.state.model.mtp_value != null) ? this.state.model.mtp_value : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        //this.state.model.mtp_value = data[i]['groups'][0]['fields'][k]['defaultVal'];
                    }

                    if (data[i]['groups'][0]['fields'][k]['model'] == 'q1_pct') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'q1_pct');
                        //this.state.model.q1_pct = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        this.state.model.q1_pct = (typeof this.state.model.q1_pct != "undefined" && this.state.model.q1_pct != null) ? this.state.model.q1_pct : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'q2_pct') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'q2_pct');
                        this.state.model.q2_pct = (typeof this.state.model.q2_pct != "undefined" && this.state.model.q2_pct != null) ? this.state.model.q2_pct : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        //this.state.model.q2_pct = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'q3_pct') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'q3_pct');
                        //this.state.model.q3_pct = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        this.state.model.q3_pct = (typeof this.state.model.q3_pct != "undefined" && this.state.model.q3_pct != null) ? this.state.model.q3_pct : data[i]['groups'][0]['fields'][k]['defaultVal'];

                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'q4_pct') {
                        Vue.set(data[i]['groups'][0]['fields'][k], 'fieldClasses', 'q4_pct');
                        this.state.model.q4_pct = (typeof this.state.model.q4_pct != "undefined" && this.state.model.q4_pct != null) ? this.state.model.q4_pct : data[i]['groups'][0]['fields'][k]['defaultVal'];
                        //this.state.model.q4_pct = data[i]['groups'][0]['fields'][k]['defaultVal'];
                        Vue.set(data[i]['groups'][0]['fields'][k], 'onChanged', (model, newVal) => store.dispatch('targetCalculationOne', [newVal, model]))
                    }


                    /**
                     * If form is not wizard add submit button
                     */

                    /**
                     * Add Button with input field for opening pop up window
                     */
                    if (data[i]['groups'][0]['fields'][k]['model'] == 'input_with_button') {
                        Vue.set(data[i]['groups'][0]['fields'][k]['buttons'][0], 'onclick', (model) => store.dispatch('clickHere', model))
                    }

                }
            }

            this.state.formData = data;
        },
        SET_DB_TABLE(state, db_name) {
            this.state.db_name = db_name;
        },
        SET_FORM_TYPE(state, type) {
            this.state.type = type;
        },
        SET_CITY_DATA(state, db_name) {
            this.state.city = db_name;
        },
        SET_SECTOR_CHILD(state, [subtenant, rep]) {
            //alert(rep);
            this.state.parents = subtenant;
            //this.dispatch('setCla', [subtenant, rep])
        },
        SET_PROCESS_OBJ(state, [process_obj]) {
            //alert(rep);
            this.state.process_obj = process_obj;
            //this.dispatch('setCla', [subtenant, rep])
        },
        SET_USER_DATA(state, [userData, type]) {

            const name = `${type}_name`;
            //alert(name)
            const email = `${type}_email`;
            const phone_internal = `${type}_phone_internal`;
            const subtenant_id = `${type}_subtenant_id`;
            //alert(name);
            //const temp = {"name": userData[0].name};
            //this.state.data_name.push(temp);
            //this.state.data_name[0]['name'] = userData[0].name;
            this.state.model[name] = userData[name];
            this.state.model[email] = userData[email];
            this.state.model[phone_internal] = userData[phone_internal];
            this.state.model[subtenant_id] = userData[subtenant_id];
            //alert(store.state.data_name);
        },
        SET_BENCHMARK_DATA(state, [userData]) {

            //alert(userData['region_of_origin']);
            console.log(userData['norm_date']);
            this.state.model.norm_value = userData['norm_value'];
            this.state.model.norm_date = userData['norm_date'];
            this.state.model.region_origin = userData['region_origin'];
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        notifications: state => state.notifications,
        groups: state => state.groups,
        getRowCount: state => state.groups.length,
        getChild: state => state.parents.length,
        getShow: state => state.searchViewModal,
        getHistoryShow: state => state.searchHistoryModal,
        priorities: state => state.priorities,
        type: state => state.type,
        translations: state => state.translations,
        translationsdatalist: state => state.translationsdatalist,
        kpivalues: state => state.kpivalues,
        kpivalueshistory: state => state.kpivalueshistory,
        kpidefhistories: state => state.kpidefhistories,
        setmtp: state => state.setmtp[0].value,

    },
    actions: {
        fetchExplation({commit}, [val, model]) {
            if (val != 21) {
                $('.valuesFieldOne').attr('disabled', true);
                $('.valuesFieldTwo').attr('disabled', true);
                $('.valuesFieldTwo').attr('required', false);
                this.state.model.value_1 = 0;
                this.state.model.value_2 = 0;
            } else {
                $('.valuesFieldOne').attr('disabled', false);
                $('.valuesFieldTwo').attr('disabled', false);
                $('.valuesFieldTwo').attr('required', true)
            }
        },
        kpiDefCheck({commit}, [val, model]) {
            if(val == 1) {
                $('.numerator_name').attr('disabled', true);
                $('.denominator_name').attr('disabled', true);
                $('.denominator_name').val('');
                $('.numerator_name').val('');
                $('.rounding_decimals').attr('disabled', true);
                $('.rounding_decimals').attr('readonly', true);

                this.state.model.number_type = 1;
                this.state.model.rounding_decimals = 0;
            } else {
                 if(this.state.kpihistorycount != ''){
                   this.state.searchHistoryvalutypeModal = true;
                 }
                $('.numerator_name').attr('disabled', false);
                $('.denominator_name').attr('disabled', false);
                $('.rounding_decimals').attr('disabled', false);
                $('.rounding_decimals').attr('readonly', false);

                this.state.model.rounding_decimals = 2;
                this.state.model.number_type = 2;
            }
        },
        targetCalculation({commit}, [val, model]) {

            if(this.state.kpihistorycount == 0 && val ==1) {
                this.state.searchHistoryModal = true;
            }
            //alert(model.value_type);
            if(val !=1) {
                $('.base_y_value').attr('disabled', false);
                $('.analysis_resource').attr('disabled', false);
                $('.annual_rate_h').attr('disabled', false);

                $(".q1_pct").val('1').attr('disabled', true);
                $(".q2_pct").val('1').attr('disabled', true);
                $(".q3_pct").val('1').attr('disabled', true);
                $(".q4_pct").val('1').attr('disabled', true);
            } else {
                //this.state.model.value_period = 3;
                //$(".value_period").val(3);
                $('.base_y_value').attr('disabled', true);
                $('.analysis_resource').attr('disabled', true);
                $('.annual_rate_h').attr('disabled', true);
                if(model.value_type == 1) {
                    $(".q1_pct").val(model.q1_pct).attr('disabled', false);
                    $(".q2_pct").val(model.q2_pct).attr('disabled', false);
                    $(".q3_pct").val(model.q3_pct).attr('disabled', false);
                    $(".q4_pct").val(model.q4_pct).attr('disabled', false);
                } else {
                    $(".q1_pct").val(model.q1_pct).attr('disabled', true);
                    $(".q2_pct").val(model.q2_pct).attr('disabled', true);
                    $(".q3_pct").val(model.q3_pct).attr('disabled', true);
                    $(".q4_pct").val(model.q4_pct).attr('disabled', true);
                }
            }
        },
        targetCalculationOne({commit}, [val, model]) {
            var base_y_value = $(".base_y_value").val().replace(/,/g, "");

            var annual_rate_h = $(".annual_rate_h").val();
            var y1_rate_p = $(".y1_rate_p").val();
            var y2_rate_p = $(".y2_rate_p").val();
            var y3_rate_p = $(".y3_rate_p").val();

          /*  //if(model.value_type ==2 ) {
                base_y_value = base_y_value/100;
                y1_rate_p = y1_rate_p/100;
                y2_rate_p = y2_rate_p/100;
                y3_rate_p = y3_rate_p/100;
            //}*/


            base_y_value = (typeof base_y_value != 'undefined' && base_y_value != '') ? base_y_value : 0;
            y1_rate_p = (typeof y1_rate_p != 'undefined' && y1_rate_p != '') ? y1_rate_p : 0;
            y2_rate_p = (typeof y2_rate_p != 'undefined' && y2_rate_p != '') ? y2_rate_p : 0;
            y3_rate_p = (typeof y3_rate_p != 'undefined' && y3_rate_p != '') ? y3_rate_p : 0;

            var y1_value = model.value_type ==2 ? (base_y_value/100 * (1 + parseFloat(y1_rate_p/100))) : (base_y_value * (1 + parseFloat(y1_rate_p/100)));

            //alert(parseFloat(y1_rate_p/100));
            var y2_value = model.value_type ==2 ? (y1_value * (1 + parseFloat(y2_rate_p/100))) : (y1_value * (1 + parseFloat(y2_rate_p/100)));
            var y3_value = model.value_type ==2 ? (y2_value * (1 + parseFloat(y3_rate_p/100))) : (y2_value * (1 + parseFloat(y3_rate_p/100)));

            if(model.value_type ==1 ) {
                var mtp_value = y1_value + y2_value + y3_value;
            }

            //alert(this.state.model.rounding_decimals);
            y1_value = (typeof y1_value != 'undefined' && y1_value != '') ? (model.value_type == 2 ? y1_value*100 : y1_value) : 0;
            y2_value = (typeof y2_value != 'undefined' && y2_value != '') ? (model.value_type == 2 ? y2_value*100 : y2_value): 0;
            y3_value = (typeof y3_value != 'undefined' && y3_value != '') ? (model.value_type == 2 ? y3_value*100 : y3_value) : 0;
            mtp_value = (typeof mtp_value != 'undefined' && mtp_value != '') ? (model.value_type == 2 ? mtp_value*100 : mtp_value) : 0;

            //alert(base_y_value+'=='+y1_rate_p+'=='+y1_value);
            var q1_pct = $(".q1_pct").val();
            var q2_pct = $(".q2_pct").val();
            var q3_pct = $(".q3_pct").val();
            var q4_pct = $(".q4_pct").val();

            q1_pct = (typeof q1_pct != 'undefined' && q1_pct != '') ? q1_pct : 0;
            q2_pct = (typeof q2_pct != 'undefined' && q2_pct != '') ? q2_pct : 0;
            q3_pct = (typeof q3_pct != 'undefined' && q3_pct != '') ? q3_pct : 0;
            q4_pct = (typeof q4_pct != 'undefined' && q4_pct != '') ? q4_pct : 0;

            //if(model.value_type ==2 ) {
                q1_pct = q1_pct/100;
                q2_pct = q2_pct/100;
                q3_pct = q3_pct/100;
                q4_pct = q4_pct/100;
            //}
            if(model.value_type ==1 ) {
                q4_pct = (100-(q1_pct+q2_pct+q3_pct)*100)/100
            }

            var y1_q1_value = y1_value * q1_pct;
            var y1_q2_value = y1_value * q2_pct;
            var y1_q3_value = y1_value * q3_pct;
            var y1_q4_value = y1_value * q4_pct;

            var y2_q1_value = y2_value * q1_pct;
            var y2_q2_value = y2_value * q2_pct;
            var y2_q3_value = y2_value * q3_pct;
            var y2_q4_value = y2_value * q4_pct;

            var y3_q1_value = y3_value * q1_pct;
            var y3_q2_value = y3_value * q2_pct;
            var y3_q3_value = y3_value * q3_pct;
            var y3_q4_value = y3_value * q4_pct;

            this.state.model.y1_value = (typeof y1_value != "undefined" && y1_value != '') ? (model.value_type == 2 ? y1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            this.state.model.y2_value = (typeof y2_value != "undefined" && y2_value != '') ? (model.value_type == 2 ? y2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            this.state.model.y3_value = (typeof y3_value != "undefined" && y3_value != '') ? (model.value_type == 2 ? y3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            this.state.model.mtp_value = (typeof mtp_value != "undefined" && mtp_value != '') ? (model.value_type == 2 ? mtp_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mtp_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            if(model.value_type ==1 ) {
                this.state.model.q4_pct = (100-(q1_pct+q2_pct+q3_pct)*100).toFixed(2);
            }
           // $("#mtp-valuekpi-defc").val((y1_value+y2_value+y3_value).toFixed(3));

            this.state.model.y1_q1_value = (typeof y1_q1_value != "undefined") ? (model.value_type == 2 ? y1_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y1_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y1_q2_value = (typeof y1_q2_value != "undefined") ? (model.value_type == 2 ? y1_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y1_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y1_q3_value = (typeof y1_q3_value != "undefined") ? (model.value_type == 2 ? y1_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y1_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0 ;

            if(model.value_type ==1) {
                this.state.model.y1_q4_value = (typeof y1_q4_value != "undefined") ? (y1_value- (parseInt(y1_q1_value.toFixed(this.state.round_deci)) + parseInt(y1_q2_value.toFixed(this.state.round_deci)) + parseInt(y1_q3_value.toFixed(this.state.round_deci)))).toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
            } else {
                this.state.model.y1_q4_value = (typeof y1_q4_value != "undefined") ? (model.value_type == 2 ? y1_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y1_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            }

            this.state.model.y2_q1_value = (typeof y2_q1_value != "undefined") ? (model.value_type == 2 ? y2_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y2_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y2_q2_value = (typeof y2_q2_value != "undefined") ? (model.value_type == 2 ? y2_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y2_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y2_q3_value = (typeof y2_q3_value != "undefined") ? (model.value_type == 2 ? y2_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y2_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            if(model.value_type ==1) {
                this.state.model.y2_q4_value = (typeof y2_q4_value != "undefined") ? (y2_value- (parseInt(y2_q1_value.toFixed(this.state.round_deci)) + parseInt(y2_q2_value.toFixed(this.state.round_deci)) + parseInt(y2_q3_value.toFixed(this.state.round_deci)))).toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
            } else{
                this.state.model.y2_q4_value = (typeof y2_q4_value != "undefined") ? (model.value_type == 2 ? y2_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y2_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            }

            this.state.model.y3_q1_value = (typeof y3_q1_value != "undefined") ? (model.value_type == 2 ? y3_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y3_q1_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y3_q2_value = (typeof y3_q2_value != "undefined") ? (model.value_type == 2 ? y3_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y3_q2_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            this.state.model.y3_q3_value = (typeof y3_q3_value != "undefined") ? (model.value_type == 2 ? y3_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y3_q3_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;

            if(model.value_type ==1) {
                this.state.model.y3_q4_value = (typeof y3_q4_value != "undefined") ? (y3_value- (parseInt(y3_q1_value.toFixed(this.state.round_deci)) + parseInt(y3_q2_value.toFixed(this.state.round_deci)) + parseInt(y3_q3_value.toFixed(this.state.round_deci)))).toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
            } else {
                this.state.model.y3_q4_value = (typeof y3_q4_value != "undefined") ? (model.value_type == 2 ? y3_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : y3_q4_value.toFixed(this.state.round_deci).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : 0;
            }
        },

        get_text_title({commit}, textbit) {
            var transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_TITLE', transtext)
                //return ;
            } else {
                commit('GET_TEXT_TITLE', "!" + textbit)
            }

        },
        get_text_message({commit}, textbit) {
            var transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_MSG', transtext)
                //return ;
            } else {
                commit('GET_TEXT_MSG', "!" + textbit)
            }

        },
        clickHere({commit}, model) {
            return store.state.searchViewModal = true;
        },
        fetchCitiesForCountry({commit}, val) {
            this.state.isLoading = true;
            Vue.axios.get(`/fetchCitiesForCountry/${val}`)
                .then((response) => {
                    this.showingViewModal = true;
                    this.state.isLoading = false;
                    //this.state.formData = response.data.data;
                    commit('SET_CITY_DATA', (response.data.cities))
                    //commit('SET_DB_TABLE', (response.data.db_name))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        fetchSectorChild({commit}, [val, model, sql]) {
            //this.state.isLoading = true;
            Vue.set(model, 'scope_table', '');
            Vue.set(model, 'scope_id', '');
            Vue.axios.post(`/fetchSectorChild/${val}`, {model, sql})
                .then((response) => {
                    this.showingViewModal = true;
                    //this.state.isLoading = false;
                    //this.state.formData = response.data.data;
                    commit('SET_SECTOR_CHILD', [response.data.subTenants, 1])
                    //commit('SET_DB_TABLE', (response.data.db_name))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        fetchChild({commit}, [model]) {
            Vue.set(model, 'scope_table', '');
            Vue.set(model, 'scope_id', '');
        },
        fetchProcessObject({commit}, [val, model, sql]) {
            //console.log(model);
            //this.state.isLoading = true;
            Vue.axios.post(`/fetchProcessObject/${val}`, {model, sql})
                .then((response) => {
                    this.showingViewModal = true;
                    //this.state.isLoading = false;
                    //this.state.formData = response.data.data;
                    commit('SET_PROCESS_OBJ', [response.data.process_obj])
                    //commit('SET_DB_TABLE', (response.data.db_name))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        fetchUserData({commit}, [val, type, model]) {
          if(type == 'value_period') {
           // alert(sessionStorage.getItem('kpi_id'));

            const kpiId=sessionStorage.getItem('kpi_id');
            Vue.axios.get('/kpivaluetypechangecheck/' + kpiId)
              .then(response => {

                if (response.data.code == 200) {
                  //alert(response.data.data);
                  if(response.data.data==false) {
                    alert("cannot update interval since values are already inserted for current MTP");

                    //alert(model.value_period);
                    this.state.model.value_period=val;
                    //Vue.set(model, 'value_period', this.state.model.value_period);
                   // model.value_period=this.state.model.value_period;
                    return false;
                  }
                  else if(response.data.data==true){
                    alert("all historical data inserted will be deleted and have to insert again");

                   return true;

                  }


                }
              });


          }

            if(type == 'coordination') {
                if(model.user_of_data == model.user_of_coordination) {
                    alert( "User already selected Please select Other.");
                    model.user_of_coordination = [];
                    model.coordination_name= '';
                    model.coordination_subtenant_id= '';
                    model.coordination_phone_internal= '';
                    model.coordination_email= '';
                    return false;
                }
            }
            if(type == 'data') {
                if(model.user_of_data == model.user_of_coordination) {
                    alert( "User already selected Please select Other.");
                    model.user_of_data = [];
                    model.data_name = '';
                    model.data_subtenant_id = '';
                    model.data_phone_internal = '';
                    model.data_email= '';
                    return false;
                }
            }

            if(type == 'auditing') {
                if(model.user_of_contact == model.user_of_auditing) {
                    alert( "User already selected Please select Other.");
                    model.user_of_auditing = [];
                    model.auditing_name= '';
                    model.auditing_subtenant_id= '';
                    model.auditing_phone_internal= '';
                    model.auditing_email= '';
                    return false;
                }
            }
            if(type == 'contact') {
                if(model.user_of_contact == model.user_of_auditing) {
                    alert( "User already selected Please select Other.");
                    model.user_of_contact = [];
                    model.contact_name= '';
                    model.contact_subtenant_id= '';
                    model.contact_phone_internal= '';
                    model.contact_email= '';
                    return false;
                }
            }

          if(type != 'value_period') {
            this.state.isLoading = true;
            Vue.axios.get(`/fetchUserData/${val}/${type}`)
              .then((response) => {
                this.showingViewModal = true;
                this.state.isLoading = false;
                //this.state.formData = response.data.data;
                commit('SET_USER_DATA', [response.data.userData, type])
                //commit('SET_DB_TABLE', (response.data.db_name))
              })
              .catch((error) => {
                console.log(error)
              })
          }
        },
        fetchBenchMarkData({commit}, [val]) {
            this.state.isLoading = true;
            Vue.axios.get(`/fetchBenchMarkData/${val}`)
                .then((response) => {
                    this.showingViewModal = true;
                    this.state.isLoading = false;
                    //this.state.formData = response.data.data;
                    commit('SET_BENCHMARK_DATA', [response.data.userData])
                    //commit('SET_DB_TABLE', (response.data.db_name))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        loadGroups({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'fg_form',
                method: 'GET'
            })
                .then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_GROUP', (response.data.data))
                    } else {
                        this.dispatch('get_text_title', 'error@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');

                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403) {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', error.response.data.msg + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        loadFormData({commit}, processId) {
            this.state.isLoading = true;
            Vue.axios.get(`fg_form/${processId}/${sessionStorage.getItem('kpi_id')}`)
                .then((response) => {
                    if(typeof response.data.kpi_history != 'undefined' && response.data.kpi_history) {
                        window.location.replace('/kpivalueshistory/'+sessionStorage.getItem('kpi_id'));
                    }
                    this.showingViewModal = true;
                    this.state.isLoading = false;
                    this.state.next_form_id = response.data.next_form_id;
                    this.state.is_linked = response.data.is_linked;
                    this.state.kpihistorycount = response.data.kpihistorycount;

                    this.state.propTitle = response.data.propTitle;
                    this.state.propSubTitle = response.data.propSubTitle;
                    //alert(this.state.is_linked);
                    const kpVal = sessionStorage.getItem('kpi_id');
                    if (this.state.is_linked == 'true' && !kpVal) {
                        window.location.replace('/newFormGenerator/1');
                    }
                    this.state.model.value_type = response.data.value_type;
                    this.state.round_deci = response.data.rounding_decimals;
                    this.state.kpi_name = response.data.kpi_name;
                    this.state.kpi_symbol = response.data.kpi_symbol;
                    /*Vue.axios.get(`/gettranslations`).then(responseLang => {
                        if (responseLang.data.code == 200) {*/
                            this.state.isLoading = false;
                            //this.state.translations = responseLang.data.data;
                            this.state.loading = true,
                                commit('SET_GROUP_DATA', [
                                    response.data.data,
                                    response.data.type,
                                    response.data.dataValues,
                                    processId
                                ])
                        /*}
                    })*/
                    //this.state.formData = response.data.data;
                    commit('SET_DB_TABLE', (response.data.db_name))
                    commit('SET_FORM_TYPE', (response.data.type))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        onSubmit({commit}, [model, type]) {
            var base_y_value = $(".base_y_value").val().replace(/,/g, "");
            var y1_value = $(".y1_value").val().replace(/,/g, "");
            var y2_value = $(".y2_value").val().replace(/,/g, "");
            var y3_value = $(".y3_value").val().replace(/,/g, "");
            var max_value = $(".max_value").val().replace(/,/g, "");
            var min_value = $(".min_value").val().replace(/,/g, "");
            var max_y_value = $(".max_y_value").val().replace(/,/g, "");
            var min_y_value = $(".min_y_value").val().replace(/,/g, "");
            var array = [base_y_value, y1_value, y2_value,y3_value, max_y_value, min_y_value, min_value];
            var grater = Math.max.apply(Math, array);
            var less = Math.min.apply(Math, array);
            var isMax = '';
            var isMin = '';
            if(grater > max_value) {
                var msg = this.dispatch('get_text_message', 'max_value_validation@kpi_target@m');
                alert(this.state.message);
                $(".max_value").css('border', '1px solid red').focus()
                isMax = false;
                return false;
            } else {
                isMax = true;
            }

            if(less > max_value) {
                var msg = this.dispatch('get_text_message', 'min_value_validation@kpi_target@m');
                alert(this.state.message);
                $(".min_value").css('border', '1px solid red').focus();
                isMin = false;
                return false;
            } else {
                isMin = true;
            }

            if(isMax && isMin) {
                this.state.isValid = true;
            }
            //max_value = grater > max_value ? grater : max_value;
            //this.$store.state.model.max_value = max_value;

            if (this.state.isValid) {
                if (typeof type != "undefined" && type == 'cancel') {
                    window.location.replace('/kpilist')
                }
                $('input[type="submit"]').addClass('submit_Data');
                //alert('sdfsdf'+type);
                Vue.set(model, 'db_name', this.state.db_name);
                Vue.set(model, 'kpi_id', sessionStorage.getItem('kpi_id'));
                this.state.model.tenant_id = Vue.auth.user().tenant_id;
                Vue.axios.post(`/fg_form`, model).then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        //alert(this.state.is_kpi);
                        if (this.state.next_form_id && this.state.is_kpi == false) {
                            this.state.searchViewModal = true;
                        }

                        if (!this.state.next_form_id) {
                            sessionStorage.removeItem('kpi_id');
                        }
                        const kpVal = sessionStorage.getItem('kpi_id');

                        if (this.state.is_kpi == true) {
                            sessionStorage.removeItem('kpi_id');
                            window.location.replace('/kpilist')
                        }
                        if (!this.state.next_form_id && this.state.is_linked == 'true' && !kpVal) {
                            sessionStorage.removeItem('kpi_id');
                            window.location.replace('/kpilist')
                        }

                        console.log('Created user', response.data.code, 'from the server');
                        this.state.model = {};
                        this.dispatch('get_text_title', 'success@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');

                        Vue.prototype.$notify({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'success',
                            position: 'top-right'
                        });
                        Vue.axios.get('/fg_form_tabledatabyName/' + this.state.db_name)
                            .then((response) => {
                                this.state.tableData = response.data;
                                console.log(this.state.tableData);
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        //commit('CREATED_USER', user.data)
                    } else {
                        this.dispatch('get_text_title', 'error@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');

                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        })
                    }
                })
            }
        },
        updateformdata({commit}, model) {
            console.log(user);
            //return false;
            this.state.isLoading = true;
            Vue.axios.post(`PRCTypes/${user.where}`, user.data).then(response => {
                this.state.isLoading = false;
                console.log('Update user', response.data.code, 'from the server')
                this.dispatch('get_text_title', 'success@m');
                this.dispatch('get_text_message', response.data.msg + '@m');

                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                });
                commit('UPDATE_PRIORITY', user.data)
            }).catch(error => {
                if (error.response.status == 422) {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0] + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        removeKpiPermanently({commit}, kpiId) {
            this.state.isLoading = true;
            Vue.axios.delete(`/removeKpiPermanently/${kpiId}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    //console.log('removed user', response.data.code, 'from the server')
                    this.dispatch('get_text_title', 'success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    this.dispatch('loadPriorities');
                } else {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            })
        },
        loadPriorities({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'kpidefList',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PRIORITIES', (response.data.PRCTypes))
                    } else {
                        this.dispatch('get_text_title', 'alert@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');

                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                        this.state.loading = true
                    }
                    this.state.isLoading = false
                });
        },
        loadTenants({commit}) {
            Vue.axios({
                url: 'loadTenants',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        //this.state.loading = true,
                        this.state.setTenant = response.data.tenants.map(function (item) {
                            //alert(item.id)
                            return {
                                text: item.name,
                                value: item.id
                            }
                        });
                        ;


                    }
                });
        },
        loadCategory({commit}) {
            Vue.axios({
                url: 'loadCategory',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        //this.state.loading = true,
                        this.state.setCategory = response.data.kpiCat.map(function (item) {
                            //alert(item.id)
                            return {
                                text: item.name,
                                value: item.id
                            }
                        });
                        ;


                    }
                });
        },

        loadmtp({commit}) {
            Vue.axios({
                url: 'loadMtp',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    //this.state.loading = true,
                    // alert(response.data.kpiMtp[0].start_date);

                    this.state.setmtp = response.data.kpiMtp.map(function (item) {

                        return {
                            text: item.start_date + ' - ' + item.end_date,
                            value: item.start_date + ' - ' + item.end_date
                        }
                    });
                }
            });
        },

        loadSubTenants({commit}, val) {
            Vue.axios.get(`/loadSubTenants/${val}`)
                .then(response => {
                    if (response.data.code == 200) {
                        //this.state.loading = true,
                        this.state.setSubTenant = response.data.tenants.map(function (item) {
                            //alert(item.id)
                            return {
                                text: item.name,
                                value: item.id
                            }
                        });
                    }
                });
        },
        loadKpiDataSector({commit}, val) {
            Vue.axios.get(`/loadKpiDataSector/${val}`)
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PRIORITIES', (response.data.kpidata))
                    }
                });
        },
        loadKpiDataOrgUnit({commit}, val) {
            Vue.axios.get(`/loadKpiDataOrgUnit/${val}`)
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PRIORITIES', (response.data.kpidata))
                    }
                });
        },
        loadTranslations({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'loadtranslations',
                method: 'GET'
            })
                .then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        this.state.loading = true,

                            commit('SET_TRANSLATIONS', (response.data.data))
                    } else {
                        this.dispatch('get_text_title', 'error@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');

                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403) {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', error.response.data.message + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        createTranslation({commit}, user) {
            this.state.isLoading = true;
            console.log(user.data)
            Vue.axios.post(`/Translations`, user.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'success@m');
                    this.dispatch('get_text_message', response.data.msg + '@m');
                    console.log('Created Translations', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });

                    commit('CREATED_TRANSLATIONS', user.data)
                } else {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', response.data.msg + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                this.state.isLoading = false;
                if (error.response.status == 422) {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0] + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        translation() {
            Vue.axios.get(`/gettranslations`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    var trans = JSON.stringify(response.data.data);
                    this.state.translations = response.data.data;

                } else {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', response.data.msg + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                this.state.isLoading = false;
                if (error.response.status == 422) {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0] + '@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })


        },

        loadkpivalues({commit}, kpiId) {
            // this.state.isLoading = true;
            //alert(kpiId);
            Vue.axios.get('kpivalues/' + kpiId)
                .then(response => {

                    // this.state.loading = true,
                   // console.log("jhjjj" + response.data.data);
                    commit('SET_KPIVALUES', (response.data.data))

                    this.state.isLoading = true

                    if (response.data.code == 200) {
                        commit('SET_KPIVALUES', (response.data.data))

                    } else {
                        window.location.replace('/kpilist')
                        this.dispatch('get_text_title', 'error@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        })
                    }
                    this.state.isLoading = false


                    //console.log("jhjjj"+response.data.data);


                    // this.state.isLoading = false
                });
        },
        loadkpivalueshistorycheck({commit}, kpiId) {

            Vue.axios.get('kpivalueshistory/' + kpiId)
                .then(response => {

                    // console.log("jhjjj"+response.data.data);
                    commit('SET_KPIVALUESHISTORYCOUNT', (response.data.kpivaluesactualcount))

                    this.state.isLoading = true;

                    if (response.data.code == 200) {
                        //alert(response.data.kpivaluesactualcount);

                        commit('SET_KPIVALUESHISTORYCOUNT', (response.data.kpivaluesactualcount))

                    } else {
                        //window.location.replace('/kpilist')
                        // alert(response.data.data.length);
                        commit('SET_KPIVALUESHISTORYCOUNT', 0)
                    }
                    this.state.isLoading = false


                });
        },

        loadkpivalueshistory({commit}, kpiId) {

            Vue.axios.get('kpivalueshistory/' + kpiId)
                .then(response => {

                    // console.log("jhjjj"+response.data.data);
                    commit('SET_KPIVALUESHISTORY', (response.data.data))

                    this.state.isLoading = true;

                    if (response.data.code == 200) {

                        commit('SET_KPIVALUESHISTORYCOUNT', response.data.kpivaluesactualcount)
                        commit('SET_KPIVALUECOUNT', response.data.kpicurrentvaluecount)
                        commit('SET_KPIVALUESHISTORY', (response.data.data))

                    } else {
                        //window.location.replace('/kpilist')
                        this.dispatch('get_text_title', 'error@m');
                        this.dispatch('get_text_message', response.data.msg + '@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        })
                    }
                    this.state.isLoading = false

                });
        },
        loadkpivalueseditid({commit}, kpivalueId) {

            Vue.axios.get(`kpivaluesupdate/${kpivalueId}`)
                .then(response => {
                    commit('SET_KPIVALUES', (response.data.data))

                    this.state.isLoading = false
                });
        },
        newMessageNotification: ({commit}, message) => {
            commit('NEW_PM_NOTIFICATION', message);
        }
    }
});
