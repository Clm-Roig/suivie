context('About', () => {
  before(() => {
    cy.visit('/graphical-charter');
  });

  describe('Layout', () => {
    it('has "Charte Graphique" as a title', () => {
      cy.get('body').should('contain', 'Charte Graphique');
    });
  });
});
