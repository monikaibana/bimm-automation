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
    fillOutForm();
    submitForm();
    validateFormSubmission();
  });

  it.only('should not be able to submit with empty required fields', () => {
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
