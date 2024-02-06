context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
    cy.createTracker();
  });

  describe('hide tracker', () => {
    it('hides a tracker for one day when clicking on the "hide" button, then make it visible again', () => {
      cy.get('.tracker-card').find('[data-testid="VisibilityOffIcon"]').click();
      cy.contains('Masquer').click();
      cy.get('.tracker-card').should('have.length', 0);

      // Navigate to hidden tab and find the hidden tracker
      cy.get('.MuiTab-root').filter(':contains("MASQUÉ(S)")').click();
      cy.get('.tracker-card').should('have.length', 1);

      // Make tracker visible again
      cy.get('.tracker-card').find('[data-testid="VisibilityIcon"]').click();
      cy.contains('Afficher').click();
      cy.get('.tracker-card').should('have.length', 0);

      // Navigate back to todo tab and find the tracker
      cy.get('.MuiTab-root').filter(':contains("À FAIRE")').click({ force: true });
      cy.get('.tracker-card').should('have.length', 1);
    });
  });
});
