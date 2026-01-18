import { DrawRect, DrawText, GetCenterFromPosition, GetPositionFromCenter } from "@Functions/.";
import type { BasicCallback, Vector2 } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseView, Button } from "@Views/Shared";

export interface ButtonArguments{
    callBack: BasicCallback,
    text: string
}

export class PopUpBox extends BaseView{
    Prompt:string;

    constructor(size: Vector2, prompt:string, optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        super(size, GetPositionFromCenter({x:640, y:360}, size));

        this.Prompt = prompt;
        this.CreateOptions(optionOne, optionTwo);
    }

    private CreateOptions(optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        if (optionTwo === undefined){
            const action = new Button(
                {x: 200, y: 100}, 
                GetPositionFromCenter({x:640, y: this.Position.y + this.Size.y}, {x: 200, y: 100}),
                optionOne.text,
                optionOne.callBack
            )

            this.Children.push(action);
        }
        else{
            const actionOne = new Button(
                {x: 200, y: 100}, 
                GetPositionFromCenter({x: 500, y: this.Position.y + this.Size.y}, {x: 200, y: 100}),
                optionOne.text,
                optionOne.callBack
            );
            const actionTwo = new Button(
                {x: 200, y: 100}, 
                GetPositionFromCenter({x:780, y: this.Position.y + this.Size.y}, {x: 200, y: 100}),
                optionTwo.text,
                optionTwo.callBack
            );

            this.Children.push(actionOne);
            this.Children.push(actionTwo);
        }
    }

    OnUpdate(){
        DrawRect(this.Position, this.Size, Colors.panel.secondary, Colors.border.base, Sizes.border.base);
        DrawText(this.Prompt, Colors.font.base, GetCenterFromPosition(this.Position, this.Size), "center", Sizes.text.base);
    }
}