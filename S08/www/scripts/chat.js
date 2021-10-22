import IOEVENTS from '../../io-events.js';

const socket = io();

$(document).ready(() => {
    $('#btnSend').click(() => {
        const message = {
            text: $('#txtMessage').val(),
        };
        $('#txtMessage').val('');
        socket.emit(IOEVENTS.SEND_MESSAGE, message);
    });

    $('#txtMessage').keypress((e) => {
        //.preventDefault();
        console.log(e);
        if (e.keyCode === 13) {
            const message = {
                text: $('#txtMessage').val(),
            };
            $('#txtMessage').val('');
            socket.emit(IOEVENTS.SEND_MESSAGE, message);
        }
    });

    $('#btnUpdateUsername').click(() => {});
});

//TODO: Réceptions des évenement
socket.on(IOEVENTS.NEW_MESSAGE, (message) => {
    console.log(message);
    const isFromMe = socket.id === message.socketId;
    const messageLi = createMessageUI(message, isFromMe);

    $('#chat-messages').append(messageLi);
});

function createMessageUI(message, isFromMe) {
    let messageLi = '';

    if (isFromMe) {
        messageLi = `<li class="chat-left">
                <div class="chat-avatar">
                <img src="" alt="">
                <div class="chat-name">${message.socketId}</div>
                </div>  
                <div class="chat-text">${message.text}</div>
                <div class="chat-hour">${message.timestamp}<span class="fa fa-check-circle"></span></div>
            </li>`;
    } else {
        messageLi = `<li class="chat-right">
                <div class="chat-hour">${message.timestamp}<span class="fa fa-check-circle"></span></div>
                <div class="chat-text">${message.text}</div>
                <div class="chat-avatar">
                    <img src="" alt="">
                    <div class="chat-name">${message.socketId}</div>
                </div>
            </li>`;
    }

    return messageLi;
}

function createUserUI(user) {
    const userLi = `<li class="person" data-chat="ID">
            <div class="user">
                <img src="" alt="">
            </div>
            <p class="name-time">
                <span class="name">NAME</span>
            </p>
        </li>`;

    return userLi;
}
