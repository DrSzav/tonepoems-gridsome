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
import logo from '~/assets/img/sitelogo.png'
export default function (Vue, { router, head, isClient, appOptions}) {
  // Set default layout as a global component
  console.log(router);
  Vue.use(Vuelidate);
  Vue.use(VueGun, {
    peers: ['https://gun-super-peer.unubo.app/gun']
  });
  Vue.use(SocialSharing);

  //Vue.use(ApolloProvider);
  //appOptions.ApolloProvider = ApolloProvider;
  Vue.component('Layout', DefaultLayout);
  head.meta.push({name:'og:description',content:'Create and share short poems and messages.'});
  head.meta.push({name:'og:title',content:'Tone Poems'});
  console.log(logo)
  head.meta.push({name:'og:image',content:'https://firebasestorage.googleapis.com/v0/b/images-1ab6b.appspot.com/o/favicon.png?alt=media&token=c6173569-4e0c-44d1-a721-870c766858cc'});

}
