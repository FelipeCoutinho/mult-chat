const server = require('express')()
const socket = require('socket.io')
const bodyparser = require('body-parser')
const { static } = require('express')
const { on } = require('nodemon')

    const port = 3001
    //Template de views
    server.set('view egnine','ejs')
    server.set('views', './views')

    //boreparser
    server.use(bodyparser.urlencoded({extended:true}))// como é um middhare as funções trabalham dentro do response e do requeste
    
    //Express validator
    // server.use(validationResult, body)

    //Rotas dos arquivos stativos
    server.use(static('./src/public'))
    


    //Inicialização do servidor
    const  servidor = server.listen(port,() =>{
        console.log(`server on - porta: ${port}`);
    })
    
    //faz com que o servidor responda dois protocolos (htttp e websoket) diferentes na mesma porta 
    const io = socket.listen(servidor)
    
    //Criando um variavel global para usar o soket em qualquer parte do sistema 
    server.set('io', io)// o set tambem permite criar variaveis que passarão a existir dentro do servidor

    server.set('porta',`${port}`) //  teste de criação de variaveis globais
    
    //criar a conexão por web socket    
    //  on indica que estamos escutando eventos de conexao 
    // o evento connection é um evento predefinido do socket.io, que é pesquisado quando quando uma tentativa
    // de conexao é feita do lado do cliente
    // sintaxe on(nomeEvento, callback)
     io.on('connection',(soket) => {
        console.log('Usuario connectou');

        soket.on('disconnect',() => {
            console.log('usuario desconectou!');
        })

        soket.on('msgParaServidor',(data) => {
            //dialogo
            // console.log(data.msg);
            soket.emit('msgParaCliente',{apelido: data.apelido, msg:data.msg })
            
            // emite a mensagem em formato broadcast, para todos os participantes conectados ao soket
            soket.broadcast.emit('msgParaCliente',{apelido: data.apelido, msg:data.msg })

            //Participante
            console.log(data.apelidoAtualizado);
            if(parseInt(data.apelidoAtualizado)==0){

                // console.log(data.msg);
                soket.emit('participanteParaCliente',{apelido: data.apelido, apelidoAtualizado:data.apelidoAtualizado})
                
                soket.broadcast.emit('participanteParaCliente',{apelido: data.apelido, apelidoAtualizado:data.apelidoAtualizado})
            }
        })

        
    })
module.exports = server