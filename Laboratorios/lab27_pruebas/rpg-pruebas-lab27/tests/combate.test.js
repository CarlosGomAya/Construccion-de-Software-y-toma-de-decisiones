const { calcularDanio } = require('../src/combate');

describe('calcularDanio', () => {

  // Caso 1: daño normal ataque > defensa
  test('daño normal: ataque mayor que defensa retorna la diferencia', () => {
    // Arrange
    const atacante = { ataque: 15 };
    const defensor = { defensa: 5 };

    // Act
    const danio = calcularDanio(atacante, defensor);

    // Assert
    expect(danio).toBe(10);
  });

  // Caso 2: defensa igual a ataque retorna 1
  test('defensa igual a ataque retorna 1 como minimo garantizado', () => {
    // Arrange
    const atacante = { ataque: 10 };
    const defensor = { defensa: 10 };

    // Act
    const danio = calcularDanio(atacante, defensor);

    // Assert
    expect(danio).toBe(1);
  });

  // Caso 3: defensa mayor que ataque retorna 1
  test('defensa mayor que ataque retorna 1 y no un valor negativo', () => {
    // Arrange
    const atacante = { ataque: 5 };
    const defensor = { defensa: 20 };

    // Act
    const danio = calcularDanio(atacante, defensor);

    // Assert
    expect(danio).toBe(1);
  });

  // Caso 4: ataque y defensa iguales a cero retorna 1
  test('ataque y defensa iguales a cero retorna 1', () => {
    // Arrange
    const atacante = { ataque: 0 };
    const defensor = { defensa: 0 };

    // Act
    const danio = calcularDanio(atacante, defensor);

    // Assert
    expect(danio).toBe(1);
  });

});
