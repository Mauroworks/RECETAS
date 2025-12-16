import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { server } from '../mocks/server';
import RecipeList from './RecipeList';

describe('RecipeList Component', () => {
  it('muestra las recetas obtenidas de la API y permite filtrar', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    );
    
    // 1. Verificar carga inicial
    expect(screen.getByText(/Cargando recetas.../i)).toBeInTheDocument();

    // 2. Verificar que llegan los datos del mock (Paella y Tarta)
    expect(await screen.findByText('Paella Valenciana')).toBeInTheDocument();
    expect(screen.getByText('Tarta de Queso')).toBeInTheDocument();

    // 3. Probar Filtro de Texto: Buscar "Tarta"
    const searchInput = screen.getByPlaceholderText(/Buscar receta por nombre.../i);
    await user.type(searchInput, 'Tarta');
    
    // Debería quedar Tarta y desaparecer Paella
    expect(screen.getByText('Tarta de Queso')).toBeInTheDocument();
    expect(screen.queryByText('Paella Valenciana')).not.toBeInTheDocument();

    // Limpiar búsqueda
    await user.clear(searchInput);
  });

  it('filtra por categoría y dificultad', async () => {
    const user = userEvent.setup();
    render(<BrowserRouter><RecipeList /></BrowserRouter>);
    await screen.findByText('Paella Valenciana');

    // 1. Filtro Categoría: Click en "Postres"
    await user.click(screen.getByRole('button', { name: /Postres/i }));
    expect(screen.getByText('Tarta de Queso')).toBeInTheDocument();
    expect(screen.queryByText('Paella Valenciana')).not.toBeInTheDocument();

    // 2. Filtro Dificultad: Seleccionar "Difícil" (La tarta es fácil, debería desaparecer)
    await user.selectOptions(screen.getByRole('combobox'), 'Difícil');
    expect(await screen.findByText(/No hay resultados/i)).toBeInTheDocument();
  });

  it('maneja errores de la API correctamente', async () => {
    // Simulamos que la API falla con un error 500
    server.use(
      http.get('/api/recipes', () => {
        return new HttpResponse(null, { status: 500 })
      })
    );

    // Espiamos console.error para silenciarlo en el test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<BrowserRouter><RecipeList /></BrowserRouter>);
    
    // Esperamos a que desaparezca el loading
    await waitFor(() => expect(screen.queryByText(/Cargando recetas.../i)).not.toBeInTheDocument());
    
    // Al fallar, la lista queda vacía, así que muestra "No hay resultados"
    expect(screen.getByText(/No hay resultados/i)).toBeInTheDocument();
    
    // Verificamos que se llamó al console.error
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});