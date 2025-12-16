// src/mocks/handlers.js
import { graphql, http, HttpResponse } from 'msw'

const recipes = [
  {
    id: '1',
    title: 'Paella Valenciana',
    difficulty: 'Difícil',
    category: 'Plato Principal',
    ingredients: ['Arroz', 'Pollo', 'Conejo', 'Judías verdes', 'Azafrán'],
    method: 'Sofreír la carne, añadir verduras, el agua y finalmente el arroz. Cocinar 20 min.',
    time: '90 min'
  },
  {
    id: '2',
    title: 'Tarta de Queso',
    difficulty: 'Fácil',
    category: 'Postres',
    ingredients: ['Queso crema', 'Huevos', 'Azúcar', 'Nata', 'Galletas'],
    method: 'Mezclar ingredientes, verter sobre base de galleta y hornear.',
    time: '45 min'
  },
  {
    id: '3',
    title: 'Gazpacho Andaluz',
    difficulty: 'Fácil',
    category: 'Entrante',
    ingredients: ['Tomates', 'Pimiento', 'Pepino', 'Ajo', 'Aceite de oliva'],
    method: 'Triturar todo muy bien y servir frío.',
    time: '15 min'
  },
  {
    id: '4',
    title: 'Lasaña de Carne',
    difficulty: 'Media',
    category: 'Plato Principal',
    ingredients: ['Carne picada', 'Placas de lasaña', 'Tomate frito', 'Bechamel', 'Queso rallado'],
    method: 'Cocinar la carne con tomate, montar capas con la pasta y bechamel, hornear hasta gratinar.',
    time: '60 min'
  },
  {
    id: '5',
    title: 'Salmón al Horno',
    difficulty: 'Fácil',
    category: 'Plato Principal',
    ingredients: ['Lomos de salmón', 'Limón', 'Eneldo', 'Aceite de oliva', 'Sal', 'Pimienta'],
    method: 'Colocar el salmón en bandeja, añadir especias y limón, hornear a 180°C.',
    time: '20 min'
  },
  {
    id: '6',
    title: 'Croquetas de Jamón',
    difficulty: 'Media',
    category: 'Entrante',
    ingredients: ['Jamón serrano', 'Harina', 'Leche', 'Mantequilla', 'Huevo', 'Pan rallado'],
    method: 'Hacer bechamel con jamón, enfriar masa, dar forma, empanar y freír.',
    time: '50 min'
  },
  {
    id: '7',
    title: 'Ensalada César',
    difficulty: 'Fácil',
    category: 'Entrante',
    ingredients: ['Lechuga romana', 'Pollo a la plancha', 'Picatostes', 'Queso parmesano', 'Salsa César'],
    method: 'Mezclar lechuga, pollo y picatostes. Añadir salsa y queso por encima.',
    time: '15 min'
  },
  {
    id: '8',
    title: 'Brownie de Chocolate',
    difficulty: 'Fácil',
    category: 'Postres',
    ingredients: ['Chocolate negro', 'Mantequilla', 'Azúcar', 'Huevos', 'Harina', 'Nueces'],
    method: 'Fundir chocolate con mantequilla, mezclar con resto de ingredientes y hornear.',
    time: '35 min'
  },
  {
    id: '9',
    title: 'Flan de Huevo',
    difficulty: 'Media',
    category: 'Postres',
    ingredients: ['Huevos', 'Leche', 'Azúcar', 'Caramelo líquido'],
    method: 'Batir huevos con leche y azúcar. Verter en moldes con caramelo y cocinar al baño maría.',
    time: '45 min'
  }
]

export const handlers = [
  // 1. API REST para listar recetas (solo info básica)
  http.get('/api/recipes', () => {
    // Filtramos para no enviar detalles pesados en la lista
    const summary = recipes.map(({ id, title, difficulty, category }) => ({
      id,
      title,
      difficulty,
      category
    }))
    
    return HttpResponse.json(summary)
  }),

  // 2. API GraphQL para detalles (ingredientes, método, tiempo)
  graphql.query('GetRecipeDetails', ({ variables }) => {
    const recipe = recipes.find(r => r.id === variables.id)

    if (!recipe) {
      return HttpResponse.json({ errors: [{ message: 'Receta no encontrada' }] })
    }

    return HttpResponse.json({
      data: {
        recipe: {
          ingredients: recipe.ingredients,
          method: recipe.method,
          time: recipe.time
        }
      }
    })
  })
]