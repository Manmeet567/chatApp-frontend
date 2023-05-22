import io from 'socket.io-client';

const data = JSON.parse(localStorage.getItem('user'));
const token = data.token;
console.log(token)
const socket = io('ws://localhost:8900',{
    auth:{
        token:token
    }
});


export {socket};