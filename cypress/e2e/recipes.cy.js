describe('Recetario App', () => {
  beforeEach(() => {
    // La baseUrl ya está configurada en cypress.config.js
    cy.visit('/');
  });

  it('1. Muestra el título principal en la página de inicio', () => {
    cy.contains('h1', '📖 Libro de Recetas').should('be.visible');
  });

  it('2. Carga y muestra la lista de recetas', () => {
    // Espera a que el texto "Cargando recetas..." desaparezca
    cy.contains('Cargando recetas...').should('not.exist');
    
    // Verifica que al menos una tarjeta de receta se renderice
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('3. Navega a la página de detalles de una receta', () => {
    // Espera a que las recetas carguen
    cy.contains('Cargando recetas...').should('not.exist');

    // Encuentra el primer enlace de "Ver Detalles" y haz clic
    cy.get('.card .btn-primary').first().click();

    // Verifica que la URL haya cambiado a la ruta de detalles
    cy.url().should('include', '/receta/');
  });

  it('4. Muestra los detalles de una receta específica', () => {
    // Navega a la página de detalles de la primera receta
    cy.contains('Cargando recetas...').should('not.exist');
    cy.get('.card .btn-primary').first().click();

    // Espera a que el texto "Cargando detalles..." desaparezca
    cy.contains('Cargando detalles...').should('not.exist');

    // Verifica que el título de la sección de detalles esté presente
    cy.contains('h2', 'Detalles de la Receta').should('be.visible');

    // Verifica que se muestren las secciones de la receta
    cy.contains('h5', '⏱️ Tiempo de Cocción').should('be.visible');
    cy.contains('h5', '🥕 Ingredientes').should('be.visible');
    cy.contains('h5', '👨‍🍳 Preparación').should('be.visible');
  });
});
