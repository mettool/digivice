var contenido = document.getElementById("digiData");

function inicio(){
    contenido = document.getElementById("digiData");
    digiData.className=("");
    contenido.innerHTML = "";
    contenido.innerHTML =
    `
    <h1>Placeholder de instrucciones/descripcion</h1>
    `;
}

function tabla(){

    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(resp => {
            crearTabla(resp);
        });
    
        contenido = document.getElementById("digiData");
        digiData.className=("");
        contenido.innerHTML = "";


    function crearTabla(resp){
        contenido.innerHTML = 
        `
        <table class="mx-auto text-center">
        <thead>
        <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nivel</th>
        </tr>
        </thead>
        <tbody id="digiTabla">
        </tbody>
        </table>`;
        let digivice = document.getElementById('digiTabla');
        for(var digimon of resp){
            digivice.innerHTML +=
            `
    <tr class="cardH" id="capturaModal" data-imagen="${digimon.img}" data-nombre="Nombre: ${digimon.name}" data-nivel="Nivel: ${digimon.level}" onclick="datosModal(this);">
    <td>
    <img src="${digimon.img}" id="capturaModal" class="img-lista">
    </td>
    <td>${digimon.name}</td>
    <td>${digimon.level}</td>
    </tr>
            `
        }
    };
    }

function grilla(){

fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
        crearTabla(resp);
    });

    contenido = document.getElementById("digiData");
    digiData.className=("");
    digiData.classList.add("row", "mx-auto", "text-center");
    contenido.innerHTML = "";

function crearTabla(resp){

    for(var digimon of resp){
        contenido.innerHTML +=
        `   
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
            <div class="card cardH my-2" id="capturaModal" data-imagen="${digimon.img}" data-nombre="Nombre: ${digimon.name}" data-nivel="Nivel: ${digimon.level}" onclick="datosModal(this);">
                <div class="card-body">
                        <img src="${digimon.img}" class="card-img-top img-thumbnail">
                    <h5 class="card-title">${digimon.name}</h5>
                    <p class="card-text">Nivel: ${digimon.level}</p>
                </div>
            </div>
        </div>
        ` 
    }
};
}

function datosModal(div) {
    document.querySelector('#capturaModal');
    var digiModal = document.getElementById("digiModal");
    var digiImg = div.dataset.imagen;
    var digiNombre = div.dataset.nombre;
    var digiNivel = div.dataset.nivel;
    // Aqui limpio el <div> objetivo para poder utilizarlo multiples veces.
    digiModal.innerHTML = "";
    // Escribo los datos que quiero mostrar.
    digiModal.innerHTML += `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${digiNombre}</h1>
    </div>
    <div class="modal-body mx-auto">
        <img src="${digiImg}" class="img-fluid rounded-start">
    </div>
    <div class="modal-footer">
    <h1 class="text-start fs-5">${digiNivel}</h1>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
    </div>
    `;
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    myModal.show();
}

/*
function select(){

    contenido = document.getElementById("digiData");
    digiData.className=("");
    contenido.innerHTML = "";
    contenido.innerHTML = `<select id="listaDigimon" class="card text-center mx-auto" style="width: 18rem;">
    <option>Selecciona un Digimon</option>
</select>
<br>
<div id="digiData2">
</div>
    `;



// Primero creamos el selector con los nombres de todos los Digimon usando una funcion
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
        crearSelector(resp);
    });


    function crearSelector(resp) {
        var selectNombre = document.getElementById('listaDigimon');
        for (let digimon of resp) {
        let option = document.createElement('option');
        option.text = digimon.name;
        selectNombre.appendChild(option);
        }
    };


    //Evento para llamar a la funcion que muestra los datos
    var selector = document.getElementById('listaDigimon');
    selector.addEventListener('change', fetchDigiData);
}
//Funcion que mostrara en pantalla el Digimon seleccionado del selector
    function fetchDigiData() {
        var selector = document.getElementById('listaDigimon');
        let listaDigimon = selector.value;
        let digivice = document.getElementById('digiData2');
        digivice.innerHTML = "";
        let url = `https://digimon-api.vercel.app/api/digimon/name/${listaDigimon}`;
        fetch(url)
    .then(response => response.json())
    .then(([digimon]) => {
        digivice.innerHTML = `
        <div class="card text-center mx-auto" style="width: 18rem;">
            <img class="card-img-top" src=${digimon.img}>
            <div class="card-body">
                <h5>${digimon.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Nivel: ${digimon.level}</li>            
            </ul>
        </div>        
        ` ;
    });
};
*/


let digimonData;

function select() {
  contenido = document.getElementById("digiData");
  digiData.className = ("");
  contenido.innerHTML = "";
  contenido.innerHTML = `<select id="listaDigimon" class="card text-center mx-auto" style="width: 18rem;">
    <option>Selecciona un Digimon</option>
  </select>
  <br>
  <div id="digiData2">
  </div>
  `;

  // Hacemos una sola llamada a la API al principio para obtener los datos de todos los Digimon
  fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
      // Almacenamos los datos de los Digimon en la variable digimonData
      digimonData = resp;
      crearSelector(digimonData);
    });

  //Evento para llamar a la funcion que muestra los datos
  var selector = document.getElementById('listaDigimon');
  selector.addEventListener('change', mostrarDigiData);
}

function crearSelector(resp) {
  var selectNombre = document.getElementById('listaDigimon');
  for (let digimon of resp) {
    let option = document.createElement('option');
    option.text = digimon.name;
    selectNombre.appendChild(option);
  }
}

function mostrarDigiData() {
  var selector = document.getElementById('listaDigimon');
  let listaDigimon = selector.value;
  let digivice = document.getElementById('digiData2');
  digivice.innerHTML = "";
  
  // Buscamos los datos del Digimon correspondiente en la variable global en lugar de hacer una llamada a la API
  let digimon = digimonData.find(d => d.name === listaDigimon);

  digivice.innerHTML = `
    <div class="card text-center mx-auto" style="width: 18rem;">
      <img class="card-img-top" src=${digimon.img}>
      <div class="card-body">
        <h5>${digimon.name}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Nivel: ${digimon.level}</li>            
      </ul>
    </div>        
  `;
}