import type { Vector2 } from "@Models/Vector2.type";
import { windowProvider } from "@Services/WindowProvider";

export function DrawText(text:string, color:string, position:Vector2, textSize:number, width:number){
    windowProvider.CanvasContext.font = `${textSize}px monospace`;
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.textBaseline = "middle";
    windowProvider.CanvasContext.fillText(text, position.x, position.y, width);
}