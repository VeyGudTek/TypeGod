import type { Vector2 } from "@Models/.";
import { type View, mainView } from "@Views/.";

export type UpdateEvent = () => void;
export type ClickEvent = (mousePosition: Vector2) => void;

class EventManager{
    readonly OnUpdateEvents:UpdateEvent[];
    readonly OnClickEvents:ClickEvent[];
    readonly MainView:View;

    MousePosition: Vector2;
    LeftClick:boolean;

    constructor(){
        this.OnUpdateEvents = [];
        this.OnClickEvents = [];
        this.MainView = mainView;

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

    Render(){
        mainView.Render();

        mainView.Children.forEach(c => c.Render());
        mainView.Children.forEach(c => this.RenderChild(c));
    }

    private RenderChild(currentView: View){
        currentView.Render();

        currentView.Children.forEach(c => c.Render());
        currentView.Children.forEach(c => this.RenderChild(c));
    }
}

export const eventManager = new EventManager();