import { BaseView, Panel } from "@Views/Shared";

export class CutSceneContainer extends BaseView{
    constructor(){
        super();

        const textPanel = new Panel({x: .8, y: .25}, {x: .5, y: .8});

        this.Children.push(textPanel);
    }
}