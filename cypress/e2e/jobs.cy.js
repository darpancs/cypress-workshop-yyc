/// <reference types="cypress"/> 

describe('Job Portal E2E Tests', () => {
    beforeEach(() => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')

        cy.login(username,password, 'Smith')
    })
    it('Visit landing page', () => {
        cy.visit('/')
        cy.get('h1').should('have.text', 'Job Listings')
    })

    xit('Perform login', () => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('[data-testid="login-username"]').type('admin')
        cy.get('[data-testid="login-password"]').type('password')
        cy.get('[data-testid="login-submit-button"]').click()
        cy.get('[data-testid="nav-dropdown"]').contains('Smith')
    })

    it('Apply for a job', () => {
        cy.visit('/')
        cy.get('[data-testid="job-title"]').contains('Network Engineer').click()
        cy.get('[data-testid="job-code"]').invoke('show').should('be.visible')
        cy.get('[data-testid="job-apply-button"]').click()

        cy.get('[data-testid="user-name"]').type('Smith')
        cy.get('[data-testid="user-address"]').type('123 Somehere in Calgary')
        cy.get('[data-testid="user-skills"]').type('cypress, automation')
        cy.fixture('example.json').as('myResume')
        cy.get('[data-testid="user-resume-upload"]').selectFile('@myResume')
        cy.get('[data-testid="apply-submit-button"]').click()

        cy.get('[data-testid="page-heading"]').contains('Application Submitted')
    })

    it('Visit landing page and Intecept API calls', () => {
        cy.intercept('https://httpbin.org/ip').as('apiGetIP')
        cy.intercept('https://httpbin.org/user-agent').as('apiGetUserAgent')
        // cy.intercept('https://httpbin.org/user-agent',{ body: { "user-agent": "hello" }}).as('apiGetUserAgent')
        cy.visit('/')
        cy.wait('@apiGetIP').then(({ response }) => {
            expect(response.body).to.have.property('origin')
            expect(response.statusCode).to.eq(200)
        })
        cy.wait('@apiGetUserAgent').then(({ response }) => {
            expect(response.body).to.have.property('user-agent')
            expect(response.statusCode).to.eq(200)
            // expect(response.body["user-agent"]).be.eq('hello')
        })
    })

})