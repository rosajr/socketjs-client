var SockJS = require('sockjs-client');
var Stomp = require('stompjs')
connect()

function connect(){
    const socket = new SockJS('http://172.100.10.58:8800/socket')
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, frame => {

        console.log('Socket is Connected');

        console.log('Listening at \'/topic/qrCode/dev/KA07P9CV00009\'');

        stompClient.subscribe('/topic/qrCode/dev/KA07P9CV00009',resp =>{
            console.log('Message: '+ resp.body);
        })
    })
}

