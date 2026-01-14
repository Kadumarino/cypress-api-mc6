/// <reference types="cypress" />
describe('Deletar dispositivo', () => {


    it('Deletar dispositivos com sucesso', () => {

        const payload = {
            "name": "Telefone com fio",
            "data": {
                "year": 2000,
                "price": 500,
                "CPU model": "",
                "Hard disk size": ""
            },
        }

        cy.request({
            method: 'DELETE',
            url: '/objects',
            body: payload,
            failOnStatusCode: false

        }).then((resposta) => {

            console.log('Minha resposta', resposta)
            expect(resposta.status).to.equal(404)
        });
    });
});
