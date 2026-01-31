import { GetPositionFromCenter } from "@Functions/PositionConversion";
import { BaseView, Panel } from "@Views/Shared";

export class CutSceneContainer extends BaseView{
    constructor(){
        super();

        const textPanel = new Panel({x: 1000, y: 200}, GetPositionFromCenter({x:640, y: 500}, {x: 1000, y: 200}));

        this.Children.push(textPanel);
    }
}