// src/mocks/browser.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'

// Esta configuración prepara un Service Worker con los manejadores de peticiones dados.
export const worker = setupWorker(...handlers)