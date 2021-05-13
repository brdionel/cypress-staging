/// <reference types="cypress" />

import {username, password} from "../../fixtures/magentoUser.json"
import {extractUrl} from '../../support/helpers'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Generar Orden de Compra desde el admin en AR - en Staging - ', () => {

    it('Generar Orden de Compra desde el admin en AR - Customer desde cero', () => {

        cy.visit('/')
        cy.login(username, password)

        // assert nome usuario
        cy.get('.admin-user-account-text')
            .should('contain', 'bruno.dionel')
        // asert Dashboard    
        cy.get('.page-title')
            .should('contain', 'Dashboard')

        cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()
        cy.get('.item-sales-order > a').click()
        
        cy.wait(10000)
        // assert Order
        cy.get('.page-title')
            .should('contain', 'Orders')

        cy.get('#add').click()
        
        cy.get('[title="Create New Customer"]').click()
        
        cy.get(':nth-child(3) > .admin__field-control > .nested > .admin__field > .admin__field-label').click()

        cy.wait(90000)

        cy.get('#add_products').click()

        cy.scrollTo(0, 400, {duration: 2000})
        cy.get('#sales_order_create_search_grid_filter_entity_id').type('868{enter}')
        cy.wait(8000)
        cy.get('#sales_order_create_search_grid_table')
        cy.get('#sales_order_create_search_grid_table > tbody tr').click()
        cy.scrollTo(0, 200, {duration: 2000})
        cy.get('#order-search > .admin__page-section-title button').click()
        
        cy.wait(7000)
        
        cy.scrollTo(0, 600, {duration: 2000})
        cy.get('#email').type('hugorbalassone@gmail.com')
        cy.get('#id_type').select('DNI')
        cy.get('#id_number').type('32553431')

        cy.scrollTo(0, 1100, {duration: 2000})
        cy.get('#order-billing_address_firstname').type('Hugo Roberto')
        cy.scrollTo(0, 1500, {duration: 2000})
        cy.get('#order-billing_address_lastname').type('Balassone')
        cy.get('#order-billing_address_street0').type('Av. Gral Las Heras')
        cy.scrollTo(0, 1900, {duration: 2000})
        cy.get('#order-billing_address_region_id').select('Capital Federal')
        cy.get('#order-billing_address_city').type('Capital Federal')
        cy.get('#order-billing_address_postcode').type('1000')
        cy.get('#order-billing_address_telephone').type('+5491166811919')
        cy.scrollTo(0, 2500, {duration: 2000})
        cy.get('#order-billing_address_address_ext_number').type('123')

        cy.scrollTo(0, 3100, {duration: 2000})
        cy.get('#order-billing_method_summary > .action-default > span').trigger('click')
        cy.wait(10000)
        cy.get('.admin__payment-methods > :nth-child(3) > .admin__field-label').click()
        cy.get('#order-shipping-method-summary > .action-default > span').click()
        cy.wait(7000)
        cy.get(':nth-child(2) > .admin__order-shipment-methods-options-list > .admin__field-option > .admin__field-label').click()

        cy.wait(5000)
        cy.get('#submit_order_top_button').click()
        cy.get('.admin__payment-methods > :nth-child(11) > .admin__field-label').click()
        cy.get('#submit_order_top_button').click()

        cy.get('div[data-ui-id="messages-message-success"]')
            .should('contain', 'You created the order.')

        cy.scrollTo(0, 300, {duration: 2000})
        cy.wait(1500)
        cy.get('table.order-information-table #order_status')
            .should('contain', 'Pago Pendiente')

        // Website
        cy.get('.order-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(3) > td')
            .should('contain', 'Argentina Website')
        
        // Nombre usuario
        cy.get('.order-account-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(1) > td')
            .should('contain', 'Hugo Roberto Balassone')

        // Email
        cy.get('.admin__table-secondary > tbody > :nth-child(2) > td > a')
            .should('contain', 'hugorbalassone@gmail.com')
        
        // Customer Group
        cy.get('.order-account-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(3) > td')
            .should('contain', 'Lead no activo')
        
        // Tipo identificacion
        cy.get('.order-account-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(4) > td')
            .should('contain', 'DNI')

        // Nro DNI
        cy.get('.order-account-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(5) > td')
            .should('contain', '32553431')
        
        cy.scrollTo(0, 900, {duration: 2000})
        cy.wait(1500)
        // Metodo de Pago
        cy.get('.order-payment-method-title')
            .should('contain', 'Lentesplus - Url de Pago  ')

        cy.scrollTo(0, 1900, {duration: 2000})
        cy.wait(1500)
        // Ultimo estado historial
        cy.get('#order_history_block > .note-list > :nth-child(1) > .note-list-status')
            .should('contain', 'Pago Pendiente') 

        // Precio Total
        cy.get('.col-3 > :nth-child(2) > strong > .price')
            .should('contain', '$250.00')

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
                .should('include', '/ar/checkout/')
            cy.get('.base')
                .should('contain', 'Finaliza tu compra')

        })
    })

})