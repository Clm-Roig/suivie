import { subDays } from 'date-fns';

context('Trackers', () => {
  before(() => {
    cy.visit('/trackers');
    // Tracker created yesterday
    cy.createTracker({ beginDate: subDays(new Date(), 1).toString() });
  });

  beforeEach(() => {
    // Restart from today if the selected date is not today
    const restartButtonSelector = '[data-testid="RestartAltIcon"]';
    cy.clickIfExists(restartButtonSelector);
  });

  describe('selected date', () => {
    it('has an input with today date', () => {
      const today = new Date();
      const todayMonth = `${today.getMonth() + 1}`.padStart(2, '0');
      cy.get('input').should(
        'have.value',
        `${today.getDate()}`.padStart(2, '0') + '/' + todayMonth + '/' + today.getFullYear()
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
