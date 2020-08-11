<template>
    <div>
       {{ this.$store.state.model.reject_reason }}

        <form-wizard  v-if="(html != 0 && this.$store.state.model.reject_reason)" @on-complete="onComplete"
                     validate-on-back
                     ref="wizard"
                     :validate-on-back=false
                     :start-index.sync="activeTabIndex"
                     :back-button-text="get_text('back@fg_form@l')"
                     :next-button-text="get_text('next@fg_form@l')"
                     :finish-button-text="get_text('reSubmit@fg_form@l')"
                     shape="circle" color="#20a0ff" error-color="#fa695f">

          <h2 slot="title">{{ get_text(this.$store.state.propTitle+'@fg_form@l') }}</h2>
          <h4 slot="title">{{ get_text(this.$store.state.propSubTitle+'@fg_form@l') }}</h4>
            <tab-content :title="get_text(html[index]['groups'][0]['legends']+'@fg_form@l')" v-for="(wiz, index) in html" :key="index" :icon="[((index == 1 && routepaths==1) ? 'icon icon-pencil' :
        ((index == 2 && routepaths==1) ? 'icon icon-equalizer' :
            ((index == 1 && routepaths==3) ? 'icon icon-pencil' :
            ((index == 2 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 3 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 4 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 3 && routepaths==1) ? 'icon icon-people' : 'icon icon-user')))
))))]" :before-change="()=>validateFirstTab(index)">
                <!--:before-change="()=>validateFirstTab(index)"-->
                <!--:before-change="()=>validateFirstTab(index)"-->
                <legend>{{ get_text(html[index]['groups'][0]['legends']+'@fg_form@l') }}</legend>
                <vue-form-generator :model="model"
                                    :schema="wiz"
                                    :options="formOptions"
                                    :ref="index">
                </vue-form-generator>
            </tab-content>
            <!--<tab-content title="Last step"
                         icon="icon icon-check">
                <h4>Your json is ready!</h4>
                <div class="panel-body">
                    <pre v-if="model" v-html="prettyJSONModel(model)"></pre>
                </div>
            </tab-content>-->
        </form-wizard>

      <form-wizard  v-if="(html != 0 && !this.$store.state.model.reject_reason)" @on-complete="onComplete"
                    validate-on-back
                    ref="wizard"
                    :validate-on-back=false
                    :start-index.sync="activeTabIndex"
                    :back-button-text="get_text('back@fg_form@l')"
                    :next-button-text="get_text('next@fg_form@l')"
                    :finish-button-text="get_text('submit@fg_form@l')"
                    shape="circle" color="#20a0ff" error-color="#fa695f">

        <h2 slot="title">{{ get_text(this.$store.state.propTitle+'@fg_form@l') }}</h2>
        <h4 slot="title">{{ get_text(this.$store.state.propSubTitle+'@fg_form@l') }}</h4>
        <tab-content :title="get_text(html[index]['groups'][0]['legends']+'@fg_form@l')" v-for="(wiz, index) in html" :key="index" :icon="[((index == 1 && routepaths==1) ? 'icon icon-pencil' :
        ((index == 2 && routepaths==1) ? 'icon icon-equalizer' :
            ((index == 1 && routepaths==3) ? 'icon icon-pencil' :
            ((index == 2 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 3 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 4 && routepaths==3) ? 'fa fa-crosshairs' :
            ((index == 3 && routepaths==1) ? 'icon icon-people' : 'icon icon-user')))
))))]" :before-change="()=>validateFirstTab(index)">
          <!--:before-change="()=>validateFirstTab(index)"-->
          <!--:before-change="()=>validateFirstTab(index)"-->
          <legend>{{ get_text(html[index]['groups'][0]['legends']+'@fg_form@l') }}</legend>
          <vue-form-generator :model="model"
                              :schema="wiz"
                              :options="formOptions"
                              :ref="index">
          </vue-form-generator>
        </tab-content>
        <!--<tab-content title="Last step"
                     icon="icon icon-check">
            <h4>Your json is ready!</h4>
            <div class="panel-body">
                <pre v-if="model" v-html="prettyJSONModel(model)"></pre>
            </div>
        </tab-content>-->
      </form-wizard>
    </div>
</template>
<style>
    .el-step__main {
        text-align: unset;
    }

    .vue-form-wizard.isRtl .wizard-progress-bar {
        float: right;
    }

    .vue-form-wizard.isRtl .wizard-card-footer .wizard-footer-left {
        float: right;
    }

    .vue-form-wizard.isRtl .wizard-card-footer .wizard-footer-right {
        float: left;
    }

    .vue-form-wizard.isRtl.el-form-item__label {
        float: right;
    }

    .form-group.required.has-error {
        color: #fa695f;
    }

    .form-group.required.has-error .field-wrap{
        border: 1px solid #fa695f;
    }

    .dimmed .field-wrap > select {
        background-color: #ededed;
    }

</style>
<script>
    import Vue from 'vue';
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    export default {
        components: {
            FormWizard,
            TabContent,
        },
        data() {
            return {
                loadingWizard: false,
                error: null,
                count: 0,
                firstTime: 0,
                /*model: {
                    db_name: '',
                    tenant_id: 0,
                    kpi_id: 0,
                    data_name: 0, data_email: 0, data_subtenant_id: 0, data_phone_internal: 0,
                    auditing_name: 0, auditing_subtenant_id: 0, auditing_phone_internal: 0, auditing_email: 0,
                    contact_name: 0, contact_subtenant_id: 0, contact_phone_internal: 0, contact_email: 0,
                    coordination_name: 0, coordination_subtenant_id: 0, coordination_phone_internal: 0, coordination_email: 0,
                },*/
                html: '',
                routepaths: '',
                index: '',
                activeTabIndex: 0,
                translation: [],
                formOptions: {
                    validationErrorClass: "has-error",
                    validationSuccessClass: "has-success",
                    //validateAfterLoad: true,
                    validateAfterChanged: true,
                },
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        created() {

            //this.$store.dispatch('translation');

            this.html = this.tree;
            this.routepaths  = this.routepath ;
            //sessionStorage.setItem('key', 'demo123');
            this.$store.state.model.tenant_id = this.$auth.user().tenant_id
            if(this.$route.params.kpi) {
                sessionStorage.setItem('kpi_id', this.$route.params.kpi);
                /*if(this.$store.state.type == 'f') {
                    this.editTabledata(this.$route.params.kpi);
                } else {*/
                this.editTabledata12(this.$route.params.kpi);
                // }

            }
            //localStorage.setItem('key', 'demo123');
           // alert(sessionStorage.getItem('key'));
        },
        mounted() {
            let next = document.querySelector('div.vue-form-wizard');
            if (this.$i18n.locale == 'ar' ) {
                document.querySelector('html').setAttribute('dir', 'rtl');
                next && next.classList.add('isRtl');
            } else {
                document.querySelector('html').setAttribute('dir', '');
                let dropdown = next && next.classList.contains('isRtl');
                if(dropdown) {
                    next.classList.remove('isRtl');
                }
            }
        },
        props: ['model', 'tree', 'db_name', 'routepath'],
        methods: {
            get_text(textbit) {
                var transtext = this.translation[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if(spliteText.length > 2) {
                        var newTxt = (spliteText[0]+'@fg_form@'+'l');
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
            editTabledata12(tabledataedit, value = null) {
                //alert('aaaaaaaa');
                const editId = (tabledataedit.id) ? tabledataedit.id : tabledataedit;

                this.$store.state.isLoading = true;
                Vue.axios.get(`/tabledatabyId/${this.$route.params.id}/${editId}`)
                    .then((response) => {
                        if (response.data.code == 401) {
                            Vue.prototype.$notify.error({
                                title: 'Error@m',
                                message: response.data.msg+'@m',
                                type: 'Error',
                                position: 'top-right'
                            })
                        } else {
                            if (value == 'view') {
                                this.showingViewModal = true;
                                this.priorityInfo = response.data.data
                            } else {
                                if (typeof response.data[0] != "undefined") {
                                  this.$store.state.model.reject_reason=response.data[0].reject_reason;
                                  //alert(this.$store.state.model.reject_reason);
                                    this.$store.state.model = response.data[0];
                                    this.$store.state.parents = response.data['subTenants'];
                                    this.$store.state.process_obj = response.data['process_obj'];
                                    if(typeof response.data[0].value_explanation != 'undefined') {
                                        if(response.data[0].value_explanation !=21) {

                                            $('.valuesFieldOne').attr('disabled', true);
                                            this.$store.state.model.value_1=0;
                                            this.$store.state.model.value_2=0;
                                            $('.valuesFieldTwo').attr('disabled', true);
                                            $('.valuesFieldTwo').attr('required', false);
                                        } else {
                                            $('.valuesFieldOne').attr('disabled', false);
                                            $('.valuesFieldTwo').attr('disabled', false);
                                            $('.valuesFieldTwo').attr('required', true);
                                        }
                                    }
                                    // alert(this.db_name);
                                }
                                Vue.set(this.$store.state.model, 'db_name', this.db_name);
                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            onComplete: function(){
                const next = this.$store.state.next_form_id;
                //alert('Yay. Done!');
                Vue.set(this.$store.state.model, 'db_name', this.db_name);
                Vue.axios.post(`/fg_form`, this.$store.state.model).then(response => {
                    if(response.data.isHistory) {
                        window.location.replace('/kpivalueshistory/'+response.data.data);
                    }
                    this.$store.state.isLoading = false;
                    if(next) {
                        this.kpi_id = response.data.data
                        sessionStorage.setItem('kpi_id', response.data.data);
                    }

                    const kpVal = sessionStorage.getItem('kpi_id');
                    /*if(this.$store.state.is_linked == 'true' && !kpVal) {
                        window.location.replace('/newFormGenerator/1');
                    }*/

                    if(this.$route.params.kpi) {
                        sessionStorage.removeItem('kpi_id');
                        window.location.replace('/kpilist')
                    }
                    if(!this.$store.state.next_form_id && this.$store.state.is_linked == 'true' && kpVal) {
                        sessionStorage.removeItem('kpi_id');
                        window.location.replace('/kpilist')
                    }
                    if (response.data.code == 200) {
                        //alert('innnn');
                        //this.$store.state.searchViewModal = true;
if (this.$store.state.next_form_id && this.$store.state.is_kpi == false) {
                            this.$store.state.searchViewModal = true
                        }
console.log('Created user', response.data.code, 'from the server')
                        Vue.prototype.$notify({
                            title: 'Success',
                            message: response.data.msg,
                            type: 'success',
                            position: 'top-right'
                        });
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
            },
            setLoading (value) {
                this.loadingWizard = value
            },
            handleChange(prevIndex, nextIndex){
                console.log(`Changing from ${prevIndex} to ${nextIndex}`)
            },
            setError (error) {
                this.error = error
            },
            validateFirstTab: function(val){
              //alert(this.$store.state.model.scope_table);
                if(typeof this.$store.state.model.scope_table != "undefined" && this.$store.state.model.scope_table=='objective') {

                    if(typeof this.$route.params.kpi == "undefined") {
                       // alert('om')
                        //alert(this.$route.params.kpi_id);
                        this.$store.state.model.importance = 3
                    }
                }
                if(val == 1) {
                    this.getUserOfData($('.child_subtenant_id').val());
                }
                return this.$refs[val][0].validate();
            },
            getUserOfData(orgUnitId) {
                //alert(orgUnitId);
                Vue.axios.get(`/getUserOfData/${orgUnitId}`)
                    .then((response) => {
                        this.$store.state.user_of_data = response.data.userData;
                        this.$store.state.user_of_auditing = response.data.auditingData;
                    })
                    .catch(error => {
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
            buildTree(tree, rep = 1) {
                var html = '';
                var app = this;
                app.html = tree;
                return app.html;
            },
            prettyJSONModel: function (json) {
                if (json) {
                    json = JSON.stringify(json, undefined, 4);
                    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = "number";
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = "key";
                            } else {
                                cls = "string";
                            }
                        } else if (/true|false/.test(match)) {
                            cls = "boolean";
                        } else if (/null/.test(match)) {
                            cls = "null";
                        }
                        return "<span class=\"" + cls + "\">" + match + "</span>";
                    });
                }
            },
            /*fetchCitiesForCountry(country) {
                alert('ddfggf'+country);
            }*/
        },
        watch: {
            tree: {
                handler() {
                    this.html = '';
                    //alert(this.db_name);
                    this.model.db_name = this.db_name;
                    this.index = this.ind;
                    this.buildTree(this.tree)
                },
                deep: true
            }
        }
    }

</script>
