'use strict';
/*<!-- Předloha zprávy -->
				<div class="card mt-3 mb-3">
					<div class="card-body">
						<h5 class="card-title">
							{Jméno}
							<small class="text-muted">{Datum}</small>
						</h5>
						<p class="card-text">{Zpráva}</p>
					</div>
				</div>
        <!-- Konec předlohy -->
        */

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */



const messagesElement = document.querySelector('#messages');

/* 1. Doplňte tělo funkce `renderMessage`. Jejím úkolem bude vracet HTML jedné zprávy podle předlohy, kterou najdete v `index.html`. Správné chování můžete vyzkoušet například výpisem do konzole pomocí `console.log(renderMessage('Pavel', 'Ahoj 👋', '11. 5. 2020 17:30:00'))`. */

const renderMessage = (name, message, date) => {
  // @TODO: funkce vracející HTML zprávy
  const helperElm = document.createElement("div");
  helperElm.innerHTML =
    `<div class="card mt-3 mb-3">
  <div class="card-body">
    <h5 class="card-title">
      ${name}
      <small class="text-muted">${date}</small>
    </h5>
    <p class="card-text">${message}</p>
  </div>
</div>`
  return helperElm.children[0];
};

const renderMessages = (messages) => {
  // @TODO: funkce vypisující zprávy na stránku
  messagesElement.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    messagesElement.appendChild(renderMessage(messages[i].name, messages[i].message, messages[i].date));
  }

};
let lastUpdate = 0;
const updateMessages = () => {
  // @TODO: funkce stahující zprávy ze server a přidávající je na stránku
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then(response => response.json())
    .then(data => {
      if (lastUpdate !== data.lastUpdate) {
        lastUpdate = data.lastUpdate;
        renderMessages(data.messages);
      }
    }
    )
};

setInterval(updateMessages, 2000); // Každé dvě sekundy zavolá updateMessages

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');
const submitButtonElm = document.querySelector('#submit-button');

const onSubmit = (event) => {
  event.preventDefault(); // Zamezí přesměrování na jinou stránku při odesílání formuláře

  submitButtonElm.setAttribute('disabled', true);
  // @TODO: odešli zprávu na server
  fetch('https://czechichat.herokuapp.com/api/send-message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      message: messageInputElement.value,
    }),
  })
    .then(() => submitButtonElm.removeAttribute('disabled'))
  messageInputElement.value = '';


};

document.querySelector('#send-form').addEventListener('submit', onSubmit);


