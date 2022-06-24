import { format, subDays } from 'date-fns';

import makeFakeTracker from '../../src/models/factories/makeFakeTracker';

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

  describe('layout', () => {
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
    it('displays a tracker form when clicking on the only card of the page', () => {
      cy.get('form').should('not.exist');
      cy.get('.MuiCardContent-root').click();
      cy.get('form').should('exist');
    });
  });

  describe('trackers creation', () => {
    it('creates a simple tracker with only a name', () => {
      cy.get('#begin-date').should('have.value', format(new Date(), 'dd/MM/yyyy'));
      cy.get('#name').type(simpleTracker.name + '{enter}');
      cy.get('form').should('not.exist');
    });
    it('displays a simple tracker card', () => {
      cy.get('.tracker-card').first().should('include.text', simpleTracker.name);
      cy.get('.MuiTypography-caption').should('include.text', 'Quotidien');
    });
    it('creates a complex tracker', () => {
      cy.get('.MuiCardContent-root').click();
      cy.get('#name').type(complexTracker.name);
      cy.get('#begin-date')
        .clear()
        .type(format(new Date(complexTracker.beginDate), 'ddMMyyyy'));
      cy.get('#duration').type(complexTracker.duration);
      // MUI select are not <select>, see https://stackoverflow.com/questions/65363508/how-to-trigger-material-ui-select-in-cypress
      cy.get('#frequency')
        .parent()
        .click()
        .get('ul > li[data-value="' + complexTracker.frequency + '"]')
        .click({ multiple: true });

      // Completions
      for (const [i, completion] of complexTracker.requiredCompletions.entries()) {
        cy.get('button').contains('Objectif').click();
        cy.get('#required-completion-quantity-' + i).type(completion.quantity);
        cy.get('#required-completion-unit-' + i).type(completion.unit);
      }
      for (const [i, completion] of complexTracker.defaultCompletions.entries()) {
        cy.get('button').contains('Réalisation par défaut').click();
        cy.get('#default-completion-quantity-' + i).type(completion.quantity);
        cy.get('#default-completion-unit-' + i)
          .parent()
          .click()
          .get('ul > li[data-value="' + completion.unit + '"]')
          .click({ multiple: true });
      }
      cy.get('button').contains('Réalisation par défaut').should('be.disabled');

      cy.get('button').contains('Créer').click();
      cy.get('form').should('not.exist');
    });

    it('displays a complex tracker card', () => {
      cy.get('.tracker-card').first().as('card');
      cy.get('@card').find('.MuiCardHeader-root').as('cardHeader');
      cy.get('@cardHeader')
        .should('include.text', complexTracker.name)
        .and('include.text', 'Hebdomadaire')
        .and('include.text', 'Reste 27 jours');
      cy.get('@card').find('.MuiCardContent-root').as('cardContent');
      cy.get('@cardContent').should('include.text', 'Requis').and('include.text', 'Requis');
    });
  });
});
