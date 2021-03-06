import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'i4ns1y',
  viewportWidth: 325,
  viewportHeight: 650,
  e2e: {
    baseUrl: 'http://localhost:3000/suivie#',
    excludeSpecPattern: '**/*.cy.js'
  }
});
