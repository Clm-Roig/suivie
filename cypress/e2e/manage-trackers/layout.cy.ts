context('Manage trackers', () => {
  before(() => {
    cy.visit('/trackers/manage');
  });

  describe('No trackers layout', () => {
    it('has 0 tracker selected', () => {
      cy.get('body')
        .should('contain', '0 sélectionné')
        .and('contain', "Vous n'avez pas encore de trackers.");
    });

    it('displays a tracker form when clicking on the only card of the page', () => {
      cy.get('form').should('not.exist');
      cy.get('.MuiCardContent-root').click();
      cy.get('form').should('exist');
      cy.get('[data-testid="RemoveCircleOutlineIcon"]').click();
    });
  });
});
