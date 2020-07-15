<template>
  <div class="registerPage">
      <div class="container">
          <div class="row">
              <!-- <div class="col-sm-4"></div> -->
              <div class="col-lg-5 col-md-7 col-sm-10  m-auto signup-align  ">
                  <!-- <div class="text-center">
                      <a href="#0"><img src="" alt=""></a>
                  </div> -->
                  <form class="mt-4  ">
                      <div class="a-box">
                          <div class="">
                              <h1 class="all-heading-color signup-heading ">Create account</h1>
                              <!-- Your name -->
                              <div class="ml-5 mr-5 mt-3">
                                  <label  class="signup-label">Name</label>
                                  
                                  <v-text-field 
                                  type="text" 
                                  
                                  class=" ml-0"
                                  v-model="name"
                                  name="name"
                                  solo 
                                  hide-details="auto"
                                  ></v-text-field>
                              </div>
                               <!-- Your email -->
                              <div class="ml-5 mr-5 mt-3">
                                  <label for="" class="signup-label">Email</label>
                                  <v-text-field 
                                  type="email" 
                                 
                                  class="ml-0"
                                  v-model="email"
                                  name="email"
                                  solo
                                  hide-details="auto"
                                  ></v-text-field>
                              </div>
                                 <!-- Your Password -->
                              <div class="ml-5 mr-5 mt-3">
                                  <label for="" class="signup-label">Password</label> <span> (password must be atleast 6 characters)</span>
                                  <v-text-field 
                                  type="password" 
                                  
                                  class="ml-0"
                                  v-model="password"
                                  name="password"
                                  solo
                                  hide-details="auto"
                                  ></v-text-field>
                              </div>
                                <!-- Button -->
                              <div class="signup-heading">
                                  <!-- <span class="button">
                                      <span class="button"> -->
                                          <v-btn class="mt-5" dark color="indigo"  @click.prevent="onSignup">Create account</v-btn>
                                      <!-- </span>
                                  </span> -->
                                  <!-- <div class="">
                                      <b>
                                          By creating an account you agree to Amazon's 
                                          <a href="#0">Conditions of Use</a> and 
                                          <a href="#0">Privacy Notice</a>

                                      </b>
                                  </div> -->
                              </div>
                              <hr><div class="signup-heading">
                                  <b>
                                      Already have an account?
                                      <nuxt-link to="/login" class="a-link-emphasis">Sign In </nuxt-link>
                                  </b>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware:"auth",
    auth:"guest",
    layout:"none",
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods: {
         async onSignup(){
             console.log("In sign up 1");
             
            try {
                let data = {
                        name: this.name,
                        email: this.email,
                        password: this.password
                } 
                // console.log("Name: "+this.name);
                // console.log("Email: "+this.email);
                // console.log("Password: "+this.password);
                console.log("In sign up 2");
                let response = await this.$axios.$post('/api/auth/signup',data)
                console.log("My email and password is "+ this.email +" and "+ this.password);
                if(response.success){
                    //if success auth library will trigger the loginWith method which will send a request to the 
                    //api/auth/login api which will return the token. Auth library will store that token and save it in the localstorage/session 
                    // it will also hit the auth/user api to get the user object and save that object in the local storage
                    
                    // console.log("On signup response is : "+ JSON.stringify(response));
                    console.table(response);
                    
                    this.$auth.loginWith('local',{
                        data:{
                            email:this.email,
                            password: this.password
                        }
                    })
                    console.log("In sign up 4");
                    this.$router.push('/products');
                }
                
            } catch (error) {
                console.log(error);
                
            }
        }
    
    },
}
</script>

<style>

</style>