import { DrawRect } from "../Functions/DrawRect.js";
import { eventManager } from "../Services/EventManager.js";

class Main{
    constructor(){
        eventManager.RegisterUpdateEvent(this.OnUpdate);
    }

    private OnUpdate(){
        DrawRect()
    }
}