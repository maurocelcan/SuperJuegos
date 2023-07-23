"use strict"

//1.Opacidad titulo principal
let menuBurger = document.getElementById('btn-menu');
let cruz = document.getElementById('cruz');
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    var nav = document.querySelector("nav");
    var titulo = document.querySelector(".lanzamiento-inicio-pubg-h1");
    var p = document.querySelector(".lanzamiento-inicio-pubg-p");
    var btn = document.querySelector(".lanzamiento-inicio-pubg-btn");
    
    header.classList.toggle("scrolling", window.scrollY>0);
    nav.classList.toggle("scrolling",window.scrollY>0);
    titulo.classList.toggle("scrolling",window.scrollY>0);

    if(window.scrollY>0){
        titulo.style.opacity = (1 - scrollY*2 / 250);
        p.style.opacity = (1 - scrollY*2 / 250);
        btn.style.opacity = (1 - scrollY*2 / 250);
    }
})
//2.Menu Hamburguesa 
menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('active');
    menuBurger.classList.toggle('not-active');
    document.getElementById('divMenuHamburguesa').classList.toggle('nav-active');
    
});
//3. Nav Menu Hamburguesa
let nav =  document.getElementById('nav');
document.getElementById('btn-menu').addEventListener('click', () => {
    nav.classList.toggle('show');
    if(nav.classList.contains("site-nav-open")) {
        nav.classList.remove("site-nav-open");
        nav.classList.add("site-nav-closed");
    } else {
        nav.classList.remove("site-nav-closed");
        nav.classList.add("site-nav-open");
    }
});
//4. Nav Menu Profile
document.getElementById('btn-profile').addEventListener('click', () => {
    document.getElementById('nav-profile').classList.toggle('show-profile');
});
//5.Scroll al inicio
var btnScrollTop = document.querySelector("#scrollToTop");
btnScrollTop.addEventListener("click", () => {
    window.scrollTo(0,0);
})
//6.Generar Flechas Carrusel
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
//7. Generar Flechas por ID
function generarFlechas() {
    generarFlecha(1);
}
//8. Generar indicadores Carrusel
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
function renderIndicadores (imagenesXpagina){
    renderIndicador(1, imagenesXpagina);
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
                let urlImg = imagen.getAttribute('src').replaceAll('_hover.png','.png');
                imagen.setAttribute('src', urlImg);
            }, 200);
        });
    });
}
function renderHovers() {
    renderHover(1);
}
function renderDesktop() {
    let sectionCarruseles = document.querySelector('.section-carruseles');
    let imagenes = sectionCarruseles.querySelectorAll('img');
    imagenes.forEach(img => {
        let src = img.getAttribute('src').replaceAll('_hover.png','.png');
        img.setAttribute('src', src);
    });
}
generarFlechas();
renderHovers();
renderIndicadores(5);
renderDesktop();

//9. Animacion Parallax
const parallax = document.querySelector(".lanzamiento-main");
window.addEventListener("scroll", function(){
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.1 + "px";
})

//10. Animaciones Card Mapas
function reveal() {
    var reveals = document.querySelectorAll(".mapa-juego");


    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 240;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");//clase que hace efecto de entrada
            reveals[i].classList.remove("goodbye");//clase que hace efecto de irse
            if (i%2==0){
                reveals[i].classList.add("fade-left");
                reveals[i].classList.remove("bye-left");
            }else{
                reveals[i].classList.add("fade-right");
                reveals[i].classList.remove("bye-right");
            }
        } else {
            reveals[i].classList.remove("active");//clase que hace efecto de entrada
            reveals[i].classList.add("goodbye");//clase que hace efecto de irse
            if (i%2==0){
                reveals[i].classList.remove("fade-left");
                reveals[i].classList.add("bye-left");
            }else{
                reveals[i].classList.remove("fade-right");
                reveals[i].classList.add("bye-right");
            }
        }
    }
  }
window.addEventListener("scroll", reveal);

//11. Titulo Galeria Personajes con Animacion
var titulo = document.querySelector("#titulo-personajes");
var tarjetapj = document.querySelectorAll(".lanzamiento-slide");
titulo.style.opacity = 0.1;
var distance=0;
var movimiento = 30
titulo.style.transform = `translateY(-${movimiento*2}px)`;
tarjetapj.forEach(pj => {
    pj.style.transform = `translateY(${movimiento}px)`;
    pj.style.opacity = 0.1;
});
window.addEventListener("scroll", function(){
    var windowHeight = window.innerHeight;
    var elementTop = titulo.getBoundingClientRect().top;
    var elementVisible = 300;
    var distanceNow = window.scrollY;

    if(elementTop < (windowHeight - elementVisible) && titulo.style.opacity<1 && distanceNow>distance && movimiento>0){    
        titulo.style.opacity = titulo.style.opacity*1.2;
        titulo.style.transform = `translateY(-${movimiento*2}px)`;
        tarjetapj.forEach(pj => {
            pj.style.transform = `translateY(${movimiento}px)`;
            pj.style.opacity = pj.style.opacity * 1.2;
        });
        
        movimiento = movimiento -2;
    }else if (elementTop > (windowHeight - elementVisible) && distanceNow<distance && titulo.style.opacity>0.1){
        titulo.style.opacity = titulo.style.opacity*0.9;
        titulo.style.transform = `translateY(-${movimiento*2}px)`;
        tarjetapj.forEach(pj => {
            pj.style.transform = `translateY(${movimiento}px)`;
            pj.style.opacity = pj.style.opacity * 0.9;
        });
        
        movimiento = movimiento +2;
    }

    if (movimiento>30){
        movimiento = 30;
    }
    
    distance=distanceNow;
    
})

//12. Animacion Carrusel Lanzamiento
document.querySelector("#flecha-derecha-1").addEventListener("click", animationCardsLeft);
document.querySelector("#flecha-izquierda-1").addEventListener("click", animationCardsLeft);
const newspaperSpinning = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
const newspaperTiming = {
    duration: 2000,
    iterations: 1,
}
function animationCardsLeft(){
    let cards = document.querySelectorAll(".juego");
    cards.forEach(card => card.animate([
        // keyframes
        { transform: 'scale(1)'},
        { transform: 'scale(0.5)'},
        { transform: 'scale(1)' }
      ], {
        // timing options
        duration: 500,
        iterations: 1
      })
    )}

   