import { DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseInteractableView } from "@Views/Shared/.";

export class TextBox extends BaseInteractableView{
    Text:string = "";
    Selected:boolean = false;

    constructor(size:Vector2, position:Vector2){
        super(size, position);
    }

    OnUpdate(mousePosition: Vector2){
        super.OnUpdate(mousePosition);

        this.Render();
    }

    OnClick(){
        this.Selected = this.Hovering;
    }

    OnKey(key:string){
        if (this.Selected){
            this.Text += key;
            console.log(this.Text);
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? "#59549d": "#9390b9");
    }
}