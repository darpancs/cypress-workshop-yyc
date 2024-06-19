/// <reference types="cypress"/> 

Cypress.config({ baseUrl: 'https://httpbin.org' })
describe('API Tests', () => {
    it('Make a GET request ', () => {
        cy.request('/ip').then((response) => {
            expect(response.body).to.have.property('origin')
            expect(response.status).be.eq(200)
        })
    })
    it('Make a POST request', () => {
        const requestBody = {
            name: 'John Smith',
            age: 30,
            city: 'Calgary'
        };

        cy.request('POST', '/post', requestBody)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.json).to.have.property('city', 'Calgary')
                expect(response.body.json).to.deep.equal(requestBody);
            });
    });
    it('Make a POST request using fixture', () => {
        cy.fixture('example.json').then((requestBody) => {
            cy.request('POST', '/post', requestBody)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.json).to.have.property('email', 'hello@cypress.io')
                expect(response.body.json).to.deep.equal(requestBody);
            });
        })
    })
})