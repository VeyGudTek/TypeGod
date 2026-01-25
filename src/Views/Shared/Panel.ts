import { DrawRect } from "@Functions/.";
import { BaseTransformView } from "./BaseTransformView";
import { Colors, Sizes } from "@Static/.";

export class Panel extends BaseTransformView{
    Render(){
        DrawRect(this.Position, this.Size, Colors.panel.base, Colors.border.base, Sizes.border.base);
    }
}