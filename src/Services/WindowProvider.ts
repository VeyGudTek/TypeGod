import type { Vector2 } from "@Models/.";

class WindowProvider{
    readonly CanvasElement: HTMLCanvasElement;
    readonly CanvasContext: CanvasRenderingContext2D;
    readonly CanvasRatio: number = .95;

    WindowSize:Vector2 = {x:0, y:0};

    constructor(){
        this.CanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        this.CanvasContext = this.CanvasElement.getContext("2d") as CanvasRenderingContext2D;

        this.OnWindowResize();
    }

    OnWindowResize(){
        this.CanvasElement.setAttribute("width", (window.innerWidth * this.CanvasRatio).toString());
        this.CanvasElement.setAttribute("height", (window.innerHeight * this.CanvasRatio).toString());

        const styling = `padding: ${Math.round((window.innerWidth * (1 - this.CanvasRatio))) / 2}px;`;
        this.CanvasElement.setAttribute("style", styling);

        this.WindowSize = {
            x: window.innerWidth * this.CanvasRatio,
            y: window.innerHeight * this.CanvasRatio
        }
    }
}

export const windowProvider = new WindowProvider();