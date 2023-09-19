import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import nodeFetch from 'node-fetch';
import Cookie from 'js-cookie';

const authLink = setContext((_, { headers }) => {
  
  const token = Cookie.get('token') ? `Bearer ${Cookie.get('token')}` : '';

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
});

const httpLink = createHttpLink({
  uri: 'http://192.168.1.182:4000',
  fetch,
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;