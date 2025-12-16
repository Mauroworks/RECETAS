import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('Todas');

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando recetas...</div>;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = filter === 'Todos' || recipe.category === filter;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'Todas' || recipe.difficulty === difficultyFilter;
    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  return (
    <>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-5 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Buscar receta por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="Todas">Todas las dificultades</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4 gap-2">
        <button
          className={`btn ${filter === 'Todos' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('Todos')}
        >
          Todos
        </button>
        <button
          className={`btn ${filter === 'Entrante' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('Entrante')}
        >
          Entrantes
        </button>
        <button
          className={`btn ${filter === 'Plato Principal' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('Plato Principal')}
        >
          Platos Principales
        </button>
        <button
          className={`btn ${filter === 'Postres' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('Postres')}
        >
          Postres
        </button>
      </div>

      <div className="row">
      {filteredRecipes.length === 0 ? (
        <div className="col-12 text-center mt-5">
          <h4 className="text-muted">No hay resultados 😕</h4>
          <p>Intenta ajustar los filtros de búsqueda.</p>
        </div>
      ) : (
        filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{recipe.category}</h6>
              <p className="card-text">
                Dificultad: <span className={`badge ${recipe.difficulty === 'Fácil' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {recipe.difficulty}
                </span>
              </p>
              <Link to={`/receta/${recipe.id}`} className="btn btn-primary btn-sm">
                Ver Detalles
              </Link>
            </div>
          </div>
        </div>
      )))}
      </div>
    </>
  );
}