/// <reference types = "cypress"/>

describe("Pruebas con Prdocutos Virtuales", () => {

    it('Crear Producto Virtual', () => {
        cy.visit('https://mc-staging.lentesplus.com/admin')
        cy.get('#username').type('bruno.dionel')
        cy.get('#login').type('Lentes2020*')
        cy.get('.action-login').click()
        cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click()
        cy.contains('.item-catalog-products > a', 'Products').click()
        cy.contains('.page-title', 'Products').should('be.visible')
        cy.get('[data-ui-id="products-list-add-new-product-button-dropdown"]').click()
        cy.wait(2000)
        cy.get('[data-ui-id="products-list-add-new-product-button-item-virtual"]').click()
        cy.wait(2000)
        cy.contains('.page-title', 'New Product').should('be.visible')
        cy.wait(2000)
        cy.get('#ERVC6LP').type('lentesSku11')
        cy.get('#SDDAFWV').type('lentesFromRos')
        cy.get('#BMP0HMH').type(111)
        cy.get('#save-button').click()
    })
})

