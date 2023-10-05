export function fillOutForm(input) {
  const genderArr = ['Male', 'Female', 'Other'];
  const subjectArr = ['Sprots', 'Reading', 'Music'];

  cy.get('#firstName').type(input.firstName);
  cy.get('#lastName').type(input.lastName);
  cy.get('#userEmail').type(input.userEmail);
  cy.get(`#gender-radio-${genderArr.indexOf(input.gender) + 1}`).click({
    force: true,
  });
  cy.get('#userNumber').type(input.userNumber);
  cy.get('#dateOfBirthInput'); // finish

  input['subjects'].forEach((val) => {
    cy.get('#subjectsContainer').type(`${val}{enter}`);
  });

  input['hobbies'].forEach((val) => {
    let subject = subjectArr.indexOf(val) + 1;
    cy.get(`#hobbies-checkbox-${subject}`).click({ force: true });
  });

  cy.get('#uploadPicture').selectFile('cypress/e2e/test.txt');
  cy.get('#currentAddress').type(input.currentAddress);
  cy.get('#state').type(`${input.state}{enter}`);
  cy.get('#city').type(`${input.city}{enter}`);
}

export function submitForm() {
  cy.get('#submit').click({ force: true });
}

export function validateFormSubmission(input) {
  cy.get('#example-modal-sizes-title-lg').should(
    'have.text',
    'Thanks for submitting the form'
  );
  cy.contains('td', 'Student Name')
    .parent()
    .within(() => {
      cy.contains('td', `${input.firstName} ${input.lastName}`).should(
        'be.visible'
      );
    });
  cy.contains('td', 'Student Email')
    .parent()
    .within(() => {
      cy.contains('td', input.userEmail).should('be.visible');
    });
  cy.contains('td', 'Gender')
    .parent()
    .within(() => {
      cy.contains('td', input.gender).should('be.visible');
    });
  cy.contains('td', 'Mobile')
    .parent()
    .within(() => {
      cy.contains('td', input.userNumber).should('be.visible');
    });
  cy.contains('td', 'Date of Birth')
    .parent()
    .within(() => {
      cy.contains('td', '05 October,2023').should('be.visible');
    });
  cy.contains('td', 'Subjects')
    .parent()
    .within(() => {
      cy.contains('td', input['subjects'].join(', ')).should('be.visible');
    });
  cy.contains('td', 'Hobbies')
    .parent()
    .within(() => {
      cy.contains('td', input['hobbies'].join(', ')).should('be.visible');
    });
  cy.contains('td', 'Picture')
    .parent()
    .within(() => {
      cy.contains('td', 'test.txt').should('be.visible');
    });
  cy.contains('td', 'Address')
    .parent()
    .within(() => {
      cy.contains('td', input.currentAddress).should('be.visible');
    });
  cy.contains('td', 'State and City')
    .parent()
    .within(() => {
      cy.contains('td', `${input.state} ${input.city}`).should('be.visible');
    });
}

export default { fillOutForm, submitForm, validateFormSubmission };
