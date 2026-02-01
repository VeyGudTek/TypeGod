import { BaseView } from "@Views/Shared";
import { Dialogue } from "./Dialogue";

export class CutSceneContainer extends BaseView{
    constructor(){
        super();

        const dialogue = new Dialogue({x: .8, y: .25}, {x: .5, y: .8});

        this.Children.push(dialogue);
    }
}