const Personaje = require('../src/personaje');

describe('Personaje', () => {

  // Caso 1: vida completa al crear
  test('personaje recien creado tiene vida completa', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act - no se requiere accion

    // Assert
    expect(heroe.vidaActual).toBe(100);
  });

  // Caso 2: recibirDanio reduce la vida correctamente
  test('recibirDanio reduce la vida correctamente', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act
    heroe.recibirDanio(30);

    // Assert
    expect(heroe.vidaActual).toBe(70);
  });

  // Caso 3: recibirDanio letal deja vida en 0
  test('recibirDanio con valor letal deja la vida en 0', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act
    heroe.recibirDanio(200);

    // Assert
    expect(heroe.vidaActual).toBe(0);
  });

  // Caso 4: recibirDanio con valor negativo lanza error
  test('recibirDanio con valor negativo lanza error', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act & Assert
    expect(() => heroe.recibirDanio(-10)).toThrow();
  });

  // Caso 5: curar aumenta la vida correctamente
  test('curar aumenta la vida correctamente', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);
    heroe.recibirDanio(40);

    // Act
    heroe.curar(20);

    // Assert
    expect(heroe.vidaActual).toBe(80);
  });

  // Caso 6: curar nunca excede la vida maxima
  test('curar nunca excede la vida maxima', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);
    heroe.recibirDanio(10);

    // Act
    heroe.curar(999);

    // Assert
    expect(heroe.vidaActual).toBe(100);
  });

  // Caso 7: estaVivo retorna true si vida > 0
  test('estaVivo retorna true si vida es mayor a 0', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act
    const resultado = heroe.estaVivo();

    // Assert
    expect(resultado).toBeTruthy();
  });

  // Caso 8: estaVivo retorna false si vida = 0
  test('estaVivo retorna false si vida es 0', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);
    heroe.recibirDanio(100);

    // Act
    const resultado = heroe.estaVivo();

    // Assert
    expect(resultado).toBeFalsy();
  });

  // Caso 9: subirNivel restaura vida y aumenta stats
  test('subirNivel restaura la vida y aumenta ataque y defensa', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);
    heroe.recibirDanio(50);

    // Act
    heroe.subirNivel();

    // Assert
    expect(heroe.vidaActual).toBe(110); // vidaMaxima + 10, restaurada
    expect(heroe.ataque).toBe(17);      // ataque + 2
  });

  // Caso 10: ganarExperiencia sube de nivel al pasar el umbral
  test('ganarExperiencia sube de nivel al superar el umbral', () => {
    // Arrange
    const heroe = new Personaje('Link', 100, 15, 5);

    // Act
    heroe.ganarExperiencia(100);

    // Assert
    expect(heroe.nivel).toBe(2);
  });

});
