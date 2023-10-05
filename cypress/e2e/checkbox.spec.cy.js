describe('Checkbox Tests', () => {
  beforeEach(() => {
    cy.visit('/checkbox');
  });

  it('should expand and collapse all directories', () => {
    cy.get('button[title="Expand all"]').click();
    cy.get('li[class="rct-node rct-node-parent rct-node-expanded"]').should(
      'be.visible'
    );
    cy.get('button[title="Collapse all"]').click();
    cy.get('li[class="rct-node rct-node-parent rct-node-collapsed"]').should(
      'be.visible'
    );
  });

  it('should check Home checkbox', () => {
    cy.fixture('checkbox').then((checkbox) => {
      const selectedCheckboxes = checkbox.homeCheckbox;
      cy.get('#tree-node-home"]').click({ force: true });
      cy.get('.text-success')
        .should('have.length', 17)
        .each(($el, index) => {
          cy.wrap($el).should('contain.text', selectedCheckboxes[index]);
        });
    });
  });

  it('should check nested checkboxes', () => {
    cy.fixture('checkbox').then((checkbox) => {
      const selectedCheckboxes = checkbox.documentsCheckbox;
      cy.get('button[title="Expand all"]').click();
      cy.get('#tree-node-documents"]').click({ force: true });
      cy.get('.text-success')
        .should('have.length', 10)
        .each(($el, index) => {
          cy.wrap($el).should('contain.text', selectedCheckboxes[index]);
        });
    });
  });

  it('should uncheck checkbox and parent checkboxes', () => {
    cy.fixture('checkbox').then((checkbox) => {
      const selectedCheckboxes = checkbox.reactUncheckedCheckbox;
      cy.get('button[title="Expand all"]').click();
      cy.get('#tree-node-documents"]').click({ force: true });
      cy.get('#tree-node-react"]').click({ force: true });
      cy.get('.text-success')
        .should('have.length', 7)
        .each(($el, index) => {
          cy.wrap($el).should('contain.text', selectedCheckboxes[index]);
        });
    });
  });
});
