function prosseguirParaFinalizarCompra(){

  cy.contains('.check_out', 'Proceed To Checkout').click();

}

function adicionarDescricaoNoPedido(texto){

  cy.get('#ordermsg textarea').type(texto);

}

function finalizarCompra(){

  cy.get('a[href="/payment"]').click();

  cy.get('[data-qa="name-on-card"]').type('nome no cartão');
  cy.get('[data-qa="card-number"]').type('01234567890123456');
  cy.get('[data-qa="cvc"]').type('0123');
  cy.get('[data-qa="expiry-month"]').type('01');
  cy.get('[data-qa="expiry-year"]').type('2030');

  cy.get('[data-qa="pay-button"]').click();

}

function verificarMensagemDeSucessoAOFinalizarCheckout(){

  cy.get('[data-qa="order-placed"]')
  .should('be.visible')
  .contains('Order Placed!');
}

module.exports = {
  prosseguirParaFinalizarCompra,
  adicionarDescricaoNoPedido,
  finalizarCompra,
  verificarMensagemDeSucessoAOFinalizarCheckout,
}