import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

// Iniciar servidor MSW antes de todas las pruebas
beforeAll(() => server.listen());

// Resetear handlers y limpiar DOM después de cada test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Cerrar servidor al finalizar
afterAll(() => server.close());