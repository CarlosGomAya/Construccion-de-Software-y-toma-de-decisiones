/**
 * Clase Personaje - Representa al jugador en el RPG
 *
 * Contiene la lógica principal que será objeto de pruebas unitarias:
 * - Recibir daño (vida nunca menor a 0)
 * - Curarse (vida nunca mayor a vidaMaxima)
 * - Verificar si está vivo
 * - Ganar experiencia y subir de nivel
 */
class Personaje {
  constructor(nombre, vidaMaxima, ataque, defensa) {
    if (!nombre || typeof nombre !== 'string') {
      throw new Error('El nombre del personaje es requerido y debe ser un string');
    }
    if (vidaMaxima <= 0) {
      throw new Error('La vida máxima debe ser mayor a 0');
    }
    if (ataque < 0 || defensa < 0) {
      throw new Error('Ataque y defensa no pueden ser negativos');
    }

    this.nombre = nombre;
    this.vidaMaxima = vidaMaxima;
    this.vidaActual = vidaMaxima;
    this.ataque = ataque;
    this.defensa = defensa;
    this.nivel = 1;
    this.experiencia = 0;
  }

  /**
   * Reduce la vida del personaje por la cantidad de daño recibido.
   * La vida nunca baja de 0.
   * @param {number} danio - Cantidad de daño a recibir (debe ser >= 0)
   * @returns {number} Vida actual después del daño
   */
  recibirDanio(danio) {
    if (danio < 0) {
      throw new Error('El daño no puede ser negativo');
    }
    this.vidaActual = Math.max(0, this.vidaActual - danio);
    return this.vidaActual;
  }

  /**
   * Aumenta la vida del personaje. Nunca excede la vida máxima.
   * @param {number} cantidad - Cantidad a curar (debe ser >= 0)
   * @returns {number} Vida actual después de la curación
   */
  curar(cantidad) {
    if (cantidad < 0) {
      throw new Error('La cantidad de curación no puede ser negativa');
    }
    this.vidaActual = Math.min(this.vidaMaxima, this.vidaActual + cantidad);
    return this.vidaActual;
  }

  /**
   * Indica si el personaje sigue vivo.
   * @returns {boolean} true si vidaActual > 0
   */
  estaVivo() {
    return this.vidaActual > 0;
  }

  /**
   * Calcula la experiencia necesaria para subir al siguiente nivel.
   * Fórmula: nivel actual * 100
   * @returns {number} XP requerida para el siguiente nivel
   */
  experienciaParaSiguienteNivel() {
    return this.nivel * 100;
  }

  /**
   * Otorga experiencia y sube de nivel automáticamente si corresponde.
   * @param {number} xp - Experiencia ganada (debe ser >= 0)
   */
  ganarExperiencia(xp) {
    if (xp < 0) {
      throw new Error('La experiencia no puede ser negativa');
    }
    this.experiencia += xp;
    while (this.experiencia >= this.experienciaParaSiguienteNivel()) {
      this.experiencia -= this.experienciaParaSiguienteNivel();
      this.subirNivel();
    }
  }

  /**
   * Sube al personaje un nivel:
   * - vidaMaxima +10
   * - ataque +2
   * - defensa +1
   * - vidaActual se restaura completamente
   */
  subirNivel() {
    this.nivel++;
    this.vidaMaxima += 10;
    this.vidaActual = this.vidaMaxima;
    this.ataque += 2;
    this.defensa += 1;
  }
}

module.exports = Personaje;
