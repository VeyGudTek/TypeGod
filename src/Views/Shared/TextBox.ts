import { DrawRect } from "@Functions/.";
import { DrawText } from "@Functions/DrawText";
import type { Vector2 } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseHoverView } from "@Views/Shared/.";

export class TextBox extends BaseHoverView{
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

        if (key.length === 1){
            this.Text += key;
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? Colors.textBox.hover: Colors.textBox.base, Colors.border.base);

        DrawText(this.GetSplicedText(), 
            "Black", 
            {
                x:this.Position.x,
                y:this.Position.y + (this.Size.y / 2)
            }, 
            Sizes.text.base,
            this.Size.x
        );
    }

    private GetSplicedText(){
        const maxLength = (this.Size.x / Sizes.text.base) * 1.66;

        if (this.Text.length <= maxLength){
            return this.Text;
        }

        const startIndex = this.Text.length - maxLength;
        return this.Text.slice(startIndex, this.Text.length);
    }
}