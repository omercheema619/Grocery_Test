<template>
<main class="">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-10 col-md-10 col-sm-10 ap-col">
                
                
                              
            </div>
        </div>
    </div>
    <div class="sp-container">
        <h2 class="">Products</h2>
        <!-- <div class="col-lg-8 col-md-5 col-sm-3 sp-body"> -->
        <div class="row sp-row"> 
               
            <div class="  col-lg-4 col-md-6 col-sm-12 sp-row card">
                <img :src="photo" class="sp-product-image">
            </div>
            <div class="sp-product-content col-lg-8 col-md-6 col-sm-12 sp-row card">
                <div class="sp-title">
                   <span class="sp-product-title">{{title}}</span>
                </div>
                <div class="sp-product-price">
                    <span class="sp-product-price"><span :class="{'sp-price':isOnSale}"> £{{unitPrice}} </span></span> 
                    <label class="sp-price-discounted" v-if="isOnSale"> £{{salePrice}}</label>
                    <span class="sp-product-reference-price">(£{{referencePrice}}/100g) </span>
                    <br>
                    <span class="" v-if="isOnSale"> Save £{{unitPrice - salePrice}} <br></span>
                    
                    
                </div>

                <div class="">
                    <span class="">
                        <v-btn class="" @click="addProductToCart(product)" fab dark color="indigo">
                            <i class="fa fa-shopping-cart fa-2x"></i></v-btn>
                    </span>
                </div>


                 <div role="tablist">

                    <v-row justify="center">
                        <v-expansion-panels accordion>
                        
                         <v-expansion-panel>
                            <v-expansion-panel-header>Product Detail</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{description}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Ingredient</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{ingredient}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Storage & Use</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{storageAndUse}}
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        </v-expansion-panels>
                    </v-row>
                </div>
            </div>
        </div>
        <!-- </div> -->

    <h4>Disclaimer</h4>
    <p>
        Please note that while we take every care to make sure the product information displayed on our website is correct, product recipes are regularly changed. This may affect nutrition and allergen information therefore you should always check product labels and not rely solely on the information presented here.

        If you require specific advice on any Waitrose branded product, please contact our Customer Care Team. For all other products, please contact the manufacturer.

        This information is supplied for personal use only. It may not be reproduced in any way whatsoever without the prior consent of Waitrose Limited nor without due acknowledgement.
    </p>
    </div>


</main>

</template>

<script>
import {mapActions} from "vuex";
export default {
    data(){
        return{
            fileName:'',
            selectedFile:null,
            errors: [],
            myCategoryType:''
        }
    },
    async asyncData({$axios,params}) {
    try {
        console.log(params);
        let ingredient="I am ingredient"
        let storageAndUse="I am Storage and Use"
        
        // let product = await $axios.$get(`http://localhost:3000/api/products/${params.id}`)
        let product = await $axios.$get(`/api/products/${params.id}`)
            
        const [productResponse]= await Promise.all([product])

        console.log(productResponse.product[0].title);
        console.log(productResponse.product[0]);
        console.log(productResponse.product[0].isOnSale);
        
        // console.log(productResponse.product[0].type);

        // console.log(categoryResponse.categories);
        // console.log(categoryResponse.categories[0].type);
        
        return{
          product:productResponse.product,
         
          
          productCode : productResponse.product[0].productCode,
          categoryType : productResponse.product[0].category.type,
          title : productResponse.product[0].title,
          description : productResponse.product[0].description,
          photo : productResponse.product[0].photo,
          unitPrice : productResponse.product[0].unitPrice,
          referencePrice : productResponse.product[0].referencePrice,
          stockQuantity : productResponse.product[0].stockQuantity,
          isOnSale:productResponse.product[0].isOnSale,
          salePrice:productResponse.product[0].salePrice,
          ingredient:ingredient,
          storageAndUse:storageAndUse
   
        }
      
      
    } catch (error) {
        console.log(error);
    }
    
  },
  methods: {
        ...mapActions(['addProductToCart'])
    }
  }

</script>

<style scoped>
.ninja-body{
  margin: 20px auto;
  /* background-color: red; */
  max-width: 900px;
  padding: 0 auto;
  width:100%;
}
ul{
  display: flex;
   flex-wrap: wrap;
   list-style-type: none;
   padding: 0;
}
li{
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  padding: 30px;
  border:1px solid #222;
  margin: 10px;

  border-radius: 10px;
  box-sizing: border-box;

  transition: box-shadow .3s;
}
.ap-image{
  width: 250px;
  height:200px;
}

.box {
  transition: box-shadow .2s;
  width: 300px;
  height: 500px;
  margin: 50px;
  border-radius:2px;
  border: 1px solid #000;
  background: #fff;
  float: left;

}
li:hover {
 box-shadow: 5px 10px 13px rgb(176, 100, 123,0.8);
}
</style>