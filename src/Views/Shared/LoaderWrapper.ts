import { DrawRect, DrawText } from "@Functions/DrawFunctions";
import { BaseView } from "./BaseView";
import { windowProvider } from "@Services/WindowProvider";
import type { SceneName, ScriptIndex } from "@Models/Enums";
import { imageLoader } from "@Services/ImageLoader";

export class LoaderWrapper extends BaseView{
    private Child:BaseView;
    private DoneLoading:boolean = false;

    constructor(sceneName:SceneName, child:BaseView, scriptIndex?:ScriptIndex){
        super();
        this.Child = child;

        switch (sceneName){
            case "cutscene":
                if (scriptIndex === undefined){
                    throw Error("Loader for cutscene must provide scriptIndex");
                }
                imageLoader.LoadCutsceneScript(scriptIndex);
                break;
            case "level":
                imageLoader.LoadSprites();
                break;
            default:
                imageLoader.LoadPage(sceneName);
        }
    }

    OnUpdate(){
        if (this.DoneLoading){
            return;
        }

        const progressDto = imageLoader.GetLoadingProgress();

        if (progressDto.current === progressDto.total){
            this.Children.push(this.Child);
            this.DoneLoading = true;
        }
    }

    Render(){
        if (this.DoneLoading){
            return;
        }

        DrawRect({x:0, y:0}, windowProvider.WindowSize, "black", "black", 0);

        const progressDto = imageLoader.GetLoadingProgress();
        const loadingText = `Loading Assets ${progressDto.current} / ${progressDto.total}`;
        DrawText(loadingText, "white", {
                x: windowProvider.WindowSize.x / 2,
                y: windowProvider.WindowSize.y / 2
            },
            "center",
            15
        );
    }
}