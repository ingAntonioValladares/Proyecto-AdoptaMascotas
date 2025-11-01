console.log("----- CLASE MASCOTA ------");
class Mascota {
  static totalMascotas = 0;
  static listaMascotas = new Array();
  constructor(nombre, edad, color, raza, dueño, fechaAdopcion) {
    this.nombre = nombre;
    this.edad = edad;
    this.color = color;
    this.raza = raza;
    this.dueño = dueño;
    this.fechaAdopcion = fechaAdopcion;
    Mascota.totalMascotas++;
  }
  // REGISTRAR UNA NUEVA MASCOTA
  static agregarMascota = function (
    lista,
    nombre,
    edad,
    color,
    raza,
    dueños,
    fechaAdopcion
  ) {
    const nuevaMascota = new Mascota(
      nombre,
      edad,
      color,
      raza,
      dueños,
      fechaAdopcion
    );
    lista.push(nuevaMascota);
  };
  // MODIFICAR UN REGISTRO
  static modificarMascota = function (
    mascota,
    nombreNuevo,
    edadNuevo,
    colorNuevo,
    razaNuevo,
    dueñoNuevo,
    fechaAdopcionNuevo
  ) {
    mascota.nombre = nombreNuevo;
    mascota.edad = edadNuevo;
    mascota.color = colorNuevo;
    mascota.raza = razaNuevo;
    mascota.dueño = dueñoNuevo;
    mascota.fechaAdopcion = fechaAdopcionNuevo;
  };
  // AGREGAR PROPIEDAD (ETAPA DE VIDA)
  // Cachorro: 5 o 6 meses.
  // Adolescente: Desde los 5 o 6 meses hasta 1 año 6 meses.
  // Joven: Desde 1 año 6 meses hasta los 2 años.
  // Adulto: A partir de los 2 años.
  // Senior: A partir de los 6 o 7 años.
  static agregarPropiedadMayorDeEdad = function () {
    let registrosConPropiedadEdad = Mascota.listaMascotas.reduce(
      (acc, mascota) => {
        // AGREGA LA PROPIEDAD AL REGISTRO ORIGINAL
        let categoriaVida = Mascota.evaluarEtapaDeVida(mascota);
        mascota.etapaDeVida = categoriaVida;
        acc.push(mascota);
        return acc;
      },
      []
    );
    return registrosConPropiedadEdad;
  };
  // EVALUAR ETAPA DE VIDA
  static evaluarEtapaDeVida = function (mascota) {
    let edad = mascota.edad;
    let porcionEdad = edad.split(" ");
    let tenemosAños =
      edad.split(" ").includes("años") || edad.split(" ").includes("año");
    let tenemosMeses =
      edad.split(" ").includes("meses") || edad.split(" ").includes("mes");
    let cantAños = null;
    let cantMeses = null;
    let totalMeses = null; // cantAños (* 12 meses) + cantMeses
    if (tenemosAños === true && tenemosMeses === false) {
      // En el caso de 1 año
      cantMeses = parseInt(porcionEdad[0]);
      // Si es 1 año = 12 meses
      // Si es 2 años = 2 * 12 meses
      cantMeses == 1 ? (cantMeses = 12) : (cantMeses = cantMeses * 12);
      if (cantMeses >= 12 && cantMeses <= 18) {
        return `ADOLESCENTE`;
      } else if (cantMeses > 18 && cantMeses <= 24) {
        return `JOVEN`;
      } else if (cantMeses > 24 && cantMeses < 72) {
        return `ADULTO`;
      } else if (cantMeses >= 72) {
        return `SENIOR`;
      } else {
        return `EDAD INVALIDA`;
      }
    } else if (tenemosMeses === true && tenemosAños === false) {
      cantMeses = parseInt(porcionEdad[0]);
      if (cantMeses >= 0 && cantMeses <= 6) {
        return `CACHORRO`;
      } else if (cantMeses > 6 && cantMeses <= 11) {
        // Para 12 meses estoy colocando 1 año
        return `ADOLESCENTE`;
      } else {
        return `EDAD INVALIDA`;
      }
    } else if (tenemosAños === true && tenemosMeses === true) {
      cantAños = parseInt(porcionEdad[0]) * 12; // 12 meses = 1 año
      cantMeses = parseInt(porcionEdad[2]);
      totalMeses = cantAños + cantMeses;
      if (totalMeses >= 0 && totalMeses <= 6) {
        return `CACHORRO`;
      } else if (totalMeses > 6 && totalMeses <= 18) {
        return `ADOLESCENTE`;
      } else if (totalMeses > 18 && totalMeses <= 24) {
        return `JOVEN`;
      } else if (totalMeses > 24 && totalMeses < 72) {
        return `ADULTO`;
      } else if (totalMeses >= 72) {
        return `SENIOR`;
      } else {
        return `EDAD INVALIDA`;
      }
    }
  };
  // FUNCTIONES QUE ORDENAN LOS REGISTROS POR FECHA ADOPCION
  // DE MENOR A MAYOR
  static ordenarRegistroPorFechaAdopcion = function () {
    // AGREGA LA PROPIEDAD
    Mascota.agregarPropiedadMayorDeEdad();
    // SEGUIDAMENTE ORDENA LOS REGISTROS
    // CADA REGISTRO MASCOTA YA TIENE LA NUEVA PROPIEDAD AL MOMENTO DE ORDENAR
    const listaMascotasOrdenada = Mascota.listaMascotas.sort((a, b) => {
      return new Date(a.fechaAdopcion) - new Date(b.fechaAdopcion);
    });
    return listaMascotasOrdenada;
  };
  // BUSCAR MASCOTAS POR MES Y AÑO
  static buscarMascotasPorMesAño = function (mesBuscar, añoBuscar) {
    let resultadoBusqueda = Mascota.listaMascotas.filter((mascota) => {
      let fechaAdopcion = mascota.fechaAdopcion.split("-"); // Ejemplo: "["2023","01,"10]"
      let año = parseInt(fechaAdopcion[0]); // ejemplo: "2023"
      let mes = parseInt(fechaAdopcion[1]); // ejemplo: "01"
      return año === parseInt(añoBuscar) && mes === parseInt(mesBuscar);
    });
    return resultadoBusqueda; // array con mascotas filtradas por mes y año
  };
  // BUSCAR MASCOTAS POR RAZA
  static buscarMascotasPorRaza = function (razaBuscar) {
    let indice = 0;
    let resultadoBusqueda = [];
    while (indice < Mascota.listaMascotas.length) {
      Mascota.listaMascotas[indice].raza === razaBuscar
        ? resultadoBusqueda.push(Mascota.listaMascotas[indice])
        : null;
      indice++;
    }
    return resultadoBusqueda; // array con mascotas filtradas por raza
  };
  // BUSCAR MASCOTAS POR COLOR
  static buscarMascotasPorColor = function (colorBuscar) {
    return Mascota.listaMascotas.filter(
      (mascota) => mascota.color === colorBuscar
    ); // array con mascotas filtradas por color
  };
}
// ELIMINAR TODOS LOS REGISTROS
// localStorage.removeItem("listaMascotas");
// RECUPERAR LOS REGISTROS
function obtenerRegistroNavegador() {
  const listaGuardada = localStorage.getItem("listaMascotas");
  // ESTA CONDICIONAL AYUDA A RESOLVER LO SGTE:
  // ELIMINE TODOS LOS REGISTROS Y DESPUES TENIA ERRORES AL REGISTRAR
  if (listaGuardada) {
    // PARA ELLO OBTENER LOS REGISTROS Y CONVERTIRLOS A ARRAY
    Mascota.listaMascotas = JSON.parse(listaGuardada);
  } else {
    // SI NO ENCUENTRA REGISTROS Y NO TENER PROBLEMA DE (push null)
    // DEFINIR UN ARRAY VACIO
    Mascota.listaMascotas = [];
  }
}
obtenerRegistroNavegador();
// GUARDAR REGISTRO DE MANERA LOCAL
function guardarRegistrosNavegador() {
  localStorage.setItem("listaMascotas", JSON.stringify(Mascota.listaMascotas));
}
document.addEventListener("DOMContentLoaded", () => {
  menu();
  contadorAdopciones();
});
// MOSTRAR REGISTRO DE MASCOTAS EN LA TABLA
const registrosPorPagina = 5;
let paginaActual = 1;
let mascotaActual = null;
function cargarTabla(tipo, registros) {
  // ALGORIMO PARA LISTAR REGISTROS DE 5 EN 5
  let inicio = (paginaActual - 1) * registrosPorPagina;
  let fin = inicio + registrosPorPagina;
  let pagina = null;
  if (tipo === "TODOS" && registros == null) {
    const ordenadosPorFecha = Mascota.ordenarRegistroPorFechaAdopcion();
    pagina = ordenadosPorFecha.slice(inicio, fin);
    construirRegistros(pagina);
  } else if (tipo === "POR_MES_AÑO" && registros !== null) {
    if (registros.length !== 0) {
      // TENEMOS REGISTROS
      pagina = registros.slice(inicio, fin);
      // CONSTRUYE LAS FILAS
      construirRegistros(pagina);
    } else {
      // CONSTRUYE MENSAJE DEL SISTEMA
      const propiedadesMascota = document.querySelector(".propiedades-mascota");
      const input_FechaAdopcion = document.querySelector(
        ".propiedades-mascota #fechaAdopcion"
      );
      const año = input_FechaAdopcion.value.split("-")[0];
      const mes = input_FechaAdopcion.value.split("-")[1];
      mensajeDelSistema(
        propiedadesMascota,
        "AÑO_MES SIN REGISTROS",
        `Sin registros para mes: ${mes} y año: ${año}`
      );
    }
  } else if (tipo === "POR_RAZA" && registros !== null) {
    if (registros.length !== 0) {
      // SI TENEMOS REGISTROS
      pagina = registros.slice(inicio, fin);
      // CONSTRUYE LAS FILAS
      construirRegistros(pagina);
    } else {
      // CONSTRUYE MENSAJE DEL SISTEMA
      const propiedadesMascota = document.querySelector(".propiedades-mascota");
      const input_Raza = document.querySelector(".propiedades-mascota #raza");
      mensajeDelSistema(
        propiedadesMascota,
        "RAZA SIN REGISTROS",
        `Sin registros de raza: ${input_Raza.value}`
      );
    }
  } else if (tipo === "POR_COLOR" && registros !== null) {
    if (registros.length !== 0) {
      // SI TENEMOS REGISTROS
      pagina = registros.slice(inicio, fin);
      // CONSTRUYE LOS REGISTROS
      construirRegistros(pagina);
    } else {
      // CONSTRUYE MENSAJE DEL SISTEMA
      const propiedadesMascota = document.querySelector(".propiedades-mascota");
      const input_Color = document.querySelector(".propiedades-mascota #color");
      mensajeDelSistema(
        propiedadesMascota,
        "COLOR SIN REGISTROS",
        `Sin registros de color: ${input_Color.value}`
      );
    }
  }
}
// FUNCION PARA CONSTRUIR LOS REGISTROS O FILAS DE LA TABLA
function construirRegistros(pagina) {
  // EMPEZAR A CARGAR LOS REGISTROS AL HTML
  const cuerpoTabla = document.querySelector("#cuerpoTabla");
  cuerpoTabla.innerHTML = ""; // LIMPIAR CAJAS DE TEXTO
  pagina.forEach((mascota) => {
    const fila = document.createElement("tr");
    fila.classList.add("filaMascota");
    fila.innerHTML = `
      <td>${mascota.nombre}</td>
      <td>${mascota.edad}</td>
      <td>${mascota.color}</td>
      <td>${mascota.raza}</td>
      <td>${mascota.dueño}</td>
      <td>${mascota.fechaAdopcion}</td>
      <td>${mascota.etapaDeVida}</td>
    `;
    cuerpoTabla.appendChild(fila);
    // BOTON VER POR FILA
    const botonVer = document.createElement("button");
    botonVer.classList.add("botonVer");
    botonVer.textContent = "Ver 👁️";
    const celdaBoton = document.createElement("td");
    celdaBoton.classList.add("celdaBoton");
    celdaBoton.appendChild(botonVer);
    // CLICK EN BOTON VER POR FILA
    botonVer.addEventListener("click", () => {
      mascotaActual = mascota; // ASIGNAR LA MASCOTA ACTUAL
      mostrarMascota(mascota);
      const card = document.querySelector(".display-none");
      card.style.display = "flex";
      card.style.justifyContent = "center";
      card.style.alignItems = "center";
      const body = document.querySelector(".overflow-scroll");
      body.style.overflow = "hidden";
    });
    // AGREGARLO A LA FILA
    fila.appendChild(celdaBoton);
    cuerpoTabla.appendChild(fila);
  });
}
// CONTROL DE TODOS LOS BOTONES
function menu() {
  // Asignar cada input del html a su variable
  const btnRegistrar = document.querySelector("#btn_registrar");
  const botonBuscar = document.querySelector(
    ".detalle .botones-menu #btn_buscar"
  );
  const btnVerTodos = document.querySelector("#btn_verTodos");
  let nombre = document.querySelector("#nombre");
  let edad = document.querySelector("#edad");
  let color = document.querySelector("#color");
  let raza = document.querySelector("#raza");
  let dueños = document.querySelector("#dueños");
  let fechaAdopcion = document.querySelector("#fechaAdopcion");

  // CLICK EN BOTON REGISTRAR
  btnRegistrar.addEventListener("click", (e) => {
    // ETIQUETA HTML ul -> PROPIEDADES MASCOTA
    const propiedadesMascota = document.querySelector(".propiedades-mascota");
    // VALIDAR SI LOS INPUTS TIENES VALORES
    let condicion =
      nombre.value == "" ||
      edad.value == "" ||
      color.value == "" ||
      raza.value == "" ||
      dueños.value == "" ||
      fechaAdopcion.value == "";
    if (condicion == true) {
      // MENSAJE INCORRECTO
      mensajeDelSistema(
        propiedadesMascota,
        "INCORRECTO",
        "¡Complete todos los campos!"
      );
    } else {
      // MENSAJE CORRECTO
      mensajeDelSistema(propiedadesMascota, "CORRECTO", "¡Mascota registrada!");
      // EMPEZAMOS A ELIMINAR ESPACIOS VACIOS EN LA CADENA
      const arrayDueños = new Array();
      arrayDueños.push(dueños.value);
      let nombresFormateados = eliminarEspaciosVacios(arrayDueños);
      // REGISTRAR MASCOTA
      Mascota.agregarMascota(
        Mascota.listaMascotas,
        nombre.value,
        edad.value,
        color.value,
        raza.value,
        nombresFormateados,
        fechaAdopcion.value
      );
      // GUARDAR REGISTROS TEMPORALMENTE
      guardarRegistrosNavegador();
      // AUMENTAR CONTADOR
      contadorAdopciones();
      // Limpiar cajas de texto
      nombre.value = "";
      edad.value = "";
      color.value = "";
      raza.value = "";
      dueños.value = "";
      fechaAdopcion.value = "";
    }
  });
  botonBuscar.addEventListener("click", () => {
    // SELECCIONAR ETIQUETAS HTML
    const input_Raza = document.querySelector(".propiedades-mascota #raza");
    const input_FechaAdopcion = document.querySelector(
      ".propiedades-mascota #fechaAdopcion"
    );
    const input_Color = document.querySelector(".propiedades-mascota #color");
    // OBTENER LOS VALORES DE LOS INPUT
    let fechaAdopcion = input_FechaAdopcion.value;
    let año = fechaAdopcion.split("-")[0]; // Obtener año de fechaAdopción
    let mes = fechaAdopcion.split("-")[1]; // Obtener mes de fechaAdopción
    let raza = input_Raza.value;
    let color = input_Color.value;
    if (fechaAdopcion !== "" && raza == "") {
      cargarTabla("POR_MES_AÑO", Mascota.buscarMascotasPorMesAño(mes, año));
    } else if (raza !== "" && fechaAdopcion == "") {
      cargarTabla("POR_RAZA", Mascota.buscarMascotasPorRaza(raza));
    } else if (color !== "" && raza == "" && fechaAdopcion == "") {
      cargarTabla("POR_COLOR", Mascota.buscarMascotasPorColor(color));
    } else {
      const propiedadesMascota = document.querySelector(".propiedades-mascota");
      mensajeDelSistema(
        propiedadesMascota,
        "CAJAS VACIAS",
        "Completa los campos a buscar"
      );
    }
  });
  // CLICK EN BOTON VER TODOS
  btnVerTodos.addEventListener("click", (e) => {
    cargarTabla("TODOS", null);
  });
  // CLICK EN BOTON SIGUIENTE
  const botonSiguiente = document.querySelector("#siguiente");
  botonSiguiente.addEventListener("click", () => {
    const numeroPagina = document.querySelector("#pagina");
    paginaActual++;
    numeroPagina.textContent = paginaActual;
    cargarTabla("TODOS", null);
  });
  // CLICK EN BOTON ANTERIOR
  const botonAnterior = document.querySelector("#anterior");
  botonAnterior.addEventListener("click", () => {
    const numeroPagina = document.querySelector("#pagina");
    if (paginaActual > 1) paginaActual--;
    numeroPagina.textContent = paginaActual;
    cargarTabla("TODOS", null);
  });
  // BOTONES DEL MODAL
  // CLICK EN GUARDAR CAMBIOS
  const guardar = document.querySelector("#guardar");
  guardar.addEventListener("click", () => {
    // nombre, edad, color, raza, dueño, fechaAdopcion
    const nombre = document.querySelector(".mascotaContenido #nombre");
    const edad = document.querySelector(".mascotaContenido #edad");
    const color = document.querySelector(".mascotaContenido #color");
    const raza = document.querySelector(".mascotaContenido #raza");
    const dueños = document.querySelector(".mascotaContenido #dueño");
    const fechaAdopcion = document.querySelector(
      ".mascotaContenido #fechaAdopcion"
    );
    Mascota.modificarMascota(
      mascotaActual,
      nombre.value,
      edad.value,
      color.value,
      raza.value,
      dueños.value,
      fechaAdopcion.value
    );
    guardarRegistrosNavegador();
    cargarTabla("TODOS", null);
    guardar.textContent = "Guardado";
    mascotaActual = null; // LIMPIAR MASCOTA ACTUAL
  });
  // CERRAR CARD
  const cerrar = document.querySelector("#cerrar");
  cerrar.addEventListener("click", () => {
    const card = document.querySelector(".display-none");
    card.style.display = "none";
    const body = document.querySelector(".overflow-scroll");
    body.style.overflow = "scroll";
    // CAMBIAR TEXTO GUARDAR POR SU TEXTO ORIGINAL
    // AL CERRAR EL MODAL
    const guardar = document.querySelector("#guardar");
    guardar.textContent = "Guardar cambios";
  });
}
// FUNCIONES PROPIAS PARA OPTIMIZAR EL CODIGO Y MODULARLO
// CONTADOR DE ADOPCIONES
function contadorAdopciones() {
  const span_contador = document.querySelector("#contador");
  const cantidadMascotas = Mascota.listaMascotas.length;
  span_contador.textContent = cantidadMascotas;
}
// MOSTRAR MASCOTA EN EL MODAL
function mostrarMascota(mascota) {
  // AGREGAR LOS VALORES AL HTML
  for (let propiedad in mascota) {
    // propiedad => nombre, edad, color, raza, dueño, fechaAdopcion, etapaDeVida
    if (propiedad == "dueño") {
      document.querySelector(`.mascotaContenido #${propiedad}`).value =
        mascota[propiedad];
    } else {
      document.querySelector(`.mascotaContenido #${propiedad}`).value =
        mascota[propiedad];
    }
  }
}
// ELIMINAR ESPACIOS VACIOS
function eliminarEspaciosVacios(arrayDueños) {
  let nombresFormateados = arrayDueños.reduce((acc, dueño) => {
    // Separar los nombres por la coma
    // De esto ['Briseida,  Antonio '] => ['  Briseida    ', '   Antonio  ']
    let separarNombres = dueño.split(",");
    // Evaluar cada nombre
    for (let i = 0; i < separarNombres.length; i++) {
      // Obtener el nombre
      let nombre = separarNombres[i]; // Briseida
      // Porcionar el nombre para evidenciar vacios
      let porcionarNombre = nombre.split(""); // ['B','r','i',....]
      // Cadena que reconstruye el nombre
      let reestructurarNombre = "";
      // Recorrer cada porcion del nombre
      for (let j = 0; j < porcionarNombre.length; j++) {
        // Encontrar espacios vacios " "
        let valor = porcionarNombre[j];
        // Si existe un valor diferente de espacio vacio " "
        if (valor !== " ") {
          // Concatenar el valor a la variable
          reestructurarNombre += valor;
        }
      }
      // Insertar el nombre evaluado y
      // reconstruido al array principal
      acc.push(reestructurarNombre);
    }
    // Retornar el array
    return acc;
  }, []);
  return nombresFormateados;
}
// TODOS LOS MENSAJE DEL SISTEMA
function mensajeDelSistema(propiedadesMascota, tipo, texto) {
  const div_mensaje = document.createElement("DIV");
  if (tipo === "CORRECTO") {
    div_mensaje.classList.add("mensajeSistemaCorrecto");
  } else if (tipo === "INCORRECTO") {
    div_mensaje.classList.add("mensajeSistemaInCorrecto");
  } else if (tipo === "CAJAS VACIAS") {
    div_mensaje.classList.add("cajasVacias");
  } else if ("AÑO_MES SIN REGISTROS") {
    div_mensaje.classList.add("añoMesSinRegistros");
  } else if (tipo === "RAZA SIN REGISTROS") {
    div_mensaje.classList.add("razaSinRegistros");
  } else if (tipo === "COLOR SIN REGISTROS") {
    div_mensaje.classList.add("colorSinRegistros");
  }
  const sistemaMensaje = document.createElement("p");
  sistemaMensaje.textContent = texto;
  div_mensaje.appendChild(sistemaMensaje);
  propiedadesMascota.appendChild(div_mensaje);
  setTimeout(() => {
    div_mensaje.remove();
  }, 3000);
}
