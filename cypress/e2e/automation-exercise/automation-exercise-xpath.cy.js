/// <reference types="cypress-xpath"/>

describe('Automation Exercise', () => {
  const password = '12345'

  const openLoginPage = () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click()
  }
  
  const registerUser = () => {
        openLoginPage()
        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut');
        cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`);
        cy.xpath('//*[@data-qa="signup-button"]').click();

        cy.xpath('//*[@id="id_gender2"]').check();

        cy.xpath('//*[@data-qa="password"]').type(password);

        cy.xpath('//*[@data-qa="days"]').select('1');
        cy.xpath('//*[@data-qa="months"]').select('September');
        cy.xpath('//*[@data-qa="years"]').select('1988');

        cy.xpath('//*[@id="newsletter"]').check();
        cy.xpath('//*[@id="optin"]').check();
        cy.xpath('//*[@data-qa="first_name"]').type('PGATS');
        cy.xpath('//*[@data-qa="last_name"]').type('Aut');
        cy.xpath('//*[@data-qa="company"]').type('PGATS');
        cy.xpath('//*[@data-qa="address"]').type('Example Address');

        cy.xpath('//*[@data-qa="country"]').select('United States');
        cy.xpath('//*[@data-qa="state"]').type('California');
        cy.xpath('//*[@data-qa="city"]').type('San Francisco');
        cy.xpath('//*[@data-qa="zipcode"]').type('12345');

        cy.xpath('//*[@data-qa="mobile_number"]').type('999999999');

        cy.xpath('//*[@data-qa="create-account"]').click();
    }

  //Cadastro
    it('Cadastrar um novo usuário com sucesso.', () => {
      openLoginPage();
      registerUser();

    cy.xpath('//*[@data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!');

    cy.xpath('//a[@data-qa="continue-button"]').click();

    cy.xpath('//*[contains(@class, "navbar-nav")]//li[contains(., "Logged in as PGATS Aut")]')
    .should('be.visible');

    cy.xpath('//a[contains(@href, "delete_account")]').click();
    cy.xpath('//h2[@data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain','Account Deleted!');

  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    openLoginPage();

    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com');
    cy.xpath('//*[@data-qa="login-password"]').type('12345');

    cy.xpath('//*[@data-qa="login-button"]').click();

    cy.xpath('//*[contains(@class, "navbar-nav")]//li[contains(., "Logged in as PGATS Aut")]')
  .should('be.visible');

  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    openLoginPage();

    // ACT
    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com');
    cy.xpath('//*[@data-qa="login-password"]').type('54321');

    cy.xpath('//*[@data-qa="login-button"]').click();

    cy.xpath('//form[contains(@action, "login")]//p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!');

  });

  it('Efetuar Logout', () => {
    openLoginPage();

    // ACT
    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com');
    cy.xpath('//*[@data-qa="login-password"]').type('12345');
    cy.xpath('//*[@data-qa="login-button"]').click();

    // assert do login
    cy.xpath('//a[contains(@href, "logout")]')
      .should('be.visible')
      .click();

    cy.xpath('//*[@class="login-form"]//h2').should('be.visible');
    cy.xpath('//a[contains(@href, "logout")]').should('not.exist');
    cy.xpath('//*[contains(@action, "login")]').should('be.visible');
    cy.url().should('include', 'login');

  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    openLoginPage();

    cy.xpath('//*[@data-qa="signup-name"]').type(`PGATS Aut`);
    cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`);

    cy.xpath('//*[@data-qa="signup-button"]').click();

    cy.xpath('//form[contains(@action, signup)]//p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!');

  });

});