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

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "/auth",
    body: {
      username: "admin",
      password: "password123",
    },
  });
});

Cypress.Commands.add("cadastrarReserva", (payload) => {
  cy.request({
    method: "POST",
    url: "/booking",
    body: payload,
    failOnStatusCode: false, // para nao falhar automaticamente em status de erro
  });
});

Cypress.Commands.add("alterarReserva", (id_reserva, update_cadastro, token) => {
  cy.request({
    method: "PUT",
    url: `/booking/${id_reserva}`,
    body: update_cadastro,
    headers: {
      Cookie: `token=${token}`,
    },
  });
});

Cypress.Commands.add("deletarReserva", (id_reserva, token) => {
  cy.request({
    method: "DELETE",
    url: `/booking/${id_reserva}`,
    headers: {
      Cookie: `token=${token}`,
    },
  });
});
