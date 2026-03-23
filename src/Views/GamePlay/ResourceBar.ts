import { DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseTransformView } from "@Views/.";

export class ResourceBar extends BaseTransformView{
    private readonly MaxResource:number;
    private readonly Color:string;
    private CurrentResource:number = 0;

    constructor(size:Vector2, position:Vector2, maxResource:number, color:string){
        super(size, position);

        this.MaxResource = maxResource;
        this.Color = color;
    }

    SetCurrentResource(resource:number){
        if (resource < 0){
            this.CurrentResource = 0;
        }
        else if (resource > this.MaxResource){
            this.CurrentResource = this.MaxResource;
        }
        else{
            this.CurrentResource = resource;
        }
    }

    Render(){
        const percentHealth = this.CurrentResource / this.MaxResource;

        DrawRect(this.Position, this.Size, "#6d6d6d", "#6d6d6d", 1);
        DrawRect(this.Position, {x: this.Size.x * percentHealth, y: this.Size.y}, this.Color, this.Color, 1);
    }
}