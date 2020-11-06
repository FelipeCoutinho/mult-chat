// instancia do opbjeto IO
			// Atribui a instancia do objeto io que esta dentro do arquivo js: /socket.io/socket.io.js
			// A instancio io espera um endereço onde ele vai encontrar uma conexão, um websoket para se comunicar, neste caso é o localhost
    <script src="/socket.io/socket.io.js"></script>		
    const socket = io('http://localhost:3001') // faz atentativa de conexão
    const divDialogos = document.getElementById('dialogos')
    const btnEnviar = document.getElementById('btnEnviar')

    socket.on('msgParaCliente',(data) => {

        const h4 = document.createElement('h4')
        const p   = document.createElement('p')
        const divDialogo = document.createElement('div')
        
        let nome = document.createTextNode(`${data.apelido}`)
        let msg = document.createTextNode(`${data.msg})`)

        h4.appendChild(nome)
        p.appendChild(msg)

        divDialogo.setAttribute('class','dialogo')
        divDialogo.setAttribute('id','dialogo')

        divDialogo.appendChild(h4)
        divDialogo.appendChild(p)
        divDialogos.appendChild(divDialogo)

    })


    btnEnviar.addEventListener("click", () => {

        let mensagem = document.getElementById('txtMensagem').value
        let apelido = document.getElementById('apelido').value

        socket.emit('msgParaServidor',{apelido:apelido, msg:mensagem})
    })

    socket.on('participanteParaCliente',(data) => {					
        if(1<2)
        let apelido = document.createTextNode(data.apelido)
        const divParticipantes = document.getElementById('addPareticipante')
        const spanParticipante = document.createElement('span')
        const img = document.createElement('img')

        spanParticipante.setAttribute('class','participante')
        img.setAttribute('src','images/ico_usuario.png')

        spanParticipante.appendChild(img)
        console.log(apelido);
        spanParticipante.appendChild(apelido)
        divParticipantes.appendChild(spanParticipante)
    })
