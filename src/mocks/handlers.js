// src/mocks/handlers.js
import { graphql, http, HttpResponse } from 'msw';

const events = [
  {
    id: 'evt-1',
    title: 'Concierto de Rock Sinfónico',
    date: '2024-10-26',
    place: 'Auditorio Nacional',
    category: 'Conciertos',
    organizer: 'Music Masters Inc.',
    confirmed_attendees: 1250,
    description: 'Una noche inolvidable con los grandes éxitos del rock interpretados por una orquesta sinfónica completa. ¡No te lo puedes perder!',
  },
  {
    id: 'evt-2',
    title: 'Conferencia de IA y Futuro',
    date: '2024-11-15',
    place: 'Centro de Convenciones',
    category: 'Conferencias',
    organizer: 'Tech Innovators',
    confirmed_attendees: 800,
    description: 'Expertos internacionales discuten el impacto de la Inteligencia Artificial en nuestras vidas y en el futuro de la humanidad.',
  },
  {
    id: 'evt-3',
    title: 'Final de la Liga de eSports',
    date: '2024-11-22',
    place: 'Arena Gamer',
    category: 'Eventos Deportivos',
    organizer: 'Global Gaming League',
    confirmed_attendees: 2500,
    description: 'Los mejores equipos compiten por el campeonato en la final más esperada del año. Vive la emoción de los eSports en vivo.',
  },
  {
    id: 'evt-4',
    title: 'Taller de Desarrollo con React',
    date: '2024-12-05',
    place: 'Online',
    category: 'Conferencias',
    organizer: 'Dev Community',
    confirmed_attendees: 150,
    description: 'Aprende a construir aplicaciones web modernas con React en este taller intensivo de un día, impartido por desarrolladores senior.',
  },
];

// Define los manejadores de tus peticiones aquí.
export const handlers = [
  // --- MANEJADORES PARA LA API REST (se mantienen intactos) ---
  http.get('/api/eventos', () => {
    return HttpResponse.json(events);
  }),

  http.get('/api/eventos/:id', ({ params }) => {
    const event = events.find(e => e.id === params.id);
    if (!event) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
    return HttpResponse.json(event);
  }),

  // --- MANEJADORES PARA LA API GRAPHQL (nuevos) ---
  graphql.query('AllEvents', () => {
    return HttpResponse.json({
      data: { events: events },
    });
  }),

  graphql.query('EventDetails', ({ variables }) => {
    const { id } = variables;
    const event = events.find(e => e.id === id);
    if (!event) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      data: { event: event },
    });
  }),
];