import { DrawRect } from "@Functions/DrawRect";
import { BaseView } from "./BaseView";

export class Panel extends BaseView{
    OnUpdate(){
        this.Render();
    }

    Render(){
        DrawRect(this.Position, this.Size, "#d6bebe");
    }
}