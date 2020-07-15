<template>
<main class="ap-container">
        <div class="row">
    <!-- <div class="container-fluid addProduct-container"> -->
                <h2 class="ap-page-title">Products</h2>
            <div class="col-lg-12 col-md-12 col-sm-12 ap-col">
                <span>
                  <!-- <nuxt-link to="/categories">Categories</nuxt-link>
                  <span> > </span>
                  <nuxt-link to="/products">Products</nuxt-link> -->
                  
                   <div>
                     <h4 class="all-heading-color align-center">Update product</h4>
                     <!-- <br> -->
                      <label class="all-heading-color" >Filter Category </label>
                    <b-form-select
                      v-model="selected"
                      :options="menuCategories"
                      class="mb-3"
                      value-field="type"
                      text-field="type"
                      disabled-field="notEnabled"
                       @input="filterCategories(menuCategories,selected)"
                    ></b-form-select>
                   
                    <p v-show="false" v-for="val in menuCategories" :key="val._id">{{ val.type }}</p>
                    <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                   
                  </div>

                <div>
                  <label class="all-heading-color">Filter/Search Product</label>
                  <!-- <p>{{ menuProducts[0].title }}</p> -->
                  <!-- <p v-for="val in value" :key="val._id">{{ val.title }}</p> -->
                  
                  
                  <multiselect 
                    v-model="value" 
                    :options="menuProducts" 
                    :multiple="true" 
                    :close-on-select="false" 
                    :clear-on-select="false" 
                    :preserve-search="true" 
                    placeholder="Filter Products" 
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
                  <p class="all-heading-color">Total Products: <b>{{totalProducts}} </b> </p>
                  <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->


                </div>
                  
                   
                 

                </span>

            
          <!-- <b-dropdown  text="Sort"  class="m-2"  >
                    <b-dropdown-item href="#" @click="sortProduct('lowToHigh')">Price : Low to high</b-dropdown-item>
                    <b-dropdown-item href="#" @click="sortProduct('highToLow')">Price : High to Low</b-dropdown-item>
          </b-dropdown> -->

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

                

                <!-- <ul>
                    <li class="ap-li" v-for="(product,index) in products" :key="product._id">
                        <img class="ap-image" :src="product.photo" alt="ninjas Image"><br>
                        <div class="ap-field-display">
                          
                          <label class="ap-code">Product #: {{product.productCode}} </label><br>
                         
                          <label class="ap-title">{{product.title}}</label> <br>
                          <label>In Stock: {{product.stockQuantity}} </label><br>
                          <span>
                            <label class="ap-price-label">Price: <span :class="{'ap-price':product.isOnSale}"> £{{product.unitPrice}} &nbsp; </span></label>
                            <label class="ap-sale-price" v-if="product.isOnSale"> £{{product.salePrice}}</label>
                          </span>
                          <label class="ap-reference-price"> &nbsp;&nbsp; (£{{product.referencePrice}}/kg)</label><br>
                        </div>
                        <div class="a-row">
                          <nuxt-link :to="`/products/${product._id}`" class="">Update</nuxt-link>
                          <nuxt-link to="" class="" @click.native="onDeleteProduct(product._id,index)">Delete</nuxt-link>
                        </div>
                    </li>
                </ul> -->
            </div>
        </div>
          <!-- <button type="button" @click="reloadProducts" >Reset</button> 
          <b-dropdown  text="Sort" variant="primary" class="m-2 ">
                    <b-dropdown-item href="#" @click="sortProduct('lowToHigh')">Price : Low to high</b-dropdown-item>
                    <b-dropdown-item href="#" @click="sortProduct('highToLow')">Price : High to Low</b-dropdown-item>
          </b-dropdown>   -->

            


        <b-container>
          <!-- <b-row>
            <b-col cols="12" sm="4" class="my-1 " :key="index" v-for="(item, index) in paginatedItems">
              <b-card
                :bg-variant="item.variant"
                text-variant="blue"
                :header="item.title"
                class="text-center card-styling"
              >
                <p class="card-text">{{item.description}}</p>
                <p class="card-text">£ {{item.unitPrice}} </p>
              </b-card>
            </b-col>
          </b-row> -->

            <b-row>
          
          </b-row>
          
          <b-row>
                <ul>
                    <li class="ap-li" v-for="(product,index) in paginatedItems" :key="product._id">
                        <img class="ap-image" :src="product.photo" alt="ninjas Image"><br>
                        <div class="ap-field-display">
                          <!-- <label class="ap-field-display">Product Code</label> -->
                          <label class="ap-code">Product #: {{product.productCode}} </label><br>
                          <!-- <label class="ap-field-display">Product Title</label> -->
                          <label class="ap-title">{{product.title}}</label> <br>
                          <label>In Stock: {{product.stockQuantity}} </label><br>
                          <span>
                            <label class="ap-price-label all-heading-color">Price: <span class="ap-price-color"> <span :class="{'ap-price':product.isOnSale}"> £{{product.unitPrice}} &nbsp; </span></span></label>
                            <label class="ap-sale-price" v-if="product.isOnSale"> £{{product.salePrice}}</label>
                          </span>
                          <label class="ap-reference-price"> &nbsp;&nbsp; (£{{product.referencePrice}}/kg)</label><br>
                        </div>
                        <div class="a-row">
                          <nuxt-link :to="`/adminProducts/${product._id}`" class=""> <v-btn small  dark color="indigo"> Update </v-btn></nuxt-link>
                          <nuxt-link to="" class="" @click.native="onDeleteProduct(product._id,index)"> <v-btn small dark color="indigo"> Delete </v-btn></nuxt-link>
                        </div>
                    </li>
                </ul>
          </b-row>

            <!-- <b-col >
              <b-pagination
                @change="onPageChanged"
                :total-rows="rows"
                :per-page="perPage"
                v-model="currentPage"
                class="m-auto"
                style="width:310px"
              />
            </b-col> -->


        
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

// const items = [
//   {
//     title: "Primary",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "primary"
//   },
//   {
//     title: "Secondary",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "secondary"
//   },
//   {
//     title: "Success",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "success"
//   },
//   {
//     title: "Info",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "info"
//   },
//   {
//     title: "Warning",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "warning"
//   },
//   {
//     title: "Danger",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     variant: "danger"
//   }
// ];


import Multiselect from 'vue-multiselect'
export default {
  data() {
    return {
      count:0,
      onSale:false,
      // products:{},
      value: [],
      selected: 'A',
      // perPage: 3,
      // currentPage: 1,
        // items: [
        //   { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
        //   { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
        //   { id: 3, first_name: 'Barney', last_name: 'Rubble' },
        //   { id: 4, first_name: 'Betty', last_name: 'Rubble' },
        //   { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
        //   { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
        //   { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
        //   { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
        //   { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        // ],

      // items: products,
      // paginatedItems: products,
      currentPage: 1,
      perPage: 5,
      totalRows: 'rows',
      sortOptions: ['Low to High', 'High to Low']

    }
  },
  components:{
    Multiselect
  },
  computed: {
    rows() {
        return this.totalProducts;
      }
  },
  async asyncData({$axios}) {
    try {

      // let catResponse = await $axios.$get('http://localhost:3000/api/categories')
      let catResponse = await $axios.$get('/api/categories')

      
      
      // console.log(catResponse.categories);
      // let productResponse = await $axios.$get('http://localhost:3000/api/products')
      let productResponse = await $axios.$get('/api/products')
  
      // console.log("logging product: in /products: "+productResponse.products);
      // console.log(productResponse.products);
      // console.log("Logging length: "+ productResponse.products.length);
      var totalProducts= productResponse.products.length;
      // console.log("Logging length: "+ JSON.stringify(productResponse.products));
      
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
    async onDeleteProduct(id,index){
        console.log("I am in delete "+ id +" and index is "+index);
      
        try {
          // let response = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`)
          let response = await this.$axios.$delete(`/api/products/${id}`)
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

          // let response = await this.$axios.$get(`http://localhost:3000/api/productFilter/:id/`,request)
          let response = await this.$axios.$get(`/api/productFilter/:id/`,request)
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
          
          // let response = await this.$axios.$get(`http://localhost:3000/api/productFilterbyCategory/:id/`,request)
          let response = await this.$axios.$get(`/api/productFilterbyCategory/:id/`,request)
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
      console.log(sortCriteria);
      console.log(this.products[0]);
      if(sortCriteria === 'Low to High'){
        this.products.sort(this.sortproductLtoH)
      }else if(sortCriteria === 'High to Low'){
        this.products.sort(this.sortproductHtoL)
      }else if(sortCriteria === 'title'){
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
  border:1px solid #222;
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
 box-shadow: 5px 10px 13px rgb(176, 100, 123,0.8);
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