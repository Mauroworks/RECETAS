import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($id: ID!) {
    recipe(id: $id) {
      ingredients
      method
      time
    }
  }
`;

export default function RecipeDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE_DETAILS, {
    variables: { id },
  });

  if (loading) return <div className="text-center mt-5">Cargando detalles...</div>;
  if (error) return <div className="alert alert-danger">Error al cargar la receta.</div>;

  const { recipe } = data;

  return (
    <div className="card shadow">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Detalles de la Receta</h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">Volver</Link>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <h5>⏱️ Tiempo de Cocción</h5>
          <p>{recipe.time}</p>
        </div>

        <div className="mb-4">
          <h5>🥕 Ingredientes</h5>
          <ul className="list-group list-group-flush">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="list-group-item">{ing}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5>👨‍🍳 Preparación</h5>
          <p className="lead fs-6">{recipe.method}</p>
        </div>
      </div>
    </div>
  );
}