/**
 * Demo en consola del RPG.
 * Ejecutar con: npm start
 */
const Personaje = require('./personaje');
const Enemigo = require('./enemigo');
const { combateCompleto } = require('./combate');

console.log('=== RPG por turnos - Demo ===\n');

const heroe = new Personaje('Aria', 100, 15, 5);
const goblin = new Enemigo('Goblin', 40, 10, 3, 50);

console.log(`${heroe.nombre} (Nivel ${heroe.nivel}) vs ${goblin.nombre}`);
console.log(`Vida: ${heroe.vidaActual} vs ${goblin.vidaActual}\n`);

const resultado = combateCompleto(heroe, goblin);

console.log('--- Bitácora del combate ---');
resultado.bitacora.forEach((turno, i) => {
  console.log(
    `Turno ${i + 1}: ${turno.atacante} ataca a ${turno.defensor} ` +
    `→ ${turno.danio} de daño (vida restante: ${turno.vidaRestanteDefensor})`
  );
});

console.log(`\n¡Ganador: ${resultado.ganador}!`);
console.log(`Total de turnos: ${resultado.turnosTotal}`);
console.log(`XP ganada: ${resultado.xpGanada}`);
console.log(`\n${heroe.nombre} ahora tiene Nivel ${heroe.nivel} con ${heroe.experiencia} XP`);
