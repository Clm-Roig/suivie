/// <reference types="cypress" />
import Tracker from '../../src/models/Tracker';
import makeFakeTracker from '../../src/models/factories/makeFakeTracker';
import { createTracker } from '../../src/store/trackers/trackersSlice';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('clickIfExists', (label: string) => {
  cy.get('body').then((body) => {
    if (body.find(label).length > 0) {
      cy.get(label).click();
    }
  });
});

Cypress.Commands.add('createTracker', (trackerValues?: Partial<Tracker>) => {
  const tracker = makeFakeTracker(trackerValues);
  cy.window().its('store').invoke('dispatch', createTracker(tracker));
});

Cypress.Commands.add('getDetached', (selector: string) => {
  cy.wait(200);
  return cy.get(selector);
});
