describe('Products page', () => {
    it('redirecciona al Home si el logeo es Exitoso', () => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email').type('user1@mystore.com')
        cy.get('#password').type('password')
        cy.get('button.is-danger').click()
        cy.get('#navbarMenu').contains('Usuario')
    })       
})