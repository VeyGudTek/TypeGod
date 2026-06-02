import type { View } from "@Models/View.type";

export class BaseView implements View{
    Children: View[] = [];
    Priority: number = 0;

    protected RemoveChild(child?:View){
        if (child){
            const indexToRemove = this.Children.indexOf(child);
            if (indexToRemove >= 0){
                this.Children.splice(indexToRemove, 1);
            }
        }
    }
}