import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Views/.";
import { Button } from "@Views/Shared/.";

export class Main implements View{
    Children:View[] = [];

    constructor(){
        const movingButton = new Button(0, 0, 10, 10);
        this.Children.push(movingButton);
    }

    OnRender(){
        this.ClearScreen();
    }

    ClearScreen(){
        DrawRect({x:0, y:0}, windowProvider.WindowSize, "#d1c5b0");
    }
}
