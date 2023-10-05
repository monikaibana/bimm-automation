describe('Browser Window Tests', () => {
  // Due limitations in Cypress, for these tests, the button click redirects within the same browser window to continue asserting the new web page
  beforeEach(() => {
    cy.visit('/browser-windows');
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        return win.open.wrappedMethod.call(win, url, '_self');
      });
    });
  });

  it('should open new tab upon button click', () => {
    cy.get('#tabButton').click();
    cy.get('#sampleHeading').should('have.text', 'This is a sample page');
  });

  it('should open new window upon button click', () => {
    cy.get('#windowButton').click();
    cy.get('#sampleHeading').should('have.text', 'This is a sample page');
  });

  it('should open new window with message', () => {
    cy.fixture('browser_windows').then((browserWindows) => {
      const message = browserWindows.messageWindow;
      cy.get('#messageWindowButton').click();
      cy.get('body').should('have.text', message);
    });
  });
});
