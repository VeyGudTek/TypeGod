import { BaseView } from "@Views/Shared";
import { Dialogue } from "./Dialogue";
import type { Script } from "@Models/.";

export class CutScene extends BaseView{
    Script:Script;
    CurrentIndex:number = 0;

    Dialogue:Dialogue;

    constructor(script:Script){
        super();
        this.Script = script;

        const firstPage = this.Script[0];
        this.Dialogue = new Dialogue(() => this.OnNextPage(), firstPage.text, {x: .8, y: .25}, {x: .5, y: .8});

        this.Children.push(this.Dialogue);
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