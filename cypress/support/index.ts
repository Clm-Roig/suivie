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
    }
  }
}

export {};
