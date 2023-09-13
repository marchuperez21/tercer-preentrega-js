class Calculadora {
  sumar(num1, num2) {
    return num1 + num2;
  }

  restar(num1, num2) {
    return num1 - num2;
  }

  dividir(num1, num2) {
    return num1 / num2;
  }

  multiplicar(num1, num2) {
    return num1 * num2;
  }
}

class Display {
  constructor(ValorAnterior, ValorActual) {
    this.ValorActual = ValorActual;
    this.ValorAnterior = ValorAnterior;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = "";
    this.valorAnterior = "";
    this.resultado = "";
    this.resultados = [];
    this.signos = {
      sumar: "+",
      dividir: "/",
      multiplicar: "x",
      restar: "-",
    };
  }

  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.imprimirValores();
  }

  borrarTodo() {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
  }

  computar(tipo) {
    this.tipoOperacion !== "igual" && this.calcular();
    this.tipoOperacion = tipo;
    this.valorAnterior = this.valorActual || this.valorAnterior;
    this.valorActual = "";
    this.imprimirValores();
  }

  agregarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
    this.valorActual = this.valorActual.toString() + numero.toString();
    this.imprimirValores();
  }

  imprimirValores() {
    this.ValorActual.textContent = this.valorActual;
    this.ValorAnterior.textContent = `${this.valorAnterior} ${
      this.signos[this.tipoOperacion] || ""
    }`;
  }

  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);

    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.resultado = this.calculador[this.tipoOperacion](
      valorAnterior,
      valorActual
    );
    this.resultados.push(this.resultado);
    this.guardarEnStorage();
    this.mostrarresultado(); // Llamar a mostrarresultado después de calcular
  }

  guardarEnStorage() {
    let resultadojson = JSON.stringify(this.resultados);
    localStorage.setItem("resultados", resultadojson);
  }

  recuperarStorage() {
    let resultadojson = localStorage.getItem("resultados");
    this.resultados = JSON.parse(resultadojson) || [];
  }

  mostrarresultado() {
    let valoresanteriores = document.getElementById("valoresanteriores");
    this.recuperarStorage();
    valoresanteriores.innerHTML = this.resultados.join(", ");
  }
}

const ValorAnterior = document.getElementById("valor-anterior");
const ValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");

const display = new Display(ValorAnterior, ValorActual);

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => display.computar(boton.value));
});

//para mostrar resultados anteriores
display.mostrarresultado();
