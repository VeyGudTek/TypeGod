import { BaseView, Fade, Picture } from "@Views/Shared";
import { Dialogue } from "./Dialogue";
import type { BasicCallback, Script } from "@Models/.";
import { SpeakerBox } from "./SpeakerBox";

export class CutScene extends BaseView{
    Fade:Fade;

    Script:Script;
    CurrentIndex:number = 0;

    Dialogue:Dialogue;
    CurrentImage:Picture;
    SpeakerBox:SpeakerBox;

    constructor(script:Script, onCutSceneEnd:BasicCallback){
        super();
        this.Script = script;

        const firstPage = this.Script[0];
        this.Dialogue = new Dialogue(() => this.OnNextPage(), {x: .8, y: .2}, {x: .5, y: .85}, firstPage.text);
        this.CurrentImage = new Picture(firstPage.image, {x:1920, y:1080}, 1, {x:.5, y:.5})
        this.SpeakerBox = new SpeakerBox({x: .1, y:.05}, {x:.2, y:.775}, firstPage.speaker);

        this.Children.push(this.CurrentImage, this.Dialogue, this.SpeakerBox);

        this.Fade = new Fade(() => onCutSceneEnd());
        this.Children.push(this.Fade);
    }

    OnNextPage(){
        this.CurrentIndex += 1;

        if (this.CurrentIndex >= this.Script.length){
            this.EndCutScene();
        }
        else{
            const currentPage = this.Script[this.CurrentIndex];
            this.Dialogue.OnNextPage(currentPage.text);
            this.CurrentImage.ChangePicture(currentPage.image);
            this.SpeakerBox.SetSpeaker(currentPage.speaker);
        }
    }

    EndCutScene(){
        this.Fade.StartFade();
    }
}