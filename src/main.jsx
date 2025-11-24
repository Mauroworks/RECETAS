import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

async function enableMocking() {
  // Ejecutar solo en modo 'development'
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` retorna una Promise que se resuelve cuando el Service Worker está listo.
  return worker.start()
}

// Configuración de Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // La URI de nuestra API GraphQL (MSW la interceptará)
  cache: new InMemoryCache(),
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>,
  )
})
