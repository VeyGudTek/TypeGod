import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView } from "./BaseTransformView";
import { DrawImage, ScaleToMaxWindowSize } from "@Functions/.";
import { windowProvider } from "@Services/WindowProvider";

export class Picture extends BaseTransformView{
    private Image:HTMLImageElement;
    private IsManualRender:boolean

    constructor(image:HTMLImageElement, originalSize:Vector2, scale:number, position:Vector2, isManualRender = false){
        const clampedSize = ScaleToMaxWindowSize(originalSize);
        const scaledSize = {
            x: scale * (clampedSize.x / windowProvider.WindowSize.x),
            y: scale * (clampedSize.y / windowProvider.WindowSize.y)
        }
        super(scaledSize, position);
        this.Image = image;
        this.IsManualRender = isManualRender;
    }

    ChangePicture(image:HTMLImageElement){
        this.Image = image;
    }

    Render(){
        if (!this.IsManualRender){
            this.ManualRender();
        }
    }

    ManualRender(){
        DrawImage(this.Image, this.Position, this.Size);
    }
}