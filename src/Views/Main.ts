import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Models/.";
import { Button, TextBox } from "@Views/Shared/.";

export class Main implements View{
    Children:View[] = [];

    constructor(){
        const testButton = new Button({x:200, y:100}, {x:200, y:400});
        const testTextBox = new TextBox({x:200, y:100}, {x:700, y:400});
        this.Children.push(testButton, testTextBox);
    }

    OnUpdate(){
        this.ClearScreen();
    }

    ClearScreen(){
        const position = {
            x: windowProvider.WindowSize.x / 2,
            y: windowProvider.WindowSize.y / 2
        }
        DrawRect(position, windowProvider.WindowSize, "#d1c5b0");
    }
}
