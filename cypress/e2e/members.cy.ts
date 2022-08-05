type ViewportPreset = 'macbook-13' | 'iphone-x';

describe('Our member page', () => {
  ['macbook-13', 'iphone-x'].forEach((portView) => {
    it(`[${portView}] post page should open after click on the  general announcement`, () => {
      cy.viewport(portView as ViewportPreset);
      cy.visit('/announcements');
      cy.title().should('eq', 'Announcements | churchinsydney.org');
      cy.get('[href="/announcement/"]').click();
      cy.wait(5000);
      cy.title().should('eq', "Member's Password | churchinsydney.org");
      cy.url().should('include', '/announcement/');
      cy.get('input').type(Cypress.env('members_password'));
      cy.contains('Submit').click();
      cy.title().should('eq', 'General Announcement | churchinsydney.org');
      cy.url().should('include', '/announcement/');
      cy.getCookie('members-password').should('exist');
      cy.visit('/announcement');
      cy.title().should('eq', 'General Announcement | churchinsydney.org');
      cy.url().should('include', '/announcement/');
    });
  });
});

export {};
