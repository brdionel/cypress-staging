/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Crear customer desde el admin - en Staging - ', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.login('bruno.dionel', 'Lentes2020*')
        // Customers
        cy.get('#menu-magento-customer-customer > [onclick="return false;"]').click()
        // All Customers
        cy.get('.item-customer-manage > a').click()
    })

    it('New Customer', () => {
        
        cy.get('#add').contains('Add New Customer').click()

        cy.get('.page-title')
            .should('contain', 'New Customer')

        cy.scrollTo(0, 100, {duration: 2000})

        // Associate to website
        cy.get('[data-index="website_id"] select').select('Argentina Website')

        cy.scrollTo(0, 400, {duration: 4000})
        
        // First Name
        cy.get('[data-index="firstname"] input').type('Bruno Dionel')
        // Last Name
        cy.get('[data-index="lastname"] input').type('Vicente')

        cy.scrollTo(0, 600, {duration: 4000})

        // Email
        cy.get('[data-index="email"] input').type('brdionel.test@gmail.com')
        // Numero de celular
        cy.get('[data-index="phone_number"] input').type('+5492364261405')
        // Identificatio Type
        cy.get('[data-index="id_type"] select').select('DNI')

        cy.scrollTo(0, 900, {duration: 4500})

        // Id Number
        cy.get('[data-index="id_number"] input').type('35218052')

        cy.scrollTo('top', {duration: 5000})

        cy.get('#save').click()

        cy.wait(5000)

        cy.get('.message > div')
            .should('contain', 'You saved the customer.')
                
    })

    it('Customer view', () => {
        
        cy.wait(10000)
        cy.searchCustomerByEmail('brdionel.test@gmail.com') 
        
        cy.get('.page-title')
            .should('contain', 'Bruno Dionel Vicente')

        cy.get('.admin__table-secondary > tbody > :nth-child(1) > td')
            .should('contain', 'Individual user')

        cy.get(':nth-child(8) > td')
            .should('contain', 'Argentina View')
    
        cy.get(':nth-child(9) > td')
            .should('contain', 'Lead no activo')

        cy.get('address')
            .should('contain', 'The customer does not have default billing address.')
        
        cy.scrollTo(0,300, {duration:2000})
        cy.wait(3000)
    })

    it.skip('Addresses', () => {
        cy.wait(10000)
        cy.searchCustomerByEmail('brdionel.test@gmail.com')
        cy.get('#tab_address').click()
        cy.scrollTo(0,400, {duration:2000})
        
        cy.get('.admin__data-grid-outer-wrap > .admin__data-grid-wrap > .data-grid > tbody > .data-grid-tr-no-data > td').as('listAddresses')
            .should('contain', "We couldn't find any records.")
        cy.wait(2000)
        cy.scrollTo(0,200, {duration:2000})
        cy.get('.add-new-address-button').click()
        
        cy.wait(71000)
        cy.get('#modal-title-14')
            .should('contain', 'Add/Update Address')
        
        cy.get('.customer_form_areas_address_address_customer_address_update_modal > .modal-inner-wrap').as('modalAddress')
        // Setea Default Billing Address
        cy.get('[data-index="default_billing"] > .admin__field-control > .admin__actions-switch > .admin__actions-switch-label').click()
        // Setea Default Shipping Address      
        cy.get('[data-index="default_shipping"] > .admin__field-control > .admin__actions-switch > .admin__actions-switch-label').click()

        cy.get('@modalAddress').scrollTo(0,300, {duration:2000})
        cy.get('input[name="street[0]"]').clear().type('Ipanema')
        cy.get('select.admin__control-select[name="country_id"]').eq(1).select('AR')
        cy.get('@modalAddress').scrollTo(0,600, {duration:2000})
        cy.get('select[name="region_id"]').select('Buenos Aires')
        cy.get('@modalAddress').scrollTo(0,800, {duration:2000})
        cy.get('select[name="municipio"]').select('General Arenales')
        cy.get('input[type="text"][name="postcode"]').eq(0).type('6027')
        cy.get('input[type="text"][name="telephone"]').type('+5494845132')
        cy.get('input[type="text"][name="address_ext_number"]').type('42')
        cy.wait(1000)
        cy.scrollTo('top', {duration:3000})
        cy.get('.page-actions > #save').click()
        cy.get('div[data-index="city_id"].admin__field.required > .admin__field-control select').select('Ferre')
        cy.scrollTo('top', {duration:3000})
        cy.get('.page-actions > #save').click()
    })

    it('Agregar Store Credit', () => {
        cy.wait(10000)
        cy.searchCustomerByEmail('brdionel.test@gmail.com') 
        cy.wait(2000)
        cy.scrollTo(0,500, {duration:4000})
        cy.wait(1000)
        cy.get('#tab_customerbalance_content').click()

        cy.get('.fieldset-wrapper-title .title')
            .should('contain', 'Store Credit Balance')

        cy.scrollTo(0,400, {duration:4000})
        cy.get('#_customerbalanceamount_delta').type('150.00')
        cy.scrollTo('bottom', {duration:3000})
        cy.get('#save_and_continue').click()
        
        cy.wait(2000)
        cy.get('#messages > .messages > .message > div')
            .should('contain', 'You saved the customer.')
        
        cy.scrollTo(0,700, {duration:4000})
        cy.get(':nth-child(3) > #balanceGrid > .admin__data-grid-header > .admin__data-grid-header-row > .admin__control-support-text')
            .should('contain', '1 records found')
    })

    it('Reward Points', () => {
        cy.wait(10000)
        cy.searchCustomerByEmail('brdionel.test@gmail.com') 
        cy.wait(2000)
        cy.scrollTo(0,800, {duration:4000})
        cy.wait(1000)
        cy.get('#tab_customer_edit_tab_reward_content').click()

        cy.get('[data-area-active="true"] > .admin__scope-old > .fieldset-wrapper > .fieldset-wrapper-title > .title')
            .should('contain', 'Reward Points Balance')
        
        cy.scrollTo(0,500, {duration:3000})
        cy.get('#reward_points_delta').type('300')
        cy.get('#save_and_continue').click()
        cy.wait(2000)

        cy.get('#messages > .messages > .message > div')
            .should('contain', 'You saved the customer.')
    })
})