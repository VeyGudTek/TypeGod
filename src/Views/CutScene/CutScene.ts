import { BaseView, Picture } from "@Views/Shared";
import { Dialogue } from "./Dialogue";
import type { Script } from "@Models/.";
import { SpeakerBox } from "./SpeakerBox";
import { DrawImage } from "@Functions/.";

export class CutScene extends BaseView{
    Script:Script;
    CurrentIndex:number = 0;

    Dialogue:Dialogue;
    CurrentImage:Picture;
    SpeakerBox:SpeakerBox;

    constructor(script:Script){
        super();
        this.Script = script;

        this.RequestImages(script.map(page => page.background));

        const firstPage = this.Script[0];
        this.Dialogue = new Dialogue(() => this.OnNextPage(), {x: .8, y: .25}, {x: .5, y: .85}, firstPage.text);
        this.CurrentImage = new Picture(firstPage.background, {x:1920, y:1080}, 1, {x:.5, y:.5})
        this.SpeakerBox = new SpeakerBox({x: .1, y:.05}, {x:.2, y:.75}, firstPage.speaker);

        this.Children.push(this.CurrentImage, this.Dialogue, this.SpeakerBox);
    }

    private RequestImages(images:string[]){
        images.forEach(i => {
            DrawImage(i, {x: 0, y:0}, {x:1, y:1})
        });
    }

    OnNextPage(){
        this.CurrentIndex += 1;

        if (this.CurrentIndex >= this.Script.length){
            this.EndCutScene();
        }
        else{
            const currentPage = this.Script[this.CurrentIndex];
            this.Dialogue.OnNextPage(currentPage.text);
            this.CurrentImage.ChangePicture(currentPage.background);
            this.SpeakerBox.SetSpeaker(currentPage.speaker);
        }
    }

    EndCutScene(){
        console.log("cutScene ended");
    }
}