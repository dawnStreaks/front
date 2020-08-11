<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="text-white bg-primary customLogin py-5 d-md-down-none" style="width:44%">
                            <b-card-body class="text-center">
                                <div style="text-align: center;padding-top:3em">

                                    <img class="navbar-brand-full" src="img/logo_outer_new.png" width="100%;"
                                            alt="Najah Task Management Dashboard">
                                    <!--<h4 style="color: #ffffff; font-weight: bold">نظـــــام متـابعة المهـــــام</h4>-->
                                    <!--<b-button variant="primary" class="active mt-3">Register Now!</b-button>-->
                                </div>
                            </b-card-body>
                        </b-card>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <div class="errorMessage">
                                    <p class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</p>
                                </div>
                                <div class="error">
                                    <p class="alert alert-danger" v-if="error">{{error}}</p>
                                </div>
                                <div class="successMessage">
                                    <p class="alert alert-success" v-if="successMessage">{{successMessage}}</p>
                                </div>
                                <b-form @submit.prevent="handleSubmit">
                                    <h1>تسجيل الدخول</h1>
                                    <p class="text-muted">تسجيل الدخول إلى حسابك</p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend>
                                            <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input type="text" v-validate="'required|email'" name="email"
                                                      v-model="data.body.email" class="form-control"
                                                      placeholder="اسم المستخدم" autocomplete="username email"
                                                      :class="{ 'is-invalid': submitted && errors.has('email') }"/>
                                        <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{
                                           "برجاء إدخال البريد الإلكتروني" }}
                                        </div>
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend>
                                            <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input type="password" v-validate="{ required: true, min: 5 }"
                                                      name="password" v-model="data.body.password" class="form-control"
                                                      placeholder="كلمة المرور" autocomplete="current-password"
                                                      :class="{ 'is-invalid': submitted && errors.has('password') }"/>
                                        <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{
                                            this.passworderror }}
                                        </div>
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-button :disabled="loginBtn" type="submit" variant="primary" class="px-4 customButton">
                                                تسجيل الدخول
                                            </b-button>
                                            <img v-show="loginBtn"
                                                 src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button variant="link" to="/auth/password/reset/request" class="px-0">
                                              نسيت كلمة المرور؟
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                context: 'login context',
              passworderror:"يجب أن تتكون كلمة المرور من 5 أحرف على الأقل\n",
                data: {
                    body: {
                        email: '',
                        password: ''
                    },
                    rememberMe: false
                },
                submitted: false,
                error: null,
                errorMessage: null,
                successMessage: null,
                loginBtn: null
            };
        },
        computed: {},
        mounted() {
            console.log(this.$auth.redirect());
        },
        methods: {
            handleSubmit(e) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.loginBtn = true,
                            this.login();
                    }
                });
            },
            login() {
                this.$auth.login({
                    url: '/auth',
                    data: {
                        email: this.data.body.email,
                        password: this.data.body.password
                    },
                    success: function (response) {
                        if (response.data.code == 401) {
                            this.successMessage = null;
                            this.errorMessage = response.data.error;
                        }
                        console.log(response.data.translations);
                        localStorage.setItem('translation', JSON.stringify(response.data.translations))
                        localStorage.setItem('currentMTP', JSON.stringify(response.data.currentMtp))
                        localStorage.setItem('currentYear', JSON.stringify(response.data.currentYear))
                        localStorage.setItem('currentPeriod', JSON.stringify(response.data.currentPeriod))
                        this.loginBtn = false;
                    },
                    error: function (error) {
                        console.log(error.response);
                        this.successMessage = null;
                        if (error.response.status == 401) {
                            this.errorMessage = error.response.data.error;
                            this.loginBtn = false;
                        } else if (error.response.status == 500) {
                            this.errorMessage = error.response.data.message;
                            this.loginBtn = false;
                        }

                    },
                    redirect: '/LandingPage',
                    fetchUser: true,
                });
            }
        }
    }
</script>
<style>
    [dir="rtl"] .px-4 {
        padding-right: 1.5rem !important;
        padding-left: 23px !important;
    }
    .customLogin {
        background-color: #605e5e !important;
    }
    .customButton,.customButton:hover {
        background-color: #cc043e;
        border-color: #cc043e;
    }

    .customButton:not(:disabled):not(.disabled):active, .customButton:not(:disabled):not(.disabled).active, .show > .customButton.dropdown-toggle {
        background-color: #cc043e;
        border-color: #cc043e;
    }
    .customButton.disabled, .customButton:disabled {
        background-color: #cc043e;
        border-color: #cc043e;
    }
</style>
