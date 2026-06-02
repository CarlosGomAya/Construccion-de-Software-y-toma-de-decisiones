/* ============================================
   RPG - Lógica de la UI web
   ============================================
   Este archivo replica la lógica de /src/ para
   correr en el navegador (sin require/exports).
   La versión testeable (con Jest) vive en /src/.
   ============================================ */

// ===== Clase Personaje (espejo de /src/personaje.js) =====
class Personaje {
  constructor(nombre, vidaMaxima, ataque, defensa) {
    this.nombre = nombre;
    this.vidaMaxima = vidaMaxima;
    this.vidaActual = vidaMaxima;
    this.ataque = ataque;
    this.defensa = defensa;
    this.nivel = 1;
    this.experiencia = 0;
  }
  recibirDanio(d) { this.vidaActual = Math.max(0, this.vidaActual - d); }
  curar(c) { this.vidaActual = Math.min(this.vidaMaxima, this.vidaActual + c); }
  estaVivo() { return this.vidaActual > 0; }
  experienciaParaSiguienteNivel() { return this.nivel * 100; }
  ganarExperiencia(xp) {
    this.experiencia += xp;
    while (this.experiencia >= this.experienciaParaSiguienteNivel()) {
      this.experiencia -= this.experienciaParaSiguienteNivel();
      this.subirNivel();
    }
  }
  subirNivel() {
    this.nivel++;
    this.vidaMaxima += 10;
    this.vidaActual = this.vidaMaxima;
    this.ataque += 2;
    this.defensa += 1;
  }
}

// ===== Clase Enemigo =====
class Enemigo {
  constructor(nombre, vida, ataque, defensa, xp) {
    this.nombre = nombre;
    this.vidaMaxima = vida;
    this.vidaActual = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.xpOtorgada = xp;
  }
  recibirDanio(d) { this.vidaActual = Math.max(0, this.vidaActual - d); }
  estaVivo() { return this.vidaActual > 0; }
}

// ===== Funciones de combate =====
function calcularDanio(atacante, defensor) {
  return Math.max(1, atacante.ataque - defensor.defensa);
}

// ===== Estado del juego =====
let personaje;
let enemigo;
let combateTerminado = false;

const enemigosDisponibles = [
  { nombre: 'Goblin', vida: 40, ataque: 10, defensa: 3, xp: 50 },
  { nombre: 'Orco', vida: 70, ataque: 14, defensa: 5, xp: 90 },
  { nombre: 'Dragón joven', vida: 120, ataque: 20, defensa: 8, xp: 150 }
];

let indiceEnemigo = 0;

// ===== Inicialización =====
function iniciarJuego() {
  personaje = new Personaje('Aria', 100, 15, 5);
  indiceEnemigo = 0;
  generarSiguienteEnemigo();
  combateTerminado = false;
  document.getElementById('log').innerHTML = '';
  agregarLog(`¡${personaje.nombre} entra a la arena!`);
  actualizarUI();
}

function generarSiguienteEnemigo() {
  const config = enemigosDisponibles[indiceEnemigo % enemigosDisponibles.length];
  enemigo = new Enemigo(config.nombre, config.vida, config.ataque, config.defensa, config.xp);
  indiceEnemigo++;
}

// ===== Acciones del jugador =====
function atacar() {
  if (combateTerminado) return;

  // Personaje ataca
  const danio = calcularDanio(personaje, enemigo);
  enemigo.recibirDanio(danio);
  agregarLog(`${personaje.nombre} ataca a ${enemigo.nombre}: ${danio} de daño.`);

  if (!enemigo.estaVivo()) {
    agregarLog(`¡${enemigo.nombre} ha sido derrotado!`);
    personaje.ganarExperiencia(enemigo.xpOtorgada);
    agregarLog(`${personaje.nombre} gana ${enemigo.xpOtorgada} XP.`);
    actualizarUI();
    return;
  }

  // Enemigo contraataca
  const danioRecibido = calcularDanio(enemigo, personaje);
  personaje.recibirDanio(danioRecibido);
  agregarLog(`${enemigo.nombre} ataca a ${personaje.nombre}: ${danioRecibido} de daño.`);

  if (!personaje.estaVivo()) {
    agregarLog(`${personaje.nombre} ha caído. Fin del juego.`);
    combateTerminado = true;
  }

  actualizarUI();
}

function curar() {
  if (combateTerminado) return;
  // ISSUE DE USABILIDAD #6: no valida si la vida ya está al máximo.
  // Si el usuario hace click sin necesidad, gasta su turno sin curar nada.
  personaje.curar(20);
  agregarLog(`${personaje.nombre} se cura 20 puntos de vida.`);

  // El enemigo aún ataca
  const danioRecibido = calcularDanio(enemigo, personaje);
  personaje.recibirDanio(danioRecibido);
  agregarLog(`${enemigo.nombre} ataca a ${personaje.nombre}: ${danioRecibido} de daño.`);

  if (!personaje.estaVivo()) {
    agregarLog(`${personaje.nombre} ha caído. Fin del juego.`);
    combateTerminado = true;
  }

  actualizarUI();
}

function huir() {
  // ISSUE DE USABILIDAD #7: no pide confirmación antes de huir.
  agregarLog(`${personaje.nombre} huye del combate.`);
  combateTerminado = true;
  actualizarUI();
}

// ===== Actualización de la UI =====
function actualizarUI() {
  // Personaje
  document.getElementById('nombre-personaje').textContent = personaje.nombre;
  document.getElementById('nivel-personaje').textContent = personaje.nivel;
  document.getElementById('vida-personaje').textContent = personaje.vidaActual;
  document.getElementById('vida-max-personaje').textContent = personaje.vidaMaxima;
  document.getElementById('xp-personaje').textContent = personaje.experiencia;
  document.getElementById('xp-siguiente').textContent = personaje.experienciaParaSiguienteNivel();
  document.getElementById('barra-personaje').style.width =
    (personaje.vidaActual / personaje.vidaMaxima * 100) + '%';

  // Enemigo
  document.getElementById('nombre-enemigo').textContent = enemigo.nombre;
  document.getElementById('vida-enemigo').textContent = enemigo.vidaActual;
  document.getElementById('vida-max-enemigo').textContent = enemigo.vidaMaxima;
  document.getElementById('atk-enemigo').textContent = enemigo.ataque;
  document.getElementById('def-enemigo').textContent = enemigo.defensa;
  document.getElementById('barra-enemigo').style.width =
    (enemigo.vidaActual / enemigo.vidaMaxima * 100) + '%';

  // Botones - se deshabilitan pero visualmente no cambian (issue #1)
  document.getElementById('btn-atacar').disabled = combateTerminado;
  document.getElementById('btn-curar').disabled = combateTerminado;
  document.getElementById('btn-huir').disabled = combateTerminado;
}

function agregarLog(mensaje) {
  const log = document.getElementById('log');
  const li = document.createElement('li');
  li.textContent = mensaje;
  log.appendChild(li);
}

// ===== Event listeners =====
document.getElementById('btn-atacar').addEventListener('click', atacar);
document.getElementById('btn-curar').addEventListener('click', curar);
document.getElementById('btn-huir').addEventListener('click', huir);
document.getElementById('btn-nuevo').addEventListener('click', iniciarJuego);

// Iniciar
iniciarJuego();
