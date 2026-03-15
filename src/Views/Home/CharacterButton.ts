import { DrawRect } from "@Functions/DrawFunctions";
import type { Vector2, BasicCallback, CharacterData } from "@Models/.";
import { BaseHoverView } from "@Views/.";

export class CharacterButton extends BaseHoverView{
    private CharacterData:CharacterData;
    private OnClickCallback:BasicCallback;

    constructor(size:Vector2, position:Vector2, onClick:BasicCallback, characterData:CharacterData){
        super(size, position);

        this.OnClickCallback = onClick;
        this.CharacterData = characterData;
    }

    OnClick(){
        if(this.Hovering){
            this.OnClickCallback();
        }
    }

    Render(){
        const color = this.Hovering ? "#ba7e7e" : "#823a3a";
        DrawRect(this.Position, this.Size, color, color, 1);
    }
}