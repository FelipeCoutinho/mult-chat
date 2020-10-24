module.exports.chat = (req,res,app) => {
    
    const {apelido} = req.body;
    const Apelido = apelido

    console.log(Apelido.length);

    if(Apelido==='' || ( Apelido.length <3 || Apelido.length >15) ){
        
        console.log("erro");
        const msgErr = 'Informe o nome ou apelido valido'
        
        res.render('./index.ejs', {validacao:msgErr})
        return;
    }
       
    res.render('./chat.ejs')


}