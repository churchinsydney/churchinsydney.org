describe('Our member page', () => {
  it(`Post page should open after click on the general announcement`, () => {
    cy.clearCookies();
    cy.visit('/announcements');
    cy.title().should('eq', 'Announcements | churchinsydney.org');
    cy.get('[href="/announcement/"]').click();
    // cy.wait(5000);
    cy.title().should('eq', "Member's Password | churchinsydney.org");
    // cy.url().should('include', '/announcement/');
    // cy.get('input').type(Cypress.env('members_password'));
    // cy.contains('Submit').click();
    // cy.title().should('eq', 'General Announcement | churchinsydney.org');
    // cy.url().should('include', '/announcement/');
    // cy.getCookie('members-password').should('exist');
    // cy.visit('/announcement');
    // cy.title().should('eq', 'General Announcement | churchinsydney.org');
    // cy.url().should('include', '/announcement/');
  });

  // it(`Post page should open after click on the  general announcement`, () => {
  //   cy.visit('/zh-CN/announcements');
  //   cy.title().should('eq', '通告 | churchinsydney.org');
  //   cy.get('[href="/zh-CN/announcement/"]').click();
  //   cy.wait(5000);
  //   cy.title().should('eq', "Member's Password | churchinsydney.org");
  //   cy.url().should('include', '/zh-CN/announcement/');
  //   cy.get('input').type(Cypress.env('members_password'));
  //   cy.contains('提交').click();
  //   cy.title().should('eq', '报告 | churchinsydney.org');
  //   cy.url().should('include', '/zh-CN/announcement/');
  //   cy.getCookie('members-password').should('exist');
  //   cy.visit('/zh-CN/announcement');
  //   cy.title().should('eq', '报告 | churchinsydney.org');
  //   cy.url().should('include', '/zh-CN/announcement/');
  // });
});

export {};
