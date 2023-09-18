import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import nodeFetch from 'node-fetch';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://192.168.1.182:4000',
    fetch
  })
});

export default client;