// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/styles/style.css'

import Vue from 'vue'
//import VueApollo from 'vue-apollo'
//import ApolloProvider from '~/apollo.js'
import Vuelidate from 'vuelidate'
import VueGun from 'vue-gun';
import SocialSharing from 'vue-social-sharing';

export default function (Vue, { router, head, isClient, appOptions}) {
  // Set default layout as a global component
  console.log(router);
  Vue.use(Vuelidate);
  Vue.use(VueGun, {
    peers: ['vigilant-newton-972381.netlify.com/gun']
  });
  Vue.use(SocialSharing);

  //Vue.use(ApolloProvider);
  //appOptions.ApolloProvider = ApolloProvider;
  Vue.component('Layout', DefaultLayout);

}
