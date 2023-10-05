describe('Radio Button Tests', () => {
  beforeEach(() => {
    cy.visit('/radio-button');
  });

  it('should check Yes', () => {
    cy.get('#yesRadio"]').click({ force: true });
    cy.get('.text-success').should('have.text', 'Yes');
  });

  it('should check Impressive', () => {
    cy.get('#impressiveRadio"]').click({ force: true });
    cy.get('.text-success').should('have.text', 'Impressive');
  });

  it('should be disabled, cannot check No', () => {
    cy.get('#noRadio"]').should('be.disabled');
  });
});
