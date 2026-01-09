import { windowProvider } from "@Services/WindowProvider.js";

export function DrawRect(x:number, y:number, width:number, height:number, fill:string) {
    windowProvider.CanvasContext.fillStyle = "fill";
    windowProvider.CanvasContext.fillRect(x, y, width, height);
}