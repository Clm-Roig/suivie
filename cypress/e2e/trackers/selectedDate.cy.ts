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
    it('has an input with today date, even after going 2 days before and reloading the page', () => {
      const today = new Date();
      const todayMonth = `${today.getMonth() + 1}`.padStart(2, '0');
      const todayString =
        `${today.getDate()}`.padStart(2, '0') + '/' + todayMonth + '/' + today.getFullYear();
      cy.get('input').should('have.value', todayString);
      cy.get('[data-testid="ChevronLeftIcon"]').click({ force: true });
      cy.get('[data-testid="ChevronLeftIcon"]').click({ force: true });
      cy.reload();
      cy.get('input').should('have.value', todayString);
    });
    it('has tomorrow selector disabled', () => {
      cy.get('[data-testid="ChevronRightIcon"]').parent().should('be.disabled');
    });
    it('has one tracker created and visible today and yesterday only', () => {
      cy.get('.tracker-card').should('have.length', 1);
      cy.get('[data-testid="ChevronLeftIcon"]').click({ force: true });
      cy.get('.tracker-card').should('have.length', 1);
      cy.get('[data-testid="ChevronLeftIcon"]').click({ force: true });
      cy.get('.tracker-card').should('have.length', 0);
    });
  });
});
