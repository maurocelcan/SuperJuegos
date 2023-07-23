class Tablero {
    constructor(ctx, width, height, filas, columnas, inicio_tablero, tam_ficha, radio, num_ganador) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;       
        this.casilla = null;
        this.matriz = [];
        this.inicio_tablero = inicio_tablero;
        this.crearMatriz();
        this.tam_ficha = tam_ficha;
        this.margen_tablero = this.height - this.filas*this.tam_ficha;
        this.radio = radio;
        this.num_ganador = num_ganador;
        this.turnoJugadorUno = true;
        this.turnoJugadorDos = false;
    }
    //1. Dibujamos el tablero
    drawTablero() {
        let iniciox = this.inicio_tablero;
        for(let i = 0; i < this.columnas; i++) {
            for(let j = 0; j < this.filas; j++) {
                let px = iniciox + this.tam_ficha/2 + i*this.tam_ficha;
                let py = this.margen_tablero + j*this.tam_ficha + this.tam_ficha/3;
                this.ctx.fillStyle = "grey";
                this.ctx.fillRect(iniciox + i*this.tam_ficha, py - this.tam_ficha/2 , this.tam_ficha, this.tam_ficha);
                this.ctx.beginPath();
                let ficha = new Ficha(px, py, this.radio, this.matriz[i][j].fill, this.ctx, this.matriz[i][j].jugador, this.matriz[i][j].img)
                ficha.draw();
                this.ctx.closePath(); 
            }
        }
    }
    //2. Setiamos la matriz equivalante al tablero
    crearMatriz(){
        for(let i = 0; i < this.columnas; i++) {
            this.matriz[i] = new Array(this.filas);
            for(let j = 0; j < this.filas; j++) {
                let px = this.inicio_tablero + this.tam_ficha/2 + i*this.tam_ficha;
                let py = this.margen_tablero + j*this.tam_ficha;
                this.matriz[i][j] = new Ficha(px, py, this.radio, "white", this.ctx);
            }
        }
    }
    //3. Setiamos la ficha en la matriz
    setFicha(x, ficha){
        let posX = parseInt((x-this.inicio_tablero)/(this.tam_ficha));
        let filaElegida = this.matriz[posX];
        let posY = this.filas-1;
        while (posY>0 && filaElegida[posY].fill!= "white"){
            posY--;
        }
        if (posY>=0 && filaElegida[posY].fill == "white"){
            filaElegida[posY] = ficha;
        }
        if(this.checkGanador(posX, posY, ficha.jugador)){
            partidaTerminada = true;
            setTimeout(function(){
                swal({  title: "Partida terminada!",
                        text:  "Ganador: " + ficha.jugador,
                        icon: ficha.img
                    });
            }, 100);
            this.turnoJugadorUno = false;
            this.turnoJugadorDos = false;        
        }
    }
    //4. Chequiamos si hay un ganador
    checkGanador(x,y,jugador){
        let modo = this.num_ganador;
        if (this.checkHorizontal(y,modo, jugador)
         || this.checkVertical(x,modo, jugador) 
         || this.checkDiagonalUno(x,y,modo,jugador)
         || this.checkDiagonalDos(x,y,modo,jugador))
            {
            partidaTerminada = true;
            return true;
        }
        return false;
    }
    //5. Chequeo horizontal
    checkHorizontal(fila,modo, jugador){
        let hayGanador = false
        let col =0;
        let cant =0;
        while (col < this.columnas && hayGanador == false) {
            if(this.matriz[col][fila].jugador == jugador && cant < modo) {
                cant++;
            }else{
            cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            col++;
      
        }
        return hayGanador;
    }
    //6. Chequeo Vertical
    checkVertical(col,modo, jugador){
        let hayGanador = false
        let fila =0;
        let cant =0;
        while (fila < this.filas && hayGanador == false) {
            if(this.matriz[col][fila].jugador == jugador && cant < modo) {
                cant++;
            }else{
            cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            fila++;
      
        }
        return hayGanador;
    }
    //7. Chequeo Diagonal
    checkDiagonalUno(col,fila,modo,jugador){
        let hayGanador = false;
        let cant=0;
        while (fila>0 && col>0){//llevo fila y columna a la primer posición de la diagonal (arriba a la izquierda)
            fila--;
            col--;
        }
        while (fila < this.filas && col <this.columnas && hayGanador == false) {
            if(this.matriz[col][fila].jugador == jugador && cant < modo) {
                cant++;
            }else{
                cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            fila++;
            col++;
        }
        return hayGanador;
    }
    //8. Chequeo Diagonal
    checkDiagonalDos(col,fila,modo,jugador){
        let hayGanador = false;
        let cant=0;
        while (fila>0 && col<this.columnas-1){//llevo fila y columna a la primer posición de la diagonal (arriba a la derecha)
            fila--;
            col++;
        }
        while (fila < this.filas && col >=0 && hayGanador == false) {
            if(this.matriz[col][fila].jugador == jugador && cant < modo) {
                cant++;
            }else{
                cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            
            fila++;
            col--;
        }
        return hayGanador;
    }
}
let partidaTerminada = false;