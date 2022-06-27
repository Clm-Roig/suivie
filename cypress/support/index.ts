import Tracker from '../../src/models/Tracker';

// load type definitions that come with Cypress module
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Click something only if it's present in the document body
       * @example cy.clickIfExists('#myButton')
       */
      clickIfExists(label: string): Chainable<Element>;
      /**
       * Create a tracker using SuiVie makeFakeTracker() util function
       * @example cy.createTracker({ name: 'my tracker' })
       */
      createTracker(trackerValues?: Partial<Tracker>): Chainable<Element>;
      /**
       * get() command for detached element from here => https://github.com/cypress-io/cypress/issues/5743#issuecomment-650421731
       * Waits until the selector finds an attached element, then yields it (wrapped).
       * selectorFn, if provided, is passed $(document). Don't use cy methods inside selectorFn.
       *
       * Workaround of this issue: https://github.com/cypress-io/cypress/issues/7306
       * Remove it when the issue is solved.
       * @example cy.getAttached('#myButton')
       */
      getAttached(selector: string): Chainable<unknown>;
    }
  }
}

export {};
