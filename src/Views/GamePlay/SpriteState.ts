import type { EntityState } from "@Models/.";
import { timeService } from "@Services/TimeService";
import type { SpriteData } from "@Static/.";
import type { Picture } from "@Views/.";

const TimePerFrame = .5;

export class SpriteState{
    private currentFrameIndex = 0;
    private currentFrameTime = 0;

    private SpriteData:SpriteData;
    private CurrentState:EntityState = "run";

    constructor(spriteData:SpriteData){
        this.SpriteData = spriteData;
    }

    InitializePicture(picture:Picture){
        picture.ChangePicture(this.GetCurrentSprite().image);
    }

    //Need to create some logic so that attack animations are played through
    Update(newState:EntityState, picture:Picture){
        this.currentFrameTime += timeService.DeltaTime;

        if (this.CurrentState !== newState){
            this.CurrentState = newState;
            this.currentFrameIndex = 0;
            this.currentFrameTime = 0;
        }

        if (this.currentFrameTime > TimePerFrame){
            this.currentFrameTime = 0;
            const sprites = this.GetSprites();
            if (!Array.isArray(sprites)){
                 picture.ChangePicture(sprites.image);
                return;
            }

            if (this.currentFrameIndex >= sprites.length - 1){
                this.currentFrameIndex = 0;
            }
            else{
                this.currentFrameIndex++;
            }

            picture.ChangePicture(this.GetCurrentSprite().image);
        }
    }

    private GetCurrentSprite(){
        const sprites = this.GetSprites();
        if (Array.isArray(sprites)){
            return sprites[this.currentFrameIndex];
        }
        return sprites;
    }

    private GetSprites(){
        switch(this.CurrentState){
            case "run":
                const runData = this.SpriteData.run
                if (runData === undefined){
                    throw Error("SpriteError: Entered [Run] state without run sprite defined.");
                }
                return runData;
            case "attack":
                return this.SpriteData.attack;
            case "idle":
                return this.SpriteData.idle;
            default:
                return {image:"", size:{x:0, y:0}};
        }
    }
}