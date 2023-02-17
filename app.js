let pagina= 1;
const btnAnterior= document.getElementById('btnAnterior')
const btnSiguiente= document.getElementById('btnSiguiente')

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

function getCharacter(done){

    const results = fetch("https://rickandmortyapi.com/api/character") ;

    results
        .then(response => response.json())
        .then(data =>{
            done(data)
        })
}

getCharacter(data => {
    data.results.forEach(personaje =>{

        const article = document.createRange().createContextualFragment(`
			<article>
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
})




getCharacter();
cargarPeliculas();

