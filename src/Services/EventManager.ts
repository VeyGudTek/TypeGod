import type { UpdateArguments, Vector2, View } from "@Models/.";
import { windowProvider } from "./WindowProvider";

interface OnClickSharedData{
    maxLevel: number,
    viewsOnLevel: View[]
}

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

        if (this.Click){
            this.ClickViews();
            this.Click = false;
        }

        window.requestAnimationFrame(() => this.OnUpdate());
    }

    private UpdateViews(){
        if (this.MainView === null){
            throw new Error("Unable to Update: MainView has not been registered.");
        }

        const updateArguments = {mousePosition: this.MousePosition, mouseDown: this.MouseDown}
        this.MainView.OnUpdate?.(updateArguments);

        this.MainView.Children.forEach(c => this.UpdateChild(c, updateArguments));
    }

    private UpdateChild(currentView:View, updateArguments:UpdateArguments){
        currentView.OnUpdate?.(updateArguments);
        currentView.Children.forEach(c => this.UpdateChild(c, updateArguments));
    }

    private ClickViews(){
        if (this.MainView === null){
            throw new Error("Unable to Click: MainView has not been registered.");
        }

        this.MainView.OnClick?.();

        const sharedLevelData:OnClickSharedData = {maxLevel:0, viewsOnLevel: []}
        this.MainView.Children.forEach(c => this.ClickChild(c, 1, sharedLevelData));

        sharedLevelData.viewsOnLevel.forEach((view) => {
            view.OnClick?.();
        })
    }

    private ClickChild(currentView:View, currentLevel: number, sharedLevelData:OnClickSharedData){
        currentView.Children.forEach(c => this.ClickChild(c, currentLevel + 1, sharedLevelData));

        if (currentView.OnClick === undefined){
            return;
        }
        if (sharedLevelData.maxLevel == currentLevel){
            sharedLevelData.viewsOnLevel.push(currentView);
        }
        if (sharedLevelData.maxLevel < currentLevel){
            sharedLevelData.maxLevel = currentLevel;
            sharedLevelData.viewsOnLevel = [currentView];
        }
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