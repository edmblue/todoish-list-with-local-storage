/* Variables */

const formulario = document.querySelector('#formulario');
const tweetTextArea = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

/* Event Listeners */

callEventListeners();
function callEventListeners() {
  formulario.addEventListener('submit', agregarTweet);
  document.addEventListener('DOMContentLoaded', recargarTweets);
}
/* Funciones */

function recargarTweets() {
  const tweetsObtenidos = JSON.parse(localStorage.getItem('tweets') || '[]');
  tweets = tweetsObtenidos;
  mostrarHTML(tweets);
}

function agregarTweet(e) {
  e.preventDefault();

  let tweet = tweetTextArea.value;

  if (tweet == '') {
    mostrarError('El campo no puede estar Vacio');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  formulario.reset();

  tweets = [...tweets, tweetObj];

  mostrarHTML(tweets);
}

function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function mostrarError(mensajeDeError) {
  const vacioRow = document.createElement('p');
  vacioRow.classList.add('error');
  vacioRow.textContent = mensajeDeError;
  formulario.appendChild(vacioRow);
  setTimeout(() => vacioRow.remove(), 1500);
}

function mostrarHTML(elementosAMostrar) {
  limpiarHTML();
  if (elementosAMostrar.length > 0) {
    elementosAMostrar.forEach((elemento) => {
      const eliminarBtn = document.createElement('a');
      eliminarBtn.classList.add('borrar-tweet');
      eliminarBtn.textContent = 'X';
      eliminarBtn.onclick = () => {
        eliminarTweet(elemento);
      };

      const { id, tweet } = elemento;
      tweetRow = document.createElement('li');
      tweetRow.id = id;
      tweetRow.textContent = tweet;
      tweetRow.appendChild(eliminarBtn);
      listaTweets.appendChild(tweetRow);
    });
  }

  sincronizarStorage();
}

function eliminarTweet(tweetAEliminar) {
  const tweetsActualizadosEliminados = tweets.filter(
    (tweet) => tweet.id !== tweetAEliminar.id
  );
  tweets = tweetsActualizadosEliminados;
  mostrarHTML(tweets);
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
