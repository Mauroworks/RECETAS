import { Route, Routes } from 'react-router-dom';
import './App.css';
import RecipeDetail from './components/RecipeDetail';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="container mt-4">
      <header className="mb-4 border-bottom pb-3">
        <h1 className="display-5 text-primary">📖 Libro de Recetas</h1>
        <p className="text-muted">Explora recetas (REST) y ve sus detalles (GraphQL)</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/receta/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
