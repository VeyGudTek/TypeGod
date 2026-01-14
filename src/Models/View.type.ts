import type { BasicCallback, Vector2 } from "@Models/.";

export type UpdateArguments = {
    mousePosition:Vector2,
    mouseDown:boolean
}

export interface View{
    Children: View[],
    OnUpdate?: (updateArguments:UpdateArguments) => void,
    OnClick?: BasicCallback,
    OnKey?: (key:string) => void,
}