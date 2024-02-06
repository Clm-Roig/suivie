context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
    cy.createTracker();
  });

  describe('validate tracker', () => {
    it('validates a tracker when clicking on the "complete validate" button', () => {
      cy.get('.tracker-card').first().as('card');
      cy.get('@card').find('[data-testid="TaskAltIcon"]').click({ force: true });
      cy.contains('Valider').click();
      cy.get('.tracker-card').should('have.length', 0);

      // Navigate to done trackers tab and find the validated tracker
      cy.get('.MuiTab-root').filter(':contains("FAIT(S)")').click();
      cy.get('.tracker-card').should('have.length', 1);
    });
  });
});
