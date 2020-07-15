<template>
<main class="udp-container">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12 ap-col">
                <form action=""
                @submit="checkForm">
                <h2 class="ap-page-title">Products</h2>
                
                <!-- <span>
                  <nuxt-link to="/">Home</nuxt-link>
                  <span> > </span>
                  <nuxt-link to="/products">Product</nuxt-link>
                </span> -->
                
                <!-- Title input-->
                <div class="">
                    <label class="admProd-label-title" >Product Code</label>
                    <v-text-field 
                        type="text" 
                        single-line
                        outlined
                        style="width:100%"
                        v-model="productCode" 
                        placeholder="Add your product code here"/>
                </div>


                   <!-- Category Dropdown -->
                 <label class="admProd-label-title">Category</label> 
                <select 
                    style="width:100%; outline: 1px solid gray; height:50px; margin-bottom:30px;" 
                    v-model="categoryType"
                    required 
                >
                 <!-- @change="onChange($event)" -->
                    <option 
                        v-for="category in categories"
                        :value="category._id"
                        :key="category._id"
                        name="category"
                        
                        >
                        {{category.type}} 
                    </option>
                </select>


                <!-- Title input-->
                <div class="">
                    <label class="admProd-label-title" >Title</label>
                    <v-text-field 
                        single-line
                        outlined
                        type="text" 
                        class="" 
                        style="width:100%" 
                        v-model="title"
                        placeholder="Add product title here"/>
                </div>

                        <!-- Description dropdown -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title" >Description</label>
                    <v-textarea 
                    name=""
                    v-model="description"
                    placeholder="Add product description here"
                    style="width:100%" 
                        auto-grow
                        outlined
                        color="black"
                        rows="1"
                    ></v-textarea>
                </div>
               

                <!-- unit Price -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title" >Unit Price</label>
                    <v-text-field 
                        single-line
                        outlined
                        type="number" 
                        class="a-input-text" 
                        style="width:100%" 
                        v-model="unitPrice"
                        placeholder="Add Unit Price"/>
                </div>

                  <!-- reference Price  -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title">Reference price</label>
                    <v-text-field 
                        single-line
                        outlined
                        type="number" 
                        class="a-input-text" 
                        style="width:100%" 
                        v-model="referencePrice"
                        placeholder="Add reference price, i.e. 10 for £10/kg"/>
                </div>


                 <!-- Stock Quantity -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title" >Stock Quantity</label>
                    <v-text-field 
                        single-line
                        outlined
                        type="number"
                        class="a-input-text"
                        style="width:100%"
                        v-model="stockQuantity"
                        placeholder="Add stock quantity here"/>
                </div>

                <!-- IsOnSale -->
                <label style="margin-bottom:0px" class="admProd-label-title">IsOnSale :</label> 
                <input 
                type="checkbox"
                >
                <!-- Sale Price -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title">Sale Price</label>
                    <v-text-field 
                        single-line
                        outlined
                        type="number"
                        class="a-input-text"
                        style="width:100%"
                        placeholder="Add sale price here"/>
                </div>

                <!-- Photo file -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title" >Photo</label>
                    <div class="a">
                        <label class="">
                            <i class="fa fa-plus"></i>
                            <input type="file" @change="onFileSelected"/>
                            <!-- <p style="">{{fileName}}</p> -->
                        </label>
                    </div>
                </div>



              
                <!-- Submit button  -->
                <div class="align-center">
                    <span class="">
                        <span class="">
                            <!-- <span class="btn" @click="onUpdateProduct">Update Product</span> -->
                            <v-btn  dark color="indigo"  @click="addProduct();snackbar=true">Add Product</v-btn>

                            <v-snackbar
                                v-model="snackbar"
                                :timeout="timeout"
                            >
                                {{ text }}

                                <template v-slot:action="{ attrs }">
                                <v-btn
                                    color="white"
                                    text
                                    v-bind="attrs"
                                    @click="snackbar = false"
                                >
                                    Close
                                </v-btn>
                                </template>
                            </v-snackbar>

                        </span>
                    </span>
                </div>
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
               
            </form>                        
            </div>
        </div>
    </div>
     
</main>

</template>

<script>
export default {
    data(){
        return{
            errors: [],
            
            productCode:'',
            categoryType:'',
            title:'',
            description:'',
            unitPrice:0,
            referencePrice:0,
            stockQuantity:1,
            isOnSale:false,
            salePrice:0,
            fileName:'',
            selectedFile:null,

            snackbar: false,
            text: 'Product Added to the list',
            timeout: 1500

        }
    },
    async asyncData({$axios,params}) {
    try {
        // let response = await $axios.$get(`http://localhost:3000/api/categories`);
        let response = await $axios.$get(`/api/categories`);

        console.log(response.categories.type);    

      
      return{
          categories:response.categories
          
        }
      
    } catch (error) {
        console.log(error);
    }
    
  },
  methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
            this.fileName = event.target.files[0].name;
        },
        async addProduct(){
            let data = new FormData();
            console.log(" i am in add product"+this.categoryType);
            
            data.append('productCode',this.productCode)
            data.append('category',this.categoryType)
            data.append('title',this.title)
            data.append('description',this.description)
            data.append('photo',this.selectedFile,this.selectedFile.name)
            data.append('unitPrice',this.unitPrice)
            data.append('referencePrice',this.referencePrice)
            data.append('stockQuantity',this.stockQuantity)
            data.append('isOnSale',this.isOnSale)
            data.append('salePrice',this.salePrice)

            console.log(this.productCode);
           
            console.log("I am in add products before post API");
            // let result = await this.$axios.$post(`http://localhost:3000/api/products`,data)
            let result = await this.$axios.$post(`/api/products`,data)
            console.log("I am in add products after ADD API");
            
             this.$router.go({path:`/products`})
        },
            checkForm: function (e) {
                if (this.category ) {
                    return true;
                }

                this.errors = [];

                if (!this.category) {
                    this.errors.push('Category required.');
                }
               

                e.preventDefault();
    

        }
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
  border-radius:10px;
  border: 1px solid #000;
  background: #fff;
  float: left;

}
li:hover {
 box-shadow: 5px 10px 13px rgb(176, 100, 123,0.8);
}
</style>