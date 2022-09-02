class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize()

        window.requestAnimationFrame(this.animate.bind());
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.width = this.stageHeight * 2;
        this.ctx.scale(2,2);
    }
}







window.addEventListener('load',() =>{
    document.body.addEventListener("keydown",()=>{
        let x;
        switch(event.keyCode) {
            case 65:
                x='left';
                break;
            case 87:
                x='top';
                break;
            case 68:
                x='right';
                break;
            case 83:
                x='bottom';
                break;
        }
        console.log("Pressed:",x);
    });
});