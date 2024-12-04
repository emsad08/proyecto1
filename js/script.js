// Variables principales
const tareaInput = document.getElementById('tarea-input');
const agregarBtn = document.getElementById('agregar-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorTareasCompletadas = document.getElementById('contador-tareas-completadas');
const contadorTareasPendientes = document.getElementById('contador-tareas-completadas');
const categoriaSelect = document.getElementById('categoria-select');

// Document es el DOM, el contenido de HTML que estamos manipulando. 

// Cargar Tareas guardadas al iniciar 

document.addEventListener('DOMContentLoaded',cargarTareas);
// e = evento 
// DOMContentLoaded
/**
 * El evento que ocurre cuando el navegador ha terminado de cargar completamente el documento HTML
 * y ha ocurrido el DOM (Document Object Model)
 */

// Evento para agregar las Tareas
agregarBtn.addEventListener('click',agregarTarea);
tareaInput.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        agregarTarea();
    }
});


// Evento para manejar acciones en la lista 
listaTareas.addEventListener('click',manejarAcciones);

// Funcion: Agregar Tarea 
function agregarTarea(){
    const tarea = tareaInput.value.trim();  //  .trim elimina espacios al inicio y al final 
    const categoria = categoriaSelect.value;

    if(tarea === ''){
        alert('Por Favor, escribe una tarea');
        return;        
    }
    const li  = document.createElement('li');
    li.className = 'list-group-item';
}