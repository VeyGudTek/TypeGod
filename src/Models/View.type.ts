import type { Vector2 } from "@Models/.";

export interface View{
    Children: View[],
    OnUpdate?: (mousePosition: Vector2) => void,
    OnClick?: (mousePosition: Vector2) => void,
}