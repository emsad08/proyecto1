// Variables principales
const tareaInput = document.getElementById('tarea-input');
const agregarBtn = document.getElementById('agregar-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorTareasCompletadas = document.getElementById('contador-tareas-completadas');
const contadorTareasPendientes = document.getElementById('contador-tareas-pendientes');
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

function manejarAcciones(e){
  // Estableciendo el comportamiento de los botones de la lista 
  // Tachar (completar) y eliminar 
  // .target = Obtiene el elemento donde te encuentras 
  // .parentElement Accede al elemento padre (un nivel arriba respecto del nivel donde te encuentras)
  // querySelector = Selecciona Elementos en tu documento HTML (DOM)  
  // classList = Lista todas las clases del elemento seleccionado 
  //  contains = devuelve un true o false si tiene la clase que le estas preguntando
  // .toggle = Agrega o elimina una clase de tu elemento. 
  
  // Boton Tachar 
  if(e.target.classList.contains('completar-btn')){
      e.target.parentElement.parentElement.querySelector('span').classList.toggle('text-decoration-line-through');
  }

  // Boton Eliminar 
  if(e.target.classList.contains('eliminar-btn')){
    e.target.parentElement.parentElement.remove();
  }

  guardarTareas();
  actualizarContador();
}

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
    li.innerHTML = `
       <span>${tarea}(${categoria})</span>
       <div>
         <button class="btn btn-success btn-sm completar-btn">✔</button>
         <button class="btn btn-danger btn-sm eliminar-btn">✖</button>
       </div>
    `;

    /*
      <ul id="lista-tareas">
          <li class="list-group-item">
              <span>Tarea 1</span>
              <div>
                <button class="btn btn-success btn-sm completar-btn">✔</button>
                <button class="btn btn-danger btn-sm eliminar-btn">✖</button>
              </div>
          </li>
      </ul>
    */

      listaTareas.appendChild(li);
      tareaInput.value='';

        
     // Guardar en localStorage

     guardarTareas();
     actualizarContador();
    
}

//Local Storage
/**
 * Espacio de Almacenamiento dentro de nuestro navegador:
 * 
 * Propiedades 
 * 1. Solo Guarda Texto 
 * 2. Guarda la informacion b<jo un 'key' 
 * 3. Solo devuelve String o texto 
 * 
 * Metodos 
 * 1. JSON.stringify() para convertir  array u objetos en texto  
 * 2. localStorage.setItem(key)
 * 3. localStorage.getItem(key)
 * 4. localStorage.removeItem(key)
 * 5. localStorage.clearItem(key)
 */

function guardarTareas(){
   const tareas = [];
  document.querySelectorAll('.list-group-item').forEach(
    item => {
        const texto = item.querySelector('span').innerText;
        const completada = item.querySelector('span').classList.contains('text-decoration-line-through');
        tareas.push([texto, completada]);
    } 
  );

    localStorage.setItem('tareas',JSON.stringify(tareas));
    //console.log(tareas);
}

   

function cargarTareas(){
    const tareasGuardadas =  JASON.parse(localStorage.getItem('tareas')) ||  [];
    tareasGuardadas.forEach(
      tarea => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
          <span class="${tarea.completada ? 'text-decoration-line-through': ''}">${tarea.texto}</span>
          <div>
               <button class="btn btn-sm btn-success completar-btn">✔</button>
               <button class="btn btn-sm btn-danger eliminar-btn">✖</button>
          </div>
        `;
        listaTareas.appendChild(li);
      }
    );

    actualizarContador();
  
}


function actualizarContador(){

  const tareasCompletadas = document.querySelectorAll('.text-decoration-line-through').length;
  contadorTareasCompletadas.textContent = `${tareasCompletadas} Tareas Completadas`;
  console.log('Tareas Completadas', tareasCompletadas);

  const tareasPendientes = document.querySelectorAll(
    '.list-group-item:not(:has(span.text-decoration-line-through))'
  ).length;

  contadorTareasPendientes.textContent = `${tareasPendientes} Tareas Pendientes`;
  console.log('Tareas Pendientes');

}

