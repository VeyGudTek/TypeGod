import { BaseView } from "@Views/Shared/.";

export abstract class BaseHoverView extends BaseView{
    Hovering:boolean = false;
    MouseDown:boolean = false;

    OnUpdate(){
        this.Hovering = false;
        this.MouseDown = false;
    }

    OnHover(){
        this.Hovering = true;
    }

    OnMouseDown(){
        this.MouseDown = true;
    }
}