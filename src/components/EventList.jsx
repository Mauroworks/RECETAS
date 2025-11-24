import { useEffect, useState } from 'react';
import EventCard from './EventCard';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacemos la petición a nuestra API (simulada por MSW)
    fetch('/api/eventos')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="container">
      <h2 className="mb-3">Próximos Eventos</h2>
      <div className="row">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
