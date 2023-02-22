
const boton =document.querySelector('#boton');/*random*/
const foto =document.querySelector('#foto');/*random*/
const nombre =document.querySelector('#nombre');/*random*/
const correo =document.querySelector('#correo');/*random*/
const telefono =document.querySelector('#telefono');/*random*/


let pagina= 1;
const btnAnterior= document.getElementById('btnAnterior')/*peliculas*/
const btnSiguiente= document.getElementById('btnSiguiente')/*peliculas*/

/*peliculas*/

btnSiguiente.addEventListener('click', () => {
    
    if(pagina<100){
    pagina += 1;
    cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina>1){
    pagina -= 1;
    cargarPeliculas();
    }
})


const cargarPeliculas = async() => {

    try {

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4826999ea3c1f06d88cecf27a7dadc72&page=${pagina}`); 

    console.log (respuesta);

    if(respuesta.status === 200){
        const datos = await respuesta.json();
        
        let peliculas = '';
        datos.results.forEach(pelicula =>{
            peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
        })

        document.getElementById('contenedor').innerHTML =peliculas;


    }else if(respuesta.status === 401){
        console.log('codigo erroneo')
    }else if(respuesta.status === 404){
        console.log('la pelicula no existe')
    }

    } catch(error ){
        console.log(error);
    }
}

/*Rick & MOrty*/
function getCharacters() {
    return new Promise((resolve, reject) => {
        fetch("https://rickandmortyapi.com/api/character")
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

getCharacters().then(data => {
    data.results.forEach(personaje =>{
        const article = document.createRange().createContextualFragment(`
            <article class="rick">
                <div class="image-container">
                    <img src="${personaje.image}" alt="Personaje"/>
                </div>
                <h2>${personaje.name}</h2>
                <span>${personaje.status}</span>
            </article>
        `)

        const main =document.querySelector("main");
        main.append(article);
    })
}).catch(error => {
    console.error(error);
});



/*random*/

const generarUsuario = async() => {

    try {
    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const {results} = await respuesta.json();
    const datos = results[0];

    foto.src=datos.picture.medium;
    nombre.textContent=datos.name.first;
    correo.textContent=datos.email;
    telefono.textContent=datos.phone;


    console.log(datos);
} catch (error){
    console.log(error);
}
}


boton.addEventListener('click', generarUsuario)
document.addEventListener('DOMContentLoaded', generarUsuario);


/*Breaking Bad ==== api caida*/
/*const botonBad =document.querySelector("#botonBad")

const autorBad =document.querySelector("#autorBad")
const fraseBad =document.querySelector("#fraseBad")

const consultarApiBad = async() => {
    const random = Math.ceil(Math.random() * 10);

    try {
        const urlBad = 'https://www.breakingbadapi.com/api/quotes/' + random;
        const respuestaBad =await fetch (urlBad);
        const dataBad =await respuestaBad.json();
        mostrarHtmlBad(dataBad[0]);
    }catch (error) {
        console.log(error);
    }
}
console.log(urlBad)

const mostrarHtmlBad =({quote, author}) => {
    fraseBad.textContent = quote;
    fraseBad.textContent = quote;
}

botonBad.addEventListener('click', consultarApiBad)
document.addEventListener('DOMContentLoaded', consultarApiBad);*/


/*Pokemon*/
const pokeCard =document.querySelector('[data-poke-card]');
const pokeName =document.querySelector('[data-poke-name]');
const pokeImg =document.querySelector('[data-poke-img]');
const pokeImgContainer =document.querySelector('[data-poke-img-container]');
const pokeId =document.querySelector('[data-poke-id]');
const pokeTypes =document.querySelector('[data-poke-types]');
const pokeStats =document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
        fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}
    const renderPokemonData = data => {
    const sprite= data.sprite.front_default;
    const {stats, types} = data;

    pokeName.textContent =data.name;
    pokeImg.setAttribute ('src', sprite);
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    }






getCharacters();
cargarPeliculas();



