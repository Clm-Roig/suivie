context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
  });

  describe('layout', () => {
    it('has three labeled tabs', () => {
      const expectedLabels = ['À FAIRE', 'FAIT(S)', 'MASQUÉ(S)'];
      cy.get('.MuiTab-root')
        .should('have.length', 3)
        .each(($el, idx) => {
          expect($el).to.have.text(expectedLabels[idx]);
        });
    });
    it('has an empty trackers list alert and message', () => {
      cy.get('.MuiTypography-root').should('include.text', 'Aucun tracker');
      cy.get('.MuiAlert-message').should('include.text', 'aucun tracker');
    });
    it('has an empty trackers list alert and message', () => {
      cy.get('.MuiTypography-root').should('include.text', 'Aucun tracker');
      cy.get('.MuiAlert-message').should('include.text', 'aucun tracker');
    });
    it('displays a tracker form when clicking on the only card of the page', () => {
      cy.get('form').should('not.exist');
      cy.get('.MuiCardContent-root').click();
      cy.get('form').should('exist');
    });
  });
});
