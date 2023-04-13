// Primero creamos el selector con los nombres de todos los Digimon usando una funcion
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
        crearSelector(resp);
    });


    function crearSelector(resp) {
        let selectNombre = document.getElementById('listaDigimon');
        for (let digimon of resp) {
        let option = document.createElement('option');
        option.text = digimon.name;
        selectNombre.appendChild(option);
        }
    };

//Luego creamos la funcion que mostrara en pantalla el Digimon seleccionado del selector
    function fetchDigiData() {
        let selector = document.getElementById('listaDigimon');
        let listaDigimon = selector.value;
        let digivice = document.getElementById('digiData');
        digivice.innerHTML = "";
        let url = `https://digimon-api.vercel.app/api/digimon/name/${listaDigimon}`;
        fetch(url)
    .then(response => response.json())
    .then(([digimon]) => {
        digivice.innerHTML = `
        <div class="card text-center mx-auto" style="width: 10rem;">
            <img class="card-img-top" src=${digimon.img}>
            <div class="card-body">
                <h5>${digimon.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${digimon.level}</li>            
            </ul>
        </div>
        ` ;
    });
};
    
    //Evento para llamar a la funcion
    let selector = document.getElementById('listaDigimon');
    selector.addEventListener('change', fetchDigiData);