// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username)
    cy.get('#login').type(password, {log: false})
    cy.get('.action-login').click()
})

Cypress.Commands.add('searchCustomerByEmail', email => {
    cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > #fulltext').clear().type(`${email}{enter}`)
    cy.get('.data-row > :nth-child(4) > .data-grid-cell-content')
        .should('contain', email)

    cy.wait(5000)
    cy.scrollTo(0,100, {duration:2000})
    cy.get('[data-role="grid-wrapper"]')
        .scrollTo('right', {duration: 4000})
    cy.get('.data-grid-actions-cell > .action-menu-item').click()  
})