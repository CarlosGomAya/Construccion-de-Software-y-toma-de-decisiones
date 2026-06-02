const { calcularRecompensa } = require('../src/nivel');

describe('calcularRecompensa', () => {

  // Caso 1: enemigo 3+ niveles abajo — multiplicador 0.5
  test('enemigo 3 o mas niveles abajo aplica multiplicador 0.5', () => {
    // Arrange
    const xpBase = 100;
    const nivelEnemigo = 1;
    const nivelPersonaje = 4;

    // Act
    const xp = calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje);

    // Assert
    expect(xp).toBe(50);
  });

  // Caso 2: enemigo 1-2 niveles abajo — multiplicador 0.75
  test('enemigo 1 o 2 niveles abajo aplica multiplicador 0.75', () => {
    // Arrange
    const xpBase = 100;
    const nivelEnemigo = 3;
    const nivelPersonaje = 5;

    // Act
    const xp = calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje);

    // Assert
    expect(xp).toBe(75);
  });

  // Caso 3: mismo nivel — multiplicador 1.0
  test('mismo nivel aplica multiplicador 1.0', () => {
    // Arrange
    const xpBase = 100;
    const nivelEnemigo = 5;
    const nivelPersonaje = 5;

    // Act
    const xp = calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje);

    // Assert
    expect(xp).toBe(100);
  });

  // Caso 4: enemigo 1-2 niveles arriba — multiplicador 1.5
  test('enemigo 1 o 2 niveles arriba aplica multiplicador 1.5', () => {
    // Arrange
    const xpBase = 100;
    const nivelEnemigo = 7;
    const nivelPersonaje = 5;

    // Act
    const xp = calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje);

    // Assert
    expect(xp).toBe(150);
  });

  // Caso 5: enemigo 3+ niveles arriba — multiplicador 2.0
  test('enemigo 3 o mas niveles arriba aplica multiplicador 2.0', () => {
    // Arrange
    const xpBase = 100;
    const nivelEnemigo = 8;
    const nivelPersonaje = 5;

    // Act
    const xp = calcularRecompensa(xpBase, nivelEnemigo, nivelPersonaje);

    // Assert
    expect(xp).toBe(200);
  });

});
