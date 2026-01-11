import { DrawRect } from "@Functions/.";
import { DrawText } from "@Functions/DrawText";
import type { Vector2 } from "@Models/.";
import { Colors } from "@Static/.";
import { BaseHoverView } from "@Views/Shared/.";

export class TextBox extends BaseHoverView{
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
        if (!this.Selected) {
            return;
        }

        if (key === "Backspace"){
            if (this.Text.length > 0){
                this.Text = this.Text.slice(0, this.Text.length - 1);
            }
            return;
        }

        if (key.length > 1){
            return;
        }

        const maxLength = (this.Size.x / this.Size.y) * 2;
        if (this.Text.length < maxLength){
            this.Text += key;
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? Colors.textBox.hover: Colors.textBox.base, Colors.border.base);

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