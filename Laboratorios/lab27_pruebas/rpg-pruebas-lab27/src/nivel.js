/**
 * Funciones auxiliares del sistema de niveles.
 *
 * Útiles para enseñar:
 * - Clases de equivalencia (niveles válidos vs inválidos)
 * - Valores frontera (nivel 1, nivel máximo)
 * - Tablas de decisión (recompensa según diferencia de niveles)
 */

const NIVEL_MAXIMO = 99;

/**
 * Calcula la experiencia necesaria para alcanzar un nivel dado desde nivel 1.
 * @param {number} nivel - Nivel objetivo (entre 1 y NIVEL_MAXIMO)
 * @returns {number} XP total acumulada necesaria
 */
function experienciaParaNivel(nivel) {
  if (!Number.isInteger(nivel)) {
    throw new Error('El nivel debe ser un número entero');
  }
  if (nivel < 1) {
    throw new Error('El nivel mínimo es 1');
  }
  if (nivel > NIVEL_MAXIMO) {
    throw new Error(`El nivel máximo es ${NIVEL_MAXIMO}`);
  }
  // Fórmula triangular: 100 + 200 + 300 + ... hasta el nivel anterior
  let total = 0;
  for (let i = 1; i < nivel; i++) {
    total += i * 100;
  }
  return total;
}

/**
 * Calcula la recompensa de XP según diferencia de niveles entre enemigo y personaje.
 *
 * Tabla de decisión:
 * | Diferencia        | Multiplicador |
 * | enemigo 3+ debajo | 0.5x          |
 * | enemigo 1-2 debajo| 0.75x         |
 * | mismo nivel       | 1.0x          |
 * | enemigo 1-2 arriba| 1.5x          |
 * | enemigo 3+ arriba | 2.0x          |
 *
 * @param {number} xpBase - XP base que otorga el enemigo
 * @param {number} nivelEnemigo
 * @param {number} nivelPersonaje
 * @returns {number} XP final (entero)
 */
function calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje) {
  if (xpBase < 0) {
    throw new Error('La XP base no puede ser negativa');
  }
  if (nivelEnemigo < 1 || nivelPersonaje < 1) {
    throw new Error('Los niveles deben ser al menos 1');
  }

  const diferencia = nivelEnemigo - nivelPersonaje;
  let multiplicador;

  if (diferencia <= -3) {
    multiplicador = 0.5;
  } else if (diferencia < 0) {
    multiplicador = 0.75;
  } else if (diferencia === 0) {
    multiplicador = 1.0;
  } else if (diferencia <= 2) {
    multiplicador = 1.5;
  } else {
    multiplicador = 2.0;
  }

  return Math.floor(xpBase * multiplicador);
}

module.exports = { experienciaParaNivel, calcularRecompensa, NIVEL_MAXIMO };
