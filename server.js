var SockJS = require('sockjs-client');
var Stomp = require('stompjs')

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

connect()

function sendMessage(stompClient){
    rl.question("Escreva sua mensagem:  ", function(name) {
        stompClient.send('/topic/qrCode/dev/KA07P9CV00009',{},name);
        console.log('Mensagem enviada');
        sendMessage(stompClient)
    })
}

function connect(){
    const socket = new SockJS('http://172.100.10.58:8800/socket')
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, frame => {

        console.log('Socket is Connected');

        console.log('Listening at \'/topic/qrCode/dev/KA07P9CV00010\'');

        stompClient.subscribe('/topic/qrCode/dev/KA07P9CV00010',resp =>{
            console.log('Message: '+ resp.body);

            sendMessage(stompClient)
    
            
        })
    })
}

