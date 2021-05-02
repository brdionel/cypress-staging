/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Generar Orden de Compra desde el admin en CL - en Staging - ', () => {

    it('Generar Orden de Compra desde el admin en CL', () => {

        cy.visit('https://mc-staging.lentesplus.com/admin/')

        cy.get('#username').type('bruno.dionel')
        cy.get('#login').type('Lentes2020*')
        cy.get('.action-login').click()

        // assert nome usuario
        cy.get('.admin-user-account-text')
            .should('contain', 'bruno.dionel')
        // asert Dashboard    
        cy.get('.page-title')
            .should('contain', 'Dashboard')

        cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()
        cy.get('.item-sales-order > a').click()

        // assert Order
        cy.get('.page-title')
            .should('contain', 'Orders')

        // Click en botón Create New Order
        cy.get('#add').click()
        
        // assert Create new order for new customer
        cy.contains('Create New Order for New Customer').should('be.visible')

        // Create New Order for New Customer
        // Busco al usuario brandon 
        cy.get('#sales_order_create_customer_grid_filter_entity_id').type('714121').type('{enter}')
        cy.wait(3000)
        cy.get('#sales_order_create_customer_grid_table > tbody').contains('714121').click()
    
        cy.wait(5000)

        // Please select a store
        // Selecciono Chile View
        cy.scrollTo(0, 100, {duration: 2000})
        cy.get(':nth-child(6) > .admin__field-control > .nested > .admin__field > .admin__field-label').click()
        
        cy.wait(84000)

        // Create New Order from Brandon Ramirez
        // Click en botón Add Products
        cy.get('#add_products').click()
        // Selecciono Acuvue Oasys 1 Day with Hydraluxe para Astigmatismo
        cy.get('#sales_order_create_search_grid_table > tbody').contains('1367').click()
        cy.wait(2000)
        // Lleno la formula de los lentes
        cy.get('#select_1529').select('-9.00')
        cy.get('#select_1532').select('-1.75')
        cy.get('#select_1535').select('110')
        cy.get('#product_composite_configure_input_qty').type('1')
        cy.get('.action-primary').click()
        // Click en botón Add Selected Product(s) to Order
        cy.get('#order-search > .admin__page-section-title > .actions').contains('Add Selected Product(s) to Order').click()
        cy.wait(10000)
        
        // Subo para llenar la direccioón 
        cy.scrollTo(0, 500, {duration: 3000})
        cy.get('#order-billing_address_customer_address_id').select('739225')
        cy.wait(10000)
        // Me dirijo hacie el metodo de pago
        cy.scrollTo(0, 3000, {duration: 5000})
        cy.get('.admin__payment-methods').contains('Lentesplus - Url de Pago').click()
        cy.wait(2000)
        // Selecciono el metodo de entrega
        cy.get('#order-shipping-method-summary > .action-default').contains('Get shipping methods and rates').click()
        cy.wait(3000)
        cy.get(':nth-child(2) > .admin__order-shipment-methods-options-list > .admin__field-option > .admin__field-label').click()

        // cy.get('#order-billing_address_firstname').clear().type('Hugo')
        // cy.get('#order-billing_address_lastname').clear().type('Albertengo')
        // cy.get('#order-billing_address_street0').clear().type('La Trinidad')
        // cy.get('#order-billing_address_region_id').select('Antofagasta')
        // // cy.get('#order-billing_address_city').clear().type('La Trinidad')
        // // cy.get('#order-billing_address_city_order_id').select()
        // cy.get('#order-billing_address_telephone').clear().type('+549626256165')
        // cy.get('#order-billing_address_comuna').select('Antofagasta')
        // cy.get('#order-billing_address_address_ext_number').clear().type('321')
        // cy.scrollTo('2000', {duration: 2000})
        cy.wait(5000)
        cy.scrollTo('bottom', {duration: 10000})


        

        // //cy.get('#order-billing_method_summary > a').trigger('click')
        // //cy.get('#order-shipping-method-summary > .action-default').contains('Get available payment methods').click()
        // cy.get('#order-billing_method_summary > .action-default > span').trigger('click')
        // cy.get('#submit_order_top_button').click()
        cy.get('.order-totals-actions > .actions > button').click()
        cy.wait(10000)

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