import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

console.log('VITE mode:', import.meta.env.MODE)

async function enableMocking() {
  // Ejecutar solo en modo 'development'
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // Asegurarnos de usar la base correcta (Vite puede exponer import.meta.env.BASE_URL)
  const baseUrl = import.meta.env.BASE_URL || '/'
  const swUrl = `${baseUrl.replace(/\/$/, '')}/mockServiceWorker.js`

  // Pasa la URL del service worker al arrancar MSW
  return worker.start({ serviceWorker: { url: swUrl } })
}

// Configuración de Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // La URI de nuestra API GraphQL (MSW la interceptará)
  cache: new InMemoryCache(),
});

enableMocking()
  .then(() => {
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
  .catch((err) => {
    // Si MSW falla, mostrar el error y renderizar la app de todas maneras
    // para evitar la pantalla en blanco.
    // Revisa la consola para ver el error real.
    // eslint-disable-next-line no-console
    console.error('MSW failed to start:', err)
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
