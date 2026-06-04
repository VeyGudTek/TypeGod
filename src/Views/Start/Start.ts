import { BaseView, Button, Fade, Label, Panel, Picture, PopUpBox } from "@Views/.";
import { Sizes } from "@Static/.";
import { userService } from "@Services/UserService";
import { miscImageDictionary } from "@Static/MiscImageDictionary";

export class Start extends BaseView{
    private Fade:Fade;
    private IsNewGame:boolean = true;

    private NewWarning?:PopUpBox;

    constructor(onStart:(newGame:boolean) => void){
        super();

        const splashLeft = new Picture(miscImageDictionary["start"]["left"].image,   {x:1344, y:2226}, 1.25, {x:.17, y:.65});
        const splashRight = new Picture(miscImageDictionary["start"]["right"].image, {x:1394, y:2595}, 1.5, {x:.85, y:.65});

        const backPanel = new Panel(    {x:.35, y:.6},              {x:.5, y:.5});
        const prompt = new Label(       {x:0, y: Sizes.text.title}, {x:.5, y:.3}, "Type God", "center");

        this.Children.push(splashLeft, splashRight, backPanel, prompt);

        this.CreateButtons();

        this.Fade = new Fade(() => onStart(this.IsNewGame));
        this.Children.push(this.Fade);
    }

    private CreateButtons(){
        const hasData = userService.CheckExisting();
        const newButtonY = hasData ? .47 : .55

        const newGame = new Button(         {x:.18, y:.07}, {x:.5, y:newButtonY}, "New Game", () => this.OnNew(hasData));
        this.Children.push(newGame);

        if (hasData){
            const continueGame = new Button({x:.25, y:.07}, {x:.5, y:.65}, "Continue Game", () => this.OnContinue());
            this.Children.push(continueGame);
        }
    }

    private OnNew(hasData:boolean){
        const confirmStart = () => {
            userService.ResetData();
            this.IsNewGame = true;
            this.Fade.StartFade();
        };

        if (hasData){
            this.NewWarning = new PopUpBox(
                        "Your existing data\n will be wiped.",
                        {callBack: () => {this.RemoveChild(this.NewWarning)}, text: "Cancel"},
                        {callBack: () => {confirmStart()}, text: "Confirm"}
                    );
            this.Children.push(this.NewWarning);
        }
        else{
            confirmStart();
        }
    }

    private OnContinue(){
        userService.LoadExisting();
        
        this.IsNewGame = false;
        this.Fade.StartFade();
    }
}