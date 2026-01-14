import { IsWithinRectangle } from "@Functions/.";
import type { UpdateArguments } from "@Models/.";
import { BaseView } from "@Views/Shared/.";

export abstract class BaseHoverView extends BaseView{
    Hovering:boolean = false;

    OnUpdate({mousePosition}: UpdateArguments){
        if (IsWithinRectangle(mousePosition, this.Position, this.Size)){
            this.Hovering = true;
        }
        else{
            this.Hovering = false;
        }
    }
}