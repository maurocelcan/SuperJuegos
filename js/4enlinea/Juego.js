document.addEventListener('DOMContentLoaded', () => { 
    class Juego{
        constructor(){
            //Variables Canvas
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            //Variables Botones
            this.btnIniciar = document.getElementById("btnIniciar").addEventListener("click", this.initJuego.bind(this));
            this.btnReiniciar = document.getElementById("btnReIniciar").addEventListener("click", this.reIniciarJuego.bind(this));
            //Variables Juego
            this.filas;
            this.columnas;
            this.num_ganador;
            this.cant_fichas;
            this.tam_ficha;
            this.radio;
            this.margen_tablero;
            this.ancho_tablero;
            this.inicio_tablero;
            this.fichasj1 = [];
            this.fichasj2 = [];
            this.turnoJugadorUno = true;
            this.turnoJugadorDos = false;
            this.cant_fichas = 20;
            this.mouseDown = this.mouseDown.bind(this);
            this.mouseMove = this.mouseMove.bind(this);
            this.mouseUp = this.mouseUp.bind(this);
        }
        //Iniciamos el juego
        initJuego() { 
            this.obtenerValorFichas();
            this.mostrarTimer(); 
            this.ocultarConfiguracion();
            this.mostrarCanvas();
            this.mostrarBotonReiniciar();     
            this.configurarJuego();
            this.calcularTablero();
            this.tablero = new Tablero(this.ctx, this.width, this.height, this.filas, this.columnas, this.inicio_tablero, this.tam_ficha, this.radio, this.num_ganador);
            this.inicializarTablero(this.tablero);
        }
        //Calculamos las caracteristicas del tablero
        calcularTablero() {
            this.ancho_tablero = this.columnas * this.tam_ficha;
            this.inicio_tablero = this.width / 2 - (this.ancho_tablero / 2);
            this.margen_tablero = this.height - this.filas * this.tam_ficha;
        }
        //Mostramos el timer
        mostrarTimer() {
            const timerElement = document.getElementById('timer');
            if (timerElement.classList.contains('ocultar')) {
              timerElement.classList.remove('ocultar');
            }
        }
        //Obtenemos el valor de las fichas
        obtenerValorFichas(){
            this.fillF1 = document.getElementById("fichaJ1").value;
            this.fillF2 = document.getElementById("fichaJ2").value;
        }
        //Ocultamos la configuracion del inicio
        ocultarConfiguracion() {
            document.getElementById('configuracionJuego').classList.add('ocultar');
        }
        //Mostramos el canvas
        mostrarCanvas() {
            document.getElementById('canvas-container').classList.remove('ocultar');
        }
        //Mostramos el boton reiniciar
        mostrarBotonReiniciar() {
            document.getElementById('btnReIniciar').classList.remove('ocultar');
        }
        //Configuramos las variables del juego elegidas por el usuario
        configurarJuego() {
            let select = this.elegirModo();
            this.filas = select.filas;
            this.columnas = select.columnas;
            this.num_ganador = select.numero_ganador;
            this.tam_ficha = select.tam_ficha;
            this.radio = select.radio;
            this.margen_tablero = this.height - this.filas * this.tam_ficha;
        }
        //Setiamos las variables
        elegirModo(){
            const modos = {
            4: {
            filas: 6,
            columnas: 7,
            numero_ganador: 4,
            tam_ficha: 60,
            radio: 22
            },
            5: {
            filas: 7,
            columnas: 8,
            numero_ganador: 5,
            tam_ficha: 58,
            radio: 20
            },
            6: {
            filas: 8,
            columnas: 9,
            numero_ganador: 6,
            tam_ficha: 49,
            radio: 16
            },
            7: {
            filas: 9,
            columnas: 10,
            numero_ganador: 7,
            tam_ficha: 45,
            radio: 15.5
            }
            
            };
            const modo = document.getElementById("modojuego").value;
            return modos[modo];
        }
        //Inicializamos el tablero
        inicializarTablero() {
            this.tablero.drawTablero();
            this.inicializarFichas();
            this.drawFichas();
        }
        //Inicializamos las fichas
        inicializarFichas(){
            this.fichasj1 = this.generarFichas(this.inicio_tablero - 50, (this.filas-1/2)*this.tam_ficha + this.margen_tablero, this.radio, "green", this.ctx, "jugador1", this.fillF1);
            this.fichasj2 = this.generarFichas(this.ancho_tablero + this.inicio_tablero + 50, (this.filas-1/2)*this.tam_ficha + this.margen_tablero, this.radio, "red", this.ctx, "jugador2", this.fillF2);
        }
        //Generamos las fichas
        generarFichas(posX, posYInicial, radio, color, ctx, jugador, fill) {
            let fichas = [];
            let posY = posYInicial;
            for (let i = 1; i <= this.cant_fichas / 2; i++) {
                let ficha = new Ficha(posX, posY, radio, color, ctx, jugador, fill);
                fichas.push(ficha);
                ficha.renderImg();
                posY = posY-10;
            }
            return fichas;
        }
        //Mostramos las fichas
        drawFichas(){
            this.clearCanvas();
            this.tablero.drawTablero();     
            this.fichasj2.forEach(ficha=>{
                ficha.draw();
            });
            this.fichasj1.forEach(ficha=>{
                ficha.draw();
            });
        }
        //Limpiamos el canvas
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        //Reiniciamos el juego
        reIniciarJuego() {
            btnReIniciar.classList.add('ocultar');
            document.getElementById('configuracionJuego').classList.remove('ocultar');
            document.getElementById('timer').classList.add('ocultar');
            this.clearCanvas();
            this.fichasj2 = [];
            this.fichasj1 = [];
        }
        //Iniciamos los eventos
        initEvents(){
            this.canvas.onmousedown = this.mouseDown;
            this.canvas.onmousemove = this.mouseMove;
            this.canvas.onmouseup = this.mouseUp;
        }
        //Evento al hacer click en la ficha
        mouseDown(event){
            let x = event.layerX - event.currentTarget.offsetLeft; 
            let y = event.layerY - event.currentTarget.offsetTop;
            let UltimaFichaj1 = this.fichasj1.length-1;
            let UltimaFichaj2 = this.fichasj2.length-1;
            if(this.fichasj2[UltimaFichaj2].checkSelected(x, y) && this.turnoJugadorDos==true && partidaTerminada==false){
                this.fichasj2[UltimaFichaj2].setIsSelected(true);
            }else{
                this.fichasj2[UltimaFichaj2].setIsSelected(false);
            }
            if(this.fichasj1[UltimaFichaj1].checkSelected(x, y) && this.turnoJugadorUno==true && partidaTerminada==false){
                this.fichasj1[UltimaFichaj1].setIsSelected(true);
            }else{
                this.fichasj1[UltimaFichaj1].setIsSelected(false);
            }
        }
        //Evento al mover el mouse con la fihca
        mouseMove(event){
            let x = event.layerX - event.currentTarget.offsetLeft; 
            let y = event.layerY - event.currentTarget.offsetTop;
            let UltimaFichaj1 = this.fichasj1.length-1;
            let UltimaFichaj2 = this.fichasj2.length-1;
        
            if(this.fichasj2[UltimaFichaj2] && this.fichasj2[UltimaFichaj2].isSelected() && this.turnoJugadorDos){
                
                this.fichasj2[UltimaFichaj2].move(x,y);  
                this.drawFichas();
            }
        
            if (this.fichasj1[UltimaFichaj1] && this.fichasj1[UltimaFichaj1].isSelected() && this.turnoJugadorUno){
                
                this.fichasj1[UltimaFichaj1].move(x,y);
                this.drawFichas();
            }
        }
        //Evento al soltar el mouse
        mouseUp(event) {
            let x = event.layerX - event.currentTarget.offsetLeft; 
            let y = event.layerY - event.currentTarget.offsetTop;
            let UltimaFichaj1 = this.fichasj1.length-1;
            let UltimaFichaj2 = this.fichasj2.length-1;
        
            if (x > this.inicio_tablero && x < (this.ancho_tablero+this.inicio_tablero) &&
                y > this.margen_tablero - (4*this.radio) && y < (this.margen_tablero+this.radio) 
                && this.fichasj2[UltimaFichaj2].isSelected() && this.turnoJugadorDos==true) {
                    this.turnoJugadorDos=false;
                    this.turnoJugadorUno=true;     
                    this.j1SetioFicha = true; 
                    this.tablero.setFicha(x, this.fichasj2[UltimaFichaj2]);
                    //fichasj2.shift(); 
                    this.fichasj2.pop(UltimaFichaj2);
            }else{
                this.fichasj2[UltimaFichaj2].move(this.ancho_tablero + this.inicio_tablero + 50, (this.filas-1/2)*this.tam_ficha + this.margen_tablero);
            }
        
            if (x > this.inicio_tablero && x < (this.ancho_tablero+this.inicio_tablero) &&
                y > this.margen_tablero - (4*  this.radio) && y < (this.margen_tablero+this.radio) 
                && this.fichasj1[UltimaFichaj1].isSelected() && this.turnoJugadorUno==true) {
                    this.turnoJugadorUno=false;
                    this.turnoJugadorDos=true;
                    this.j1SetioFicha = true;
                    this.tablero.setFicha(x, this.fichasj1[UltimaFichaj1]);
                    //fichasj1.shift();
                    this.fichasj1.pop(UltimaFichaj1);
                    
            }else{
                this.fichasj1[UltimaFichaj1].move(this.inicio_tablero - 50, (this.filas-1/2)*this.tam_ficha + this.margen_tablero);
            }   
        
            this.tablero.drawTablero();
            this.fichasj2[this.fichasj2.length-1].setIsSelected(false);
            this.fichasj1[this.fichasj1.length-1].setIsSelected(false);
            this.drawFichas();
            this.inicializarFichas();   
                
        }
    }
    let juego = new Juego();
    juego.initEvents();
});



 