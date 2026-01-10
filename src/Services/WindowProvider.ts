import type { Vector2 } from "@Models/.";

class WindowProvider{
    readonly CanvasElement: HTMLCanvasElement;
    readonly CanvasContext: CanvasRenderingContext2D;

    WindowSize:Vector2 = {x:0, y:0};

    constructor(){
        this.CanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        this.CanvasContext = this.CanvasElement.getContext("2d") as CanvasRenderingContext2D;

        this.OnWindowResize();
    }

    OnWindowResize(){
        this.WindowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        }
    }
}

export const windowProvider = new WindowProvider();