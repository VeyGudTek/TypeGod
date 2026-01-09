import type { Vector2 } from "../Models/Vector2.type.js";
import { windowProvider } from "./WindowProvider.js";

export type UpdateEvent = () => void;
export type ClickEvent = (mousePosition: Vector2) => void;

class EventManager{
    readonly OnUpdateEvents:UpdateEvent[];
    readonly OnClickEvents:ClickEvent[];

    MousePosition: Vector2;
    LeftClick:boolean;

    constructor(){
        this.OnUpdateEvents = [];
        this.OnClickEvents = [];

        this.MousePosition = {x:0, y:0};
        this.LeftClick = false;

        this.HookUpEvents();
    }

    private HookUpEvents(){
        window.requestAnimationFrame(() => this.OnUpdate());

        addEventListener("mousemove", (event) => {
            this.MousePosition.x = event.clientX;
            this.MousePosition.y = event.clientY;
        });

        addEventListener("mousedown", () => {
            this.LeftClick = true;
        });

        addEventListener("resize", () => {windowProvider.OnWindowResize()})
    }

    private OnUpdate(){
        this.OnUpdateEvents.forEach(e => e());

        if (this.LeftClick){
            this.OnClickEvents.forEach(e => e(this.MousePosition));
        }
        this.LeftClick = false;

        window.requestAnimationFrame(() => this.OnUpdate());
    }

    RegisterUpdateEvent(updateEvent:UpdateEvent){
        this.OnUpdateEvents.push(updateEvent);
    }

    RegisterClickEvent(clickEvent:ClickEvent){
        this.OnClickEvents.push(clickEvent);
    }
}

export const eventManager = new EventManager();