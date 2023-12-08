context('Manage trackers', () => {
  before(() => {
    cy.visit('/trackers/manage');
  });

  describe('Actions', () => {
    before(() => {
      for (let i = 0; i < 3; i++) {
        cy.createTracker();
      }
    });
    it('has 3 trackers displayed and selectable', () => {
      // Click one by one
      cy.get('.MuiListItemButton-root')
        .should('have.length', 3)
        .each(($trackerItem) => {
          $trackerItem.click();
        });
      cy.get('body').contains('3 sélectionnés');
      cy.get('.MuiListSubheader-root').contains('ACTIFS');

      // Click (de)select icon
      cy.get('[data-testid="DeselectIcon"]').click();
      cy.get('body').contains('0 sélectionné');
      cy.get('[data-testid="SelectAllIcon"]').click();
      cy.get('body').contains('3 sélectionnés');
      cy.get('[data-testid="DeselectIcon"]').click();
    });

    it("has 3 trackers which can be archived, deleted and can't be set to active or edited", () => {
      cy.get('[data-testid="SelectAllIcon"]').click();
      cy.get('[data-testid="MoreVertIcon"]').click();
      cy.contains('Éditer').should('have.class', 'Mui-disabled');
      cy.contains('Rendre actif').should('have.class', 'Mui-disabled');
      cy.contains('Supprimer').should('not.have.class', 'Mui-disabled');
      cy.contains('Archiver').should('not.have.class', 'Mui-disabled');

      // Reset selection
      cy.get('body').click(0, 0); // click outside the menu
      cy.get('[data-testid="DeselectIcon"]').click();
    });

    it('archives one tracker', () => {
      cy.get('.MuiListItemButton-root').first().click();
      cy.get('[data-testid="MoreVertIcon"]').click();
      cy.contains('Archiver').click();
      cy.get('#notistack-snackbar').should('contain.text', 'Tracker archivé');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.MuiListSubheader-root').contains('ARCHIVÉS');
      cy.wait(800); // Wait for the animation to end
    });

    it('deletes one tracker', () => {
      cy.get('ul > li').first().click();
      cy.get('[data-testid="MoreVertIcon"]').click();
      cy.contains('Supprimer').click();
      cy.get('#notistack-snackbar').should('contain.text', 'Tracker supprimé');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('ul > li').should('have.length', 2);
    });

    it('makes one tracker active', () => {
      cy.get('ul > li').last().click();
      cy.get('[data-testid="MoreVertIcon"]').click();
      cy.contains('Rendre actif').click();
      cy.get('#notistack-snackbar').should('contain.text', 'Tracker actif');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('ul > li').should('have.length', 2);
    });
  });
});
