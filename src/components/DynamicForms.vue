<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col cols="12" xl="12">
                <b-card>
                    <div slot="header">
                        <b class="h4">{{ get_text('forms@fg_form@l') }}</b>
                    </div>

                    <b-table id="formlists" responsive :items="this.items" :fields="formsdata"
                             :current-page="currentPage"
                             :per-page="perPage" @click="onRowClick">
                        <template slot="actions" slot-scope="data">
                            <b-row class="text-center">
                                <b-col cols="2" sm="4" md="2" xl="1" class="mb-3 mb-xl-0">
                                    <b-button variant="primary" size="sm" @click="openlink(data.item.id)"><b><i
                                            class="icon-eye icons font-1xl"></i></b></b-button>
                                </b-col>&nbsp;
                            </b-row>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="getRowCount(this.formlist)" aria-controls="tabledatas"
                                      :per-page="perPage"
                                      v-model="currentPage" :prev-text="this.get_text('prev@l')"
                                      :next-text="this.get_text('next@l')" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<style>
    .display-inline label {
        display: inline !important;
    }

</style>
<script>
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    import {store} from '@/components/store'
    import GetFormDA from '@/components/GetFormDA';
    import Vue from 'vue'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';


    Vue.use(Loading);

    export default {
        name: 'tables',
        store: store,
        data: () => {
            return {
                formlist: '',
                finalModel: {},
                activeTabIndex: 0,
                searchViewModal: false,
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
                tableformdata: '',
                showingeditModal: false,
                showingdeleteModal: false,
                fields: '',

                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                translation:[]
            }
        },
        components: {
            'loading': Loading,
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }

        },
        mounted() {
          Vue.axios.get('/fg_form')
            .then((response) => {
              this.formlist = response.data.data;

            })
            .catch((error) => {
              console.log(error)
            })

        },
        computed: {
            formsdata(){
              this.items = this.formlist;
              var keys = [];
              for (var k in this.items[0]) {
                keys.push(k);
              }
              keys = keys.filter(e => e !== 'id');
              keys.push('actions');
              var arr = [];
              var len = keys.length;
              for (var i = 0; i < len; i++) {
                arr.push({
                  key: keys[i],
                  label: this.get_text(keys[i] + '@fg_form@c'),
                  sortable: true,
                  resizeable: true
                });
              }
              return this.fields = arr;
            },
            showdata() {
                //alert('in');
                this.searchViewModal = this.$store.state.searchViewModal;
                this.$store.state.searchViewModal = false

            },
        },
        methods: {
            get_text(textbit) {
                var transtext = this.translation[this.$i18n.locale][textbit];
                //alert(textbit);
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
            onRowClick: function () {
                //alert('dddd');
            },
            openlink: function (id1) {
                // alert(id1);
                this.$router.push('newFormGenerator/' + id1)
            },
            selectfromdata(dataitem) {
                this.tableformdata = dataitem;
            },
            goBack() {
                this.$router.go(-1)
            },
            editTabledata(tabledataedit, value = null) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/tabledatabyId/${this.$route.params.id}/${tabledataedit.id}`)
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
                                this.$store.state.model = response.data[0];

                            }
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            onSubmit: function () {


               // alert('Yay. Done!');

                Vue.axios.post(`/fg_form`, this.$store.state.model).then(response => {
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
            },
            updateformdata: function () {


                //alert(this.tableeditadataid);
                this.showingeditModal = false;

                Vue.axios.post(`/tableeditadataid/${this.$route.params.id}/${this.tableeditadataid}/${this.tableeditadata}`).then(response => {

                    this.$store.commit('loadTableData', [this.$route.params.id]);
                    if (response.data.code == 200) {
                        //console.log('Created user', response.data.code, 'from the server')


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

                //alert(this.tableeditadataid);
                this.showingeditModal = false;
                // alert(tabledataedit.id);
                this.showingeditModal = false;
                //alert(tabledataedit.id);

                Vue.axios.delete(`/tabledatadelete/${this.$route.params.id}/${tabledataedit.id}`).then(response => {

                    this.$store.commit('loadTableData', [this.$route.params.id]);
                    if (response.data.code == 200) {
                        //console.log('Created user', response.data.code, 'from the server')


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
            getBadge(status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            },
            getRowCount(items) {
                return items.length
            }

        }
    }
</script>
