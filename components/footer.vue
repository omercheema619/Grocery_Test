<template>


<v-footer
    
    dark
    padless
    
  >
    <v-card
      flat
      tile
      class=" text-center"
      style="background-color:#1f3c88"
    >
      <!-- class="indigo lighten-1 white--text text-center" -->
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="34px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>EuroHalal © </strong>
      </v-card-text>
    </v-card>
  </v-footer>



<!-- <div class="container1">

    <div class="footer1 row">
       
        <div class="address col-md-4">
            <h5 class="footer-heading">Address</h5>
            <span class="footer-address">108-112</span> <br>
            <span class="footer-address">Dunstable Rd</span><br>
            <span class="footer-address">Luton </span><br>
            <span class="footer-address">LU1 1EW</span><br>
            
        </div>
        <div class="contact-us col-md-4">
            <h5 class="footer-heading">Contact Us</h5>
            <span class="footer-contact-info"><i class="fa fa-at"></i> : info@eurohalal.com</span> <br>
            <span class="footer-contact-info"><i class="fa fa-phone"></i> : 07414 781588</span> <br>
            <span class="footer-contact-info"><i class="fa fa-facebook-square"></i> : Euro Cash & Carry, Luton</span> <br>
            <span class="footer-contact-info"><i class="fa fa-map-pin"></i>  : LU1 1EW </span>
        </div>
    </div >
    <div class="copyright-row row">
        <div class="copyrights col-md-4 col-lg-4 col-sm-4">
            Copyrights © 2020, Euro Halal Cash & Carry Luton
        </div>
    </div>
    
</div> -->


</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>

<style  scoped>
.container1{
    width:100%;
    margin: 0;
    /* background-color: #f5f5f5; */
    background-color: #336699;
    color:white;
}
.footer1{
    /* height: auto; */
    width: 80%;
    margin: 0 auto;
    /* color:white; */
}
.footer-heading{
    /* text-align: center; */
    padding-left: 5px;
}
.address{
    margin: 5% auto;
    /* color: #323232; */
    /* color:white; */
    /* display: inline-block; */
    
}
.contact-us{
    /* width: 20px; */
    /* display: inline-block; */
    margin: 5% auto ;
    /* padding: 0 0 0 35px; */
    text-align: left;
    
}
.facebook-logo{
    width: 2%;
    height: 2%;
    color: red;
}
.footer-contact-info{
    margin: 0 5px;
    /* width: 400px; */
}
.footer-address{
    margin: 0 5px;
    /* width: 400px; */
}
.copyright-row{
    margin: 0;
}
.copyrights{
    margin :0 auto;
    text-align: center;
}
</style>