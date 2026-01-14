/// <reference types="cypress" />

import { gerarReservaComDadosFakes } from "../fixtures/reserva_utils.js";

const payload_aleatorio = gerarReservaComDadosFakes();
const dados_cadastro = require("../fixtures/cadastro_reserva.json");

describe("Cadastrar reserva", () => {
    it("Cadastrar reserva com sucesso", () => {

    cy.cadastrarReserva(dados_cadastro).then((resposta) => {
            console.log("Minha resposta", resposta);
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.a.NaN;
            expect(resposta.body.booking.firstname).to.equal(dados_cadastro.firstname);
            expect(resposta.body.booking.totalprice).to.equal(dados_cadastro.totalprice);
        });
    });

    it("Cadastrar reserva com sucesso - Dados aleatórios", () => {

       cy.cadastrarReserva(payload_aleatorio).then((resposta) => {
            console.log("Minha resposta", resposta);
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.a.NaN;
            expect(resposta.body.booking.firstname).to.equal(payload_aleatorio.firstname);
            expect(resposta.body.booking.lastname).to.equal(payload_aleatorio.lastname);
            expect(resposta.body.booking.totalprice).to.equal(payload_aleatorio.totalprice);
        });
    });

    it("Cadastrar reserva sem dados", () => {

       cy.cadastrarReserva({}).then((resposta) => {
            console.log("Minha resposta", resposta);
            expect(resposta.status).to.equal(500);

        });
    });
});
