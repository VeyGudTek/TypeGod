import type { Vector2, View } from "@Models/.";
import { windowProvider } from "./WindowProvider";

class EventManager{
    MainView:View | null;

    MousePosition: Vector2;
    MouseDown:boolean;
    Click:boolean;

    constructor(){
        this.MainView = null;

        this.MousePosition = {x:0, y:0};
        this.MouseDown = false;
        this.Click = false;

        this.HookUpEvents();
    }

    private HookUpEvents(){
        window.requestAnimationFrame(() => this.OnUpdate());

        addEventListener("mousemove", (event) => {
            this.SetMousePosition(event);
        });
        
        addEventListener("mousedown", (event) => {
            this.MouseDown = true;
            this.SetMousePosition(event);
        });

        addEventListener("mouseup", (event) => {
            this.MouseDown = false;
            this.SetMousePosition(event);
            this.Click = true;
        });

        addEventListener("scroll", () => {
            windowProvider.OnScroll();
        });

        addEventListener("keydown", (event) => {
            this.InputKeyToViews(event.key);
        })
    }

    private SetMousePosition(event:MouseEvent){
        this.MousePosition.x = event.clientX - windowProvider.LeftCanvasOffSet;
        this.MousePosition.y = event.clientY - windowProvider.TopCanvasOffSet;
    }

    private OnUpdate(){
        this.UpdateViews();

        const hoveringViews = this.GetHoverViews();
        hoveringViews.forEach(v => {
            v.OnHover?.();
            if (this.MouseDown){
                v.OnMouseDown?.();
            }
        });

        if (this.Click){
            this.ClickViews();
            this.Click = false;
        }

        this.RenderViews();
        window.requestAnimationFrame(() => this.OnUpdate());
    }

    private UpdateViews(){
        if (this.MainView === null) return;

        const viewProcessor = (view:View) => view.OnUpdate?.();
        EventManager.ProcessViews(this.MainView, viewProcessor);
    }

    private GetHoverViews(){
        if (this.MainView === null) return [];

        let hoveringViews:View[] = [];
        let maxPriority = 0;
        
        const viewProcessor = (view:View) => {
            const isHovering = view.CheckHover?.(this.MousePosition);

            if (view.Priority > maxPriority){
                hoveringViews = [];
                maxPriority = view.Priority;
            }

            if (view.Priority == maxPriority && isHovering){
                hoveringViews.push(view);
            }
        };
        EventManager.ProcessViews(this.MainView, viewProcessor);

        return hoveringViews;
    }

    private ClickViews(){
        if (this.MainView === null) return;

        const viewProcessor = (view:View) => view.OnClick?.();
        EventManager.ProcessViews(this.MainView, viewProcessor);
    }

    private RenderViews(){
        if (this.MainView === null) return;

        const viewProcessor = (view:View) => view.Render?.();
        EventManager.ProcessViews(this.MainView, viewProcessor);
    }

    private static ProcessViews(currentView:View, viewProcessor: (view:View) => void){
        viewProcessor(currentView);
        currentView.Children.forEach(c => this.ProcessViews(c, viewProcessor))
    }

    private InputKeyToViews(key:string){
        if (this.MainView === null){
            throw new Error("Unable input Key: MainView has not been registered.");
        }

        this.MainView.OnKey?.(key);

        this.MainView.Children.forEach(c => c.OnKey?.(key));
        this.MainView.Children.forEach(c => this.InputKeyToChild(c, key));
    }

    private InputKeyToChild(currentView:View, key:string){
        currentView.Children.forEach(c => c.OnKey?.(key));
        currentView.Children.forEach(c => this.InputKeyToChild(c, key));
    }
}

export const eventManager = new EventManager();