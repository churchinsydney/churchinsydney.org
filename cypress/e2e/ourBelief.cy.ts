type ViewportPreset = 'macbook-13' | 'iphone-x';

describe('Our Belief page', () => {
  ['macbook-13', 'iphone-x'].forEach((portView) => {
    it(`[${portView}] Our Belief page page content should exist`, () => {
      cy.viewport(portView as ViewportPreset);
      cy.visit('/');
      cy.title().should('eq', 'Church in Sydney');
      cy.get('[href="/our-belief/"]').click();
      cy.title().should('eq', 'Our Belief | churchinsydney.org');
    });
  });
});

export {};
