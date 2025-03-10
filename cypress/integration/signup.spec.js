import terminalLog from "../plugins/terminalLog";

/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.injectAxe();
  });

  it("signup page loaded", () => {
    cy.url().should("contains", "/signup");
  });

  it("Has no detectable a11y violations on load", () => {
    cy.checkA11y(null, null, terminalLog);
  });

  it("Adds subpath for french pages", () => {
    cy.get('[data-cy="toggle-language-link"]').click();
    cy.url().should("eq", "http://localhost:3000/fr/inscription");
  });

  it("Fails to submit with no input", () => {
    cy.get('[data-cy="signup-submit"]').click();
    cy.url().should("contains", "/signup");
    cy.get('.error-label').should("exist");
  });

  it("Validates that an email is entered in the email field", () => {
    cy.get('[id="email"]').type("not an email");
    cy.get('[id="confirmEmail"]').type("not an email");
    cy.get('[id="yearOfBirthRange-choice"]').select("before1938");
    cy.get('[id="languageEn"]').click();
    cy.get('[id="agreeToConditions"]').click();
    cy.get('[data-cy="signup-submit"]').click();

    cy.get('.error-label').should("exist");
    cy.get('.error-label').should('contain.text', 'Error : Must be a valid email');
  });

  it("Validates age of user is greater or equal to 18", () => {
    cy.get('[id="email"]').type("some@email.com");
    cy.get('[id="confirmEmail"]').type("some@email.com");
    cy.get('[id="yearOfBirthRange-choice"]').select("after2005");
    cy.get('[id="languageEn"]').click();
    cy.get('[id="agreeToConditions"]').click();
    cy.get('[data-cy="signup-submit"]').click();

    cy.get('.error-label').should("exist");
    cy.get('.error-label').should('contain.text', 'Error : Must be at least 18 years old');
  });

  it("Validates disability field is required if yes is selected", () => {
    cy.get('[id="email"]').type("some@email.com");
    cy.get('[id="confirmEmail"]').type("some@email.com");
    cy.get('[id="yearOfBirthRange-choice"]').select("before1938");
    cy.get('[id="languageEn"]').click();
    cy.get('[id="agreeToConditions"]').click();
    cy.get('[data-cy="btn-disability-yes"').click();
    cy.get('[data-cy="text-disability-yes"]').type("   ");
    cy.get('[data-cy="signup-submit"]').click();

    cy.get('.error-label').should("exist");
    cy.get('.error-label').should('contain.text', 'Error : Disability - This field is required');
  });

  it("Validates disability field is not required after yes has been unselected (selected no)", () => {
    cy.get('[id="email"]').type("some@email.com");
    cy.get('[id="confirmEmail"]').type("some@email.com");
    cy.get('[id="yearOfBirthRange-choice"]').select("before1938");
    cy.get('[data-cy="btn-disability-yes"').click();
    cy.get('[data-cy="btn-disability-no"').click();
    cy.get('[data-cy="signup-submit"]').click();

    // errors: agree to conditions and language selection
    cy.get('.error-label').should("exist");
    cy.get('.error-label').should('contain.text', 'Error : You must agree to conditions before sign up');
    cy.get('.error-label').should('contain.text', 'Error : What language would you like us to contact you in - This field is required');
  });
});
