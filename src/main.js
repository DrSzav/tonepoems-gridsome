// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/styles/style.css'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

import logo from '~/assets/img/sitelogo.png';
import "simple-keyboard/build/css/index.css";
export default function (Vue, { router, head, isClient, appOptions}) {
  // Set default layout as a global component
  console.log(router);
  Vue.use(Vuelidate);



  if (process.isClient) {
      const VModal = require('vue-js-modal').default;

      Vue.use(VModal, { dialog: true });
      const responsive = require('vue-responsive').default;
      Vue.use(responsive);
      const toasted = require('vue-toasted').default;
      Vue.use(toasted);
  }

  Vue.component('Layout', DefaultLayout);
  head.meta.push({name:'og:description',content:'Create and share short poems and messages.'});
  head.meta.push({name:'og:title',content:'Tone Poems'});
  console.log(logo)
  head.meta.push({name:'og:image',content:'https://firebasestorage.googleapis.com/v0/b/images-1ab6b.appspot.com/o/favicon.png?alt=media&token=c6173569-4e0c-44d1-a721-870c766858cc'});

}
