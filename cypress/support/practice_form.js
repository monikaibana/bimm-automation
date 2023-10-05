export function fillOutForm(input) {
  const genderArr = ['Male', 'Female', 'Other'];
  const subjectArr = ['Sports', 'Reading', 'Music'];

  cy.get('#firstName').type(input.firstName);
  cy.get('#lastName').type(input.lastName);
  cy.get('#userEmail').type(input.userEmail);

  // test input is a string, used indexOf to get the corresponding classname for radio button
  cy.get(`#gender-radio-${genderArr.indexOf(input.gender) + 1}`).click({
    force: true,
  });
  cy.get('#userNumber').type(input.userNumber);

  selectDateWithDatePicker(input.dateOfBirth);

  // used forEach because the field can have accept multiple input values
  input['subjects'].forEach((val) => {
    cy.get('#subjectsContainer').type(`${val}{enter}`);
  });

  // used forEach and indexOf to account for multiple input values and corresponding classnames
  input['hobbies'].forEach((val) => {
    let subject = subjectArr.indexOf(val) + 1;
    cy.get(`#hobbies-checkbox-${subject}`).click({ force: true });
  });

  // the form does not validate the file type, so I just generate a text file to upload
  cy.get('#uploadPicture').selectFile(`cypress/e2e/${input.fileName}`);

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
      cy.contains('td', input.dateOfBirth).should('be.visible');
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
      cy.contains('td', input.fileName).should('be.visible');
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

function selectDateWithDatePicker(dateOfBirth) {
  // function to format date from the test data and select from date picker
  const date = new Date(dateOfBirth);
  let dob = {
    month: date.getMonth().toString(),
    year: date.getFullYear().toString(),
    day: date.getDate().toString(),
  };
  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select(dob.month);
  cy.get('.react-datepicker__year-select').select(dob.year);
  cy.get('.react-datepicker__month').contains(dob.day).click();
}

export default { fillOutForm, submitForm, validateFormSubmission };
