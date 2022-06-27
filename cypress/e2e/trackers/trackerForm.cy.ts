import { format, subDays } from 'date-fns';

import makeFakeTracker from '../../../src/models/factories/makeFakeTracker';

context('Trackers', () => {
  let simpleTracker, complexTracker;
  before(() => {
    simpleTracker = makeFakeTracker();
    complexTracker = {
      ...makeFakeTracker({
        beginDate: subDays(new Date(), 2).toString(),
        duration: 30,
        frequency: 7,
        requiredCompletions: [
          {
            quantity: 3,
            unit: 'x'
          },
          {
            quantity: 10,
            unit: 'y'
          }
        ],
        defaultCompletions: [
          {
            quantity: 1,
            unit: 'x'
          },
          {
            quantity: 5,
            unit: 'y'
          }
        ]
      })
    };
    cy.visit('/trackers');
  });

  describe('trackers creation', () => {
    it('creates a simple tracker with only a name', () => {
      // Open form and fill it
      cy.get('.MuiCardContent-root').click();
      cy.get('#begin-date').should('have.value', format(new Date(), 'dd/MM/yyyy'));
      cy.get('#name').type(simpleTracker.name + '{enter}');
      cy.get('form').should('not.exist');

      // Check everything is displayed
      cy.get('.tracker-card').first().as('card').should('include.text', simpleTracker.name);
      cy.get('.MuiTypography-caption').should('include.text', 'Quotidien');

      // Delete tracker
      cy.get('@card').find('button[aria-label="tracker-settings"]').click();
      cy.contains('Supprimer').click();
    });

    it('creates a complex tracker and displays it as a card', () => {
      // Open form
      cy.get('.MuiCardContent-root').click();

      // Fill fields
      cy.get('#name').type(complexTracker.name);
      cy.get('#begin-date')
        .clear()
        .type(format(new Date(complexTracker.beginDate), 'ddMMyyyy'));
      cy.get('#duration').type(complexTracker.duration);
      // MUI select are not <select>, see https://stackoverflow.com/questions/65363508/how-to-trigger-material-ui-select-in-cypress
      cy.get('#frequency').parent().click();
      cy.getAttached('ul > li[data-value="' + complexTracker.frequency + '"]').click({
        multiple: true
      });

      // Fill Completions
      for (const [i, completion] of complexTracker.requiredCompletions.entries()) {
        cy.get('button').contains('Objectif').click();
        cy.get('#required-completion-quantity-' + i).type(completion.quantity);
        cy.get('#required-completion-unit-' + i).type(completion.unit);
      }
      for (const [i, completion] of complexTracker.defaultCompletions.entries()) {
        cy.get('button').contains('Réalisation par défaut').click();
        cy.get('#default-completion-quantity-' + i).type(completion.quantity);
        // MUI select are not <select>, see https://stackoverflow.com/questions/65363508/how-to-trigger-material-ui-select-in-cypress
        cy.get('#default-completion-unit-' + i)
          .parent()
          .click();
        cy.getAttached('ul > li[data-value="' + completion.unit + '"]').click({ multiple: true });
      }
      cy.get('button').contains('Réalisation par défaut').should('be.disabled');
      cy.get('button').contains('Créer').click();

      // Verify everything is displayed
      cy.get('form').should('not.exist');
      cy.get('.tracker-card').first().as('card');

      // Card header
      cy.get('@card')
        .find('.MuiCardHeader-root')
        .should('include.text', complexTracker.name)
        .and('include.text', 'Hebdomadaire')
        .and('include.text', 'Reste 27 jours');

      // Card content
      cy.get('@card')
        .find('.MuiCardContent-root')
        .should('include.text', 'Requis')
        .and('include.text', 'Requis');

      // Delete tracker
      cy.get('@card').find('button[aria-label="tracker-settings"]').click();
      cy.contains('Supprimer').click();
    });
  });
});
