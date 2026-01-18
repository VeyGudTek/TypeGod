import { DrawRect, GetCenterFromPosition, GetPositionFromCenter } from "@Functions/.";
import type { BasicCallback, View } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseView, Button, Label } from "@Views/Shared";

export interface ButtonArguments{
    callBack: BasicCallback,
    text: string
}

export class PopUpBox extends BaseView{
    Priority: number = 1;

    constructor(prompt:string, optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        const size = {x: 500, y: 300};
        super(size, GetPositionFromCenter({x:640, y:320}, size));

        this.CreatePrompt(prompt);
        this.CreateOptions(optionOne, optionTwo);
    }

    private CreatePrompt(prompt:string){
        const label = new Label({x: 0, y:20}, GetCenterFromPosition({x: this.Position.x, y: this.Position.y - 40}, this.Size), prompt);
        this.Children.push(label);
    }

    private CreateOptions(optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        const options:View[] = [];
        if (optionTwo === undefined){
            const action = new Button(
                {x: 200, y: 100}, 
                GetPositionFromCenter({x:640, y: this.Position.y + this.Size.y}, {x: 200, y: 100}),
                optionOne.text,
                optionOne.callBack
            )

            options.push(action);
        }
        else{
            const actionOne = new Button(
                {x: 100, y: 50}, 
                GetPositionFromCenter({x: 500, y: this.Position.y + this.Size.y - 50}, {x: 100, y: 50}),
                optionOne.text,
                optionOne.callBack
            );
            const actionTwo = new Button(
                {x: 100, y: 50}, 
                GetPositionFromCenter({x:780, y: this.Position.y + this.Size.y - 50}, {x: 100, y: 50}),
                optionTwo.text,
                optionTwo.callBack
            );

            options.push(actionOne);
            options.push(actionTwo);
        }

        options.forEach(o => {
            o.Priority = this.Priority;
            this.Children.push(o);
        });
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.panel.secondary, Colors.border.base, Sizes.border.base);
    }
}