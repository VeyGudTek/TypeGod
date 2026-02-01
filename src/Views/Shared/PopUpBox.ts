import { DrawRect } from "@Functions/.";
import type { BasicCallback, View } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseTransformView, Button, Label } from "@Views/Shared";

export interface ButtonArguments{
    callBack: BasicCallback,
    text: string
}

export class PopUpBox extends BaseTransformView{
    Priority: number = 1;

    constructor(prompt:string, optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        super({x:.4, y:.6}, {x:.5, y:.5});

        this.CreatePrompt(prompt);
        this.CreateOptions(optionOne, optionTwo);
    }

    private CreatePrompt(prompt:string){
        const label = new Label({x: 0, y: Sizes.text.base}, {x: .5, y: .45}, prompt);
        this.Children.push(label);
    }

    private CreateOptions(optionOne: ButtonArguments, optionTwo?: ButtonArguments){
        const options:View[] = [];
        if (optionTwo === undefined){
            const action = new Button(
                {x: .1, y: .1}, 
                {x:.5, y: .7},
                optionOne.text,
                optionOne.callBack
            )

            options.push(action);
        }
        else{
            const actionOne = new Button(
                {x: .15, y: .07}, 
                {x:.4, y: .7},
                optionOne.text,
                optionOne.callBack
            );
            const actionTwo = new Button(
                {x: .15, y: .07}, 
                {x:.6, y: .7},
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