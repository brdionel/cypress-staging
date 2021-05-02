/// <reference types="cypress" />

import {username, password} from "../../fixtures/magentoUser.json"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Generar Orden de Compra desde el admin en AR - en Staging - ', () => {

    // beforeEach(() =>{
    //     cy.intercept("POST","https://mc-staging.lentesplus.com/admin/sales/order_create/**").as('createOrder')
    // })

    it('Generar Orden de Compra desde el admin en AR', () => {

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

        cy.wait(70000)

        cy.get('#add_products').click()

        cy.get('#sales_order_create_search_grid_filter_entity_id').type('868{enter}')
        cy.wait(2000)

        cy.get('#sales_order_create_search_grid_table > tbody > .even > .col-name').contains('Renu Fresh 60ml').click()

        cy.get('#order-search > .admin__page-section-title button').click()

        cy.wait(7000)

        cy.get('#email').type('hugobalassone@gmail.com')
        cy.get('#id_type').select('DNI')
        cy.get('#id_number').type('32553431')

        cy.get('#order-billing_address_firstname').type('Hugo Roberto')
        cy.get('#order-billing_address_lastname').type('Balassone')

        cy.get('#order-billing_address_street0').type('Av. Gral Las Heras')

        cy.get('#order-billing_address_region_id').select('Capital Federal')
        cy.get('#order-billing_address_city').type('Capital Federal')
        cy.get('#order-billing_address_postcode').type('1000')
        cy.get('#order-billing_address_telephone').type('+5491166811919')
        cy.get('#order-billing_address_address_ext_number').type('123')

        cy.get('#order-billing_method_summary > .action-default > span').trigger('click')
        cy.wait(10000)
        cy.get('.admin__payment-methods > :nth-child(3) > .admin__field-label').click()

        cy.get('#order-shipping-method-summary > .action-default > span').click()
        cy.wait(7000)
        cy.get(':nth-child(2) > .admin__order-shipment-methods-options-list > .admin__field-option > .admin__field-label').click()

        cy.wait(5000)
        cy.get('#submit_order_top_button').click()
        // // assert Create new order for new customer
        // cy.contains('Create New Order for New Customer').should('be.visible')

        // // cy.contains('button', 'Search').click()
        // cy.get('#sales_order_create_customer_grid_filter_entity_id').type('703408').type('{enter}')
        // cy.wait(3000)
        // cy.get('#sales_order_create_customer_grid_table > tbody').contains('703408').click()
    
        // cy.wait(8000)
        // cy.get(':nth-child(3) > .admin__field-control > .nested > .admin__field > .admin__field-label').click()
        
        // cy.wait(74000)
        // cy.get('#add_products').click()
        // cy.get('#sales_order_create_search_grid_table > tbody').contains('868').click()
        // cy.get('#order-search > .admin__page-section-title > .actions').contains('Add Selected Product(s) to Order').click()
    
        // cy.wait(4000)

        // cy.get('#order-billing_address_firstname').clear().type('Hugo')
        // cy.get('#order-billing_address_lastname').clear().type('Albertengo')
        // cy.get('#order-billing_address_street0').clear().type('La Trinidad')
        // cy.get('#order-billing_address_region_id').select('Buenos Aires')
        // cy.get('#order-billing_address_city').clear().type('La Trinidad')
        // cy.get('#order-billing_address_postcode').clear().type('6027')
        // cy.get('#order-billing_address_telephone').clear().type('+549626256165')
        // cy.get('#order-billing_address_address_ext_number').clear().type('321')

        // //cy.get('#order-billing_method_summary > a').trigger('click')
        // //cy.get('#order-shipping-method-summary > .action-default').contains('Get available payment methods').click()
        // cy.get('#order-billing_method_summary > .action-default > span').trigger('click')
        // cy.wait(10000)
        // cy.get('.admin__payment-methods').contains('Lentesplus - Url de Pago').click({ force: true })
        // cy.wait(2000)
        // cy.get('#order-shipping-method-summary > .action-default').contains('Get shipping methods and rates').trigger('click')
        // cy.get(':nth-child(2) > .admin__order-shipment-methods-options-list > .admin__field-option > .admin__field-label').click()
        // cy.get('#submit_order_top_button').click()
        // cy.wait(3000)
        // cy.get('.admin__payment-methods > :nth-child(11) > .admin__field-label').click()
        // cy.get('#submit_order_top_button').click()

        // // Assert orden created
        // cy.get('.messages > .message')
        //     .should('contain', 'You created the order.')
        //     .should('have.class', 'success')

        // cy.get('.order-account-information > .admin__page-section-item-content > .admin__table-secondary > tbody > :nth-child(1) > td')
        //     .should('contain', 'Hugo Bombas')

        // cy.get('.order-payment-method-title')
        //     .should('contain', 'Lentesplus - Url de Pago')

    })
})