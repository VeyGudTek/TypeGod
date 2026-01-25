import type { Vector2 } from "@Models/Vector2.type";
import { windowProvider } from "@Services/WindowProvider";

export function DrawImage(imageName:string, position:Vector2, size:Vector2){
    const image = new Image();
    image.src = imageName;
    windowProvider.CanvasContext.drawImage(image, position.x, position.y, size.x, size.y);
}