let botMessageIdx = 0;

document.getElementById('userInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = document.querySelector('#userInput').value.trim();
  if(message === "") return;

  appendMessage(message, "user");
  document.querySelector('#userInput').value = "";

  setTimeout(() => {
    const botResponse = ["Hello !", "I'm good", "Just chilling :)", "Try F.R.I.E.N.D.S", "See you :)"];
    if(botMessageIdx === botResponse.length) botMessageIdx = 0;
    appendMessage(botResponse[botMessageIdx++], "bot");
  }, 2000)
}

function appendMessage(message, sender) {
  const chatBox = document.getElementById('chatbox');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerHTML = `${message} <div class="timestamp">${getTime()}</div>`

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}