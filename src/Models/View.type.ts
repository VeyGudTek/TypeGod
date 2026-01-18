import type { BasicCallback, Vector2 } from "@Models/.";

export interface View{
    Children: View[],
    Priority: number,
    OnUpdate?: BasicCallback,
    CheckHover?: (mousePosition:Vector2) => boolean,
    OnHover?: BasicCallback,
    OnMouseDown?: BasicCallback, 
    OnClick?: BasicCallback,
    Render?: BasicCallback,
    OnKey?: (key:string) => void,
}