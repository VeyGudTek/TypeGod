import { DrawRect } from "@Functions/.";
import { eventManager, windowProvider } from "@Services/.";

export class Main{
    constructor(){
        eventManager.RegisterUpdateEvent(this.OnUpdate);
    }

    private OnUpdate(){
        DrawRect(0, 0, windowProvider.WindowSize.x, windowProvider.WindowSize.y, "black");
    }
}