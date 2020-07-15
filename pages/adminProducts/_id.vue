<template>
<main class="udp-container">
    <div class="container-fluid">
        <div class="row">
                <h2 class="ap-page-title">Products</h2>
            <div class="col-lg-10 col-md-10 col-sm-12 ap-col">
                <form action=""
                >

                
                <!-- Title input-->
                <div class="">
                    <label class="admProd-label-title " >Product Code</label>
                    <!-- <input type="text" 
                        class="" 
                        style="width:100%" 
                        v-model="productCode" 
                        :placeholder="product[0].productCode"/> -->
                    
                    <v-text-field
                       
                        single-line
                        outlined
                        v-model="productCode" 
                        :placeholder="product[0].productCode"
                    ></v-text-field>

                </div>

                 <!-- Category Dropdown -->
                 <label class="admProd-label-title">Category</label> (Current category: {{product[0].category.type}}) <br>
                <select 
                    v-model="categoryType" 
                    style="width:100%; outline: 1px solid gray; height:50px; margin-bottom:30px;" 
                    required 
                    @change="onChange($event)"
                >
                    <option 
                        v-for="category in categories"
                        :value="category.type"
                        :key="category._id"
                        name="category"
                        >
                        {{category.type}} 
                    </option>


                </select>
                
                <!-- Title input-->
                <div class="">
                    <label class="admProd-label-title" >Title</label>
                    
                    <!-- <input type="text" 
                        class="" 
                        style="width:100%" 
                        v-model="title" 
                        :placeholder="product[0].title"/> -->

                    <v-text-field
                        single-line
                        outlined
                       v-model="title" 
                        :placeholder="product[0].title"
                    ></v-text-field>

                </div>

                        <!-- Description dropdown -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Description</label>
                   
                    <v-textarea name=""  
                        style="width:100%" 
                        auto-grow
                        outlined
                        color="black"
                        rows="1"
                        v-model="description"
                        :placeholder="product[0].description"
                        >
                        </v-textarea>
                </div>
               

                <!-- unit Price -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Unit Price</label>
                    <!-- <input 
                    type="number" 
                    class="a-input-text" 
                    style="width:100%" 
                    v-model="unitPrice" 
                    :placeholder="product[0].unitPrice"/> -->

                    <v-text-field
                        label="Outlined"
                        single-line
                        outlined
                        type="number"
                        v-model="unitPrice" 
                        :placeholder="product[0].unitPrice"
                    ></v-text-field>

                </div>

                  <!-- reference Price  -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Reference price</label>
                    <!-- <input 
                    type="number" 
                    class="a-input-text" 
                    style="width:100%" 
                    v-model="referencePrice" 
                    :placeholder="product[0].referencePrice"/> -->

                    <v-text-field
                        single-line
                        outlined
                        type="number"
                        v-model="referencePrice" 
                        :placeholder="product[0].referencePrice"
                    ></v-text-field>

                </div>

                <!-- Stock Quantity -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Stock Quantity</label>
                    <!-- <input 
                    type="number"
                    class="a-input-text"
                    style="width:100%"
                    v-model="stockQuantity"
                    :placeholder="product[0].stockQuantity"/> -->

                    <v-text-field
                        single-line
                        outlined
                        type="number"
                        v-model="stockQuantity"
                        :placeholder="product[0].stockQuantity"
                    ></v-text-field>


                </div>

                <!-- IsOnSale -->
                <label class="admProd-label-title" style="margin-bottom:0px" >IsOnSale :</label> <span> ({{isOnSale}}) </span> <br>
                <input 
                type="checkbox"
                v-model="isOnSale"
                >
                <!-- Sale Price -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Sale Price</label>
                    <!-- <input 
                    type="number"
                    class="a-input-text"
                    style="width:100%"
                    v-model="salePrice"
                    :placeholder="product[0].salePrice"/> -->

                     <v-text-field
                        single-line
                        outlined
                        type="number"
                        v-model="salePrice"
                        :placeholder="product[0].salePrice"
                    ></v-text-field>


                </div>

                <!-- Photo file -->
                <div class="">
                    <label class="admProd-label-title" style="margin-bottom:0px" >Photo</label>
                    <div class="a">
                        <label class="">
                            <i class="fa fa-plus"></i>
                            <input type="file" @change="onFileSelected"/>
                            <p style="">{{fileName}}</p>
                        </label>
                    </div>
                </div>



                <!-- Submit button  -->
                <div class="">
                   
                            <!-- <span class="btn" @click="onUpdateProduct">Update Product</span> -->
                            <v-btn dark color="indigo" @click="onUpdateProduct" type="button">Update Product</v-btn>
                </div>
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <p>{{product._id}}</p>
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
            fileName:'',
            selectedFile:null,
            errors: [],
            // myCategoryType:'5ec543ff952cb056d00c941d'
            myCategoryType:''
        }
    },
    async asyncData({$axios,params}) {
    try {
        // let product = await $axios.$get(`http://localhost:3000/api/products/${params.id}`)
        let product = await $axios.$get(`/api/products/${params.id}`)
        //.populate('category').exec();
        // let category = await $axios.$get(`http://localhost:3000/api/categories`);
        let category = await $axios.$get(`/api/categories`);
       
    
        const [productResponse,categoryResponse]= await Promise.all([product,category])

        console.log(productResponse.product[0].title);
        console.log(productResponse.product[0]);
        console.log(productResponse.product[0].isOnSale);
        
        // console.log(productResponse.product[0].type);

        // console.log(categoryResponse.categories);
        // console.log(categoryResponse.categories[0].type);
        
        return{
          product:productResponse.product,
          categories:categoryResponse.categories,
          
          productCode : productResponse.product[0].productCode,
          categoryType : productResponse.product[0].category.type,
          title : productResponse.product[0].title,
          description : productResponse.product[0].description,
          unitPrice : productResponse.product[0].unitPrice,
          referencePrice : productResponse.product[0].referencePrice,
          stockQuantity : productResponse.product[0].stockQuantity,
          isOnSale:productResponse.product[0].isOnSale,
          salePrice:productResponse.product[0].salePrice
   
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
        async onUpdateProduct(){
            console.log("In Update 1");
            
            let data = new FormData();
            console.log(this.myCategoryType);
            
            data.append('productCode',this.productCode)
            data.append('category',this.myCategoryType)
            data.append('title',this.title)
            data.append('description',this.description)
            data.append('unitPrice',this.unitPrice)
            data.append('referencePrice',this.referencePrice)
            data.append('stockQuantity',this.stockQuantity)
            data.append('isOnSale',this.isOnSale)
            data.append('salePrice',this.salePrice)
            if (this.selectedFile){
                data.append('photo',this.selectedFile,this.selectedFile.name)
            }
            // console.log(this.selectedFile+ " and "+this.selectedFile.name);
            console.log("In Update 2");
            
            console.log("Printing route value: "+this.$route.params.id);
            // localhost:3000/api/products/5ec522e33c6a34550cb822e8
            // let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`,data)
            let result = await this.$axios.$put(`/api/products/${this.$route.params.id}`,data)
            console.log("printing in update product: retunr of the api call: "+result);
            
            this.$router.push(`/products`)
        },
            async onChange(event) {
                console.log("I am in On change method ");
                // console.log(event.target.value)

            //  let categoryID = await this.$axios.$get(`http://localhost:3000/api/categoryID/${event.target.value}`)
             let categoryID = await this.$axios.$get(`/api/categoryID/${event.target.value}`)
              
                // console.log("I am in categoryID: "+categoryID.category[0]._id);
                // console.log("I am in categoryID: "+JSON.stringify(categoryID));
            this.myCategoryType=categoryID.category[0]._id;
                console.log("Category type: "+categoryID.category[0]._id);
                // console.log("Category type: "+myCategoryType);
                

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