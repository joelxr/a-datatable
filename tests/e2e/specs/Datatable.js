describe('Datatable', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it('Sorting by name', () => {
    cy.get('#NameColumn').click()
    cy.get('#NameColumn').should('have.class', 'descending')
    cy.get('#NameColumn').click()
    cy.get('#NameColumn').should('have.class', 'ascending')
  })

  it('Sorting by description', () => {
    cy.get('#DescriptionColumn').click()
    cy.get('#DescriptionColumn').should('have.class', 'descending')
    cy.get('#DescriptionColumn').click()
    cy.get('#DescriptionColumn').should('have.class', 'ascending')
  })

  it('Sorting by date', () => {
    cy.get('#DateColumn').click()
    cy.get('#DateColumn').should('have.class', 'ascending')
    cy.get('#DateColumn').click()
    cy.get('#DateColumn').should('have.class', 'descending')
  })

  it('Sorting by amout', () => {
    cy.get('#AmountColumn').click()
    cy.get('#AmountColumn').should('have.class', 'descending')
    cy.get('#AmountColumn').click()
    cy.get('#AmountColumn').should('have.class', 'ascending')
  })

  it('Filtering by name', () => {
    cy.get('#Name').type('Kyra Lester')
    cy.contains('#Name-0-Cell', 'Kyra Lester')
  })

  it('Filtering by description', () => {
    cy.get('#Description').type('dui')
    cy.contains('#Description-0-Cell', 'dui')
  })

  it('Filtering by date', () => {
    cy.get('#DateMin').type('2017-07-11')
    cy.get('#DateMax').type('2018-07-13')
    cy.get('#Date-0-Cell').should('be.visible')
  })

  it('Filtering by amount', () => {
    cy.get('#AmountMin').type('100')
    cy.get('#AmountMax').type('200')
    cy.get('#Amount-0-Cell').should('be.visible')
  })

  it('Click on edit button', () => {
    cy.get('#Description-0-EditButton').click()
    cy.get('#Description-0-Edit').should('be.visible')
    cy.get('#Description-0-SaveButton').should('be.visible')
    cy.get('#Description-0-CancelButton').should('be.visible')
  })

  it('Edit a description', () => {
    cy.get('#Description-0-EditButton').click()
    cy.get('#Description-0-Edit').clear()
    cy.get('#Description-0-Edit').type('THIS IS A TEST!')
    cy.get('#Description-0-SaveButton').click()
    cy.get('#Description-0-Edit').should('not.be.visible')
    cy.contains('#Description-0-Cell', 'THIS IS A TEST')
  })
})


