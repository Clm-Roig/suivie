import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 325,
  viewportHeight: 650,
  e2e: {
    baseUrl: 'http://localhost:3000/suivie',
    excludeSpecPattern: '**/*-examples/*.cy.js'
  }
});
