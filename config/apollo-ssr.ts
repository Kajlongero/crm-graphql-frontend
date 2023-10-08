import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const GRAPH_SERVER_URI = process.env.URI_GRAPHQL_SERVER || 'localhost:4000';

export const customClientWithHeaders = (customHeaders: Record<string, string>) => {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({
        useGETForQueries: true,
        uri: 'http://localhost:4000',
        headers: {
          ...customHeaders,
        }
      })
    })
  });
  return getClient();
}
