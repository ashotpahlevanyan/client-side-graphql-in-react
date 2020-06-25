import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

const http = new HttpLink({uri: 'http://localhost:4000'});

// this delay is added for optimistic ui seeing,
// normally you don't need a delay and can use the ${http}
// as a link for apollo
const delay = setContext(
    request =>
        new Promise((success, fail) => {
           setTimeout(() => {
              success()
           }, 800);
        })
);

const link = ApolloLink.from([
    delay,
    http
]);

const cache = new InMemoryCache();

const client = new ApolloClient({
   link,
   cache
});

export default client;
