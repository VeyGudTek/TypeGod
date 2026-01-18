import { DrawRect } from "@Functions/.";
import { BaseView } from "./BaseView";
import { Colors, Sizes } from "@Static/.";

export class Panel extends BaseView{
    OnUpdate(){
        this.Render();
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.panel.base, Colors.border.base, Sizes.border.base);
    }
}