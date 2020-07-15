<template>
<main class="ap-container">
    <div class="row ">
<!-- <div class="container-fluid addProduct-container"> -->
        <!-- <div class="ap-page-title"> -->

      <h2 class="ap-page-title">Groceries</h2>
        <!-- </div> -->
      <div class="col-lg-12 col-md-8 col-sm-12 ap-col ">
      <span>
        
        <div>

            <div class="ap-page-subheading-title">
              
                (Please filter by category type or product name)
            </div>
            <!-- <div> -->
              <!-- <h4 class="all-heading-color align-center"> -->
          <!-- <div>
            <div class="ap-page-subheading-title">
              
                (Please filter by category type or product name)
            </div>
            <div class="ap-page-subheading-sorting">
              <v-select
              class="mt-2"
              style="width=20px"
                :items="sortOptions"
                label="Sort by Price"
                dense
                outlined
                color="indigo"
               
                
               
                @input="sortProduct"
               
              ></v-select>
              
              <v-btn type="button" dark color="indigo" @click="reloadProducts" >Reset</v-btn> 

            </div> -->
          <!-- </div>  -->
   
            
            
            <!-- <br> -->
            <label class="all-heading-color">Filter Category</label>
            <b-form-select
              v-model="selected"
              :options="menuCategories"
              class="mb-3 product-filter"
              value-field="type"
              text-field="type"
              disabled-field="notEnabled"
              @input="filterCategories(menuCategories,selected)"
            ></b-form-select>
          
            <p v-show="false" v-for="val in menuCategories" :key="val._id">{{ val.type }}</p>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
          
        </div>

        <div>
            <label class="typo__label all-heading-color">Filter/Search Product</label>
            <multiselect 
                v-model="value" 
                :options="menuProducts" 
                :multiple="true" 
                :close-on-select="false" 
                :clear-on-select="false" 
                :preserve-search="true" 
                placeholder="Filter Groceries" 
                label="title" 
                track-by="title" 
                :preselect-first="false"
                @input="filterProducts(value)" >
                <template 
                    slot="selection" 
                    slot-scope="{ values, search, isOpen }">
                    <span class="multiselect__single" 
                        v-if="values.length &amp;&amp; !isOpen">
                        {{ values.length }} 
                        options selected
                    </span>
                </template>
            </multiselect>
            <!-- <br> -->
            <!-- <p> {{value.length}} </p> -->
            <p class="all-heading-color">Products Selected: <b> {{totalProducts}} </b> </p>
            <div class="ap-button">
              <v-select
                class="mt-2"
                :items="sortOptions"
                label="Sort by Price"
                dense
                outlined
                color="indigo"
                @input="sortProduct"
              ></v-select>
            </div>

            <div class="ap-button">
              <v-btn type="button" dark color="indigo" @click="reloadProducts" >Reset</v-btn>
            </div> 
            <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->

        </div>
      </span>
  </div>
    </div>

        
        <!-- <p> {{products}} </p> -->

    <b-container>
      <b-row>
        <ul>
          <li class="ap-li" v-for="product in paginatedItems" :key="product._id">
              <nuxt-link :to="`/products/${product._id}`">
                <img class="ap-image" :src="product.photo" alt="ninjas Image"><br>
                <div class="ap-field-display">
                  <label class="ap-title">{{product.title}}</label> <br>
                  <span>
                    <label class="ap-price-label all-heading-color">
                      Price: 
                      <span class="ap-price-color">
                        <span :class=" {'ap-price':product.isOnSale}">
                          £{{product.unitPrice}} 
                        </span>
                      </span>
                      <span class="ap-sale-price" v-if="product.isOnSale">
                        £{{product.salePrice}}
                      </span>
                      <span class="ap-reference-price">
                        (£{{product.referencePrice}}/kg)
                      </span>
                    </label>
                      <!-- <label class="ap-sale-price" v-if="product.isOnSale"> £{{product.salePrice}}  </label> -->
                      <!-- <label class="ap-reference-price"> &nbsp;&nbsp; (£{{product.referencePrice}}/kg)</label><br> -->
                  </span>
                </div>
              </nuxt-link>  
                
                <!-- <button  class="order-button "  @click="addProductToCart1(product)"><i class="fa fa-shopping-cart 2x"></i></button> -->
              <v-btn class="mx-2 ma-3" @click.native="addProductToCart1(product);snackbar=true" fab dark color="indigo">
                <i class="fa fa-shopping-cart fa-2x"></i>
              </v-btn>

              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
              >
                {{ text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="green"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
              <!-- </div> -->
          </li>
        </ul>
      </b-row>
    </b-container>
       
      <b-row>
        <b-col >
          <b-pagination
              @change="onPageChanged"
              :total-rows="rows"
              :per-page="perPage"
              v-model="currentPage"
              class="m-auto"
              style="width:310px"
          />
        </b-col>
      </b-row>
        


</main>

</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from "vuex";
import Multiselect from 'vue-multiselect'
export default {
  data() {
    return {
      count:0,
      onSale:false,
      // products:{},
      value: [],
      selected: 'A',
      currentPage: 1,
      perPage: 15,
      totalRows: 'rows',

      snackbar: false,
      text: 'Item added to the cart',
      timeout: 1500,

      sortOptions: ['Low to High', 'High to Low']

    }
  },
  components:{
    Multiselect
  },
  computed: {
     ...mapGetters(['countInCart','getCart']),
     
    rows() {
        return this.totalProducts;
      }
  },
  async asyncData({$axios}) {
    try {

      let catResponse = await $axios.$get('http://localhost:3000/api/categories')
      let productResponse = await $axios.$get('http://localhost:3000/api/products')
  
      // console.log("logging product: in /products: "+productResponse.products);
      // console.log(productResponse.products);
      // console.log("Logging length: "+ productResponse.products.length);
      var totalProducts= productResponse.products.length;
      if(productResponse && catResponse){
        return{
          products:productResponse.products,
          menuProducts:productResponse.products,
          menuCategories:catResponse.categories,
          totalProducts,
          items: productResponse.products,
          paginatedItems: productResponse.products
        }
      }
      
    } catch (error) {
        console.log(error);
    }
    
  },
  
        
    
  methods: {
    ...mapActions(['addProductToCart1']),
    // snackbar(){
    //   console.log("I am in Snackbar");
    // },
    async countOfCart(product){
      try {
        // var test = await countInCart();
        console.log("I am in count of Cart: ");
        // console.log(test);
        
        console.log(product);
        return product;
        
      } catch (error) {
        console.log(error);
                
      }
       
    },

    async onDeleteProduct(id,index){
        console.log("I am in delete "+ id +" and index is "+index);
      
        try {
          let response = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`)
          if(response.status){
            this.products.splice(index,1)
          
          }
          this.$router.push('/products')
          
        } catch (error) {
            console.log(error);
            
        }
    },

    classObject: function () {
        
          // return   (this.isOnSale)? this.onSale= true : this.onSale= false
          if(this.isOnSale){
            //  this.onSale= true
             console.log("Printing on Sale true: "+this.isOnSale);
             
          }
          if(!this.isOnSale){
            //  this.onSale= true
             console.log("Printing on Sale false: "+this.isOnSale);
             
          }
          
    },
    async filterProducts(value) {
        try {
          console.log("Printing values searched: "+ JSON.stringify(value));
          var params = new URLSearchParams();

          for (const val of value){
            console.log(val._id);
            params.append("product", val._id);
          }

          var request = {
            params: params
          };
          
          console.log(params);

          let response = await this.$axios.$get(`http://localhost:3000/api/productFilter/:id/`,request)
          console.log("Printing length in filter products: "+response.product.length);
          this.totalProducts= response.product.length;
          this.products=response.product
          this.items= response.product
          this.paginatedItems=response.product

          
      
        } catch (error) {
        console.log(error);
        }
    },
    reloadProducts() {
      this.$router.go('/products')
    },
    async filterCategories(allCategories,searchedValue) {
      try {
          var categoryID=null;
          // console.log(" Searched Category: "+ searchedValue);
          // console.log("All categories: "+ JSON.stringify(allCategories));
          for(const val in allCategories){
            // console.log(`${val}: ${JSON.stringify(allCategories[val])}`);
            // console.log(allCategories[val].type);
            if(allCategories[val].type === searchedValue){
              console.log("Bazinga!! --> "+searchedValue);
              categoryID=allCategories[val]._id;
              console.log("ID is :  "+categoryID);
              
            }
            
          }
          
          var params = new URLSearchParams();

          params.append("categoryID", categoryID);
         

          var request = {
            params: params
          };
          
          console.log(params);
          
          let response = await this.$axios.$get(`http://localhost:3000/api/productFilterbyCategory/:id/`,request)
          console.log(response.product);
          this.totalProducts = response.product.length; 
          this.products = response.product;
          this.menuProducts = response.product;
          this.items= response.product
          this.paginatedItems=response.product
          // this.paginate(this.perPage, page - 1);
          this.onPageChanged(this.currentPage);
      
        } catch (error) {
        console.log(error);
        }
    },
    
    paginate(page_size, page_number) {
      console.log(page_size +" and number is "+page_number +" Current page: "+this.currentPage);
      
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      console.log(this.currentPage +" and "+ page);
      
      this.paginate(this.perPage, page - 1);
    },

    sortProduct(sortCriteria){
      console.log(" I am in sort with value"+ sortCriteria );
      console.log(sortCriteria);
      console.log(this.products[0]);
      if(sortCriteria === 'Low to High'){
        this.products.sort(this.sortproductLtoH)
      }else if(sortCriteria === 'High to Low'){
        this.products.sort(this.sortproductHtoL)
      }else if(sortCriteria === 'title'){
        console.log(this.sortproductTitle);
        
        this.products.sort(this.sortproductTitle)
      }
      this.onPageChanged(this.currentPage);
      
      // console.table(this.products);
      
    },
    sortproductLtoH(a,b){

      this.count++;
      console.log(this.count );
      
      const bandA = (a.isOnSale && (a.salePrice < a.unitPrice)) ? a.salePrice:a.unitPrice
      const bandB = (b.isOnSale && (b.salePrice < b.unitPrice)) ? b.salePrice:b.unitPrice
      console.log(bandA +" -- "+ bandB);
      // console.log(bandB);
      

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      
      return comparison;
    },
     sortproductHtoL(a,b){

      this.count++;
      console.log(this.count );
      
      const bandA = (a.isOnSale && (a.salePrice < a.unitPrice)) ? a.salePrice:a.unitPrice
      const bandB = (b.isOnSale && (b.salePrice < b.unitPrice)) ? b.salePrice:b.unitPrice
       console.log(bandA +" -- "+ bandB +"");
      // console.log(bandB);
      

      let comparison = 0;
      if (bandA > bandB) {
        comparison = -1;
      } else if (bandA < bandB) {
        comparison = 1;
      }
      
      return comparison;
    },
    sortproductTitle(a,b){

      this.count++;
      console.log(this.count );
      
      const bandA = (a.isOnSale && (a.salePrice < a.unitPrice)) ? a.salePrice:a.unitPrice
      const bandB = (b.isOnSale && (b.salePrice < b.unitPrice)) ? b.salePrice:b.unitPrice
      console.log(bandA +" -- "+ bandB);
      // console.log(bandB);
      

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      
      return comparison;
    }
  },
  mounted() {
    this.paginate(this.perPage, 0);
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
  border:1px solid #1f3c88;
  margin: 10px;

  border-radius: 2px;
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
  border-radius:10px;
  border: 1px solid #000;
  background: #fff;
  float: left;

}
li:hover {
 box-shadow: 0px 0px 10px rgba(74, 117, 158, 0.8);
}
.card-styling{
  color: black;
  font: bold;
  background-color: rgb(132, 235, 192);
}
.card-styling2{
  color: red;
  font: bold;
  background-color: yellow;
}
</style>