"use strict";
//1. Animacion compartir
var compartir = document.querySelector("#compartir");
var redesJuego = document.querySelector("#redesJuego");
compartir.addEventListener("click", () => {
    redesJuego.classList.toggle("redesJuego")
});
//2. Flechas carrusel
function generarFlecha(id) {
    var flechaizquierda = document.getElementById('flecha-izquierda-' + id);
    var flechaderecha = document.getElementById('flecha-derecha-' + id);
    var fila = document.getElementById('contenedor-carrusel-' + id);
    var indicadores = document.getElementById('indicadores-' + id);
    var juegos = document.getElementById('carrusel-' + id).querySelectorAll('.juego');

    flechaizquierda.addEventListener('click', () => {
        flechaizquierda.classList.add('flecha-oculta');
    
        fila.scrollLeft -= fila.offsetWidth;
    
        const indicadoractivo = indicadores.querySelector('.indicadores .activo');
        
        if(indicadoractivo.previousSibling?.tagName == 'BUTTON') {
            indicadoractivo.previousSibling.classList.add('activo');
            indicadoractivo.classList.remove('activo');
        }
    
        juegos.forEach(juego => juego.classList.remove('hover'));
    
        setTimeout(() => {
            flechaizquierda.classList.remove('flecha-oculta');
        }, 500);
    });
    
    flechaderecha.addEventListener('click', () => {
        flechaderecha.classList.add('flecha-oculta');
    
        fila.scrollLeft += fila.offsetWidth;
    
        const indicadoractivo = indicadores.querySelector('.indicadores .activo');
        if(indicadoractivo.nextSibling){
            indicadoractivo.nextElementSibling.classList.add('activo');
            indicadoractivo.classList.remove('activo');
        }
    
        juegos.forEach(juego => juego.classList.remove('hover'));
     
        setTimeout(() => {
            flechaderecha.classList.remove('flecha-oculta');
        }, 500);
    });
}
function renderIndicador(id, imagenesXpagina) {
    var juegos = document.getElementById('carrusel-' + id).querySelectorAll('.juego');
    var numeroPag = Math.ceil(juegos.length / imagenesXpagina);

    var div = document.getElementById('indicadores-' + id);
    var fila = document.getElementById('contenedor-carrusel-' + id);
    div.innerHTML = '';

    for (let i = 0; i < numeroPag; i++) {
        const indicator = document.createElement('button');
    
        if (i == 0) {
            indicator.classList.add('activo');
        }
        
        div.appendChild(indicator);  
        indicator.addEventListener('click', (e) => {
            fila.scrollLeft = i * fila.offsetWidth;  
            div.querySelector('.indicadores .activo').classList.remove('activo');
            e.target.classList.add('activo');
        });
    }
}
function renderHover (id) {
    var juegos = document.getElementById('carrusel-' + id).querySelectorAll('.juego');

    juegos.forEach((juego) => {
        juego.addEventListener('mouseenter', (e) => {
            var elemento = e.currentTarget;
            setTimeout(() => {
                juegos.forEach(juego => juego.classList.remove('hover'));
                elemento.classList.add('hover');
    
                let imagen = elemento.querySelector('img');
                if(!imagen.getAttribute('src').includes('_hover')) {
                    //Solo para desktop
                    //Reemplazamos la img sin hover por la con hover
                    let urlImgHover = imagen.getAttribute('src').replace('.png','_hover.png');
                    imagen.setAttribute('src',urlImgHover);
                }
            }, 200);
        });
    
        juego.addEventListener('mouseleave', (e) => {
            var elemento = e.currentTarget;
            setTimeout(() => {
                elemento.classList.remove('hover');
                let imagen = elemento.querySelector('img');
                let urlImg = imagen.getAttribute('src').replaceAll('_hover','');
                imagen.setAttribute('src', urlImg);
            }, 200);
        });
    });
}
function generarFlechas() {
    generarFlecha(1);
    generarFlecha(2);
}
function renderIndicadores (imagenesXpagina){
    renderIndicador(1, imagenesXpagina);
    renderIndicador(2, imagenesXpagina);
}
function renderHovers() {
    renderHover(1);
    renderHover(2);
}
renderIndicadores(5);
generarFlechas();
renderHovers();