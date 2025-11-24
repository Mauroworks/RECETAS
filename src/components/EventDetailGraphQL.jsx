import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

const GET_EVENT_DETAILS = gql`
  query EventDetails($id: ID!) {
    event(id: $id) {
      id
      title
      date
      place
      category
      description
      organizer
      confirmed_attendees
    }
  }
`;

function EventDetailGraphQL() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { event } = data;

  return (
    <div>
      <h2>{event.title} <span className="badge bg-success">GraphQL</span></h2>
      <p className="text-muted">{event.category}</p>
      <hr />
      <p><strong>Organizador:</strong> {event.organizer}</p>
      <p><strong>Asistentes confirmados:</strong> {event.confirmed_attendees}</p>
      <p><strong>Lugar:</strong> {event.place}</p>
      <p><strong>Fecha:</strong> {event.date}</p>
      <p>{event.description}</p>
      <Link to="/graphql" className="btn btn-primary">Volver a la lista GraphQL</Link>
    </div>
  );
}

export default EventDetailGraphQL;