# 🎮 RPG por turnos - Proyecto base de Pruebas

Proyecto educativo para el módulo de **Pruebas de Software** de TC2005B.

---

## 📁 Estructura del proyecto

```
rpg-pruebas/
├── src/                    Lógica del juego (lo que se prueba con Jest)
│   ├── personaje.js        Clase Personaje (vida, curación, niveles)
│   ├── enemigo.js          Clase Enemigo
│   ├── combate.js          Sistema de combate (calcular daño, turnos)
│   ├── nivel.js            Sistema de experiencia
│   └── index.js            Demo en consola
│
├── tests/                  Pruebas automatizadas (Jest)
│   └── ejemplo.test.js     Test de muestra del patrón AAA
│
├── public/                 Interfaz web del juego
│   ├── index.html
│   ├── styles.css
│   └── game.js
│
├── package.json
└── README.md
```

---

## 🚀 Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Correr el demo en consola
npm start

# Correr las pruebas
npm test

# Correr pruebas en modo watch (se vuelven a correr al guardar)
npm run test:watch

# Correr pruebas con reporte de cobertura
npm run test:coverage

# Abrir la UI web
npm run ui
# Luego abrir el link que muestra (típicamente http://localhost:3000)
```

---

## 📚 ¿Qué van a aprender con este proyecto?

### Sesión 1 — Fundamentos y diseño de casos de prueba
Diseño en papel de casos de prueba para las funciones del juego, aplicando:
- Clases de equivalencia
- Valores frontera

### Sesión 2 — Pruebas unitarias con Jest
Escribirán pruebas automatizadas para:
- `Personaje.recibirDanio()`
- `Personaje.curar()`
- `Personaje.estaVivo()`
- `Personaje.subirNivel()`
- `calcularDanio()` de combate
- `calcularRecompensa()` de nivel

### Sesión 3 — Integración + Pruebas en voz alta
- Pruebas de integración: `combateCompleto()` orquesta varios módulos
- Pruebas con usuarios usando la UI del juego (carpeta `public/`)

---

## 🎯 Funciones que serán probadas

| Módulo | Función | ¿Qué hace? |
|---|---|---|
| `personaje.js` | `recibirDanio(d)` | Reduce vida, no baja de 0 |
| `personaje.js` | `curar(c)` | Aumenta vida, no excede vidaMaxima |
| `personaje.js` | `estaVivo()` | Devuelve true si vidaActual > 0 |
| `personaje.js` | `ganarExperiencia(xp)` | Suma XP y sube de nivel si corresponde |
| `personaje.js` | `subirNivel()` | Aumenta stats y restaura vida |
| `enemigo.js` | `recibirDanio(d)` | Igual que Personaje |
| `combate.js` | `calcularDanio(a, d)` | Devuelve daño (mínimo 1) |
| `combate.js` | `ejecutarTurno(a, d)` | Ejecuta un turno completo |
| `combate.js` | `combateCompleto(p, e)` | Combate hasta que uno muera |
| `nivel.js` | `experienciaParaNivel(n)` | XP acumulada para un nivel |
| `nivel.js` | `calcularRecompensa(xp, nE, nP)` | XP final según diferencia de niveles |

---

## 🧪 Patrón AAA (Arrange-Act-Assert)

Todas las pruebas siguen este patrón:

```javascript
test('descripción clara de qué se prueba', () => {
  // Arrange: preparar datos y objetos
  const heroe = new Personaje('Aria', 100, 15, 5);

  // Act: ejecutar la acción a probar
  heroe.recibirDanio(30);

  // Assert: verificar el resultado
  expect(heroe.vidaActual).toBe(70);
});
```

---

## 📜 Licencia

Material educativo para TC2005B - Tecnológico de Monterrey.

## Análisis de cobertura — Lab 27

El módulo mejor cubierto fue `personaje.js` con 85.71% de statements, lo cual tiene sentido porque fue el que requirió más pruebas (10 casos) y sus métodos son directos y fáciles de ejercitar de manera aislada. `combate.js` quedó con la cobertura más baja (21.73%) porque solo se probó `calcularDanio` como función pura, mientras que `ejecutarTurno` y `combateCompleto` requieren instancias completas integradas y se dejaron para pruebas de integración. Una línea que llamó la atención es la línea 19 de `personaje.js`, donde se valida que el nombre sea un string — esa rama nunca se ejecutó porque todos los tests usan nombres válidos. Se podría agregar un test que pase un nombre inválido (por ejemplo un número) para cubrirla, ya que es lógica de validación importante y no sería código defensivo difícil de alcanzar.
