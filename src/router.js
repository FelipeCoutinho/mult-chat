const router =  require('express').Router()
const server = require('../config/server')
const controllerIndex =  require('./controllers/index')
const controllerChat =  require('./controllers/chat')



router.get('/',(req,res) => {
    controllerIndex.index(req,res,server)   
})


router.post('/chat',(req,res) => {
    controllerChat.chat(req,res,server)
})

module.exports = router