import type { EntityState } from "@Models/.";
import { timeService } from "@Services/TimeService";
import type { SpriteData } from "@Static/.";
import type { Picture } from "@Views/.";

const TimePerFrame = .5;

export class SpriteState{
    private LockAnimation = false;

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

    Update(newState:EntityState, picture:Picture){
        this.currentFrameTime += timeService.DeltaTime;

        if (this.CurrentState !== newState && !this.LockAnimation){
            this.ChangeState(newState, picture);
        }

        if (this.currentFrameTime > TimePerFrame){
            this.currentFrameTime = 0;
            const sprites = this.GetSprites();
            if (!Array.isArray(sprites)){
                return;
            }

            if (this.currentFrameIndex >= sprites.length - 1){
                this.currentFrameIndex = 0;

                if (this.LockAnimation){
                    this.LockAnimation = false;
                    return;
                }
            }
            else{
                this.currentFrameIndex++;
            }

            picture.ChangePicture(this.GetCurrentSprite().image);
        }
    }

    private ChangeState(newState:EntityState, picture:Picture){
        this.CurrentState = newState;
        this.currentFrameIndex = 0;
        this.currentFrameTime = 0;
        
        picture.ChangePicture(this.GetCurrentSprite().image);

        if (newState === "attack"){
            this.LockAnimation = true;
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
                return {image:new Image(), size:{x:0, y:0}, src: ""};
        }
    }
}