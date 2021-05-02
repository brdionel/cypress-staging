/// <reference types = "cypress"/>

import {username, password} from "../../fixtures/magentoUser.json"

describe("Pruebas Login en Magento", () => {

    beforeEach(() => {
        cy.visit('/')
    })
    
    it('Login con usuario correcto', () => {
        cy.login(username, password)
        cy.get('.page-title').should('contain', 'Dashboard')
        cy.get('.admin-user-account-text').should('contain', username)
    })

    it('Logout', () => {
        cy.login(username, password)
        cy.get('.admin-user > .admin__action-dropdown').click()
        cy.wait(1500)
        cy.get('.account-signout').click()

        cy.get('[data-ui-id="messages-message-success"]').should('contain', 'Has cerrado la sesión.')
    })

    it('Redirect a Login si no estoy logueado', () => {
        cy.visit('/admin/dashboard')
        cy.url().should('include', '/index/index')
        cy.get('.login-content').should('be.visible')
    })

    it('Login failed con usuario incorrecto', () => {
        cy.login('usernameFailed', 'failed')
        cy.get('.message').should('contain', 'You did not sign in correctly or your account is temporarily disabled.')
    })

})