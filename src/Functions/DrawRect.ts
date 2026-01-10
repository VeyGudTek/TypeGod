import type { Vector2 } from "@Models/.";
import { windowProvider } from "@Services/.";

export function DrawRect(position:Vector2, size:Vector2, fill:string) {
    windowProvider.CanvasContext.fillStyle = fill;
    windowProvider.CanvasContext.fillRect(position.x, position.y, size.x, size.y);
}