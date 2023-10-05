describe('Browser Window Tests', () => {
  /* 
  Note: Due to Cypress limitations, the new tab and new window opened within the test cannot be interacted with.
  Cypress only remains interactive with the origin browser. I implemented the cy.stub line of code to open the url
  within the existing browser to at least validate that the expected page is opened.
  */

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
