/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Prueba de la sección Orders en Magento', () => {

    beforeEach(() =>{
        //Verifico en el admin, si se crea la  orden
        cy.visit('https://mc-staging.lentesplus.com/admin/')

        cy.get('#username').type('bruno.dionel')
        cy.get('#login').type('Lentes2020*')
        cy.get('.action-login').click()

        //assert nome usuario
        cy.get('.admin-user-account-text')
            .should('contain', 'bruno.dionel')
        // asert Dashboard    
        cy.get('.page-title')
            .should('contain', 'Dashboard')
    })
    

    it('Página Orders', () => {        

        cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()
        cy.get('.item-sales-order > a').click()

        //assert Order
        cy.get('.page-title')
            .should('contain', 'Orders')

        // cy.wait(7000)
        // cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > #fulltext').clear().type(nroOrden).type('{enter}')
        // cy.wait(2000)
        // cy.get('.data-grid-actions-cell > .action-menu-item').click()

        // cy.wait(3000)
        // cy.scrollTo( 'bottom', {duration: 25000})
    })

    it('Vuelvo a orders', () => {
        //assert nome usuario
        cy.get('.admin-user-account-text')
            .should('contain', 'bruno.dionel')

        cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()
        cy.get('.item-sales-order > a').click()
        //assert Order
        cy.get('.page-title')
            .should('contain', 'Orders')
    })

})