"use strict"
//1. Tiempo para estreno del juego
const targetDate = new Date("Feb 28, 2023 15:00:00").getTime();
const countDown = setInterval(function() {
const now = new Date().getTime();
const distance = targetDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = (days < 10) ? "0" + days : days;
    document.getElementById("hours").innerHTML = (hours < 10) ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = (minutes < 10) ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = (seconds < 10) ? "0" + seconds : seconds;
  
  if (distance < 0) {
    clearInterval(countDown);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

//2. Animacion Menu Hamburguesa
let menuBurger = document.getElementById('btn-menu');
let cruz = document.getElementById('cruz');
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    var nav = document.querySelector("nav");
    var cruz = document.querySelector("#span");
    header.classList.toggle("scrolling", window.scrollY>0);
    nav.classList.toggle("scrolling",window.scrollY>0);
    //cruz.classList.toggle("scrolling",window.scrollY>0 );
    
})
menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('active');
    menuBurger.classList.toggle('not-active');
    document.getElementById('divMenuHamburguesa').classList.toggle('nav-active');
    
});

//3. Animacion Nav Menu Hamburugesa
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

//4. Animacion Nav Profile
document.getElementById('btn-profile').addEventListener('click', () => {
    document.getElementById('nav-profile').classList.toggle('show-profile');
});

//5. Animacion Volver al inicio
var btnScrollTop = document.querySelector("#scrollToTop");
btnScrollTop.addEventListener("click", () => {
    window.scrollTo(0,0);
})

//6. Animacion Carruseles
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
function generarFlechas() {
    generarFlecha(1);
    generarFlecha(2);
    generarFlecha(3);
    generarFlecha(4);
    generarFlecha(5);
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
function renderIndicadores (imagenesXpagina){
    renderIndicador(1, imagenesXpagina);
    renderIndicador(2, imagenesXpagina);
    renderIndicador(3, imagenesXpagina);
    renderIndicador(4, imagenesXpagina);
    renderIndicador(5, imagenesXpagina);
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
                    let urlImgHover = imagen.getAttribute('src').replace('.','_hover.');
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
function renderHovers() {
    renderHover(1);
    renderHover(2);
    renderHover(3);
    renderHover(4);
    renderHover(5);
}
function renderDesktop() {
    let sectionCarruseles = document.querySelector('.section-carruseles');
    let imagenes = sectionCarruseles.querySelectorAll('img');
    imagenes.forEach(img => {
        let src = img.getAttribute('src').replaceAll('_hover','');
        img.setAttribute('src', src);
    });
}
function renderMobile() {
    let sectionCarruseles = document.querySelector('.section-carruseles');
    let imagenes = sectionCarruseles.querySelectorAll('img');

    imagenes.forEach(img => {
        if(!img.getAttribute('src').includes('_hover')) {
            let urlImgHover = img.getAttribute('src').replace('.','_hover.');
            img.setAttribute('src',urlImgHover);
        }
    });
}
const mediaQuery1 = window.matchMedia("(max-width: 450px)");
const mediaQuery4 = window.matchMedia("(min-width: 451px)");
function handleTabletChange1(e) {
    if (e.matches) {
        renderIndicadores(2);
        renderMobile();
    }
}
function handleTabletChange4(e) {
    if (e.matches) {
        renderIndicadores(5);
        renderDesktop();
    }
}
if (window.matchMedia("(min-width: 451px)").matches){
    renderIndicadores(5);
} else {
    renderIndicadores(2);
}
//renderIndicadores(5);
generarFlechas();
renderHovers();

// Register event listener
mediaQuery1.addListener(handleTabletChange1);
mediaQuery4.addListener(handleTabletChange4);

let footer = document.getElementById('fat_footer');
let footer_menu = footer.querySelectorAll('.fatFooter-category');
for (var i = 0; i < footer_menu.length; i++) {
    footer_menu[i].addEventListener('click', (e) => {
        e.currentTarget.parentNode.querySelector('span').classList.toggle('showCategory');     
    });
}



