import type { Vector2 } from "@Models/Vector2.type";
import { BaseTransformView, Label, Panel } from "@Views/Shared";

export class SpeakerBox extends BaseTransformView{
    constructor(size:Vector2, position:Vector2, speaker?:string){
        super(size, position);

        this.SetSpeaker(speaker);
    }

    SetSpeaker(speaker?: string){
        this.Children = [];

        if (speaker !== undefined){
            this.CreateSpeakerBox(speaker);
        }
    }
    
    private CreateSpeakerBox(speaker:string){
        const scaledSize = {
            x: (speaker.length * this.GetSizePercentage().y * .3) + .05,
            y: this.GetSizePercentage().y
        }
        const scaledPosition = {
            x: (scaledSize.x / 2) + this.GetPositionPercentage().x,
            y: this.GetPositionPercentage().y
        }

        const backPanel = new Panel(scaledSize, scaledPosition);
        const speakerText = new Label(scaledSize, scaledPosition, speaker)

        this.Children.push(backPanel, speakerText);
    }
}