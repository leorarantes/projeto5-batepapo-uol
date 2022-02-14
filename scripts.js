let userName = {
    name: ""
}


function getUserName() {
    const name = document.querySelector(".input-name").value;

    if(name !== "") { 
        userName.name = name;

        setTimeout(loadingRegister, 500);

        setTimeout(sendName, 2000);

        setInterval(verifyUserStatus, 4900);

        setTimeout(loadingChat, 6200);

        setTimeout(renderizeChat, 8200);
    }
}


function loadingRegister() {
    const loading = document.querySelector("body");
    loading.innerHTML = `
        <img class="logo-home-page" src="img/logo.png">
        <img class="loading-gif" src="img/spinning-loading.gif">
        <a class="loading-text">Fazendo seu cadastro, aguarde...</a>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="scripts.js"></script>`;
}


function loadingChat() {
    const loading = document.querySelector("body");
    loading.innerHTML = `
        <img class="logo-home-page" src="img/logo.png">
        <img class="loading-gif" src="img/spinning-loading.gif">
        <a class="loading-text">Entrando...</a>
        <script src="scripts.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`;
}


function treatSendNameSuccess(answer) {
    const statusCode = answer.status;
    console.log(statusCode);
}


function treatSendNameError(answer) {
    const error = answer.response.status;
    console.log(error);
    const errorPage = document.querySelector("body");
    errorPage.innerHTML = `
        <a class="warning-text">O nome de usuário informado já está em uso, tente novamente!</a>
        <script src="scripts.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`;
    setTimeout(reloadPage, 3000);
}

function verifyUserStatus() {
    const userStatusRequisition = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', userName);
    userStatusRequisition.then(treatSendNameSuccess);
    userStatusRequisition.catch(treatSendNameError);
}

function reloadPage() {
    window.location.reload();
}

function sendName() {
    const registerRequisition = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', userName);
    registerRequisition.then(treatSendNameSuccess);
    registerRequisition.catch(treatSendNameError);
}


function renderizeChat() {
    const newBody = document.querySelector("body");
    newBody.classList.remove("home-page-background");
    newBody.innerHTML = `
    <header>
    <img class="logo" src="img/logo.png">
    <ion-icon name="people" class="logo-people"></ion-icon>
    </header>
    <main>
        <ul>
        </ul>
    </main>
    <footer>
        <input type="text" placeholder="Escreva aqui..." class="input-box">
        <ion-icon onclick="sendMessage()" data-identifier="send-message" name="paper-plane-outline" class="send"></ion-icon>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="scripts.js"></script>`;

    setInterval(addMessages, 3000);
}

function addMessages() {
    const messagesRequisition = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    messagesRequisition.then(treatAddMessagesSuccess);
    messagesRequisition.catch(treatAddMessagesError);
}

function treatAddMessagesSuccess(answer) {
    let i = 0;
    const messagesArray = answer.data;
    let newUl = document.querySelector("ul");
    newUl.innerHTML = "";
    let messageObject = {
        from: "",
		to: "",
		text: "",
		type: "",
		time: ""
	}

    for(i=70; i<messagesArray.length; i++) {
        messageObject = messagesArray[i];
        if(messageObject.type == "status") {
            newUl.innerHTML += `
                <li class="status">
                    <a class="time">(${messageObject.time})</a><a class="who">${messageObject.from}</a><a>${messageObject.text}</a>
                </li>`;
            const visibleText= document.querySelector("ul:last-child li:last-child a");
            visibleText.scrollIntoView();
        } else if(messageObject.type == "private_message") {
            if(messageObject.to == userName.name) {
                newUl.innerHTML += `
                    <li class="private">
                        <a class="time">(${messageObject.time})</a><a class="who">${messageObject.from}</a><a>para</a> <a class="to">${messageObject.to}:</a><a data-identifier="message" class="text">${messageObject.text}</a>
                    </li>`;
                const visibleText= document.querySelector("ul:last-child li:last-child a");
                visibleText.scrollIntoView();
            }
        } else {
            newUl.innerHTML += `
                <li class>
                    <a class="time">(${messageObject.time})</a><a class="who">${messageObject.from}</a><a>para</a> <a class="to">${messageObject.to}:</a><a data-identifier="message" class="text">${messageObject.text}</a>
                </li>`;
            const visibleText= document.querySelector("ul:last-child li:last-child a");
            visibleText.scrollIntoView();
        }
    }
}

function treatAddMessagesError(answer) {
    const error = answer.response.status;
    console.log(error);
}

function sendMessage() {
    const message = document.querySelector(".input-box").value;
    const messageObject = {
        from: userName.name,
		to: "Todos",
		text: message,
		type: "message",
	}

    if(message !== "") {
        const sendMessageRequisition = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', messageObject);
        sendMessageRequisition.then(treatSendMessageSuccess);
        sendMessageRequisition.catch(treatSendMessageError);
        const eraseInput = document.querySelector("footer");
        eraseInput.innerHTML = `
            <input type="text" placeholder="Escreva aqui..." class="input-box">
            <ion-icon onclick="sendMessage()" name="paper-plane-outline" class="send"></ion-icon>
        `;
    }
}

function treatSendMessageSuccess(answer) {
    const statusCode = answer.status;
    console.log(statusCode);
}

function treatSendMessageError(answer) {
    const error = answer.response.status;
    console.log(error);
}