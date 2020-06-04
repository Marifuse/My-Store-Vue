describe('Products page', () => {
    it('Filters products list', () =>{
        // Visitar el hosting y ver el input y elementos
        cy.visit('/')
        cy.get('.navbar-burger').click()
        cy.get('.column.is-4').should('have.length', 14)

        // Buscar casa
        cy.get('input').type('Casa')
        cy.get('.columns').should('have.length', 1)

        // Buscar un elemento inexistente
        cy.get('input').clear().type('Guitarra')
        cy.get('.column.is-4').should('have.length', 0)
    })

    it('Añade productos al Carrito', () => {
        cy.visit('/')
        cy.get('.navbar-burger').click()
        cy.get('input').clear()
        cy.get('.card button.is-pulled-right.is-danger').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-dark').contains('1')
    })

    it('Elimina Productos del Carrito', () => {
        cy.visit('/')
        cy.get('.navbar-burger').click()
        cy.get('.card button.is-pulled-right.is-danger').first().click()
        cy.get('.navbar-burger').click()
        cy.get('[data-testId="cart"]').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 1)
        cy.get('.modal-card-body').find('button.is-danger.is-small').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 0)
    })
})