import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView } from "./BaseTransformView";
import { DrawImage } from "@Functions/DrawImage";

export class Picture extends BaseTransformView{
    ImageName:string;

    constructor(imageName:string, ratio:Vector2, scale:number, position:Vector2){
        const scaledSize = {
            x: scale * (ratio.x / ratio.y),
            y: scale * (ratio.y / ratio.x)
        }
        super(scaledSize, position);
        this.ImageName = imageName;
    }

    Render(){
        DrawImage(this.ImageName, this.Position, this.Size);
    }
}