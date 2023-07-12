describe('Note app',function(){
  beforeEach(function(){
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username : "testing" ,
      name : "testing" ,
      password : "testing"
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users/`,user)
    cy.visit('')  
  });

  it('front page can be opened', function(){
    cy.contains('Notes')
    cy. contains('Note app, Department of Computer Science, University of Helsinki 2023')
  });

  it('login form can be opened',()=>{
    cy.contains('log in').click()
  });
  
  // it.only('login fails with wrong password', function (){
  //   cy.contains('log in').click()
  //   cy.get('#username').type('testing')
  //   cy.get('#password').type('test')
  //   cy.get('#login-button').click()
  //   cy.get('.error').contains('wrong credentials')
  // })

  it('user can login',function (){
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('testing')
    cy.get('#login-button').click()
    cy.contains('testing logged in')
  })



  describe('user when logged in',function() {
    beforeEach(function(){
      // cy.contains('log in').click()
      // cy.get('input:first').type('testing')
      // cy.get('input:last').type('testing')
      // cy.get('#login-button').click()
      cy.login({username : 'testing', password : 'testing'})
    })
    it('a new note can be created',function(){
      cy.contains('new note').click()
      cy.get('input').type('This is the note from testing')
      cy.contains('save').click()
      cy.contains('This is the note from testing')
      cy.createNote({content : 'Hello there', important : true})
    })

    it('one of the notes made important', function() {
      cy.contains('new note').click()
      cy.get('input').type('This is the note from testing')
      cy.contains('save').click()
      cy.contains('This is the note from testing')
      cy.createNote({content : 'Hello there', important : true})
      cy.contains('Hello there').parent().find('button').as('theButton')
    cy.get('@theButton').click()
    cy.get('@theButton').should('contain','make important')
  })

  })

 

})