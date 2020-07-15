<template>
<main>

  <div class="container">

    <div class="row welcomepage-row">

      <!-- <div class="welcome-message-container col-lg-5 col-md-8 col-sm-12">
        <h2>Welcome to Euro Halal</h2>
        <div class="welcome-message">

      </div>
      </div>
      <div class="sale-offer-container col-lg-5 col-md-8 col-sm-12">
        <h2>Your One stop shop!</h2>
        <div class="sale-offer">

        </div>
      </div> -->



      <v-carousel
        cycle
        height="720"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <!-- hide-delimiter-background -->
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            :color="colors[0]"
            height="100%"
            width="100%"
            align="middle"
            justify="center"
            

            
          >
          <!-- :color="colors[i]" -->
            <v-row
              class="fill-height"
             
              align="center"
              justify="center"
             
            >
              <!-- <div class="display-3">{{ slide }} Slide</div> -->
              <img class="welcome-image-slider" :src="url[i]" alt="">{{i}}
              <!-- <div> {{i}} </div> -->
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

  </div>
    
  </div>
    <div class="wrapper">
      <h1>Scroll Down</h1>  
      <div class="parallax-img"></div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
    </div>

    <div class="wrapper"></div>
</main>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data(){
    return{
      url:[
        "/images/euro-halal-1.png",
        "/images/euro-halal-2.png",
        "/images/euro-halal-3.png",
        "/images/euro-halal-1.png",
        "/images/euro-halal-2.png",
        "/images/euro-halal-3.png"
        ],
      colors: [
          'white'
          // 'indigo',
          // 'warning',
          // 'pink darken-2',
          // 'red lighten-1',
          // 'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ]
    }
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.welcome-message{
    background-color: red;
    height: 400px;
    width: 400px;
    margin: 0 auto;
    background-size: cover;
    background-image: url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
}
.welcome-message-container{
  margin: 0 auto;
}
.sale-offer-container{
  margin: 0 auto;
} 
.sale-offer{
    background-color: purple;
    height: 400px;
    width: 400px;
    margin: 0 auto;
    background-size: cover;
    background-image: url('https://previews.123rf.com/images/dream04/dream041710/dream04171000027/87591895-raw-meat-assortment-beef-lamb-chicken-on-a-wooden-board.jpg');
}



.wrapper {
  height: 100vh;
}

.parallax-img {
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.parallax-img {
  /* background-image: url('https://source.unsplash.com/random/1920x1080'); */
  /* background-image: url('https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=916&q=80'); */
  /* background-image: url('https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'); */
  /* background-image: url('https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'); */
  /* background-image: url('https://images.unsplash.com/photo-1553546895-531931aa1aa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'); */
  /* background-image: url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'); */
  background-image: url('https://images.unsplash.com/photo-1553546895-531931aa1aa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80');
}


</style>
