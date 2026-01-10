import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from ".";

class Main implements View{
    Children:View[] = [];

    constructor(){

    }

    Render(){
        this.ClearScreen();
    }

    ClearScreen(){
        DrawRect(0, 0, windowProvider.WindowSize.x, windowProvider.WindowSize.y, "black");
    }
}

export const mainView = new Main();