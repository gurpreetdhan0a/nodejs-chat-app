const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector(".chat-messages");
const displayUsers = document.getElementById('users');
const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})

socket.emit('users', {username});


socket.on('allUsers', ({users}) =>{
    displayAllUsers(users);
});
socket.on("message", message=>{
    updateDomMessage(message);
})

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = e.target.elements.msg.value;
    chatMessage.scrollTop = chatMessage.scrollHeight;
    socket.emit("chatMessage", message);
    e.target.elements.msg.value ='';
    e.target.elements.msg.focus();
})

const updateDomMessage =(message)=>{
    const div = document.createElement('div');
    div.innerHTML = `<div class="message">
    <p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>
</div>`
    chatMessage.append(div);
}

const displayAllUsers = (userArray)=>{
    displayUsers.innerHTML = `${userArray.map(user => `<li>${user.username}</li>`).join('')}`
    
}