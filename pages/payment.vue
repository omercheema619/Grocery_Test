<template>
  <!--MAIN-->
  <main>
    <!--Payment -->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <!-- Breadcrumbs -->
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  
                    <nuxt-link to="/cart">
                      <span>Shopping Cart > </span>
                    </nuxt-link>
                  
                    <nuxt-link to="/payment">
                      <span>Payment</span>
                    </nuxt-link>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2 class="all-heading-color">Basket Summary:</h2>
              <br>
              <div class="">
                <b class="payment-basket-balance-label">Balance to pay :  <span class="payment-total-price"> £{{getCartTotalPrice}} </span></b><br>
                <b class="payment-basket-items-label">Items in basket:  <span class="payment-total-price"> {{getCartLength}} items</span></b><br>
                <!-- <b>Delivery date is : {{getEstimatedDelivery}} </b> -->
                <br><br>
                <div>
                  <span> We accept the following cards: <img class="payment-card-logo" src="/images/visa-mastercard.png" alt=""></span>
                  <br><br>
                </div>
              </div>

              <!-- Error message  -->
              <!-- <div class="a-section a-spacing-none a-spacing-top-small">
                <b>Error</b>
              </div> -->
              <form action="#" method="post">
                <div class="">
                  <div class="payment-field">
                    <!-- Stripe card -->
                    <div class="" ref="card">

                    </div>
                    <!-- End of Stripe card -->
                  </div>

                  <div class="a-spacing-top-medium"></div>
                  <hr />
                  <div class="a-spacing-top-medium">
                    <!-- <span>
                      <b>Make sure your address is correct</b>
                    </span> -->
                  </div>
                  <!-- <div>
                    <span>If the address contains typos or other errors, your package may be undeliverable.</span>
                  </div> -->

                  <!-- Purchase Button -->
                  <div class="purchase-button">
                    <v-btn dark color="indigo" @click.prevent="onPurchase">Confirm Order</v-btn>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
    <!--/Payment ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters(['getCart','getCartTotalPrice','getCartLength','getEstimatedDelivery'])
    },
    data(){
        return{
            error:'',
            stripe:null,
            card:null
        };
    },
    mounted() {
        this.stripe= Stripe('pk_test_2kpt02YwzokDEvKL2HWONjjT00bQOntVdy')
        let elements = this.stripe.elements()
        this.card = elements.create('card',{hidePostalCode: true})
        this.card.mount(this.$refs.card) //card is same as of the ref in the div tag
    },
    methods: {
        async onPurchase(){
            try {
                console.log("In purchase 1");
                
                let token = await this.stripe.createToken(this.card);
                    console.log("In purchase 2");
                let response = await this.$axios.$post('/api/payment',{
                    token: token,
                    totalPrice: this.getCartTotalPrice,
                    cart: this.getCart,
                    estimatedDelivery: this.getEstimatedDelivery,
                    cartTotal: 100

                })
                
                console.log("In purchase 3");
                
                console.log("Total price in onPurchase: "+this.getCartTotalPrice);
                console.log("GetEstimated Delivery in onPurchase is: "+this.getEstimatedDelivery);

                if(response.success){
                    // redirecting to homepage
                    console.log(response);
                    
                    this.$store.commit('clearCart')
                    this.$router.push('/orders')
                }

            } catch (err) {
                console.log(err);
                
            }
        }
    },
}
</script>

<style>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>