context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
  });

  // ===== General Layout
  it('has an input with today date', () => {
    const today = new Date();
    const todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
    cy.get('input').should(
      'have.value',
      today.getDate() + '/' + todayMonth + '/' + today.getFullYear()
    );
  });
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

  // ===== Actions
  it('displays a tracker form when clicking on the only card of the page', () => {
    cy.get('form').should('not.exist');
    cy.get('.MuiCardContent-root').click();
    cy.get('form').should('exist');
  });
  it('creates a simple tracker with only a name when entering a name', () => {
    const trackerName = 'My simple tracker';
    cy.get('#name').type(trackerName + '{enter}');
    cy.get('form').should('not.exist');

    // New tracker card added
    cy.get('.MuiCardHeader-root').should('exist').should('include.text', trackerName);
  });
});
