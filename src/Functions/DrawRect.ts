import type { Vector2 } from "@Models/.";
import { windowProvider } from "@Services/.";

export function DrawRect(position:Vector2, size:Vector2, color:string, outline:string) {
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.strokeStyle = outline;
    windowProvider.CanvasContext.strokeRect(position.x, position.y, size.x, size.y);
    windowProvider.CanvasContext.fillRect(position.x, position.y, size.x, size.y);
}