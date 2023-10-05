describe('Browser Window Tests', () => {
  context('Browser Window Page Tests', () => {
    /* 
  Note: Due to Cypress limitations, the new tab and new window opened during the test cannot be interacted with.
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

    it('should open the correct page when clicking the New Tab button', () => {
      cy.get('#tabButton').click();
      cy.get('#sampleHeading').should('have.text', 'This is a sample page');
    });

    it('should open the correct page when clicking the New Window button', () => {
      cy.get('#windowButton').click();
      cy.get('#sampleHeading').should('have.text', 'This is a sample page');
    });

    it('should open the correct page with message when clicking the New Window Message button', () => {
      cy.fixture('browser-windows').then((browserWindows) => {
        const message = browserWindows.messageWindow;
        cy.get('#messageWindowButton').click();
        cy.get('body').should('have.text', message);
      });
    });
  });

  context('Browser Window Call Tests', () => {
    /* 
    Note: In these tests, it validates that the call was made to open the new window, although it cannot validate
    the contents of the new page.
    */
    beforeEach(() => {
      cy.visit('/browser-windows');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('newPage');
      });
    });

    it('should open new tab upon button click', () => {
      cy.get('#tabButton').click();
      cy.get('@newPage').should('have.been.calledOnce');
    });

    it('should open new window upon button click', () => {
      cy.get('#windowButton').click();
      cy.get('@newPage').should('have.been.calledOnce');
    });

    it('should open new window with message upon button click', () => {
      cy.get('#messageWindowButton').click();
      cy.get('@newPage').should('have.been.calledOnce');
    });
  });
});
