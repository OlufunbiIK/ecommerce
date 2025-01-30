/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
const socket = io('http://localhost:3004');

const message = document.getElementById('message');
const messages = document.getElementById('messages');

function handleSubmitNewMessage() {
  socket.emit('message', { data: message.value });
}
socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};
function buildNewMessage(message) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
}
