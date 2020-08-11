<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
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
                <b-form  @submit.prevent="handleSubmit">
                  <h1>Create New Password</h1>
                  <p class="text-muted">Reset your account Password</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-validate="'required|email'"  name="email" v-model="data.body.email" class="form-control" placeholder="email" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('email') }"/>
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-validate="{ required: true, min: 5 }"  name="password" v-model="data.body.password" class="form-control" placeholder="Password" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('password') }" ref="password"/>
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" data-vv-as="password" v-validate="'required|confirmed:password'"  name="Conf_password" v-model="data.body.Conf_password" class="form-control" placeholder="Confirm Password" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('Conf_password') }"/>
                    <div v-if="submitted && errors.has('Conf_password')" class="invalid-feedback">{{ errors.first('Conf_password') }}</div>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" :disabled="resetPasswordBtn" variant="primary" class="px-4">Change Password</b-button>
                      <img v-show="resetPasswordBtn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
  name: 'createPassword',
  data() {
    return {
      context: 'login context',
      data: {
        body: {
          email: '',
          password: '',
          conf_password: '',
          token: this.$route.params.token
        },
      },
      submitted: false,
      error: null,
      errorMessage: null,
      successMessage: null,
      resetPasswordBtn: null
    };
  },
  created() {
    //console.log(this.$route.params.token)
    //this.init();
},
  methods: {
    init: function(){
			//this.createNewPassword();
		},
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
            this.resetPasswordBtn= true,
            this.createNewPassword();
          }
      });
    },
    createNewPassword() {
      this.$auth.login({
          url: '/auth/password/reset/',
          data: {
            email:this.data.body.email,
            password:this.data.body.password,
            token: this.$route.params.token
          },
          success: function (response) {
            this.resetPasswordBtn = false;
            if (response.data.code == 404) {
              this.errorMessage = response.data.msg;
              this.$route.push({path: '/auth/password/reset/'+this.$route.params.token})
            }else{
              this.successMessage = response.data.msg;
            }
          },
          error:function(error){
            //console.log(error.response);
            if (error.response.status == 500) {
              this.errorMessage = error.response.data.message;
            }
            this.resetPasswordBtn = false;
          },
          redirect: '/auth',
          fetchUser: false,
      });
    }
  }
}
</script>
