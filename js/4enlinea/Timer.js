class Timer {
    constructor() {
      this.btnIniciar = document.querySelector("#btnIniciar").addEventListener("click", this.startTime.bind(this));
      this.btnReiniciar = document.querySelector("#btnReIniciar").addEventListener("click", this.stop.bind(this));
      this.timer = document.querySelector("#timer");
      this.turnoJugadorDos;
      this.turnoJugadorUno;
      this.iniciar;
      this.tiempo = 300;
    }
    //1. Iniciamos el timer
    startTime() {
        this.tiempo = 300;
        this.timer.innerHTML = "Tiempo restante: " + this.tiempo;
        this.iniciar = setInterval(this.actualizaTiempo.bind(this), 1000);
        partidaTerminada = false;
    }
    //2. Frenamos el timer
    stop(){
        this.tiempo = 300;
        clearInterval(this.iniciar);
    }
    //3. Actualizamos el timer x segundo
    actualizaTiempo(){
        this.timer.innerHTML = "Tiempo restante: " + this.tiempo;
        this.tiempo--;
        if(partidaTerminada) {
            this.stop();
            this.timer.innerHTML = "";
        }
        if(this.tiempo == 0) {
            this.stop();
            this.timer.innerHTML = 'Partida terminada';
            this.turnoJugadorUno = false;
            this.turnoJugadorDos = false;
        }
    }
}
let timer = new Timer();

