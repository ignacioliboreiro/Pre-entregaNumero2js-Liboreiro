

const interes = [
  [1, 1],
  [6, 26],
  [12, 100],
  [24, 126]
];

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

let productos = [];
let montoTotal = 0;
let cuotas;

let avanzar = false;
let vcuotas = true;
let tasaInteres;

do {
  const nombreProducto = prompt("Ingrese el nombre del producto:");
  const precioProducto = parseFloat(prompt("Ingrese el precio del producto:"));

  if (isNaN(precioProducto) || precioProducto <= 0 || nombreProducto === "") {
    alert("El precio del producto debe ser un número mayor que cero.");
    continue;
  }

  const producto = new Producto(nombreProducto, precioProducto);
  productos.push(producto);
  montoTotal += precioProducto;

  const confirmacion = confirm("¿Desea agregar otro producto?");
  if (!confirmacion) {
    avanzar = true;
  }
} while (!avanzar);

do {
  cuotas = parseInt(prompt("Ingrese el número de cuotas: \nRecuerda que pueden ser 1, 6, 12 o 24"));

  if (cuotas === 1 || cuotas === 6 || cuotas === 12 || cuotas === 24) {
    vcuotas = false;
  } else {
    alert("El número de cuotas ingresado no es válido.");
  }
} while (vcuotas);

switch (cuotas) {
  case 1:
    tasaInteres = interes[0][1];
    break;
  case 6:
    tasaInteres = interes[1][1];
    break;
  case 12:
    tasaInteres = interes[2][1];
    break;
  case 24:
    tasaInteres = interes[3][1];
    break;
}

// Función para calcular el pago en cuotas con interés
function calcularPagoCuotasConInteres(monto, cuotas, tasaInteres) {
  if (cuotas <= 0) {
    return "El número de cuotas debe ser mayor que cero.";
  } else if (tasaInteres <= 0) {
    return "La tasa de interés debe ser mayor que cero.";
  } else {
    let pagoMensual = monto / cuotas;
    let totalConInteres = monto + (monto * (tasaInteres / 100));
    let pagoConInteres = totalConInteres / cuotas;
    return "El monto a pagar por cuota sin interés es: $" + pagoMensual.toFixed(2) +
      "\nEl monto total a pagar sin interés es: $" + monto.toFixed(2) +
      "\n\nEl monto a pagar por cuota con interés es: $" + pagoConInteres.toFixed(2) +
      "\nEl monto total a pagar con interés es: $" + totalConInteres.toFixed(2);
  }
}

// Calcular y mostrar el pago en cuotas con interés para cada producto
productos.forEach(producto => {
  const resultado = calcularPagoCuotasConInteres(producto.precio, cuotas, tasaInteres);
  alert(`Producto: ${producto.nombre}\n\n${resultado}`);
});

// Mostrar el monto total a pagar con interés para todos los productos
const resultadoTotal = calcularPagoCuotasConInteres(montoTotal, cuotas, tasaInteres);
alert(`Total de productos: $${montoTotal.toFixed(2)}\n\n${resultadoTotal}`);
