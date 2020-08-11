<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import network from '../network'
import axios from 'axios';
var CryptoJS = require("crypto-js");

  export default {
    created(){
     
    },
    data(){
        return{
            email:'',
			password:"",
			loginFailed:false,
			error:"",
			fullscreenLoading: false

        }
    },
    methods:{
        vLogin(){
			this.fullscreenLoading = true;
			
            axios.request({
            url: this.$store.state.baseUrl+"/api/client/google/login",method: "POST", // default
            baseURL: this.$store.base_url_api,
            headers: {"content-type":"application/json"},

            // to send data post
            data: {
                "email":this.email,
                "password":CryptoJS.AES.encrypt(JSON.stringify(this.password), this.$store.state.encryptionKey).toString()
            }

        }).then(response => {
              if(response.data.code == 200){
				
				let user = CryptoJS.AES.encrypt(JSON.stringify(response.data.data.user), this.$store.state.encryptionKey).toString()
				sessionStorage.setItem('encryption',user)
				this.$store.getters.getUser

				
				setTimeout(() => {
					
					this.fullscreenLoading = false;
					

					setTimeout(() => {
					
						this.$router.push({name:'dashboard'})
						this.$router.go('/dashboard')
					
					}, 1);


				}, 1000);

				

				
                  
				  
				  
                  
              }else{
				  this.fullscreenLoading = false;
				  this.loginFailed = true ;
				  this.error = response.data.error ;
			  }
			  
          }).catch(function(error) { 
		});
		

		
        }
    }
  };
</script>