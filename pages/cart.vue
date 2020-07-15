<template>
  <!--MAIN-->
  <main>
    <!--SHOPPING CART-->
    <div class="shopping-cart mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-2">
            </div>
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="c-section a-spacing-top-base">
              <div class="a-row sc-cart-header sc-compact-bottom">
                <h2 class="cart-heading-color">Shopping Cart</h2>
              </div>
              <form action="#" method="post">
               <!-- <div>hello</div> -->
                <br>
                <div class="sc-list-body" v-for="product in getCart" :key="product[0]._id">
                  <div class="sc-list-item-border">
                    <div class="a-row a-spacing-top-base a-spacing-base">
                      <div class="row cart-row">
                        <!-- Product's Image -->
                        <div class="col-lg-2 col-md-2 col-sm-3 ">
                          <a href="#"  class="a-link-normal">
                            <img :src="product[0].photo" class="img-fluid w-100" />
                          </a>
                        </div>
                        <div class="col-lg-8 col-md-5 col-sm-6 ">
                          <!-- Product's Title -->
                          <div class="a-spacing-mini">
                            <h5 class="cart-product-title">
                              {{product[0].title}}
                            </h5>
                            <!-- Product's Owner name -->
                            <!-- <span class="a-size-base sc-product-creator">{{product.owner.name}}</span> -->
                          </div>
                          <div class="cart-unitprice-title">
                            <span
                              class="all-heading-color"
                            >Unit Price: </span>
                            <!-- <span> {{product[0].unitPrice}} </span> -->
                            <!-- <span class="sp-product-price"><span :class="{'sp-price':isOnSale}"> £ {{product[0].salePrice}} </span></span>  -->
                            <label class="sp-price-discounted" v-if="product[0].isOnSale"> Save £{{product[0].unitPrice - product[0].salePrice}}, was £{{product[0].unitPrice}} now £{{product[0].salePrice}}</label>
                            <label class="cart-unitprice-label" v-else> £{{product[0].unitPrice}}</label>
                            <br>
                            <span class="all-heading-color cart-quantity-label"> Quantity: <span class="cart-basket-label"> {{product[0].quantity}} in basket </span> </span>
                            <!-- <span> Quantity: {{product.quantity}} </span> -->
                          </div>
                        </div>

                        <!-- <div class="sc-action-links"> -->
                            <div class="col-lg-2 col-md-3 col-sm-3  ">
                            <!-- Product's Price -->
                              <p class="a-spacing-small">
                                  <span
                                  class="cart-item-total-price"
                                  > £{{ parseFloat(((product[0].isOnSale) ? product[0].salePrice : product[0].unitPrice)  * product[0].quantity).toFixed(2)   }}  </span>
                              </p>
                              <select class="cart-quantity-title"
                              @change="onChangeQuantity($event, product)"
                              style="width:100%; outline: 1px solid gray; height:50px; margin-bottom:30px;" 
                              >
                                <option v-for="j in 10" :key="j" :value="j" :selected="checkQty(product[0].quantity,j)" > &nbsp;Qty: {{j}}  </option>
                              </select>
                            
                            <!-- <span>| </span> -->
                            
                            <!-- Delete button -->
                            <span class="">
                              <a href="#" @click="$store.commit('removeProduct',product)">Delete</a>
                            </span>
                            &nbsp;
                            &nbsp;
                            </div>

                        <!-- </div> -->

                        
                      </div>
                    </div>
                  </div>
                </div>
                <!-- List of the item -->

                <div class="text-right">
                  <br>
                  <!-- Cart Subtotal -->
                  <p class="a-spacing-none a-spacing-top-mini">
                    
                      <span class=" cart-subtotal-label">Total ({{getCartLength}} item): </span>
                      <span class="a-color-price a-text-bold">
                        <span class=" cart-total-price">£{{getCartTotalPrice}}</span>
                      </span>
                      <br><br>
                      <span class="a-button-inner">
                          <!-- <nuxt-link to="/payment"> -->
                            <!-- to="/payment" -->
                            <v-btn 
                              dark color="indigo"
                              class="cart-checkout-text"
                              @click.native="  isSignedIn(isAuthenticated)  ">
                                Proceed to checkout
                            </v-btn>
                          <!-- </nuxt-link> -->
                      </span>
                   
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2">
            <!-- <div class="a-box-group" style="margin-bottom: 14px;">
              <div class="a-box a-color-alternate-background">
                <div class="a-box-inner">
                  <div class="a-spacing-mini">
                    <p class="a-spacing-none a-spacing-top-none">
                     
                      <span class="a-size-medium">
                        <span>Subtotal ({{getCartLength}} item):</span>
                        <span class="a-color-price a-text-bold">
                          <span class="a-size-medium a-color-price">£{{getCartTotalPrice}}</span>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div>
                    <span class="a-spacing-small a-button-primary a-button-icon">
                      <span class="a-button-inner">
                        <nuxt-link to="/payment"><button class="">Proceed to checkout</button></nuxt-link>
                      </span>
                    </span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
    <!--/SHOPPING CART-->
  </main>
  <!--/MAIN-->
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters(['getCart','getCartTotalPrice','getCartLength','isAuthenticated'])
    },
    methods: {
        onChangeQuantity(event, product){
            let qty = parseInt(event.target.value)
            //calling mutation directly, we could have added an action but it was just one line
            this.$store.commit('changeQuantity',{product,qty})
        },
        checkQty(prodQty,qty){
            if(parseInt(prodQty) === parseInt(qty)){
                return true
            }else{
                return false
            }
        },
        isSignedIn(isAuthenticated){
          // console.log("Status is : "+isAuthenticated);
          
          if(isAuthenticated){

            console.log("User is loggedIn redirecting to the cart:  "+ isAuthenticated);
            this.$router.push('/payment')
          }else{
            console.log("User is not logged in :  Status --> "+ isAuthenticated);
            this.$router.push('/login')

          }
        },
        NotSignedIn(){
          console.log("Not Signed in "+this.$auth.loggedIn );
          
        }

    },
}
</script>

