import type { Vector2 } from "@Models/.";
import { type View } from "@Views/.";

export type MouseCallBack = (mousePosition: Vector2) => void;

class EventManager{
    readonly OnUpdateEvents:MouseCallBack[];
    readonly OnClickEvents:MouseCallBack[];
    MainView:View | null;

    MousePosition: Vector2;
    LeftClick:boolean;
    ShouldRender:boolean;

    constructor(){
        this.OnUpdateEvents = [];
        this.OnClickEvents = [];
        this.MainView = null;

        this.MousePosition = {x:0, y:0};
        this.LeftClick = false;
        this.ShouldRender = false;

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
        this.OnUpdateEvents.forEach(e => e(this.MousePosition));

        if (this.LeftClick){
            this.OnClickEvents.forEach(e => e(this.MousePosition));
            this.LeftClick = false;
        }

        if (this.ShouldRender){
            this.Render();
            this.ShouldRender = false;
        }

        window.requestAnimationFrame(() => this.OnUpdate());
    }

    RegisterUpdateEvent(updateEvent:MouseCallBack){
        this.OnUpdateEvents.push(updateEvent);
    }

    RegisterClickEvent(clickEvent:MouseCallBack){
        this.OnClickEvents.push(clickEvent);
    }

    TriggerRender(){
        this.ShouldRender = true;
    }

    private Render(){
        if (this.MainView === null){
            throw new Error("Unable to Render: MainView has not been registered.")
        }

        this.MainView.Render();

        this.MainView.Children.forEach(c => c.Render());
        this.MainView.Children.forEach(c => this.RenderChild(c));
    }

    private RenderChild(currentView: View){
        currentView.Render();

        currentView.Children.forEach(c => c.Render());
        currentView.Children.forEach(c => this.RenderChild(c));
    }
}

export const eventManager = new EventManager();