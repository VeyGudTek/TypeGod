import { BaseTransformView } from "./BaseTransformView";
import { timeService } from "@Services/.";
import { DrawRect } from "@Functions/.";
import type { BasicCallback } from "@Models/Callbacks.type";

const FadeMultiplier = .5;

export class Fade extends BaseTransformView{
    Priority: number = 2;

    private FadeOut:boolean;
    private Opacity:number;

    private OnFadeFinish:BasicCallback;

    constructor(onFadeFinish:BasicCallback){
        super({x: 1, y: 1}, {x: .5, y: .5});

        this.FadeOut = false;
        this.Opacity = 1;

        this.OnFadeFinish = onFadeFinish;
    }

    StartFade(){
        console.log("Starting Fade")

        this.FadeOut = true;
        this.Priority = 2
    }

    OnUpdate(){
        if (this.FadeOut){
            if (this.Opacity < 1){
                this.Opacity += timeService.DeltaTime * FadeMultiplier;
                this.Opacity = Math.min(1, this.Opacity);
            }
            else{
                this.OnFadeFinish();
            }
        }
        else{
            if (this.Opacity > 0){
                this.Opacity -= timeService.DeltaTime * FadeMultiplier;
                this.Opacity = Math.max(0, this.Opacity);
            }
            else{
                this.Priority = -1;
            }
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, `hsl(0, 0%, 0%, ${this.Opacity})`, `hsl(0, 0%, 0%, ${this.Opacity})`, 1);
    }
}