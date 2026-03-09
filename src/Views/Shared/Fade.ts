import { BaseTransformView } from "./BaseTransformView";
import { timeService } from "@Services/.";
import { DrawRect } from "@Functions/DrawRect";
import type { BasicCallback } from "@Models/Callbacks.type";

export class Fade extends BaseTransformView{
    Priority: number = 2;
    FadeOut:boolean = true;
    Opacity:number = 0;

    OnFadeMidpoint:BasicCallback;
    OnFadeFinish:BasicCallback;

    constructor(onFadeMidpoint: BasicCallback, onFadeFinish:BasicCallback){
        super({x: 1, y: 1}, {x: .5, y: .5});

        this.OnFadeMidpoint = onFadeMidpoint;
        this.OnFadeFinish = onFadeFinish;
    }

    OnUpdate(){
        const fadeMultiplier = .5;

        if (this.FadeOut){
            this.Opacity += timeService.DeltaTime * fadeMultiplier;
            if (this.Opacity > 1){
                this.Opacity = 1;
                this.FadeOut = false;
                this.OnFadeMidpoint();
            }
        }
        else{
            if (this.Opacity > 0){
                this.Opacity -= timeService.DeltaTime * fadeMultiplier;
            }
            else{
                this.Opacity = 0;
                this.OnFadeFinish();
            }
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, `hsl(0, 0%, 0%, ${this.Opacity})`, `hsl(0, 0%, 0%, ${this.Opacity})`, 1);
    }
}