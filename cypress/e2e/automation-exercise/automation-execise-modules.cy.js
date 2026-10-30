/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/index.js');
const login = require('../../modules/login/index.js');
const produto = require('../../modules/produto/index.js');
const home = require('../../modules/home/index.js');
const carrinho = require ('../../modules/carrinho/index.js');

describe('Automation Exercise', () => {

  it('Cadastrar um novo usuário com sucesso', () => {
    // ARRANGE
    cadastro.acessarPaginaCadastro();

    // ACT
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`);

    cadastro.preencherCadastro();

    // ASSERT
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();

  });

  it('Efetuar Login de usuário com email e senha corretos', () => {
    // ARRANGE
    login.acessarPaginaDeLogin();

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345');

    // ASSERT
    login.verificarSeLoginFoiEfetuadoComSucesso();
    
  });

  it('Efetuar Login de usuário email e senha INCORRETOS', () => {
    // ARRANGE
    login.acessarPaginaDeLogin();

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '54321');
    
    // ASSERT
    login.verificarSeMensagemDeErroFoiExibidaNoLogin();

  });

  it('Efetuar Logout', () => {
    // ARRENGE
    login.acessarPaginaDeLogin();

    // ACT
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345');

    login.efetuarLogout();

    // ASSERT
    login.verificarSeOUsuarioFoiDeslogado();


  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    // ARRANGE
    cadastro.acessarPaginaCadastro();

    // ACT
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1791030872114@mail.com`);

    // ASSERT
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();

  });

  it('Verificar todos os produtos e página de detalhes do produto', () => {
    // ARRENGE 
    produto.acessarPaginaDeProdutos();

    // ACT 
    produto.acessarPaginadeDetalhesDoProduto(1);

    // ASSERT 
    produto.verificarSeDetalhesDoProdutoAparecemNaTela();
  });
  
  it('Pesquisar produto', () => {
    // ARRENGE
    const produtoPesquisado = 'Tshirt';
    produto.acessarPaginaDeProdutos();

    // ACT
    produto.pesquisarProdutoPeloNomeNaBarraDePesquisa(produtoPesquisado);

    // ASSERT
    produto.verificarSeEstaNaPaginaComProdutoPesquisado(produtoPesquisado);
  });

  it('Verificar a assinatura na página inicial', () => {
    // ARRENGE
    home.acessarPaginaInicial();

    // ACT
    home.realizarAssinatura(`pgats-aut-test-${Date.now()}@mail.com`);

    // ASSERT
    home.verificarSeMensagemDeSucessoAOAssinar();
  });

  it('Fazer pedido se registrando antes do checkout', () => {
    // ARRENGE
    cadastro.acessarPaginaCadastro();
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`);
    cadastro.preencherCadastro();
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    cadastro.retornarAPaginaInicialComOBotaoContinue();

    // ACT
    home.adicionarProdutoDaListaAOCarrinho(1);
    home.adicionarProdutoDaListaAOCarrinho(2);
    home.adicionarProdutoDaListaAOCarrinho(3);

    home.acessarPaginaDeCarrinho();
    carrinho.prosseguirParaFinalizarCompra();
    carrinho.adicionarDescricaoNoPedido('texto com descrição do pedido');
    carrinho.finalizarCompra();

    // ASSERT
    carrinho.verificarMensagemDeSucessoAOFinalizarCheckout();

  });

  it('Fazer pedido fazendo login antes de finalizar a compra', () => {
    // ARRENGE
    login.acessarPaginaDeLogin();
    login.preencherLogin('pgats-aut-test-1791030872114@mail.com', '12345');

    // ACT
    home.adicionarProdutoDaListaAOCarrinho(1);
    home.adicionarProdutoDaListaAOCarrinho(2);
    home.adicionarProdutoDaListaAOCarrinho(3);

    home.acessarPaginaDeCarrinho();
    carrinho.prosseguirParaFinalizarCompra();
    carrinho.adicionarDescricaoNoPedido('texto com descrição do pedido');
    carrinho.finalizarCompra();

    // ASSERT
    carrinho.verificarMensagemDeSucessoAOFinalizarCheckout();
  });

});
