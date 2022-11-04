//import '/cypress/e2e/integration/blog_app.spec.cy.js'

// Cypress borrowed these ("describe" & "it") parts from the Mocha testing library
//https://mochajs.org/
//Mocha recommends that arrow functions are not used
// # describe('Blog ', () => {
//because they might cause some issues in certain situations
// https://mochajs.org/#arrow-functions
describe('Blog app ', function () {

  // DEBUG
  //https://docs.cypress.io/api/commands/debug#Syntax


  //https://fullstackopen.com/en/part5/end_to_end_testing#running-and-debugging-the-tests
  //Cypress commands are like promises, so if we want to access their return values,
  //we have to do it using the .then() command
  //https://docs.cypress.io/api/commands/then


  beforeEach(function () {

    //Empty the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //Add new user
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    // https://docs.cypress.io/api/commands/visit
    cy.visit('http://localhost:3000')
    //Singel tests name is defined with the "it"-method
    it('Front page can be opened', function () {
      // https://docs.cypress.io/api/commands/contains
      cy.contains('Login')
    })
  })



  // https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors
  // id='foo' <-- cy.get('#foo')
  // className='foo' <-- cy.get('.foo')
  it('Login form is shown', function () {

    //First element from DOM that CONTAINS "login" -label
    //even though it might not be visible (display:none)
    cy.contains('login').click()
    cy.get('#username').type('I can see the login form')
    cy.get('#password').type('I can see the login form')
  })


  describe('Login', function () {

    // it.only('succeeds with correct credentials', function() {
    // '.only' = Cypress will only run the required test
    // When the test is working, '.only' can be remove
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      // <button id="login-button" type="submit">login</button>
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })


    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('buddha')
      cy.get('#password').type('café')
      // <button id="login-button" type="submit">login</button>
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors
      cy.get('#login-button').click()
      // <div className="error">
      // should https://docs.cypress.io/guides/references/assertions#Common-Assertions
      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    })

  })


  describe('When logged in: ', function () {

    beforeEach(function () {
      /*
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
      */


      // On this state log-in should bypass the UI by doing straight
      // HTTP request to the backend
      // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Logging-in
      /*
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai',
        password: 'salainen'
      })
        .then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))

          cy.visit('http://localhost:3000')
        })
      */

      // It is possible to utilizes custom commands
      // https://docs.cypress.io/api/cypress-api/custom-commands
      // import './commands' <-- Cypress.Commands.add('login', ({ username, password }) => {
      cy.login({ username: 'mluukkai', password: 'salainen' })

      cy.visit('http://localhost:3000')

    })



    it('A blog can be created', function () {
      //A new item can be created via UI
      cy.contains('New blog').click()
      cy.get('#blog-input-title').type('Cypress: Title')
      cy.get('#blog-input-author').type('Cypress: Author')
      cy.get('#blog-input-url').type('Cypress: URL')
      cy.get('#create-button').click()

      cy.visit('http://localhost:3000')
      cy.contains('Cypress: Title')
      cy.contains('Cypress: Author')
    })

    it('A blog can be created by passing the UI', function () {
      // A new blog can be created by passing the UI
      // and making straight HTTP request to the backend via custom command
      // https://docs.cypress.io/api/cypress-api/custom-commands
      // import './commands' <-- Cypress.Commands.add('createBlog', ({ title, author, url }) => {
      cy.createBlog({
        title: 'Another Cypress2: Title2',
        author: 'Another Cypress2: Author2',
        url: 'Another Cypress2: URL2'
      })

      cy.visit('http://localhost:3000')
      cy.contains('Another Cypress2: Title2')
      cy.contains('Another Cypress2: Author2')
    })



    describe('...and when a blog exists...', function () {

      beforeEach(function () {

        // A new blog can be created by passing the UI
        // and making straight HTTP request to the backend via custom command
        // https://docs.cypress.io/api/cypress-api/custom-commands
        // import './commands' <-- Cypress.Commands.add('createBlog', ({ title, author, url }) => {
        cy.createBlog({
          title: 'End-to-end testing is done with Cypress',
          author: 'Mika Le Gall',
          url: 'https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22'
        })
        cy.visit('http://localhost:3000')

      })

      it('...it can be liked', function () {

        cy.contains('View').click()
        cy.contains('Likes 0')

        cy.get('#like-button').click()
        cy.contains('Likes 1')

      })

      it('...and it can be delete', function () {
        cy.visit('http://localhost:3000')

        cy.contains('View').click()
        cy.contains('End-to-end testing is done with Cypress')

        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'End-to-end testing is done with Cypress')

      })

      it('...but different user can not delete it', function () {
        cy.get('#logout-button').click()
        //Add new user
        const user = {
          name: 'Timothy Tester',
          username: 'timothy',
          password: 'tester'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.login({ username: 'timothy', password: 'tester' })

        cy.visit('http://localhost:3000')
        cy.contains('View').click()
        cy.get('#remove-button').click()

        cy.visit('http://localhost:3000')
        cy.contains('End-to-end testing is done with Cypress')

      })

      it.only('...blogs are ordered according to likes', function () {

        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'Timon',
          url: 'https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22'
        })

        cy.createBlog({
          title: 'The title with the most likes',
          author: 'Bumba',
          url: 'https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22'
        })

        cy.visit('http://localhost:3000')
        cy.contains('Mika').parent().find('button').as('mikaViewButton')
        cy.get('@mikaViewButton').click()
        cy.contains('Mika').parent().find('#like-button').as('mikaLikeButton')
        cy.get('@mikaLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Bumba').parent().find('button').as('bumbaViewButton')
        cy.get('@bumbaViewButton').click()
        cy.contains('Bumba').parent().find('#like-button').as('bumbaLikeButton')
        cy.get('@bumbaLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Timon').parent().find('button').as('timonViewButton')
        cy.get('@timonViewButton').click()
        cy.contains('Timon').parent().find('#like-button').as('timonLikeButton')
        cy.get('@timonLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Bumba').parent().find('button').as('bumbaViewButton')
        cy.get('@bumbaViewButton').click()
        cy.contains('Bumba').parent().find('#like-button').as('bumbaLikeButton')
        cy.get('@bumbaLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Timon').parent().find('button').as('timonViewButton')
        cy.get('@timonViewButton').click()
        cy.contains('Timon').parent().find('#like-button').as('timonLikeButton')
        cy.get('@timonLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Bumba').parent().find('button').as('bumbaViewButton')
        cy.get('@bumbaViewButton').click()
        cy.contains('Bumba').parent().find('#like-button').as('bumbaLikeButton')
        cy.get('@bumbaLikeButton').click()

        cy.visit('http://localhost:3000')
        cy.contains('Timon').parent().find('button').as('timonViewButton')
        cy.get('@timonViewButton').click()
        cy.contains('Bumba').parent().find('button').as('bumbaViewButton')
        cy.get('@bumbaViewButton').click()
        cy.contains('Mika').parent().find('button').as('mikaViewButton')
        cy.get('@mikaViewButton').click()

        cy.get('.viewAllBlogContent').eq(0).should('contain', 'The title with the most likes')
        cy.get('.viewAllBlogContent').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.viewAllBlogContent').eq(2).should('contain', 'End-to-end testing is done with Cypress')

      })


    })

  })

})