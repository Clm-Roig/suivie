// load type definitions that come with Cypress module
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command click something only if it's present in the document body
       * @example cy.clickIfExists('#myButton')
       */
      clickIfExists(value: string): Chainable<Element>;
    }
  }
}

export {};
