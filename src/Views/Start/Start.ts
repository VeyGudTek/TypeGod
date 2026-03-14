import { BaseView, Picture } from "@Views/.";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";

export class Start extends BaseView{
    constructor(){
        super();

        const splashLeft = new Picture(splashLeftSource,   {x:1344, y:2226}, .5, {x:.16, y:.6});
        const splashRight = new Picture(splashRightSource, {x:1394, y:2595}, .5, {x:.85, y:.55});

        this.Children.push(splashLeft, splashRight);
    }
}