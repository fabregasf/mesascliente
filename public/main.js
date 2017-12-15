$(function() {
  

  $( "a#novo" ).on( "click", function() {
      console.log( "novo pedido" );       
      $('#modalpedidos').modal('show');
  });
  

  // Initialize variables
  var $window = $(window);
  // botao novo  
  var $novo = $('.confirmapedido'); 
  // botao chama atenção 
  var $chamaatencao = $('#chamar');  
  // botao fechar 
  var $fechar = $('#fechar');  
  // Painel de pedidos, onde vão cada pedido feito e retornado pelo server
  var $panelpedidos = $('#painelpedidos'); 


  // body da tela 
  var $loginPage = $('#geral');    
  var socket = io();
  
  var socket = io.connect('http://192.168.1.7:3000');
  socket.on('connect', function(data) {
      console.log("conectado !");
  });


  
  // ** Eventos

  // Clique botão novo
  $novo.click(function () {
    
    
    var qtdesuco = $(".combobox").val();
    var mesasuco = $(".combobox2").val();
    var qtdebolo = $(".combobox3").val();
    var mesabolo = $(".combobox4").val();
    
    var dados = [qtdesuco, mesasuco, qtdebolo, mesabolo];
    
    // Remove o listener anterior pra não ficar duplicado a requisição
    socket.removeListener('novo pedido');
    // Envia pra todos via socket
    socket.emit('novo pedido', dados);

    // Callback do cliente recebendo os dados de retorno do servidor
    // Todo cliente receberá, inclusive o que irá receber os dados de broadcast
    socket.on('novo pedido', function (data) {
      console.log("Dados retorn do servidor apos o envio: "+JSON.stringify(data));
      


      // Mostrando na tela de pedidos
      var tag = "<div class=\"well\" style=\"margin-left: 5%; width: 90%\">";
      tag += qtdesuco + " suco(s) na mesa " + mesasuco + ". <br>"+ qtdebolo + " bolo(s) na mesa "+ mesabolo; 

      $panelpedidos.append(tag)
      $('#modalpedidos').modal('hide');


    });

    console.log(dados);

  });

  // Clique botão atenção
  $chamaatencao.click(function () {
    //$currentInput.focus();
    console.log("chama atenção clicou");
  });

  
  
  

});