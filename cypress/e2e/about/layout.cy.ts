context('About', () => {
  before(() => {
    cy.visit('/about');
  });

  describe('Layout', () => {
    it('has "À propos de SuiVie" as a title', () => {
      cy.get('body').should('contain', 'À propos de SuiVie');
    });
  });
});
