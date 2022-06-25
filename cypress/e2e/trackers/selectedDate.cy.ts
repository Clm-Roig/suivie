import { subDays } from 'date-fns';

import makeFakeTracker from '../../../src/models/factories/makeFakeTracker';
import { createTracker } from '../../../src/store/trackers/trackersSlice';

context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
    // Tracker created yesterday
    const simpleTracker = makeFakeTracker({ beginDate: subDays(new Date(), 1).toString() });
    cy.window().its('store').invoke('dispatch', createTracker(simpleTracker));
  });

  beforeEach(() => {
    // Restart from today if the selected date is not today
    const restartButtonSelector = '[data-testid="RestartAltIcon"]';
    cy.clickIfExists(restartButtonSelector);
  });

  describe('selected date', () => {
    it('has an input with today date', () => {
      const today = new Date();
      const todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
      cy.get('input').should(
        'have.value',
        today.getDate() + '/' + todayMonth + '/' + today.getFullYear()
      );
    });
    it('has tomorrow selector disabled', () => {
      cy.get('[data-testid="ChevronRightIcon"]').parent().should('be.disabled');
    });
    it('has one tracker created and visible today and yesterday only', () => {
      cy.get('.tracker-card').should('have.length', 1);
      cy.get('[data-testid="ChevronLeftIcon"]').click();
      cy.get('.tracker-card').should('have.length', 1);
      cy.get('[data-testid="ChevronLeftIcon"]').click();
      cy.get('.tracker-card').should('have.length', 0);
    });
  });
});
