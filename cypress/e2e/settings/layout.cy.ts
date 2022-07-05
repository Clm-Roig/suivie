context('Settings', () => {
  before(() => {
    cy.visit('/settings');
  });

  describe('Layout', () => {
    it('has "Paramètres" as a title and 3 export / import / delete buttons', () => {
      cy.get('body').should('contain', 'Paramètres');
      const expectedLabels = [
        'Importer des données',
        'Télécharger les données',
        'Supprimer toutes les données'
      ];
      for (const label of expectedLabels) {
        cy.get('body').contains(label);
      }
    });
  });
});
