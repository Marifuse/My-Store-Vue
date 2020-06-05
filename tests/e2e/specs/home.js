describe('Landing Page', () => {
    it('Toggles the hamburger button', () => {
        cy.viewport('iphone-6')
        cy.visit('/')
        cy.get('#navbarMenu').should('not.have.css', 'display', 'block')
    })
})