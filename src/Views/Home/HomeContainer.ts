import { BaseView } from "@Views/Shared";
import { Home } from "./Home";
import type { CharacterIndex } from "@Models/User.type";

export class HomeContainer extends BaseView{
    Home:Home;

    constructor(){
        super();

        this.Home = new Home((index:CharacterIndex) => this.OnCharacterButton(index));
        this.Children.push(this.Home);
    }

    private OnCharacterButton(index:CharacterIndex){
        console.log(index);
    }
}