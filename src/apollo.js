import Vue from 'vue'
//import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '___graphql'
});

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
	defaultClient: client,
})

export default apolloProvider
