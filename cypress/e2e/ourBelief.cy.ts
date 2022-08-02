describe('Our Belief page', () => {
  it('Our Belief page page content should exist', () => {
    cy.visit('/');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.title().should('eq', 'Church in Sydney');
    cy.get('[href="/our-belief/"]').click();
    cy.wait(1000);
    cy.title().should('eq', 'Our Belief | churchinsydney.org');
  });
});

export {};
