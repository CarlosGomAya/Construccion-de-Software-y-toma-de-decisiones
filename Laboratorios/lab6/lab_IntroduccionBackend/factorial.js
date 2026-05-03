let log = console.log;

// Problema clásico que se suele resolver en C o Python: calcular el factorial de un número.
// Aquí está la versión en JavaScript ejecutada sobre Node.

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Pruebas
log("Factorial de 5:", factorial(5));
log("Factorial de 7:", factorial(7));
log("Factorial de 10:", factorial(10));
