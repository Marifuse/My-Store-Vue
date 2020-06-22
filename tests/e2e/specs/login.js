// Testeo del Login
describe('Products page', () => {
  it('redirecciona al Home si el logeo es Exitoso', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('#email').type('maria.fuenzalida.serrano@gmail.com')
    cy.get('#password').type('acab2020')
    cy.get('button.is-danger').click()
    // cy.get('#navbarMenu').contains('Usuario')
  })       
})