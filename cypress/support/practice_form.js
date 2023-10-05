export function fillOutForm() {
  cy.get('#firstName').type('Monika');
  cy.get('#lastName"]').type('Ibana');
  cy.get('#userEmail"]').type('monika@test.com');
  cy.get('#gender-radio-2"]').click({ force: true }); // make dynamic
  cy.get('#userNumber"]').type('4165555555');
  cy.get('#dateOfBirthInput"]'); // finish
  cy.get('#subjectsContainer"]').type('Maths{enter}');
  cy.get('#hobbies-checkbox-2"]').click({ force: true });
  cy.get('#uploadPicture"]').selectFile('cypress/e2e/test.txt');
  cy.get('#currentAddress"]').type('100 Yonge St');
  cy.get('#state"]').type('{enter}');
  cy.get('#city"]').type('{enter}');
}

export function submitForm() {
  cy.get('#submit').click({ force: true });
}

export function validateFormSubmission() {
  cy.get('#example-modal-sizes-title-lg').should(
    'have.text',
    'Thanks for submitting the form'
  );
  cy.contains('td', 'Student Name')
    .parent()
    .within(() => {
      cy.contains('td', 'Monika Ibana').should('be.visible');
    });
  cy.contains('td', 'Student Email')
    .parent()
    .within(() => {
      cy.contains('td', 'monika@test.com').should('be.visible');
    });
  cy.contains('td', 'Gender')
    .parent()
    .within(() => {
      cy.contains('td', 'Female').should('be.visible');
    });
  cy.contains('td', 'Mobile')
    .parent()
    .within(() => {
      cy.contains('td', '4165555555').should('be.visible');
    });
  cy.contains('td', 'Date of Birth')
    .parent()
    .within(() => {
      cy.contains('td', '05 October,2023').should('be.visible');
    });
  cy.contains('td', 'Subjects')
    .parent()
    .within(() => {
      cy.contains('td', 'Maths').should('be.visible');
    });
  cy.contains('td', 'Hobbies')
    .parent()
    .within(() => {
      cy.contains('td', 'Reading').should('be.visible');
    });
  cy.contains('td', 'Picture')
    .parent()
    .within(() => {
      cy.contains('td', 'test.txt').should('be.visible');
    });
  cy.contains('td', 'Address')
    .parent()
    .within(() => {
      cy.contains('td', '100 Yonge St').should('be.visible');
    });
  cy.contains('td', 'State and City')
    .parent()
    .within(() => {
      cy.contains('td', 'NCR Delhi').should('be.visible');
    });
}

export default { fillOutForm, submitForm, validateFormSubmission };
