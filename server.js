var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usuarios = {};
var conexoes = {};

app.get('/', function(req, res){
    res.send('servidor de boas');
    
});

// Roteamento pra pasta certa: public
app.use(express.static(path.join(__dirname, 'public')));


//SocketIO vem aqui
http.listen(3000, function(){
    console.log('servidor de boas on port 3000');
});

io.sockets.on('connection', function(socket){
    // adiciona conexao
    //conexoes.push(socket);
    //console.log('Conectado: %s sockets conectados', conexoes.length);
    console.log("Mais um conectado... ");

    // Disconecta do servidor
    socket.on('disconnect', function(data){
        //conexoes.splice(conexoes.indexOf(socket), 1);
        //console.log('Disconectado: %s sockets conectados', conexoes.length);
        console.log("Mais um desconectado... ");
    });

    // Novo pedido recebido 
    socket.on('novo pedido', function (data) {
        console.log("Enviados pro servidor (servidor recebendo)"+data);
        // Envia msg de confirmação pra todos conectados no no servidor com o dado enviado pelo pc 
        // que enviou a solicitação
        socket.broadcast.emit('novo pedido', {
          message: data
        });


    });   
});
