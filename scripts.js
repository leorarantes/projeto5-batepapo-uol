let userName = {
    name: ""
}


function getUserName() {
    const name = document.querySelector(".input-name").value;
    userName.name = name;

    setTimeout(loadingRegister, 500);

    setTimeout(sendNameToServer, 2000);

    setInterval(verifyUserStatus, 4900);

    setTimeout(loadingChat, 6200);

    setTimeout(renderizeChat, 8200);

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


function treatSuccess(answer) {
    const statusCode = answer.status;
    console.log(statusCode);
}


function treatError(answer) {
    const error = document.querySelector("body");
    error.innerHTML = `
        <a class="warning-text">O nome de usuário informado já está em uso, tente novamente!</a>
        <script src="scripts.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`;
    setTimeout(reloadPage, 3000);
}

function verifyUserStatus() {
    const userStatusPromise = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', userName);
    userStatusPromise.then(treatSuccess);
    userStatusPromise.catch(treatError);
}

function reloadPage() {
    window.location.reload();
}

function sendNameToServer() {
    const registerPromise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', userName);
    registerPromise.then(treatSuccess);
    registerPromise.catch(treatError);
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
        <ul class="chat">
            <li class="status">
            <a class="time">(09:21:45)</a><a class="who">João</a><a>entra na sala...</a>
            </li>
            <li>
            <a class="time">(09:21:45)</a><a class="who">João</a><a>para</a> <a class="who">João:</a><a>oi</a>
            </li>
            <li>
            <a class="time">(09:21:45)</a><a class="who">João:</a><a>para</a><a class="who">João:</a><a>oi</a>
            </li>
            <li class="private">
            <a class="time">(09:21:45)</a><a class="who">João:</a><a>para</a><a class="who">João:</a><a>oi</a>
            </li>
        <ul>
    </main>
    <footer>
        <input type="text" placeholder="Escreva aqui..." class="input-box">
        <ion-icon name="paper-plane-outline" class="send"></ion-icon>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="scripts.js"></script>`;
}