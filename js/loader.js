"use strict"
var porcentaje = document.querySelector(".porcentaje");
const loader = document.querySelector(".loader-container");
const main = document.querySelector(".contenedor-general");
const body = document.querySelector("body");
var progreso = 0;

//1. Iniciamos el loader
function init(){
    setTimeout(() =>{
        loader.style.opacity = 0;
        loader.style.display = "none";
        main.style.display = "block";
        setTimeout(()=>(main.style.opacity = 1,body.style.backgroundColor = "#282D3D"), 50);
    }, 2300)
}
init();

//2. Animacion loader
function move(){
    setInterval(addFrame, 20) ;
    function addFrame(){
        if(progreso < 100){
            progreso = progreso + 1;
            porcentaje.innerHTML = progreso+"%";
        }
        
    }
}
move();
