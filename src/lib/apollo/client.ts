import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {APOLLO_CONFIG} from './config'

const httpLink = createHttpLink({
    uri: APOLLO_CONFIG.URI,
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
})