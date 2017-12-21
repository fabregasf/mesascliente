
/* ** Função JS que envia os dados de pedido pro BD Firebase 
  
*/

$(function() {
  
  
  $( "button#novo" ).on( "click", function() {
      console.log( "novo pedido" );       
      $('#modalpedidos').modal('show');
  });
  

  // botao novo  
  var $novo = $('.confirmapedido'); 
   // botao fechar 
  var $fechar = $('#fechar');  
  // Painel de pedidos, onde vão cada pedido feito e retornado pelo server
  var $panelpedidos = $('#painelpedidos'); 


  // body da tela 
  var $loginPage = $('#geral');    
  var socket = io();
  
  var socket = io.connect('http://localhost:3000');
  socket.on('connect', function(data) {
      console.log("conectado !");
  });

  
  // Initialize Firebase
  var config = {
        apiKey: "AIzaSyCKftxQJNjQhaMMfVFJoGY7-55zLNq_gPM",
        authDomain: "mesas-d9683.firebaseapp.com",
        databaseURL: "https://mesas-d9683.firebaseio.com",
        projectId: "mesas-d9683",
        storageBucket: "mesas-d9683.appspot.com",
        messagingSenderId: "86517436731"
  };
  firebase.initializeApp(config);

  // Limpa painel pedidos
  $('#painelpedidos').val('');
      
       
  // raiz json do banco, com todos os registros
  const dfRefobject = firebase.database().ref().child('painelpedidos');


  dfRefobject.once("value").then(function(snapshot) {

  console.log("Valor: "+JSON.stringify(snapshot.val()));  

  var json = JSON.stringify(snapshot.val());
  var contador = 0;

  $.each(JSON.parse(json), function (index, value) {
    console.log(index + " - "+ JSON.stringify(value));
            
    var itemjson = JSON.stringify(value);

    var tag = "<div class=\"well well-lg\" style=\"width: 80%; margin-left: 5%;\">";
    tag += "Pedido id: " + (contador+1) + "<br>";
             
    // Percorre posições no array de cada item
    $.each(JSON.parse(itemjson), function (index, value) {
             if(value != ""){
              if(index == "mesasuco"){
                    index = "Destino: mesa";}
              if(index == "qtdesuco"){
                    index = "Quantidade: ";}
              if(index == "saborsuco"){
                    index = "Sabor: ";}
              if(index == "tiposuco"){
                    index = "Taça ou Jarra: ";}


                  tag += index+" "+value+"<br>";
              }


    });
    tag += "<br><button type=\"button\" class=\"btn btn-default btn-sm\">";
            tag += "<span class=\"glyphicon glyphicon-ok\" style=\"color: green;\"></span> Finalizar Pedido ";
            tag += "</button>&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-default btn-sm\">";
            tag += "<span class=\"glyphicon glyphicon-trash\" style=\"color: red;\"></span> Cancelar Pedido</button>";
            tag += "</div>";
    tag += "</div>";
    $('#painelpedidos > div').hide();
    $('#painelpedidos').append(tag);
    $('#painelpedidos > div').show('slow');

    contador++; 
  });
        console.log(contador +" registros no banco");

    });

  // ** Eventos

  // Clique botão novo
  $novo.click(function () {
    
    
    var qtdesuco = $(".combobox option:selected").text();
    var mesasuco = $(".combobox2 option:selected").text();
    var qtdebolo = $(".combobox3 option:selected").text();
    var saborbolo = $(".combobox6 option:selected").text();
    var saborsuco = $(".combobox5 option:selected").text();
    var tiposuco = $("input#tiposuco:checked").val();

    console.log("Tiposuco: "+tiposuco);
    var dados = [];

    if(qtdesuco != "" && saborsuco != "")
        dados[0] = qtdesuco+" sucos de "+saborsuco+" - "+tiposuco+ " <br>";
    if(saborbolo != "" && qtdebolo != "")
        dados[1] = qtdebolo+" bolos de "+saborbolo+"<br>";    
    if(mesasuco != "")
        dados[2] = " Destino: mesa "+mesasuco; 
    

    // Remove o listener anterior pra não ficar duplicado a requisição
    socket.removeListener('novo pedido');
    // Envia pra todos via socket 
    socket.emit('novo pedido', dados);

    // Callback do cliente recebendo os dados de retorno do servidor
    // Todo cliente receberá, inclusive o que irá receber os dados de broadcast
    socket.on('novo pedido', function (data) {
      console.log("Dados retorn do servidor apos o envio: "+JSON.stringify(data));
      
    });

    // Mostrando na tela de pedidos
    /*var tag = "<div class=\"well well-lg\" style=\"width: 80%; margin-left: 5%;\">";
    tag += dados;
    tag += "</div>";
      
    $panelpedidos.append(tag);*/

    const testeobjeto = document.getElementById('painelpedidos');

    // raiz json
    const dfRefobject = firebase.database().ref().child('painelpedidos');
    

    // valor do campo
    dfRefobject.on('value', snap => console.log(snap.val()));
    // mudar aqui, receber
    dfRefobject.push({qtdesuco: qtdesuco, mesasuco: mesasuco, qtdebolo: qtdebolo, saborbolo: saborbolo, saborsuco: saborsuco
      , tiposuco: tiposuco});
    $('#modalpedidos').modal('hide');
    location.reload();
  });

  // Clique botão atenção
  $fechar.click(function () {
    //$currentInput.focus();
    console.log("fechar mesa");
  });

  
  
  

});