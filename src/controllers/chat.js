const { emit } = require("../../config/server");

module.exports.chat = (req,res,server) => {
    
    const dadosForm = req.body;


    console.log(dadosForm.apelido.length);
    // validação 
    if(dadosForm.apelido==='' || ( dadosForm.apelido.length < 3 || dadosForm.apelido.length >15) ){
        
        console.log("erro");
        const msgErr = 'Informe o nome ou apelido valido'
        
        res.render('./index.ejs', {validacao:msgErr})
        return;
    }
    

    server.get('io').emit('msgParaCliente',{
        apelido:dadosForm.apelido,
        msg:"acabou de entrar no char!"
    })

    res.render('./chat.ejs', {dadosForm:dadosForm})
}