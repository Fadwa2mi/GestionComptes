import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloWrapper from './ApolloProvider';

ReactDOM.render(
  <ApolloWrapper>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloWrapper>,
  document.getElementById('root')
);
