<template>
<main class="udp-container">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12 ap-col">
                <form action="" @submit="checkForm">
                <h2 class="ap-page-title">Add Category</h2>

                <!-- <span>
                  <nuxt-link to="/">Home</nuxt-link>
                  <span> > </span>
                  <nuxt-link to="/products">Product</nuxt-link>
                </span> -->

                <!-- Title input-->
                   <!-- Category Dropdown -->

                  <!-- Title input-->
                <div class="">
                    <label class="admProd-label-title" >Add new category</label>
                    <v-text-field
                     type="text" 
                     class="" 
                     style="width:100%" 
                     v-model="categoryTitle"
                     placeholder="Add new category here"
                     single-line
                     outlined
                    />
                </div>
                <!-- Photo file -->
                <div class="">
                    <label style="margin-bottom:0px" class="admProd-label-title" >Category Photo</label>
                    <div class="a">
                        <label class="">
                            <i class="fa fa-plus"></i>
                            <input type="file" @change="onFileSelected"/>
                            <!-- <p style="">{{fileName}}</p> -->
                        </label>
                    </div>
                </div>
                
                <hr>
                <!-- Submit button  -->
                <div class="">
                            <!-- <span class="btn" @click="onUpdateProduct">Update Product</span> -->
                            <v-btn dark color="indigo" @click="addProduct">Add Category</v-btn>
                </div>

               
                <hr>
                <p class="admProd-label-title">Existing categories:</p>
                <ul>
                    <li v-for="(category, index) in categories" :key="index">
                        {{category.type}}
                    </li>
                </ul>




              
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
            categoryTitle:'',
            fileName:'',
            selectedFile:null

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
            console.log(" i am in add categories add "+this.categoryTitle);
            
            data.append('title',this.categoryTitle)
            data.append('photo',this.selectedFile,this.selectedFile.name)
           
            //  let result = await this.$axios.$post(`http://localhost:3000/api/categories`,data)
             let result = await this.$axios.$post(`/api/categories`,data)
            
             this.$router.push(`/adminCategories`)
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

</style>