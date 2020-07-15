<template>
    <main>
        <nav class="navbar navbar-expand navbar-light navbar-color">
            <img src="" alt="">
      
            <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->

            <div class="collapse navbar-collapse " id="navbarSupportedContent">
      
                <ul class="navbar-nav ml-auto">
                   
                    <template v-if="isAuthenticated">
                    
                            <li class="nav-item1">
                            <span class="header-color1"> Ola, {{loggedInUser.name}} </span>
                            <!-- <span> Hello, {{$auth.$state.user.name}} </span> -->
                            </li>
                            <li class="nav-item1 nav-divider"> 
                                <span> |  </span>
                            </li>
                            <li class="nav-item1">
                            &nbsp; <nuxt-link to="/profile" class="header-color1"><i class="fa fa-user-circle"></i></nuxt-link> &nbsp;
                            </li>
                            
                            <li class="nav-item1 nav-divider"> 
                                <span> |  </span>
                            </li>

                            <li class="nav-item1">
                            &nbsp; <nuxt-link to="/orders" class="header-color1" @click.native="onLogout">Signout</nuxt-link> &nbsp;
                            </li>

                            <li class="nav-item1 nav-divider"> 
                                <span> |  </span>
                            </li>

                            <li class="nav-item1">
                            &nbsp; <nuxt-link to="/orders" class="header-color1">Orders</nuxt-link> &nbsp;
                            </li>


                            

                        
                    </template>
                    <template v-else>
                    
                            <li class="nav-item1">
                                <span><nuxt-link to="/signup" class="header-color1">Signup</nuxt-link>  &nbsp;</span> 
                            </li>

                            <li class="nav-item1 nav-divider"> 
                                <span> |  </span>
                            </li>

                            <li class="nav-item1">
                                &nbsp;
                                <span><nuxt-link to="/login"  class="header-color1">SignIn </nuxt-link></span>
                            </li>
                    
                    </template>

                    <!-- <li class="nav-item">
                            &nbsp;&nbsp;&nbsp;&nbsp;  <span> {{getCartLength}} </span>
                    </li> -->
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <!-- <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                                <span aria-hidden="true" class="nav-line-1 header-color"></span>
                                <span aria-hidden="true" class="nav-line-2 header-color">Cart {{getCartLength}}</span>
                    </nuxt-link> -->
                    <!-- <div>Hello<img src="~@/assets/images/test.jpg" class="imagess" alt=""></div> -->
                


                </ul>
            
            </div>
        </nav>

        
        <div class="header-container">
            <div class="row">
                <div class="col-md-3 col-sm-12 header-logo">
                    <img src="/images/fitted-logo.png" alt="">
                </div>
                <div class=" col-md-9 col-sm-12">
                    <div class="row">
                        <div class="col-md-12 col-sm-5 col-xs-5 align-right">
                             <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                                <span aria-hidden="true" class="nav-line-1 header-color"></span>
                                <span aria-hidden="true" class="nav-line-2 header-color">Shopping Cart : <i class="fa fa-shopping-basket">  </i> {{getCartLength}}</span>
                             </nuxt-link>
                        </div>
                        <div class="col-md-12 col-sm-7 col-xs-7">
                            <nav class="navbar navbar-expand-lg navbar-light ">
                                <img src="" alt="">
                                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                                    <ul class="navbar-nav mx-auto  ">
                                        <li class="nav-item nav-color highlight-nav-item">
                                            <span class="nav-link" href="#"><nuxt-link to="/" class="header-color" ><i class="fa fa-home header-color"> </i> &nbsp;<span class="header-color"> HOME</span>  </nuxt-link></span>
                                        </li>
                                        <li class="nav-item nav-color highlight-nav-item">
                                            <span class="nav-link " href="#"><nuxt-link to="/products" class="header-color"> GROCERY </nuxt-link></span>
                                        </li>
                                        <li class="nav-item">
                                            <span class="nav-link" href="#"><nuxt-link to="/adminProducts" class="header-color">ADMINPRODUCTS</nuxt-link></span>
                                        </li>
                                        <li class="nav-item">
                                            <span class="nav-link" href="#"><nuxt-link to="/adminCategories" class="header-color">ADMINCATEGORIES</nuxt-link></span>
                                        </li>
                                    </ul>
                                </div>
        </nav>




                        </div>
                    </div>
                </div>

            </div>
        </div>

        
    </main>

        
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    
    computed: {
        ...mapGetters(['getCartTotalPrice','getCartLength','isAuthenticated', 'loggedInUser'])
    },
    methods: {
        async onLogout(){
            
            console.log("I am in onLogout");
            setTimeout(async () => {
            
            // this.$store.commit('logOutUser')
            await this.$auth.logout();
            }, 1000);
            this.$router.push('/');
          
        }
    },
}
</script>

<style>

</style>