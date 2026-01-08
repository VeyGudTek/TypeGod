export class CanvasProvider{
    readonly CanvasElement: HTMLCanvasElement;
    readonly CanvasContext: CanvasRenderingContext2D;

    constructor(){
        this.CanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        this.CanvasContext = this.CanvasElement.getContext("2d") as CanvasRenderingContext2D;
    }
}