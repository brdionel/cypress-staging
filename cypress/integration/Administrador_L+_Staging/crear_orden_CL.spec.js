/// <reference types="cypress" />

import {extractUrl} from '../../support/helpers'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Generar Orden de Compra desde el admin en CL - en Staging - ', () => {

    it('Generar Orden de Compra desde el admin en CL', () => {

        cy.visit('/')
        cy.login('bruno.dionel', 'Lentes2020*')

        // assert nome usuario
        cy.get('.admin-user-account-text')
            .should('contain', 'bruno.dionel')

        // Sales > Orders 
        cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()
        cy.get('.item-sales-order > a').click()

        // assert Order
        cy.get('.page-title')
            .should('contain', 'Orders')

        cy.wait(5000)
        // Click en botón Create New Order
        cy.get('#add').click()
        
        cy.wait(5000)
        // assert Create new order for new customer
        cy.contains('Create New Order for New Customer').should('be.visible')

        // Create New Order for New Customer
        // Busco al usuario brandon 
        cy.scrollTo(0, 100, {duration: 2000})
        cy.get('#sales_order_create_customer_grid_filter_entity_id').type('714121').type('{enter}')
        cy.wait(3000)
        cy.get('#sales_order_create_customer_grid_table > tbody').contains('714121').click()
    
        cy.wait(5000)

        // Please select a store
        // Selecciono Chile View
        cy.scrollTo(0, 130, {duration: 2000})
        cy.get(':nth-child(6) > .admin__field-control > .nested > .admin__field > .admin__field-label').click()
        
        cy.wait(144000)

        // Create New Order from Brandon Ramirez
        // Click en botón Add Products
        cy.get('#add_products').click()
        // Selecciono Acuvue Oasys 1 Day with Hydraluxe para Astigmatismo
        cy.scrollTo(0, 900, {duration: 5000})
        cy.get('#sales_order_create_search_grid_table > tbody').contains('1367').click()
        cy.wait(3000)
        // Lleno la formula de los lentes
        cy.get('#select_1529').select('-9.00')
        cy.get('#select_1532').select('-1.75')
        cy.get('#select_1535').select('110')
        cy.get('#product_composite_configure_input_qty').type('1')
        cy.get('.action-primary').click()
        // Click en botón Add Selected Product(s) to Order
        cy.scrollTo('top', {duration: 2000})
        cy.get('#order-search > .admin__page-section-title > .actions').contains('Add Selected Product(s) to Order').click()
        cy.wait(10000)
        
        // Selecciono la direccion del usuario
        cy.scrollTo(0, 1000, {duration: 4000})
        cy.get('#order-billing_address_customer_address_id').select('739225')
        cy.wait(10000)
        // Me dirijo hacie el metodo de pago
        cy.scrollTo(0, 3000, {duration: 5000})
        cy.get('.admin__payment-methods').contains('Lentesplus - Url de Pago').click()
        cy.wait(4000)
        // Selecciono el metodo de entrega
        cy.get('#order-shipping-method-summary > .action-default').contains('Get shipping methods and rates').click()
        cy.wait(5000)
        cy.get(':nth-child(2) > .admin__order-shipment-methods-options-list > .admin__field-option > .admin__field-label').click()

        cy.wait(5000)
        cy.scrollTo('bottom', {duration: 6000})

        cy.get('.order-totals-actions > .actions > button').click()
        cy.wait(7000)


        // Assert orden created
        cy.get('.messages > .message')
            .should('contain', 'You created the order.')
            .should('have.class', 'success')

        // order status
        cy.get(':nth-child(3) > td > #order_status')
            .should('contain', 'Pago Pendiente')

        // Chile website
        cy.get('.order-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(4) > td')
            .should('contain', 'Chile Website')


        // Metodo de pago
        cy.scrollTo(0, 750, {duration: 6000})
        cy.get('.order-payment-method-title')
            .should('contain', 'Lentesplus - Url de Pago')

        // Datos de los lentes
        cy.scrollTo(0, 1380, {duration: 6000})
        cy.get('.even > :nth-child(1) > .col-product .item-options > :nth-child(2)')
            .should('contain', '-9.00')

        cy.get('.even > :nth-child(1) > .col-product .item-options > :nth-child(4)')
            .should('contain', '-1.75')

        cy.get('.even > :nth-child(1) > .col-product .item-options > :nth-child(6)')
            .should('contain', '110')
 
        cy.scrollTo('bottom', {duration: 6000})
        cy.get('#order_history_block > .note-list > :nth-child(1) > .note-list-status')
            .should('contain', 'Pago Pendiente')

        // Generar Url de pago
        cy.get('.page-main-actions').contains('Generate URL Pay').click()

        cy.get('.messages > .message')
            .should('have.class', 'message-success')

        cy.get('.message > div')
            .should('contain', 'The url pay is in the next link')

        // Obtengo URL
        cy.get('.message > div').then(($message) => {
            
            const url = extractUrl($message.text())
            cy.log(url)

            // Voy hacia la URL de pago
            cy.visit(url)

            cy.url()
                .should('include', '/cl/checkout/')
            cy.get('.base')
                .should('contain', 'Finaliza tu compra')

        })
    })
})