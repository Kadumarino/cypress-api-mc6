/// <reference types="cypress" />

import { gerarReservaComDadosFakes } from "../fixtures/reserva_utils.js";

const dados_cadastro = require("../fixtures/cadastro_reserva.json");
const update_cadastro = require("../fixtures/update_reserva.json");
const payload_aleatorio = gerarReservaComDadosFakes();

describe("Alterar reserva", () => {
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

  // antes de cada cenario
  beforeEach(() => {
    console.log("Executando antes de cada cenario");
  });

  // depois de todos os cenarios
  after(() => {
    console.log("Executando depois de todos os cenarios");
  });

  // depois de cada cenario
  afterEach(() => {
    console.log("Executando depois de cada cenario");
  });

  it("Alterar reserva com sucesso", () => {
    // Primeiro cria uma reserva
    cy.cadastrarReserva(dados_cadastro).then((resposta) => {
      id_reserva = resposta.body.bookingid;
      console.log("Meu response do POST", resposta);

      // Depois altera a reserva criada
      cy.alterarReserva(id_reserva, update_cadastro, token).then((resposta) => {
        expect(resposta.status).to.equal(200);
        console.log("Meu Response do PUT", resposta);
        console.log("Meu id da reserva", id_reserva);
        expect(resposta.body.firstname).to.equal(update_cadastro.firstname);
        expect(resposta.body.lastname).to.equal(update_cadastro.lastname);
        expect(resposta.body.totalprice).to.equal(update_cadastro.totalprice);
      });
    });
  });

  it("Alterar reserva com dados aleatorios", () => {
    // Cria uma nova reserva
    cy.cadastrarReserva(dados_cadastro).then((resposta) => {
      id_reserva = resposta.body.bookingid;
      console.log("Meu response do POST", resposta);

        // Altera a reserva criada com dados aleatorios
      cy.alterarReserva(id_reserva, payload_aleatorio, token).then(
        (resposta) => {
          expect(resposta.status).to.equal(200);
          console.log("Meu Response do PUT", resposta);
          console.log("Meu id da reserva", id_reserva);
          expect(resposta.body.firstname).to.equal(payload_aleatorio.firstname);
          expect(resposta.body.lastname).to.equal(payload_aleatorio.lastname);
          expect(resposta.body.totalprice).to.equal(payload_aleatorio.totalprice);
        }
      );
    });
  });
});
