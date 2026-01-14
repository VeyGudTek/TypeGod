import type { Vector2 } from "@Models/.";

export type UpdateArguments = {
    mousePosition:Vector2,
    mouseDown:boolean
}

export interface View{
    Children: View[],
    OnUpdate?: (updateArguments:UpdateArguments) => void,
    OnClick?: (mousePosition: Vector2) => void,
    OnKey?: (key:string) => void,
}