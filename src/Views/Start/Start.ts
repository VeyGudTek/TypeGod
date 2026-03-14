import { BaseView, Picture } from "@Views/.";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";

export class Start extends BaseView{
    constructor(){
        super();

        const splashLeft = new Picture(splashLeftSource,   {x:1344, y:2226}, 1.25, {x:.17, y:.65});
        const splashRight = new Picture(splashRightSource, {x:1394, y:2595}, 1.5, {x:.85, y:.65});

        this.Children.push(splashLeft, splashRight);
    }
}