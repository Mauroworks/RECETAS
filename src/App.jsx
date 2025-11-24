import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import EventDetail from './components/EventDetail';
import EventDetailGraphQL from './components/EventDetailGraphQL';
import EventList from './components/EventList';
import EventListGraphQL from './components/EventListGraphQL';

function App() {
  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="display-4">Centro de Eventos</h1>
        <nav className="nav nav-pills">
          <NavLink to="/" className="nav-link" end>Eventos (REST)</NavLink>
          <NavLink to="/graphql" className="nav-link">Eventos (GraphQL)</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          {/* Rutas para la implementación REST */}
          <Route path="/" element={<EventList />} />
          <Route path="/evento/:id" element={<EventDetail />} />

          {/* Rutas para la implementación GraphQL */}
          <Route path="/graphql" element={<EventListGraphQL />} />
          <Route path="/graphql/evento/:id" element={<EventDetailGraphQL />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
