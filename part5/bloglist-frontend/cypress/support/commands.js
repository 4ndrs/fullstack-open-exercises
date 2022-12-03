// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createUser", (newUser) => {
  cy.request("POST", "http://localhost:3003/api/users", newUser);
});

Cypress.Commands.add("login", (credentials) => {
  cy.request("POST", "http://localhost:3003/api/login", credentials).then(
    ({ body: user }) => {
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      cy.visit("http://localhost:3000");
    }
  );
});
