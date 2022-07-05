context('Statistics', () => {
  before(() => {
    cy.visit('/stats');
  });

  describe('No trackers layout', () => {
    it('has 0 tracker selected', () => {
      cy.get('body').should('contain', 'Sélectionnez un tracker').and('contain', 'Statistiques');
    });
    it('has three labeled tabs', () => {
      const expectedLabels = ['SEMAINES', 'MOIS', 'ANNÉES'];
      cy.get('.MuiTab-root')
        .should('have.length', 3)
        .each(($el, idx) => {
          expect($el).to.have.text(expectedLabels[idx]);
        });
    });
  });
});
