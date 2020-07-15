<template>
  <main>
      <div class="container-fluid c-section">
          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <h2 class="profile-heading">Profile Page</h2>
                <div class="profile-body">
                  <div class="a-spacing-top-medium"></div>
                  <!-- <div class="profile-logout">
                    <nuxt-link to="" @click.native="onLogout"> <v-btn dark color="indigo"> Logout </v-btn></nuxt-link>
                  </div> -->
                  <br>
                    <span class="profile-greeting-label" > Hello <span class="profile-greeting-name">{{loggedInUser.name}} </span></span>
                    <form action="">
                        <!-- Name -->
                      <div class="profile-label">
                          <label for="" class="profile-label">Name</label>
                          <!-- <input 
                          class="a-input-text" 
                          style="width:100%" 
                          v-model="name" 
                          :placeholder="loggedInUser.name"> -->

                          <v-text-field
                          
                            single-line
                            outlined
                            v-model="name" 
                            :placeholder="loggedInUser.name"
                         ></v-text-field>


                      </div>

                       <!-- email -->
                      <div class="profile-label">
                          <label class="profile-label" for="">Email</label>
                          <!-- <input 
                          class="a-input-text"
                          style="width:100%" 
                          v-model="email" 
                          :placeholder="loggedInUser.email"> -->

                            <v-text-field
                            single-line
                            outlined
                            v-model="email" 
                            :placeholder="loggedInUser.email"
                         ></v-text-field>



                      </div>

                       <!-- Password -->
                      <div class="profile-label">
                          <label class="profile-label" for="">Password</label>
                          <!-- <input 
                          class="a-input-text" 
                          style="width:100%" 
                          v-model="password"> -->

                         <v-text-field
                            single-line
                            outlined
                            v-model="password"
                            
                         ></v-text-field>
                          
                      </div>

                      <!-- Submit button  -->
                      <br>
                      <div class="a-spacing-top-large">
                        <v-btn dark color="indigo"  @click.prevent="onUpdateProfile" type="submit">Update Profile</v-btn>
                      </div>
                    </form>
                    <br/>
                 
              </div>
              <div class="col-sm-3"></div>
             </div>
          </div>
      </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods: {
        async onUpdateProfile(){
            let data = {
                name: this.name,
                email:this.email,
                password:this.password
            }
            try {
                // by default axios will have the token in the header so we will not need to attach it
                let response = await this.$axios.$put('/api/auth/user',data)

                if(response.success){
                    this.name="";
                    this.email="";
                    this.password="";
                    // this fetchUser will just refetch teh data so that once userpress update new data is shown in email and name field
                    await this.$auth.fetchUser();
                }
            } catch (error) {
                console.log(error);
                
            }
        },
        async onLogout(){
            
            console.log("I am in onLogout");
            setTimeout(async () => {
            await this.$auth.logout();
            }, 0);
            this.$router.push('/');
          
        }
    },
}
</script>

<style>

</style>