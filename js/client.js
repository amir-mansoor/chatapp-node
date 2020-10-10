const socket = io("http://localhost:5000")

const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.getElementById("container");
// const userName = document.getElementById("user-name");
var audio = new Audio("ting.mp3");

const append = (message,position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position == "left") {
    audio.play();
  }
}

const name = prompt("Enter your name to join the chat");
socket.emit("new-user-joined", name);

// userName.innerText = name;

socket.on("user-joined", name => {
  append(`${name} has joined the chat`, "right")
});

socket.on("receive", data => {
  append(`${data.name}: ${data.message}`, "left")
});

socket.on("left", name => {
  append(`${name} has left the chat`, "left")
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  if(message.trim() === "") {
    alert("please enter your message");
    return false;
  }
  append(`You: ${message}`, "right")
  socket.emit("send", message);
  messageInp.value = "";
})
