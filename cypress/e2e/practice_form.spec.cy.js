import {
  fillOutForm,
  submitForm,
  validateFormSubmission,
} from '../support/practice_form';

describe('Practice Form Tests', () => {
  beforeEach(() => {
    cy.visit('/automation-practice-form');
  });

  it('should be able to enter all fields with valid input and submit successfully', () => {
    cy.fixture('practice_form').then((practiceForm) => {
      const input = practiceForm.validInput;
      fillOutForm(input);
      submitForm();
      validateFormSubmission(input);
    });
  });

  it('should not submit with invalid email and phone inputs', () => {
    cy.fixture('practice_form').then((practiceForm) => {
      const input = practiceForm.invalidInput;
      fillOutForm(input);
      submitForm();
      cy.get('#example-modal-sizes-title-lg').should('not.exist');
      cy.get('#userEmail').should('match', ':invalid');
      cy.get('#userNumber').should('match', ':invalid');
    });
  });

  it('should not submit with empty required fields', () => {
    const reqFields = [
      'userForm',
      'firstName',
      'lastName',
      'gender-radio-1',
      'gender-radio-2',
      'gender-radio-3',
      'userNumber',
    ];
    submitForm();
    cy.get('#userForm').should('have.class', 'was-validated');
    for (let i = 0; i < reqFields.length; i++) {
      cy.get(`#${reqFields[i]}`).should('match', ':invalid');
    }
  });
});
