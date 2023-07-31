const botonGuardar = document.getElementById('boton1');   //Se llama a todos los elementos del html para usarlos en el main
const tipoGastoInput = document.getElementById('tipoGasto');
const montoGastoInput = document.getElementById('montoGasto');
const resultadoDiv = document.getElementById('resultado');
const botonFecha = document.getElementById('fecha');
const botonBorrar = document.getElementById('borrar');

function guardarDatos() {   //Esta funcion se encarga de tomar datos y guardar en localStorage
  const tipoGasto = tipoGastoInput.value;
  const montoGasto = montoGastoInput.value;
  const fecha = botonFecha.value;   //Guardo en variables lo tomado de los elementos de html

  let datosGuardados = localStorage.getItem('datos'); //Defino la key de localStorage

  
  if (!datosGuardados) {  //Si no hay datos, inicializo el array, y si los hay, empieza el parseo de JSON
    datosGuardados = [];
  } else {
    datosGuardados = JSON.parse(datosGuardados);
  }

  datosGuardados.push({ fecha, tipoGasto, montoGasto });
  localStorage.setItem('datos', JSON.stringify(datosGuardados));
}


function cargarDatos() {    //Este metodo obtiene los datos ya guardados y los muestra
  let datosGuardados = localStorage.getItem('datos');

  // Si hay datos almacenados, los mostramos en el div
  if (datosGuardados) {
    datosGuardados = JSON.parse(datosGuardados);
    resultadoDiv.innerHTML = '';
    datosGuardados.forEach((dato) => {
      const contenedor = document.createElement('p'); //Se crea el espacio, en este caso una etiqueta parrafo, para ir agregando los datos
      contenedor.textContent = dato.fecha + ' ' + dato.tipoGasto + ': ' + dato.montoGasto;
      resultadoDiv.appendChild(contenedor);
    });
  }
}

function borrarDatos() {  //Este metodo sirve para borrar los datos cargados, incluso del html
  localStorage.removeItem('datos');
  resultadoDiv.innerHTML = '';
}

cargarDatos();  //Llamo este metodo para mostrar los datos cargados al cargar la pagina

botonGuardar.addEventListener('click', function() { //Al clickear el boton, se ejecuta el metodo guardar y se vuelve a ejecutar el metodo de carga para mostrar los nuevos datos
  guardarDatos();
  cargarDatos(); 
  tipoGastoInput.value = '';    //Se vacian los formularios para ingresar mas datos
  montoGastoInput.value = '';
  botonFecha.value = '';
});

botonBorrar.addEventListener('click', function() {  //Al clickear el boton "borrar datos", se borran los datos del html y del localStorage
  let aviso = prompt("Si desea borrar los datos, escriba 'Si': ") //Tambien muestro un aviso para asegurar que se van a borrar datos, esto lo hice para evitar un toque accidental
  if(aviso == "si"){  
    borrarDatos();
  }
});
