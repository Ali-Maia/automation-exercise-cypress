function acessarPaginaInicial(){

  cy.visit('https://automationexercise.com/');

}

function realizarAssinatura(email){

  cy.get('#susbscribe_email').type(email);
  cy.get('#subscribe').click();

}

function verificarSeMensagemDeSucessoAOAssinar(){

  cy.get('#success-subscribe')
  .should('be.visible')
  .contains('You have been successfully subscribed!');

}

function adicionarProdutoDaListaAOCarrinho(idProduto){

  cy.get(`.features_items  [data-product-id=${idProduto}]`).first().click();
  cy.get(`[data-dismiss="modal"]`).click();

}

function acessarPaginaDeCarrinho(){
  cy.get('header a[href="/view_cart"]').click();
}

module.exports = {
  acessarPaginaInicial,
  realizarAssinatura,
  verificarSeMensagemDeSucessoAOAssinar,
  adicionarProdutoDaListaAOCarrinho,
  acessarPaginaDeCarrinho,
}