import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView } from "./BaseTransformView";
import { DrawImage, ScaleToMaxWindowSize } from "@Functions/.";
import { windowProvider } from "@Services/WindowProvider";

export class Picture extends BaseTransformView{
    ImageName:string;

    constructor(imageName:string, originalSize:Vector2, scale:number, position:Vector2){
        const clampedSize = ScaleToMaxWindowSize(originalSize);
        const scaledSize = {
            x: scale * (clampedSize.x / windowProvider.WindowSize.x),
            y: scale * (clampedSize.y / windowProvider.WindowSize.y)
        }
        super(scaledSize, position);
        this.ImageName = imageName;
    }

    ChangePicture(imageName:string){
        this.ImageName = imageName;
    }

    Render(){
        DrawImage(this.ImageName, this.Position, this.Size);
    }
}