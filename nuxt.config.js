const URL = 'http://0.0.0.0:3000';
// var port1 = 9900;
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    // script:[],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],

    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js' },
      // { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js' },
      { src: 'https://unpkg.com/vue-multiselect@2.1.0' },
      {src: 'https://js.stripe.com/v3'}
    ],


    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',  href: '/css/style.css' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', type: 'text/css',  href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css',  href: 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'~/plugins/localStorage.js',ssr:false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  // buildModules: [
    // Simple usage
    // '@nuxtjs/vuetify',

    // With options
    // ['@nuxtjs/vuetify', { /* module options */ }]
  // ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify'

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy:true,
    baseURL:URL
  },

  proxy:{
    '/api': URL
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    
    // process.env.PORT
    port: process.env.PORT || 9000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  auth:{
    strategies:{
      local:{
        endpoints:{
          login:{
            propertyName:'token'
          },
          logout:true
        }
      }
    }
  }
}
