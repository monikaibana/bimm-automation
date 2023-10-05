describe('Radio Button Tests', () => {
  beforeEach(() => {
    cy.visit('/radio-button');
  });

  it('should check Yes', () => {
    cy.get('[id="yesRadio"]').click({ force: true });
    cy.get('.text-success').should('have.text', 'Yes');
  });

  it('should check Impressive', () => {
    cy.get('[id="impressiveRadio"]').click({ force: true });
    cy.get('.text-success').should('have.text', 'Impressive');
  });

  it('should be disabled, cannot check No', () => {
    cy.get('[id="noRadio"]').should('be.disabled');
  });
});
