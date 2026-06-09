const base = [
  { id:1, nombre: "ceramica", tipo: "taller", precio: 500 },
  { id:2, nombre: "pintura", tipo: "taller", precio: 300 },
  { id:3, nombre: "esculltura", tipo: "taller", precio: 650 },
  { id:4, nombre: "textiles", tipo: "taller", precio: 500 },
  { id:5, nombre: "joyeria", tipo: "taller", precio: 1000 },
];

function getTodos() {
  return base;
}

function getPorId(id) {
  return base.find(s => s.id === parseInt(id));
}

module.exports = { getTodos, getPorId };
