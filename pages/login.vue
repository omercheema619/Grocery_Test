<template>
  <div class="registerPage">
      <div class="container">
          <div class="row">
              <!-- <div class=" col-sm-4"></div> -->
              <div class="col-lg-5 col-md-7 col-sm-10 m-auto signup-align">
                 
                  <form class="mt-4">
                      <div class="a-box a-spacing-extra-large">
                          <div class="a-box-inner">
                              <h1 class="all-heading-color signup-heading">Sign in</h1>
                           
                               <!-- Your email -->
                              <div class="mt-1">
                                  <label for="ap_customer_name" class=" signup-label">Email</label>
                                  <v-text-field 
                                  type="email" 
                                  
                                  class="" 
                                  solo
                                  v-model="email"
                                  ></v-text-field>
                              </div>
                                 <!-- Your Password -->
                              <div class="mt-1">
                                  <label for="ap_customer_name" class="all-heading-color signup-label">Password</label>
                                  <v-text-field 
                                  type="password" 
                                  
                                  class=""
                                  v-model="password"
                                  solo
                                  ></v-text-field>
                                  <!-- <div class="mt-3">
                                      <div class="all-heading-color signup-heading">password must be atleast 6 characters</div>
                                  </div> -->
                              </div>
                                <!-- Button -->
                              <div class=" mt-2 signup-heading">
                                          <v-btn dark color="indigo" @click.prevent="onLogin" >Continue</v-btn>
                                  <!-- <div class="a-row a-spacing-top-medium a-size-small">
                                      <b>
                                          By creating an account you agree to Amazon's 
                                          <a href="">Conditions of Use</a> and 
                                          <a href="">Privacy Notice</a>

                                      </b>
                                  </div> -->
                              </div>
                              <hr><div class="a-row signup-heading">
                                  <b>
                                      Don't have an account?
                                      <nuxt-link to="/signup" class="a-link-emphasis">Sign Up </nuxt-link>
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
            email:'',
            password:''
        }
    },
    methods: {
        async onLogin(){
            try {
                
                    this.$auth.loginWith('local',{
                        data:{
                            email:this.email,
                            password: this.password
                        }
                    })
                    // await this.$router.push('/');

                    // setTimeout(async () => {
                        // await this.$auth.logout();
                        await this.$router.push('/');
                    // }, 1000);

              
                
            } catch (error) {
                console.log(error);
                
            }
        }
    },
}
</script>

<style>

</style>