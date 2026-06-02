/**
 * Clase Enemigo - Representa a los oponentes en el RPG
 *
 * Más simple que Personaje: no sube de nivel ni gana experiencia.
 * Solo tiene stats fijos y otorga XP al ser derrotado.
 */
class Enemigo {
  constructor(nombre, vidaMaxima, ataque, defensa, xpOtorgada) {
    if (!nombre || typeof nombre !== 'string') {
      throw new Error('El nombre del enemigo es requerido');
    }
    if (vidaMaxima <= 0) {
      throw new Error('La vida máxima debe ser mayor a 0');
    }
    if (ataque < 0 || defensa < 0) {
      throw new Error('Ataque y defensa no pueden ser negativos');
    }
    if (xpOtorgada < 0) {
      throw new Error('La XP otorgada no puede ser negativa');
    }

    this.nombre = nombre;
    this.vidaMaxima = vidaMaxima;
    this.vidaActual = vidaMaxima;
    this.ataque = ataque;
    this.defensa = defensa;
    this.xpOtorgada = xpOtorgada;
  }

  recibirDanio(danio) {
    if (danio < 0) {
      throw new Error('El daño no puede ser negativo');
    }
    this.vidaActual = Math.max(0, this.vidaActual - danio);
    return this.vidaActual;
  }

  estaVivo() {
    return this.vidaActual > 0;
  }
}

module.exports = Enemigo;
