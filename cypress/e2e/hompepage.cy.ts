context('Homepage', () => {
  it('should have UTF-8 charset and include SuiVie as a title', () => {
    cy.visit('');
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
    cy.title().should('include', 'SuiVie');
  });
  it('should go to trackers when pressing the "Commencer" button', () => {
    cy.contains('Commencer').click();
    cy.location('hash').should('include', 'trackers');
  });
});
