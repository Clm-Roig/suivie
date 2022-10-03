import { format, subDays } from 'date-fns';

import TrackerColor from '../../../src/models/TrackerColor';
import makeFakeCompletion from '../../../src/models/factories/makeFakeCompletion';
import makeFakeTracker from '../../../src/models/factories/makeFakeTracker';

context('Trackers', () => {
  let simpleTracker, complexTracker;
  before(() => {
    simpleTracker = makeFakeTracker();
    complexTracker = {
      ...makeFakeTracker({
        beginDate: subDays(new Date(), 2).toString(),
        color: TrackerColor.RED,
        duration: 30,
        frequency: 7,
        requiredCompletions: [
          makeFakeCompletion({
            quantity: 3.6,
            unit: 'x'
          }),
          makeFakeCompletion({
            quantity: 10,
            unit: 'y'
          })
        ],
        defaultCompletions: [
          makeFakeCompletion({
            quantity: 0.1,
            unit: 'x'
          }),
          makeFakeCompletion({
            quantity: 5,
            unit: 'y'
          })
        ]
      })
    };
    cy.visit('/trackers');
  });

  describe('trackers creation', () => {
    it('creates a simple tracker with only a name', () => {
      // Open form and "more options" section
      cy.get('.MuiCardContent-root').click();
      cy.get('#more-options-header').click();

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
      // Open form and "more options" section
      cy.get('.MuiCardContent-root').click();
      cy.get('#more-options-header').click();

      // Fill fields
      cy.get('#name').type(complexTracker.name);
      cy.get('#begin-date')
        .clear()
        .type(format(new Date(complexTracker.beginDate), 'ddMMyyyy'));
      cy.get('#color')
        .get('button[id="' + complexTracker.color + '"]')
        .first()
        .click();
      cy.get('#duration').type(complexTracker.duration);
      cy.get('#frequency').type(complexTracker.frequency + '{enter}');

      // Fill Completions
      for (const [i, completion] of complexTracker.requiredCompletions.entries()) {
        cy.get('button').contains('Objectif').click();
        cy.get('#required-completion-quantity-' + i).type(completion.quantity);
        cy.get('#required-completion-unit-' + i).type(completion.unit);
      }
      for (const [i, completion] of complexTracker.defaultCompletions.entries()) {
        cy.get('button').contains('Réalisation par défaut').click();
        cy.get('#default-completion-quantity-' + i).type(completion.quantity);
        cy.get('#default-completion-unit-' + i).type(completion.unit + '{enter}');
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
