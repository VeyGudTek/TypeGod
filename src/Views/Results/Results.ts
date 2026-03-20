import { Sizes } from "@Static/Styles";
import { BaseView, Label, Panel } from "@Views/Shared";
import { CharacterResults } from "./CharacterResults";

export class Results extends BaseView{
    constructor(experience:number, characters:number, time:number){
        super();

        const backPanel = new Panel({x: .4, y: .8}, {x:.25, y:.5});
        const title = new Label({x: .4, y: Sizes.text.title}, {x:.25, y:.2}, "Results", "center");

        const charactersText = `Characters: ${characters}`;
        const timeText = `Time: ${time}`;
        const charactersLabel = new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.3}, charactersText, "start");
        const timeLabel =       new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.4}, timeText, "start");

        const characterResults = new CharacterResults(experience);

        this.Children.push(backPanel, title, charactersLabel, timeLabel, characterResults);
    }
}