import _ from 'underscore';

import {crearDeck} from './usecases/crear-deck'
import {pedirCarta} from './usecases/pedir-carta'
import {valorCarta} from './usecases/valor-carta'
import {turnoComputadora} from './usecases/turno-computadora'

import '../../style.css'


let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
  especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = [];

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir'),
  btnDetener = document.querySelector('#btnDetener'),
  btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugadores = document.querySelectorAll('.divCartas'),
  puntosHTML = document.querySelectorAll('small');

// Esta función inicializa el juego 
const inicializarJuego = (numJugadores = 2) => {
  deck = crearDeck(tipos, especiales);

  puntosJugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }

  puntosHTML.forEach(elem => elem.innerText = 0);
  divCartasJugadores.forEach(elem => elem.innerHTML = '');

  btnPedir.disabled = false;
  btnDetener.disabled = false;

}
 // Creación del deck
deck = crearDeck(tipos, especiales);



// Turno: 0 = primer jugador y el último será la computadora
export const acumularPuntos = (carta, turno) => {
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  puntosHTML[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
}

export const crearCarta = (carta, turno) => {

  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`; 
  imgCarta.classList.add('carta');
  divCartasJugadores[turno].append(imgCarta);

}

// Eventos
btnPedir.addEventListener('click', () => {

  const carta = pedirCarta(deck);
  const puntosJugador = acumularPuntos(carta, 0);

  crearCarta(carta, 0);


  if (puntosJugador > 21) {
    console.warn('Lo siento mucho, perdiste');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador, deck, puntosJugadores);

  } else if (puntosJugador === 21) {
    console.warn('21, genial!');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador, deck, puntosJugadores);
  }

});


btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugadores[0], deck, puntosJugadores);
});

btnNuevo.addEventListener('click', () => {

  inicializarJuego();

});

