import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView } from "./BaseTransformView";
import { DrawImage } from "@Functions/DrawImage";
import { windowProvider } from "@Services/WindowProvider";

export class Picture extends BaseTransformView{
    ImageName:string;

    constructor(imageName:string, ratio:Vector2, scale:number, position:Vector2){
        const scaledSize = {
            x: scale * (ratio.x / windowProvider.WindowSize.x),
            y: scale * (ratio.y / windowProvider.WindowSize.y)
        }
        console.log(ratio);
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