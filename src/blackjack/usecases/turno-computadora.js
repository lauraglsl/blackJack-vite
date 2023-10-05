import {determinarGanador} from './determinar-ganador'
import {pedirCarta} from './pedir-carta'
import {acumularPuntos} from '../index'
import {crearCarta} from '../index'

export const turnoComputadora = (puntosMinimos, deck, puntosJugadores) => {

    let puntosComputadora = 0;
  
    do {
      const carta = pedirCarta(deck);
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
  
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
  
    determinarGanador(puntosJugadores);
  }
  