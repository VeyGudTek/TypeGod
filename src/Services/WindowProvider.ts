import type { Vector2 } from "@Models/.";

class WindowProvider{
    readonly CanvasElement: HTMLCanvasElement;
    readonly CanvasContext: CanvasRenderingContext2D;

    WindowSize:Vector2 = {x:0, y:0};

    constructor(){
        this.CanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        this.CanvasContext = this.CanvasElement.getContext("2d") as CanvasRenderingContext2D;

        this.ResizeWindow(1280, 640);
    }

    ResizeWindow(width: number, height:number){
        this.CanvasElement.setAttribute("width", width.toString());
        this.CanvasElement.setAttribute("height", height.toString());

        this.WindowSize = {
            x: width,
            y: height
        }
    }
}

export const windowProvider = new WindowProvider();