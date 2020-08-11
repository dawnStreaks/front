<template>
<div class="app animated fadeIn">
    <div class="row">
        <b-col xl="4" lg="5" md="6">
            <div class="card card-user">
                <div class="card-image">
                    <div><img src="@/assets/img/background.jpg" alt="..."></div>
                </div>
                <div class="card-body">
                    <div>
                        <div class="author">
                            <img src="@/assets/img/user.jpg" alt="..." class="avatar border-white">
                            <h4 class="title">Chet Faker
                                <br><a href="#"><small>@chetfaker</small></a>
                            </h4>
                        </div>
                        <p class="description text-center">
                            "I like the way you work it
                            <br> No diggity
                            <br> I wanna bag it up"
                        </p>
                    </div>
                </div>
            </div>
        </b-col>
        <b-col xl="8" lg="7" md="6">
            <b-form  @submit.prevent="handleSubmit">
            <b-card>
                <div slot="header">
                    <h4 class="card-title">Edit Profile</h4>
                </div>
                <b-row>
                    <b-col sm="6">
                        <b-form-group>
                            <label for="username">Username</label>
                            <b-form-input v-validate="'required'" type="text" name="username" id="username" v-model="data.body.username"  placeholder="Enter your Username" :class="{ 'is-invalid': submitted && errors.has('username') }"></b-form-input>
                            <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group>
                            <label for="email">Email</label>
                            <b-form-input type="text" id="email" placeholder="Enter your Email" v-validate="'required'" v-model="data.body.email" name="email" :class="{ 'is-invalid': submitted && errors.has('email') }"></b-form-input>
                            <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4">
                        <b-form-group>
                            <label for="first-name">First Name</label>
                            <b-form-input type="text" id="first-name" placeholder="Enter your First Name" v-validate="'required'" v-model="data.body.firstName"  name="firstName" :class="{ 'is-invalid': submitted && errors.has('firstName') }"></b-form-input>
                            <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
                        </b-form-group>
                    </b-col>
                    <b-col sm="4">
                        <b-form-group>
                            <label for="second-name">Second Name</label>
                            <b-form-input type="text" id="second-name" v-model="data.body.secondName"  placeholder="Enter your Second Name"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col sm="4">
                        <b-form-group>
                            <label for="last-name">Last Name</label>
                            <b-form-input type="text" id="last-name" placeholder="Enter your Last Name" v-model="data.body.lastName"  v-validate="'required'" name="lastName" :class=" { 'is-invalid': submitted && errors.has('lastName') }"></b-form-input>
                            <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-form-group>
                    <label for="address">Address</label>
                    <b-form-textarea id="address" v-model="data.body.address"  placeholder="Enter your Address"></b-form-textarea>
                </b-form-group>
                <b-form-group>
                    <label for="about-me">About Me</label>
                    <b-form-textarea type="text" v-model="data.body.aboutMe"  id="about-me" placeholder="Here can be your description"></b-form-textarea>
                </b-form-group>
                <b-row>
                    <b-col cols="12" class="text-center">
                        <b-button type="submit" :disabled="updateProfileBtn" variant="primary" class="px-4">Update Profile</b-button>
                        <img v-show="updateProfileBtn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </b-col>
                </b-row>
            </b-card>
            </b-form>
        </b-col>
    </div>
</div>
</template>
<script>
export default {
    name: 'Profile',
    data() {
    return {
      context: 'Profile Update context',
      data: {
        body: {
          email: '',
          username: '',
          firstName: '',
          secondName: '',
          lastName: '',
          address: '',
          aboutMe: '',
        },
      },
      submitted: false,
      error: null,
      errorMessage: null,
      successMessage: null,
      updateProfileBtn: null
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
          if (valid) {
            this.updateProfileBtn= true,
            this.updateProfile();
          }
      });
    },
    }
}
</script>

<style>
.card .card-image img {
    width: 100%;
}
.card-user .author {
    text-align: center;
    text-transform: none;
    margin-top: -65px;
}
.card .author {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;

}
.card-user .avatar.border-white {
    border: 5px solid #fff;
    border-top-color: rgb(255, 255, 255);
    border-right-color: rgb(255, 255, 255);
    border-bottom-color: rgb(255, 255, 255);
    border-left-color: rgb(255, 255, 255);
}
.card-user .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    margin-bottom: 15px;
}
.card-user .author .title {
    color: #403d39;
}
.h4, h4 {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.2em;
}
.h1, .h2, .h3, .h4, h1, h2, h3, h4 {
    font-weight: 400;
    margin: 30px 0 15px;
}
.card-user .author {
    text-align: center;
    text-transform: none;
}
.card-user .author .title small {
    color: #ccc5b9;
}
.card-user .description {
    margin-top: 10px;
}
.card .description {
    font-size: 16px;
    color: #66615b;
}
.text-center {
    text-align: center !important;
}
p {
    font-size: 16px;
    line-height: 1.4em;
}
h5 > .small {
    color: #9a9a9a;
    font-weight: 300;
    line-height: 1.4em;
}
.card .list-unstyled.team-members .avatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.btn-just-icon {
    border-radius: 50px;
    height: 40px;
    width: 40px;
    min-width: 40px;
    padding: 8px;
}
</style>