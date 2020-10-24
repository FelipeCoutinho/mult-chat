const server = require('express')()
const socket = require('socket.io')
const bodyparser = require('body-parser')
const { static } = require('express')

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
    
    //faz com que o servidor responda dois protocolos diferentes na mesma porta 
    socket.listen(servidor)

module.exports = server