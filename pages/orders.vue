<template>
  <!--MAIN-->
  <main>
    <!--YOUR ORDER-->
    <div class="container-fluid your-order">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-12"></div>
        <div class="col-xl-8 col-lg-8 col-md-12">
          <div class="row align-middle">
            <div class="col-md-12 col-sm-12 col-lg-12 "> 
              <h1 class="all-heading-color">Orders History</h1>
            </div>
          </div>

          <div class="orderContent" v-for="order in orders" :key="order._id">
          
            <div class="orderContentHeader">
              <div class="card order-margin">
                <div class=" order-border ">
                  <div class="row ">

                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 " >
                      <div class="a-row align-middle">
                        <span class="orders-heading">Order Placed:</span>
                        
                        <span class="order-header-formatting">{{order.orderDate | dateFormatting}}</span>
                      </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                      <div class="a-row align-middle">
                        <span class="orders-heading">Order Total:</span>
                       
                        <span class="order-header-formatting"> £{{order.cartTotal}}</span>
                      </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                      <div class="a-row align-middle">
                        <span class="orders-heading">Deliver to:</span>
                        
                        <!-- Owner's name -->
                        <span href class="order-header-formatting">
                          {{loggedInUser.name}}
                          
                        </span>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                      <div class="a-row align-middle">
                        <span class="orders-heading">Order # </span>
                       
                        <span class="order-header-formatting">{{order._id}}</span>
                        &nbsp;
                      
                        
                      </div>
                    </div>
                </div>
            </div>
            <!-- Orders body -->
            <div class="orderContentBodyAlt order-border" >
              <!-- List of products from order -->
              <div v-for="ord in order.products" :key="ord._id">
                <div class="a-spacing-base"></div>
                <div class="row">
                  <div class="col-xl-2 col-lg-2 col-2">
                    <!-- Product's image -->
                    
                      <img class="img-fluid" :src="ord.productID.photo" style="width: 120px; margin-left:12px;" />
                    
                    <!-- <dir> {{ord.products}}</dir> -->
                  </div>
                  <div class="col-xl-10 col-lg-10 col-10">
                    <div class="a-row">
                      <span class="a-size-small">
                        <!-- Product title -->
                        <!-- <a href="#">{{order.products[0].productID.title}}</a> -->
                      
                        <!-- <div> {{ord}} </div>
                        <div> {{ord.price}} </div>
                        <div> {{ord.isOnSale}} </div>
                        <div> {{ord.salePrice}} </div>
                       -->
                        <span class="order-title-formatting" >{{ord.productID.title}}</span>
                      </span>
                    </div>
                    <!-- <div class="a-row">
                      <span class="a-size-mini a-color-secondary">Sold by: Amazon Export Sales LLC</span>
                    </div> -->
                    <!-- {{ord.productID.isOnSale}} -->
                     <div class="a-row ">
                      <!-- Product price -->
                      <span class="order-content-formatting-label">Unit Price: <span class="order-content-formatting"> £{{ (ord.isOnSale) ? ord.salePrice : ord.price }} </span></span>
                      <!-- <span class="order-content-formatting">Unit Price: £{{  ((ord.isOnSale) ? true : false) }}</span> -->
                    </div>
                    <div class="a-row">
                      <!-- Product quantity -->
                      <span class="order-content-formatting-label">Quantity: <span class="order-content-formatting">{{ord.quantity}} </span></span>
                    </div>
                    <div class="a-row" style="text-align:right; margin-right:20px;">
                      <!-- Product price -->
                      <span class="order-content-formatting-label">Sub-total: <span class="order-content-formatting"> £{{  (ord.isOnSale) ? ord.salePrice * ord.quantity : ord.price * ord.quantity  }}</span> </span>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>


          </div>

          </div>
          </div> 
          <br> <hr>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-12"></div>
      </div>
    </div>
    <!--/YOUR ORDER-->
  </main>
  <!--/MAIN-->
</template>
<script>
import {mapGetters} from 'vuex'
import moment from 'moment';
export default {
    async asyncData({$axios}) {
        try {
            let response = await $axios.$get('/api/orders')
            // console.log(response.products.length);
            console.log(response);
            console.log(response.products);
            console.log(response.products[0].estimatedPickup);
            console.log(response.products[0].products[0].productID.title);
            console.log(response.products[0].products[0].productID.unitPrice);
            return{
                orders: response.products
            }
        } catch (err) {
            console.log(err);
            
        }
    },
    methods: {
     
    },  
    computed: {
        ...mapGetters(['getCartLength','isAuthenticated', 'loggedInUser'])
    },
     filters: {
       // Filter definitions
        dateFormatting(value) {
            return moment(String(value)).format('DD/MM/YYYY hh:mm')
        }
    }
}
</script>
