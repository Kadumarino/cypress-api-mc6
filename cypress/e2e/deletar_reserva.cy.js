/// <reference types="cypress" />

const dados_cadastro = require("../fixtures/cadastro_reserva.json");

describe("Deletar reserva", () => {
  let token;
  let id_reserva;
  // hook para autenticação
  // antes de todos os cenarios
  before(() => {
    console.log("Executando antes de todos os cenarios");

    cy.login().then((resposta) => {
      token = resposta.body.token;
      console.log("Meu token", token);
    });
  });
  

  it("Deletar reserva com sucesso", () => {
    // Primeiro: Cria uma reserva
    cy.cadastrarReserva(dados_cadastro).then((resposta) => {
      id_reserva = resposta.body.bookingid;
      console.log("Minha resposta POST", resposta);
      console.log("ID da reserva criada:", id_reserva);

      // Segundo: Deleta a reserva (dentro do .then do POST)
      cy.deletarReserva(id_reserva, token).then((resposta) => {
        
        console.log("Meu Response do DELETE", resposta);
        console.log("ID da reserva deletada:", id_reserva);
        expect(resposta.status).to.equal(201);
      });
    });
  });
});