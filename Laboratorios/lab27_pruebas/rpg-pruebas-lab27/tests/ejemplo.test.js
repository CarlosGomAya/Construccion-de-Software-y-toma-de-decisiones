/**
 * Test de ejemplo - patrón AAA (Arrange-Act-Assert)
 *
 * Este es el ÚNICO test que viene en el proyecto.
 * En el laboratorio de la Sesión 2, ustedes escribirán
 * el resto de pruebas para todos los módulos.
 *
 * Ejecutar con: npm test
 */
const Personaje = require('../src/personaje');

describe('Personaje - test de ejemplo', () => {
  test('un personaje recién creado tiene vida completa', () => {
    // Arrange: preparar los datos
    const heroe = new Personaje('Aria', 100, 15, 5);

    // Act: ejecutar la acción (en este caso solo leer, no hay acción)
    const vida = heroe.vidaActual;

    // Assert: verificar el resultado
    expect(vida).toBe(100);
  });
});
