import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_EVENTS = gql`
  query AllEvents {
    events {
      id
      title
      category
    }
  }
`;

function EventListGraphQL() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Cargando eventos con GraphQL...</p>;
  if (error) return <p>Error al cargar los eventos: {error.message}</p>;

  return (
    <div>
      <h2 className="mb-3">Próximos Eventos (GraphQL)</h2>
      <ul className="list-group">
        {data.events.map((event) => (
          <li key={event.id} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
            <div>
              <h5 className="mb-1">{event.title}</h5>
              <p className="mb-1 text-muted">{event.category}</p>
            </div>
            <Link to={`/graphql/evento/${event.id}`} className="btn btn-sm btn-info mt-2 mt-sm-0">Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventListGraphQL;