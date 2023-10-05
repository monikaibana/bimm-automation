describe('Alerts Tests', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should see alert', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (t) => {
      expect(t).to.contains('You clicked a button');
    });
    cy.on('window:confirm', () => true);
  });

  it('should see alert after 5 seconds', () => {
    cy.get('#timerAlertButton').click();
    cy.wait(5000);
    cy.on('window:alert', (t) => {
      expect(t).to.contains('This alert appeared after 5 seconds');
    });
    cy.on('window:confirm', () => true);
  });

  it('should be able to confirm action', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (t) => {
      expect(t).to.contains('Do you confirm action?');
    });
    cy.on('window:confirm', () => true);
    cy.get('.text-success').should('have.text', 'You selected Ok');
  });

  it('should be able to cancel action', () => {
    cy.get('#confirmButton').click();
    cy.on('window:alert', (t) => {
      expect(t).to.contains('Do you confirm action?');
    });
    cy.on('window:confirm', () => false);
    cy.get('.text-success').should('have.text', 'You selected Cancel');
  });

  it('should be able to enter prompt in alert', () => {
    cy.window().then(($win) => {
      cy.stub($win, 'prompt').returns('test text');
    });
    cy.get('#promtButton').click();
    cy.on('window:alert', (t) => {
      expect(t).to.contains('Please enter your name');
    });
    cy.on('window:confirm', () => true);
    cy.get('.text-success').should('have.text', 'You entered test text');
  });
});
