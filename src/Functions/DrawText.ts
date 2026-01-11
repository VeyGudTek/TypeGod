import type { Vector2 } from "@Models/Vector2.type";
import { windowProvider } from "@Services/WindowProvider";

export function DrawText(text:string, color:string, position:Vector2, size:number){
    windowProvider.CanvasContext.font = `${size}px monospace`;
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.textBaseline = "top";
    windowProvider.CanvasContext.fillText(text, position.x, position.y);
}