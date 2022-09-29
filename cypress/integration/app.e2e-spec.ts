describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Cars World')
    cy.contains('Cars World')
  })
})
