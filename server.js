var SockJS = require('sockjs-client');
var Stomp = require('stompjs')

const readline = require("readline");
const { stdout } = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const id = 2;


var listenUrl;
var sendUrl;

connect()

function sendMessage(stompClient){
    rl.question("", function(name) {
        stompClient.send(sendUrl,{},`${id}:${name}`);
        stdout.write(name+'✔');
        sendMessage(stompClient)
    })
}

function setDestinationId(stompClient){
    rl.question("Informe o id de destino da mensagem: ", function(response) {
        sendUrl = `/topic/id/${response}`;
        sendMessage(stompClient)
    })
}

function connect(){
    const socket = new SockJS('http://172.100.10.58:8800/socket')
    const stompClient = Stomp.over(socket);

    listenUrl = `/topic/id/${id}`;

    stompClient.connect({}, frame => {

        console.log('Socket is Connected');

        console.log(`Listening at ${listenUrl}`);

        setDestinationId(stompClient)

        stompClient.subscribe(listenUrl,resp =>{
            console.log(`\n ${resp.body}`);
            sendMessage(stompClient)
        })
    })
}

