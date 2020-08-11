<template>
  <div class="app animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>
    <b-row>
      <b-col lg="5" md="6" xl="4">
        <div class="card card-user">
          <div class="card-image">
            <div><img alt="..." src="@/assets/img/background.jpg"></div>
          </div>
          <div class="card-body">
            <div>
              <div class="author">
                <img :src="imagePath" alt="..." class="avatar border-white" onerror="this.src='img/avatars/no_user.png'"
                     v-if="imagePath">
                <img alt="..." class="avatar border-white" src="@/assets/img/user.jpg" v-if="!imagePath">
                <h4 class="title">{{ $auth.user().name }} {{ data.body.second_name }} {{ data.body.last_name }}

                  <br><a href="#">
                    <small>{{ $auth.user().email }}</small>
                  </a>
                </h4>
              </div>
              <p class="description text-center">
                {{ this.get_text('sector@kpi_def@l') }} : {{this.sectorname}}
                <br> {{ this.get_text('subtenant@kpi_def@l') }} : {{this.orgunitname}}

              </p>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="7" md="6" xl="8">
        <b-form @submit.prevent="handleSubmit">
          <b-card>
            <div slot="header">
              <h4 class="card-title">{{ get_text('title@profile@l') }}</h4>
            </div>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="id">{{ get_text('user_id@profile@l') }}</label>
                  <b-form-input :class="{ 'is-invalid': submitted && errors.has('id') }"
                                :placeholder="get_text('enter_your_username@profile@l')" id="username" name="id"
                                readonly type="text"
                                v-model="data.body.id"
                                v-validate="'required'"></b-form-input>
                  <div class="invalid-feedback" v-if="submitted && errors.has('id')">{{
                    errors.first('id') }}
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="email">{{ get_text('email@profile@l') }}</label>
                  <b-form-input :class="{ 'is-invalid': submitted && errors.has('email') }"
                                :placeholder="get_text('enter_your_email@profile@l')" id="email"
                                name="email" type="text" v-model="data.body.email"
                                v-validate="'required'"></b-form-input>
                  <div class="invalid-feedback" v-if="submitted && errors.has('email')">{{
                    errors.first('email') }}
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group>
                  <label for="first-name">{{ get_text('first_name@profile@l') }}</label>
                  <b-form-input :class="{ 'is-invalid': submitted && errors.has('name') }"
                                :placeholder="get_text('enter_your_first_name@profile@l')" id="first-name"
                                name="name" type="text" v-model="data.body.name"
                                v-validate="'required'"></b-form-input>
                  <div class="invalid-feedback" v-if="submitted && errors.has('name')">{{
                    errors.first('name') }}
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="second-name">{{ get_text('second_name@profile@l') }}</label>
                  <b-form-input :class="{ 'is-invalid': submitted && errors.has('second_name') }"
                                :placeholder="get_text('enter_your_second_name@profile@l')" id="second-name"
                                name="second_name" type="text" v-model="data.body.second_name"
                                ></b-form-input>
                  <!--<div class="invalid-feedback" v-if="submitted && errors.has('second_name')">{{-->
                    <!--errors.first('second_name@l') }}-->
                  <!--</div>-->
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <label for="last-name">{{ get_text('last_name@profile@l') }}</label>
                  <b-form-input :class=" { 'is-invalid': submitted && errors.has('last_name') }"
                                :placeholder="get_text('enter_your_last_name@profile@l')" id="last-name"
                                name="last_name" type="text" v-model="data.body.last_name"
                                v-validate="'required'"></b-form-input>
                  <div class="invalid-feedback" v-if="submitted && errors.has('last_name')">{{
                    errors.first('last_name') }}
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="!imagePath">
              <b-form-group>
                <b-col xs="6">
                  <h2>{{ get_text('select_an_image@profile@l') }}</h2>
                  <b-form-file :class="{ 'is-invalid': submitted && errors.has('image') }"
                               :placeholder="get_text('please_select_image@profile@l')" name="image"
                               v-model="data.image" v-on:change="onImageChange" v-validate="'required'"></b-form-file>
                  <div class="invalid-feedback" v-if="submitted && errors.has('image')">{{
                    errors.first('image') }}
                  </div>
                  <span class="error">{{ errors.first('size_test') }}</span>
                  <!--<input type="file" @change="onFileChange">-->
                </b-col>
              </b-form-group>
            </b-row>
            <b-row v-else="imagePath">
              <b-col xs="6">
                <img :src="imagePath" class="img-responsive" height="100" onerror="this.src='img/avatars/no_user.png'"
                     width="100"><br>
                <!--<b-button style="margin-left: 10px;margin-right: 20px;"  @click="removeImage" class="btn-pill" size="md" type="button" variant="danger">{{-->
                  <!--get_text('change_picture@profile@l') }}-->
                <!--</b-button>-->
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-center" cols="12">
                <b-button   @click="removeImage" class="float-left btn-pill" size="md" type="button" variant="danger">{{
                  get_text('change_picture@profile@l') }}
                </b-button>
                <b-button :disabled="updateProfileBtn" class="float-right" type="submit" variant="primary">
                  {{ get_text('update@profile@l') }}
                </b-button>
                <img
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  v-show="updateProfileBtn"/>
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
            email: '',
            username: '',
            name: '',
            second_name: '',
            last_name: '',
            address: '',
            aboutMe: '',
          },
        },
        image: '',
        imagePath: '',
        imageName: '',
        submitted: false,
        error: null,
        errorMessage: null,
        successMessage: null,
        updateProfileBtn: null,
        translation: [],
        sectorname:'',
        orgunitname:''
      };
    },
    beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }

    },
    created() {
      this.loadUsersProfile(this.$auth.user());
      this.loadUserssectorg(this.$auth.user());
      //this.$store.dispatch('translation');
      this.imagePath = this.$auth.user().url + '/images/' + this.$auth.user().file_name;
      this.imageName = this.$auth.user().file_name;
    },
    methods: {
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
      onImageChange(e) {
        console.log(e.target.files[0]);
        this.image = e.target.files[0];

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imagePath = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.image = '';
        this.imagePath = '';
      },
      loadUsersProfile(user) {
        this.$store.state.isLoading = true;
        Vue.axios.get(`/user/${user.id}/profile`)
          .then((response) => {
            console.log(response.data.data);
            this.data.body = response.data.data;
            this.abc = this.data.body.sector_id;
            this.$store.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })

      },
      loadUserssectorg(user) {
        this.$store.state.isLoading = true;
        Vue.axios.get(`/user/${user.id}/getsectorg`)
          .then((response) => {
            console.log(response.data.data);
            this.sectorname = response.data.sectorname;
            this.orgunitname = response.data.orgunit;
            this.$store.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })

      },
      handleSubmit(e) {
        e.preventDefault();
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {

            const config = {
              headers: {'content-type': 'multipart/form-data'}
            };

            let formData = new FormData();
            formData.append('image', this.image);
            formData.append('name', this.data.body.name);
            formData.append('second_name', this.data.body.second_name);
            formData.append('last_name', this.data.body.last_name);
            formData.append('email', this.data.body.email);

            //Vue.axios.post(`/user/1/profile`, formData, config)
            //alert(this.data.body.name)
            //this.updateProfileBtn = true;
            this.$store.dispatch('updateUserProfile', {
              where: this.$auth.user().id,
              data: formData
            })
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
