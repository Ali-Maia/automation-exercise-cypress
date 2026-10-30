function acessarPaginaDeProdutos(){

  cy.visit('http://automationexercise.com');
  cy.get('a[href="/products"]').click();

}

function acessarPaginadeDetalhesDoProduto(produto){

  cy.get(`a[href="/product_details/${produto}"]`).click();
}

function verificarSeDetalhesDoProdutoAparecemNaTela(){

  cy.get('.product-details')
    .should('exist')
    .should('be.visible');
  
  cy.get('.product-information > h2')
    .contains('Blue Top')
    .should('be.visible');

  cy.get('.product-information > span')
    .contains('Rs. 500')
    .should('be.visible');

  cy.get('.product-information > p > b')
    .contains('Availability')
    .should('be.visible');

  cy.get('.product-information > p > b')
    .contains('Condition')
    .should('be.visible');

  cy.get('.product-information > p > b')
    .contains('Brand')
    .should('be.visible');
  
}

function pesquisarProdutoPeloNomeNaBarraDePesquisa(produtoPesquisado){

  cy.get('#search_product').type(produtoPesquisado);
  cy.get('#submit_search').click();
}

function verificarSeEstaNaPaginaComProdutoPesquisado(produtoPesquisado){

  cy.url().should('include', `search=${produtoPesquisado}`);

  cy.get('.productinfo > p').each(($el) =>{

    const nomeProduto = $el.text().toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
    const nomePesquisado = produtoPesquisado.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');

    expect(nomeProduto).to.include(nomePesquisado);
  }).should('be.visible');
}

module.exports = {
  acessarPaginaDeProdutos,
  acessarPaginadeDetalhesDoProduto,
  verificarSeDetalhesDoProdutoAparecemNaTela,
  pesquisarProdutoPeloNomeNaBarraDePesquisa,
  verificarSeEstaNaPaginaComProdutoPesquisado,
}