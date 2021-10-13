/* eslint-disable no-undef */
/// <reference types="Cypress" />
const { recurse } = require("cypress-recurse");

describe("signup and confirmation", () => {
  let userEmail;

  before(() => {
    // get and check the test email only once before the tests
    cy.task("getUserEmail").then((email) => {
      expect(email).to.be.a("string");
      userEmail = email;
    });
  });

  it("sends confirmation email", () => {
    cy.intercept("POST", "/api/**", {
      statusCode: 201,
      body: {
        data: "test success",
      },
    });

    cy.visit("/signup");
    cy.get('[id="email"]').type(userEmail);
    cy.get('[id="yearOfBirthRange-choice"]').select("before1936");
    cy.get('[id="languageEn"]').click();
    cy.get('[id="agreeToConditions"]').click();
    cy.get('[data-cy="signup-submit"]').click();

    // retry fetching the email
    recurse(
      () => cy.task("getLastEmail"), // Cypress commands to retry
      Cypress._.isObject, // keep retrying until the task returns an object
      {
        timeout: 60000, // retry up to 1 minute
        delay: 5000, // wait 5 seconds between attempts
      }
    )
      .its("html")
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, "write", html);
      });
  });
});
