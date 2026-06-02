import { BaseView, Fade } from "@Views/Shared";
import { Home } from "./Home";
import type { CharacterIndex, StageIndex, StageIndexCallback } from "@Models/.";
import { CharacterUpgrade } from "./CharacterUpgrade";
import { MapView } from "./MapView";

export class HomeContainer extends BaseView{
    Fade:Fade;
    SelectedLevel:StageIndex = "1";

    Home:Home;
    CharacterUpgrade?:CharacterUpgrade;
    Map:MapView;

    constructor(onLevelSelect:StageIndexCallback){
        super();

        this.Home = new Home((index:CharacterIndex) => this.OnCharacterButton(index), () => this.OnMap());
        this.Map = new MapView(() => this.ToHome(), (index) => this.WrappedLevelSelect(index));

        this.Children.push(this.Home);

        this.Fade = new Fade(() => onLevelSelect(this.SelectedLevel));
        this.Children.push(this.Fade);
    }

    private WrappedLevelSelect(index:StageIndex){
        this.SelectedLevel = index;
        this.Fade.StartFade();
    }

    private OnMap(){
        this.RemoveChild(this.Home);
        this.Children.unshift(this.Map);
    }

    private OnCharacterButton(index:CharacterIndex){
        this.RemoveChild(this.Home);
        this.CharacterUpgrade = new CharacterUpgrade(index, () => this.ToHome());
        this.Children.unshift(this.CharacterUpgrade);
    }

    private ToHome(){
        this.RemoveChild(this.CharacterUpgrade);
        this.RemoveChild(this.Map);
        this.Children.unshift(this.Home);
    }
}