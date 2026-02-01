import type { Vector2 } from "@Models/.";

class WindowProvider{
    readonly CanvasElement: HTMLCanvasElement;
    readonly CanvasContext: CanvasRenderingContext2D;
    LeftCanvasOffSet:number = 0;
    TopCanvasOffSet:number = 0;

    readonly CanvasBorderSize:number = 3;

    WindowSize:Vector2 = {x:0, y:0};

    constructor(){
        this.CanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        this.CanvasContext = this.CanvasElement.getContext("2d") as CanvasRenderingContext2D;

        const canvasStyle = `border: solid black ${this.CanvasBorderSize}px;`;
        this.CanvasElement.setAttribute("style", canvasStyle);

        this.OnScroll();
        this.ResizeWindow(1920, 1080);
    }

    ResizeWindow(width: number, height:number){
        this.CanvasElement.setAttribute("width", width.toString());
        this.CanvasElement.setAttribute("height", height.toString());

        this.WindowSize = {
            x: width,
            y: height
        }
    }

    OnScroll(){
        const canvasRect = this.CanvasElement.getBoundingClientRect();
        this.LeftCanvasOffSet = canvasRect.left + this.CanvasBorderSize;
        this.TopCanvasOffSet = canvasRect.top + this.CanvasBorderSize;
    }
}

export const windowProvider = new WindowProvider();