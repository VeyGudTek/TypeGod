import { DrawRect, DrawText, GetCenterFromPosition } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseHoverView } from "@Views/Shared/.";

export class TextBox extends BaseHoverView{
    Text:string = "";
    Selected:boolean = false;

    constructor(size:Vector2, position:Vector2){
        super(size, position);
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
        let currentColor = Colors.textBox.base;
        if (this.Hovering){
            currentColor = this.MouseDown ? Colors.textBox.down : Colors.textBox.hover;
        }
        const borderSize = this.Selected ? Sizes.border.selected : Sizes.border.base;
        DrawRect(this.Position, this.Size, currentColor, Colors.border.base, borderSize);

        const center = GetCenterFromPosition(this.Position, this.Size);
        DrawText(
            this.GetSplicedText(), 
            "Black", 
            { 
                x: this.Position.x, 
                y: center.y
            },
            "start",
            Sizes.text.base
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