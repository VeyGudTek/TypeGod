import { DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseInteractableView } from "@Views/Shared/.";

export class TextBox extends BaseInteractableView{
    text:string = "";

    constructor(size:Vector2, position:Vector2){
        super(size, position, () => {console.log("TextBoxClicked")});
    }

    OnUpdate(mousePosition: Vector2){
        super.OnUpdate(mousePosition);
        this.ClickCallBack = () => { console.log("TextBox Clicked"); }

        this.Render();
    }

    OnKey(key:string){
        this.text += key;
        console.log(this.text);
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? "#59549d": "#9390b9");
    }
}