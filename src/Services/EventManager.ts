import type { Vector2 } from "@Models/.";
import { type View } from "@Views/.";
import { windowProvider } from "./WindowProvider";

export type MouseCallBack = (mousePosition: Vector2) => void;

class EventManager{
    MainView:View | null;

    MousePosition: Vector2;
    LeftClick:boolean;
    ShouldRender:boolean;

    constructor(){
        this.MainView = null;

        this.MousePosition = {x:0, y:0};
        this.LeftClick = false;
        this.ShouldRender = false;

        this.HookUpEvents();
    }

    private HookUpEvents(){
        window.requestAnimationFrame(() => this.OnUpdate());

        addEventListener("mousemove", (event) => {
            this.SetMousePosition(event);
        });

        addEventListener("mousedown", (event) => {
            this.SetMousePosition(event);
            this.LeftClick = true;
        });

        addEventListener("scroll", () => {
            windowProvider.OnScroll();
        });
    }

    private SetMousePosition(event:MouseEvent){
        this.MousePosition.x = event.clientX - windowProvider.LeftCanvasOffSet;
        this.MousePosition.y = event.clientY - windowProvider.TopCanvasOffSet;
    }

    private OnUpdate(){
        this.UpdateViews();

        if (this.LeftClick){
            this.ClickViews();
            this.LeftClick = false;
        }

        if (this.ShouldRender){
            this.RenderViews();
            this.ShouldRender = false;
        }

        window.requestAnimationFrame(() => this.OnUpdate());
    }

    TriggerRender(){
        this.ShouldRender = true;
    }

    private UpdateViews(){
        if (this.MainView === null){
            throw new Error("Unable to Update: MainView has not been registered.");
        }

        this.MainView.OnUpdate?.(this.MousePosition);

        this.MainView.Children.forEach(c => c.OnUpdate?.(this.MousePosition));
        this.MainView.Children.forEach(c => this.UpdateChild(c));
    }

    private UpdateChild(currentView:View){
        currentView.OnUpdate?.(this.MousePosition);

        currentView.Children.forEach(c => c.OnUpdate?.(this.MousePosition));
        currentView.Children.forEach(c => this.UpdateChild(c));
    }

    private ClickViews(){
        if (this.MainView === null){
            throw new Error("Unable to Click: MainView has not been registered.");
        }

        this.MainView.OnClick?.(this.MousePosition);

        this.MainView.Children.forEach(c => c.OnClick?.(this.MousePosition));
        this.MainView.Children.forEach(c => this.ClickChild(c));
    }

    private ClickChild(currentView:View){
        currentView.OnClick?.(this.MousePosition);

        currentView.Children.forEach(c => c.OnClick?.(this.MousePosition));
        currentView.Children.forEach(c => this.ClickChild(c));
    }

    private RenderViews(){
        if (this.MainView === null){
            throw new Error("Unable to Render: MainView has not been registered.")
        }

        this.MainView.OnRender?.();

        this.MainView.Children.forEach(c => c.OnRender?.());
        this.MainView.Children.forEach(c => this.RenderChild(c));
    }

    private RenderChild(currentView: View){
        currentView.OnRender?.();

        currentView.Children.forEach(c => c.OnRender?.());
        currentView.Children.forEach(c => this.RenderChild(c));
    }
}

export const eventManager = new EventManager();