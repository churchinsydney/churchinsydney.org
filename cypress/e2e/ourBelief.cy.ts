describe('Our Belief page', () => {
  it('Our Belief page page content should exist', () => {
    cy.visit('/');
    cy.title().should('eq', 'Church in Sydney');
    cy.get('[href="/our-belief/"]').click();
    cy.title().should('eq', 'Our Belief | churchinsydney.org');
  });
  context('iphone-x resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
    });
    it('display on mobile', () => {
      cy.visit('/');
      cy.title().should('eq', 'Church in Sydney');
      cy.get('[href="/our-belief/"]').click();
      cy.title().should('eq', 'Our Belief | churchinsydney.org');
    });
  });
});

export {};
