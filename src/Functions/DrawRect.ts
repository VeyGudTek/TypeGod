import { windowProvider } from "@Services/.";

export function DrawRect(x:number, y:number, width:number, height:number, fill:string) {
    windowProvider.CanvasContext.fillStyle = fill;
    windowProvider.CanvasContext.fillRect(x, y, width, height);
}