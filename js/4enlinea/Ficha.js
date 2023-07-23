class Ficha {
    constructor(posX, posY, radius, fill, context, jugador, img) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.radius = radius;
        this.jugador = jugador;
        const imagen = new Image();
        this.img = img;
        imagen.src = img;
        this.imagen = imagen;
        this.cargoImg = false;
        this.selected;
    }
    //Dibujamos la ficha
    draw() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();

       if (this.img != undefined) {
            if (this.cargoImg) {
                this.context.drawImage(this.imagen, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
            }
            else {
                //this.getImagen().onload = () => {
                this.context.drawImage(this.imagen, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
                this.cargoImg = true;
            }
        }
        this.context.closePath();

    }
    //Renderizamos su imagen
    renderImg() {
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.getImagen().onload = () => {
            this.context.drawImage(this.getImagen(), this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
        this.cargoImg = true;
        this.context.closePath();
    }
    //Obtenemos la imagen
    getImagen() {
        return this.imagen;
    }
    //Chequiamos si la ficha esta seleccionada
    checkSelected(x, y) {
        let _x = this.posX - x;//posicion del circulo - la posicion x donde esta el mouse
        let _y = this.posY - y ; //posicion del circulo - la posicion y donde esta el mouse
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
        //si la distancia es menor al radio, estoy adentro del circulo
    }
    //Verificamos si esta seleccionada
    isSelected(){
        return this.selected;
    }
    //Cambiamos la seleccion a true o false
    setIsSelected(selected){
        this.selected = selected;
    }
    //Cambiamos su posicion en X e Y.
    move(x,y){
        this.posX = x ;
        this.posY = y; 
    }
}