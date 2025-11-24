import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtiene el 'id' de la URL

  useEffect(() => {
    // Hacemos la petición a la API para un solo evento
    fetch(`/api/eventos/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Evento no encontrado');
        }
        return response.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // Se ejecuta cada vez que el 'id' cambia

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p className="text-muted">{event.category}</p>
      <p><strong>Lugar:</strong> {event.place}</p>
      <p><strong>Fecha:</strong> {event.date}</p>
      <p>{event.description}</p>
      <Link to="/" className="btn btn-primary">Volver a la lista</Link>
    </div>
  );
}

export default EventDetail;