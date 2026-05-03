let log = console.log;

// Función que recibe un arreglo de números y devuelve su promedio
function promedio(arreglo) {
    let suma = 0;
    for (let num of arreglo) {
        suma += num;
    }
    return suma / arreglo.length;
}

// Prueba
const numeros = [10, 20, 30, 40, 50];
log("Arreglo:", numeros);
log("Promedio:", promedio(numeros));
