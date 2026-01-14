/// <reference types="cypress" />
describe('Cadastrar dispositivo', () => {


    it('Cadastrar dispositivos com sucesso', () => {

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
            method: 'POST',
            url: '/objects',
            body: payload

        }).then((resposta) => {

            console.log('Minha resposta', resposta)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).not.be.empty
            expect(resposta.body.createdAt).not.to.empty
            expect(resposta.body.name).to.equal(payload.name)
            expect(resposta.body.data.year).to.equal(payload.data.year)
        });
    });
});
