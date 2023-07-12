describe('Note app',function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user = {
      username : "testing" ,
      name : "testing" ,
      password : "testing"
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')  
  });

  it('front page can be opened', function(){
    cy.contains('Notes')
    cy. contains('Note app, Department of Computer Science, University of Helsinki 2023')
  });

  it('login form can be opened',()=>{
    cy.contains('log in').click()
  });
  
  it.only('login fails with wrong password', function (){
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    cy.get('.error').contains('wrong credentials')
  })

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
      cy.login({username : 'testing', password : 'test'})

    })
    it('a new note can be created',function(){
      cy.contains('new note').click()
      cy.get('input').type('This is the note from testing')
      cy.contains('save').click()
      cy.contains('This is the note from testing')
    })
  })
})