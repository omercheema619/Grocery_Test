<template>
<main class="ap-container">
    <!-- <div class="container-fluid addProduct-container"> -->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 ap-col">
                <h2 class="ap-page-title">Categories</h2>
                
                <!-- <span>
                  <nuxt-link to="/categories">Categories</nuxt-link>
                  <span> > </span>
                  <nuxt-link to="/products">Products</nuxt-link>
                </span> -->

                 <div>
                  <h4 class="all-heading-color align-center">Categories dropdown</h4>
                  <multiselect 
                    v-model="value" 
                    :options="menuCategories" 
                    :multiple="true" 
                    :close-on-select="false" 
                    :clear-on-select="false" 
                    :preserve-search="true" 
                    placeholder="Filter Categories" 
                    label="type" 
                    track-by="type" 
                    :preselect-first="false"
                    @input="filterCategories(value)"
                    class="mb-2" >
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
                  <!-- <p> {{value.length}} </p> -->
                  <v-btn dark color="indigo" type="button" @click="reloadCategories" >Reset</v-btn>
                  <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
                </div>
              </div>
               
               


                <ul>
                    <li class="ap-li" v-for="category in categories" :key="category._id">
                        <img class="ap-image" :src="category.photo" alt="ninjas Image"><br>
                        <div class="">
                          <label class="ap-title">{{category.type}}</label> <br>
                        </div>
                    </li>
                </ul>
            
        </div>
    <!-- </div> -->
</main>

</template>

<script>
import Multiselect from 'vue-multiselect'

export default {

  data() {
    return {
      value: []
    }
  },
  components:{
    Multiselect
  },
  methods: {
    async filterCategories(value) {
        try {
          console.log("Printing values searched: "+ JSON.stringify(value));
          var params = new URLSearchParams();

          for (const val of value){
            console.log(val.type);
            params.append("category", val.type);
          }

          var request = {
            params: params
          };
          
          console.log(params);

          // let response = await this.$axios.$get(`http://localhost:3000/api/categoryFilter/:id/`,request)
          let response = await this.$axios.$get(`/api/categoryFilter/:id/`,request)
          console.log(response.category);
          this.categories=response.category
      
        } catch (error) {
        console.log(error);
        }
    },
    reloadCategories() {
      console.log("I am in reload");
      
      // location.reload();
      this.$router.go('/categories')
    }
  },

  async asyncData({$axios}) {
    try {
      // let response = await $axios.$get('http://localhost:3000/api/categories')
      let response = await $axios.$get('/api/categories')

      
      
      console.log(response.categories);
    //   console.log(response.products.productCode);
      if(response){
        return{
          categories:response.categories,
          menuCategories:response.categories
        }
      }
      
    } catch (error) {
        console.log(error);
    }
    
  },
}
</script>

<style scoped>
.ninja-body{
  margin: 20px auto;
  /* background-color: red; */
  max-width: 600px;
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