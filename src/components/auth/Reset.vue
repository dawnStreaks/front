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
                  <h1>Reset Password</h1>
                  <p class="text-muted">Reset your account Password</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-validate="'required|email'"  name="email" v-model="data.body.email" class="form-control" placeholder="email" autocomplete="username email" :class="{ 'is-invalid': submitted && errors.has('email') }"/>
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" :disabled="resetPasswordBtn" variant="primary" class="px-4">Reset Password</b-button>
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
  name: 'Reset',
  data() {
    return {
      context: 'login context',
      data: {
        body: {
          email: '',
        },
      },
      submitted: false,
      error: null,
      errorMessage: null,
      successMessage: null,
      resetPasswordBtn: null
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.resetPasswordBtn= true,
          this.resetPassword();
        }
      });
    },
    resetPassword() {
      this.$auth.login({
          url: '/auth/password/reset/request',
          data: {
            email:this.data.body.email,
          },
          success: function (response) {
            this.resetPasswordBtn = false;
            if (response.data.code == 404) {
              this.successMessage = null;
              this.errorMessage = response.data.msg;
            } else{
              this.errorMessage =  null;
              this.successMessage = response.data.msg;
            }
          },
          error:function(error){
            console.log(error.response);
            if (error.response.status == 500) {
              this.errorMessage = error.response.data.message;
            }
            this.resetPasswordBtn = false;
          },
          redirect: '/auth/password/reset/request',
          fetchUser: false,
      });
    }
  }
}
</script>
