<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col xl="12" lg="12" md="12">
                <b-form @submit.prevent="handleSubmit">
                    <b-card>
                        <div slot="header">
                            <h4 class="card-title">{{ get_text('title@updateCredential@l') }}</h4>
                        </div>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="authenticatedUserPassword">{{ get_text('my_password@updateCredential@l') }}*</label>
                                    <b-form-input type="text" id="authenticatedUserPassword" :placeholder="get_text('enter_your_password@updateCredential@l')"
                                                  v-validate="'required'" v-model="data.body.authenticatedUserPassword" name="authenticatedUserPassword"
                                                  :class="{ 'is-invalid': submitted && errors.has('authenticatedUserPassword') }"></b-form-input>
                                    <div v-if="submitted && errors.has('authenticatedUserPassword')" class="invalid-feedback">{{
                                        errors.first('authenticatedUserPassword') }}
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="password">{{ get_text('new_password@updateCredential@l') }}*</label>
                                    <b-form-input type="password" v-validate="{ required: true, min: 5 }"  name="password" v-model="data.body.password" class="form-control" :placeholder="get_text('enter_new_password@updateCredential@l')" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('password') }" ref="password"/>
                                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6">
                                <b-form-group>
                                    <label for="confpassword">{{ get_text('new_password_repeat@updateCredential@l') }}*</label>
                                    <b-form-input type="password" data-vv-as="password" v-validate="'required|confirmed:password'"  name="confpassword" v-model="data.body.confpassword" class="form-control" :placeholder="get_text('enter_confirm_password@updateCredential@l')" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('confpassword') }"/>
                                    <div v-if="submitted && errors.has('confpassword')" class="invalid-feedback">{{ errors.first('confpassword') }}</div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" >
                                <b-button type="submit" :disabled="updateProfileBtn" variant="primary" class="float-right px-4">
                                    {{ get_text('update_password@updateCredential@l') }}
                                </b-button>
                                <img v-show="updateProfileBtn"
                                     src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import {store} from '@/components/user/store/store';
    import Vue from 'vue';
    import 'element-ui/lib/theme-chalk/index.css';
    import Element from 'element-ui'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    Vue.use(Loading);
    Vue.use(Element);

    export default {
        name: 'Profile',
        store: store,
        components: {
            'loading': Loading
        },
        data() {
            return {
                context: 'Profile Update context',
                data: {
                    body: {
                        authenticatedUserPassword: '',
                        password: '',
                        confpassword: '',
                    },
                },
                submitted: false,
                error: null,
                errorMessage: null,
                successMessage: null,
                updateProfileBtn: null,
                translation:[]
            };
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        /*created() {
            this.loadUsersProfile(this.$auth.user());
        },*/
        methods: {
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
            /*loadUsersProfile(user) {
                this.$store.state.isLoading = true;
                Vue.axios.get(`/user/${user.id}/profile`)
                    .then((response) => {
                        console.log(response.data.data);
                        this.data.body = response.data.data;
                        this.$store.state.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },*/
            handleSubmit(e) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.$store.state.isLoading = true;
                        //alert(this.data.body.name)
                        //this.updateProfileBtn = true;
                        /*this.$store.dispatch('updateUserPassword', {
                            where: this.$auth.user().id,
                            data: {
                                password: this.data.body.password,
                                authenticatedUserPassword: this.data.body.authenticatedUserPassword,
                            }
                        })*/
                        Vue.axios.put(`/user/${this.$auth.user().id}/credentials`, {
                            password: this.data.body.password,
                            authenticatedUserPassword: this.data.body.authenticatedUserPassword,
                        }).then(response => {
                            //this.state.isLoading = false;
                            console.log('Update user', response.data.code, 'from the server');
                            Vue.prototype.$notify({
                                title: 'Success',
                                message: response.data.msg,
                                type: 'success',
                                position: 'top-right'
                            });
                            //commit('UPDATE_USER', user.data)
                            this.$store.state.isLoading = false;
                            this.body
                        })
                    }
                });
            },
        }
    }
</script>
