import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <Link to={`/evento/${event.id}`} className="text-decoration-none text-dark stretched-link">
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{event.category}</h6>
            <p className="card-text"><strong>Lugar:</strong> {event.place}</p>
            <p className="card-text"><strong>Fecha:</strong> {event.date}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;