import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // Remplacez par l'URL de votre API GraphQL
    cache: new InMemoryCache(),
});

function ApolloWrapper({ children }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
