<template>
    <div class="app animated fadeIn">
        <b-row >
            <b-col v-if="item.name !='process and task' && item.name !='tenant' && $can(item.role, $auth.user().roles, item.name)" sm="6" md="6" v-for="(item, index) in this.appsValues" :key="index">
                <b-link
                  :href="(item.id ==1 ? 'kpilist' : (item.id ==6 ? 'ministrydepartmentperformance' : 'dashboard'))+'/'+item.name+'-'+item.id"
                        style="text-decoration:
                none">
                    <b-card :no-body="true">
                        <b-card-body class="p-4 clearfix" style="padding: 3.5rem!important">
                            <i :class="item.routes+' p-4 px-5 font-2xl mr-3 float-left'" style="padding-left: 3rem !important;"></i>
                            <div class="h5 text-info mb-0 pt-3">{{ get_text(item.name+'@l') }}</div>
                            <!--<div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>-->
                        </b-card-body>
                    </b-card>
                </b-link>
            </b-col>
        </b-row><!--/.row-->
    </div>
</template>

<script>
    import {store} from '@/components/store'
    import Vue from 'vue';
    export default {
        store: store,
        name: 'cards',
        data: function () {
            return {
                appsValues : [],
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        created() {
            this.getAllApps()
            //this.$store.dispatch('translation')
        },
        methods: {
            $can(permissionName, roles, name) {
                if(roles.includes(permissionName)) {
                    return true
                } else if(name=='my kpi' || name =='translation') {
                    return true;
                }
            },
            get_text(textbit) {
                var transtext = (typeof this.translation[this.$i18n.locale][textbit] != "undefined" && this.translation[this.$i18n.locale][textbit] != null) ? this.translation[this.$i18n.locale][textbit] : "!"+textbit;
                return transtext;
            },
            getAllApps() {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/getApps`)
                    .then((response) => {
                        if (response.data.code == 401) {
                            Vue.prototype.$notify.error({
                                title: this.get_text('Error@m'),
                                message: this.get_text(response.data.msg+'@m'),
                                type: 'Error',
                                position: 'top-right'
                            })
                        } else {
                            this.showingeditModal = true
                            this.appsValues = response.data.data
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
        }
    }
</script>



<style scoped>
    .fade-enter-active {
        transition: all .3s ease;
    }
    .fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
