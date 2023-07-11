describe('Note app',function(){
  beforeEach(function(){
    cy.visit('http://localhost:3000')  
  });

  it('front page can be opened', function(){
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  });

  it('login form can be opened',()=>{
    cy.contains('log in').click()
  });
  it('user can login',function (){
    cy.contains('log in').click()
    cy.get('#username').type('username')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('name logged in')
  })
  describe('user when logged in',function() {
    beforeEach(function(){
      cy.contains('log in').click()
      cy.get('input:first').type('username')
      cy.get('input:last').type('password')
      cy.get('#login-button').click()
    })
    it('a new note can be created',function(){
      cy.contains('new note').click()
      cy.get('input').type('This is the note from testing')
      cy.contains('save').click()
      cy.contains('This is the note from testing')
    })
  })
})