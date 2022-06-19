const nombre = document.querySelector(".nombre");
const numero = document.querySelector(".numero");
const direccion = document.querySelector(".direccion");
const agregarTarea = document.querySelector(".agregar-tarea");
const listaTareas = document.querySelector(".lista-tareas");

const dataBase = window.localStorage;

agregarTarea.onclick = () => {
  let contact = {
    id: Math.random(1, 100),
    nombre: nombre.value,
    numero: numero.value,
    direccion: direccion.value,
  };
  guardarContacto(dataBase, contact);
};

//////////////////
const guardarContacto = (dataBase, contact) => {
  //Muestra objetos en Json
  dataBase.setItem(contact.id, JSON.stringify(contact));
  //Recarga la pagina
  window.location.href = "/";
};

const añadiendoContacto = (parentNode, contacto, dataBase) => {
  let divContacto = document.createElement("div");
  let nombreContacto = document.createElement("h3");
  let numeroContacto = document.createElement("p");
  let direccionContacto = document.createElement("p");
  let iconoEliminar = document.createElement("span");
  nombreContacto.innerHTML = contacto.nombre;
  numeroContacto.innerHTML = contacto.numero;
  direccionContacto.innerHTML = contacto.direccion;
  iconoEliminar.innerHTML = "delete";

  divContacto.classList.add("tarea");
  iconoEliminar.classList.add("material-symbols-outlined", "icono");
  iconoEliminar.onclick = () => {
    dataBase.removeItem(contacto.id);
    window.location.href = "/";
  };
  divContacto.appendChild(nombreContacto);
  divContacto.appendChild(numeroContacto);
  divContacto.appendChild(direccionContacto);
  divContacto.appendChild(iconoEliminar);

  parentNode.appendChild(divContacto);
};
const cargar = (dataBase, parentNode) => {
  let claves = Object.keys(dataBase);

  for (claves of claves) {
    let contacto = JSON.parse(dataBase.getItem(claves));
    añadiendoContacto(parentNode, contacto, dataBase);
  }
};

cargar(dataBase, listaTareas);
