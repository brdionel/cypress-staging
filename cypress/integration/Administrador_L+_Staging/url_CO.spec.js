//Ingresar a Lentesplus
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
it('finds the content "type"', () => {
    cy.visit('https://www.lentesplus.com/paneladmin')

    cy.get('#username').type('bruno.dionel')
    cy.get('#login').type('Lentes2020*')

    //Click en Login 

    cy.get('.action-login').click()

    //Click en Sales 

    cy.get('#menu-magento-sales-sales > [onclick="return false;"]').click()

    //click en orders 

    cy.get('.item-sales-order > a').click()

    //click en Filter 
    cy.wait(10000)
    cy.get('#add').click()
    cy.get('#sales_order_create_customer_grid_filter_email').type('sebastian.cortes@lentesplus.com')
    cy.wait(2000)
    cy.get('#sales_order_create_customer_grid_filter_email').type('{enter}')


    //Click en usuario y seleccionar tienda 
    cy.wait(2000)
    cy.get('[title="547231"] > .a-right').click()
    cy.wait(2000)
    cy.get('#store_13').click()

    //generar orden de pago 
    // 1. Click en Add by Sku 
    // 2. Agregar Sku (23BLRE103)
    cy.wait(50000)
    cy.get('#order-items > .admin__page-section-title > .actions > :nth-child(1)').click()
    cy.wait(4000)
    cy.get('#sales_order_create_search_grid_filter_sku').type("23BLRE103")
    cy.get('#sales_order_create_search_grid_filter_sku').type('{enter}')
    cy.get('#id_31').click()
    cy.wait(4000)
    //cy.get('#id_2w3ZNV3vDcZTVgeAUVBiqg5wNIWFzMpT')



})