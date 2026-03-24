import type { Vector2 } from "@Models/.";
import { BaseTransformView, Panel } from "@Views/Shared";

export class CharacterVisual extends BaseTransformView{
    constructor(size:Vector2, position:Vector2){
        super(size, position);

        const tempSprite = new Panel(size, position);

        this.Children.push(tempSprite);
    }
}