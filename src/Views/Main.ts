import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Models/.";
import { Button } from "@Views/Shared/.";

export class Main implements View{
    Children:View[] = [];

    constructor(){
        const movingButton = new Button(200, 100, 50, 25);
        this.Children.push(movingButton);
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
