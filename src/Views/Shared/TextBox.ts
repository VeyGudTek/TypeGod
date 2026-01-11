import { DrawRect } from "@Functions/.";
import { DrawText } from "@Functions/DrawText";
import type { Vector2 } from "@Models/.";
import { BaseInteractableView } from "@Views/Shared/.";

export class TextBox extends BaseInteractableView{
    static TextSizeRatio: number = .8;
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
        const maxLength = (this.Size.x / this.Size.y) * 2;

        if (this.Selected && this.Text.length < maxLength){
            this.Text += key;
            console.log(this.Text);
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? "#59549d": "#9390b9", "black");

        const height = this.Size.y;
        DrawText(this.Text, 
            "Black", 
            {
                x:this.Position.x,
                y:this.Position.y + (1 - TextBox.TextSizeRatio) * height / 2
            }, 
            height * TextBox.TextSizeRatio
        );
    }
}