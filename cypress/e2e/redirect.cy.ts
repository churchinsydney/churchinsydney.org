describe('Post slug', () => {
  it('/announcement should open', () => {
    cy.setCookie('members-password', '***REMOVED***');
    cy.visit('/announcement');

    cy.title().should('contains', 'Announcement | churchinsydney.org');
  });

  it('/do-not-remove-used-for-testing should redirect to google', () => {
    cy.visit('/do-not-remove-used-for-testing');
    cy.url().should('contains', 'https://www.google.com');
  });
});

export {};
