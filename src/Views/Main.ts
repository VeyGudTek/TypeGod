import { DrawRect } from "@Functions/.";
import { eventManager } from "@Services/.";

class Main{
    constructor(){
        eventManager.RegisterUpdateEvent(this.OnUpdate);
    }

    private OnUpdate(){
        //DrawRect()
    }
}