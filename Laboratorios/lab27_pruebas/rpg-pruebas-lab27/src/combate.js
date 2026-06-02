/**
 * Sistema de combate
 *
 * Funciones puras y orquestación de turnos.
 * Estas funciones son ideales para enseñar:
 * - Pruebas unitarias (calcularDanio es función pura)
 * - Pruebas de integración (ejecutarTurno y combateCompleto coordinan varios módulos)
 */

/**
 * Calcula el daño que un atacante hace a un defensor.
 * Fórmula: ataque - defensa, con un mínimo de 1.
 * @param {Object} atacante - Personaje o Enemigo con propiedad ataque
 * @param {Object} defensor - Personaje o Enemigo con propiedad defensa
 * @returns {number} Cantidad de daño calculada (mínimo 1)
 */
function calcularDanio(atacante, defensor) {
  if (!atacante || !defensor) {
    throw new Error('Atacante y defensor son requeridos');
  }
  if (typeof atacante.ataque !== 'number' || typeof defensor.defensa !== 'number') {
    throw new Error('Atacante debe tener ataque y defensor debe tener defensa numéricos');
  }
  const danioBase = atacante.ataque - defensor.defensa;
  return Math.max(1, danioBase);
}

/**
 * Ejecuta un turno de combate: el atacante daña al defensor.
 * @param {Object} atacante
 * @param {Object} defensor
 * @returns {Object} Resumen del turno
 */
function ejecutarTurno(atacante, defensor) {
  const danio = calcularDanio(atacante, defensor);
  defensor.recibirDanio(danio);
  return {
    atacante: atacante.nombre,
    defensor: defensor.nombre,
    danio: danio,
    vidaRestanteDefensor: defensor.vidaActual,
    defensorVivo: defensor.estaVivo()
  };
}

/**
 * Simula un combate completo entre personaje y enemigo.
 * El personaje siempre ataca primero. Termina cuando alguno muere.
 * @param {Object} personaje
 * @param {Object} enemigo
 * @returns {Object} Resultado del combate con bitácora de turnos
 */
function combateCompleto(personaje, enemigo) {
  const bitacora = [];
  let turno = 0;
  const MAX_TURNOS = 100; // Salvaguarda contra combates infinitos

  while (personaje.estaVivo() && enemigo.estaVivo() && turno < MAX_TURNOS) {
    // Personaje ataca
    bitacora.push(ejecutarTurno(personaje, enemigo));
    if (!enemigo.estaVivo()) break;

    // Enemigo contraataca
    bitacora.push(ejecutarTurno(enemigo, personaje));
    turno++;
  }

  const ganador = personaje.estaVivo() ? personaje.nombre : enemigo.nombre;

  // Si gana el personaje, otorga XP automáticamente
  if (personaje.estaVivo() && !enemigo.estaVivo()) {
    personaje.ganarExperiencia(enemigo.xpOtorgada);
  }

  return {
    ganador,
    turnosTotal: bitacora.length,
    bitacora,
    xpGanada: personaje.estaVivo() ? enemigo.xpOtorgada : 0
  };
}

module.exports = { calcularDanio, ejecutarTurno, combateCompleto };
