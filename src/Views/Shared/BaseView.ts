import type { Vector2, View } from "@Models/.";

export class BaseView implements View{
    Children:View[] = [];
    Size:Vector2 = {x:0, y:0};
    Position:Vector2 = {x:0, y:0};

    constructor(size:Vector2, position:Vector2){
        this.Size = size;
        this.Position = position;
    }
}