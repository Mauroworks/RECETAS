import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { graphql, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { server } from '../mocks/server';
import RecipeDetail from './RecipeDetail';

// Crear un cliente de Apollo aislado para pruebas
const createTestClient = () => new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' }, // Sin caché para evitar conflictos entre tests
    query: { fetchPolicy: 'no-cache' },
  },
});

describe('RecipeDetail Component', () => {
  it('muestra los detalles de la receta obtenidos por GraphQL', async () => {
    render(
      <ApolloProvider client={createTestClient()}>
        <MemoryRouter initialEntries={['/receta/1']}>
          <Routes>
            <Route path="/receta/:id" element={<RecipeDetail />} />
          </Routes>
        </MemoryRouter>
      </ApolloProvider>
    );

    // 1. Verificar Loading
    expect(screen.getByText(/Cargando detalles.../i)).toBeInTheDocument();

    // 2. Verificar Datos (Paella Valenciana id:1 en handlers.js)
    // Tiempo
    expect(await screen.findByText('90 min')).toBeInTheDocument();
    // Ingrediente
    expect(screen.getByText('Conejo')).toBeInTheDocument();
    // Método
    expect(screen.getByText(/Sofreír la carne/i)).toBeInTheDocument();
  });

  it('maneja errores de GraphQL', async () => {
    // Forzamos un error en la query GraphQL
    server.use(
      graphql.query('GetRecipeDetails', () => {
        return HttpResponse.json({ errors: [{ message: 'Error interno' }] })
      })
    );

    render(
      <ApolloProvider client={createTestClient()}>
        <MemoryRouter initialEntries={['/receta/1']}><Routes><Route path="/receta/:id" element={<RecipeDetail />} /></Routes></MemoryRouter>
      </ApolloProvider>
    );

    expect(await screen.findByText(/Error al cargar la receta/i)).toBeInTheDocument();
  });
});