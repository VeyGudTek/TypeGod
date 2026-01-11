import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Models/.";
import { Button, TextBox, Panel } from "@Views/Shared/.";

export class Main implements View{
    Children:View[] = [];

    constructor(){
        const testPanel = new Panel({x:700, y: 350}, {x: 200, y:200});
        const testButton = new Button({x:200, y:100}, {x:200, y:400}, () => {console.log("Button Clicked")});
        const testTextBox = new TextBox({x:200, y:100}, {x:700, y:400});
        this.Children.push(testPanel, testButton, testTextBox);
    }

    OnUpdate(){
        this.ClearScreen();
    }

    ClearScreen(){
        DrawRect({x:0, y:0}, windowProvider.WindowSize, "#d1c5b0", "black");
    }
}
