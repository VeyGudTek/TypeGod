import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView } from "./BaseTransformView";
import { DrawImage } from "@Functions/DrawImage";

export class Picture extends BaseTransformView{
    ImageName:string;

    constructor(imageName:string, size:Vector2, position:Vector2){
        super(size, position);
        this.ImageName = imageName;
    }

    Render(){
        DrawImage(this.ImageName, this.Position, this.Size);
    }
}