import type { Vector2 } from "@Models/.";
import { windowProvider } from "@Services/.";

export function DrawRect(position:Vector2, size:Vector2, color:string, outlineColor:string, outlineWidth:number) {
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.strokeStyle = outlineColor;
    windowProvider.CanvasContext.lineWidth = outlineWidth;
    windowProvider.CanvasContext.strokeRect(position.x, position.y, size.x, size.y);
    windowProvider.CanvasContext.fillRect(position.x, position.y, size.x, size.y);
}