import { BaseView, Picture } from "@Views/Shared";
import { Dialogue } from "./Dialogue";
import type { Script } from "@Models/.";
import { windowProvider } from "@Services/WindowProvider";

export class CutScene extends BaseView{
    Script:Script;
    CurrentIndex:number = 0;

    Dialogue:Dialogue;
    CurrentImage:Picture;

    constructor(script:Script){
        super();
        this.Script = script;

        const firstPage = this.Script[0];
        this.Dialogue = new Dialogue(() => this.OnNextPage(), firstPage.text, {x: .8, y: .25}, {x: .5, y: .8});
        this.CurrentImage = new Picture(firstPage.background, windowProvider.WindowSize, 1, {x:.5, y:.5})

        this.Children.push(this.CurrentImage, this.Dialogue,);
    }

    OnNextPage(){
        this.CurrentIndex += 1;

        if (this.CurrentIndex >= this.Script.length){
            this.EndCutScene();
        }
        else{
            const currentPage = this.Script[this.CurrentIndex]
            this.Dialogue.OnNextPage(currentPage.text);
        }
    }

    EndCutScene(){
        console.log("cutScene ended");
    }
}