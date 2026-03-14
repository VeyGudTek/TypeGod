import { BaseView, Button, Label, Panel, Picture } from "@Views/.";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";
import { Sizes } from "@Static/.";
import type { BasicCallback } from "@Models/Callbacks.type";

export class Start extends BaseView{
    constructor(onStart:BasicCallback){
        super();

        const splashLeft = new Picture(splashLeftSource,   {x:1344, y:2226}, 1.25, {x:.17, y:.65});
        const splashRight = new Picture(splashRightSource, {x:1394, y:2595}, 1.5, {x:.85, y:.65});
        
        const backPanel = new Panel(    {x:.35, y:.6},              {x:.5, y:.5});
        const prompt = new Label(       {x:0, y: Sizes.text.title}, {x:.5, y:.3}, "Type God");
        const newGame = new Button(     {x:.18, y:.07},             {x:.5, y:.55}, "New Game", () => onStart());

        this.Children.push(splashLeft, splashRight, backPanel, prompt, newGame);
    }
}