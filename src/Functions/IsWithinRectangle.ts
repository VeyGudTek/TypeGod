import type { Vector2 } from "@Models/.";

export function IsWithinRectangle(point: Vector2, rectPosition:Vector2, rectSize:Vector2){
    const withinXBound = point.x <= (rectPosition.x + rectSize.x / 2) && point.x >= (rectPosition.x - rectSize.x / 2)
    const withinYBound = point.y <= (rectPosition.y + rectSize.y / 2) && point.y >= (rectPosition.y - rectSize.y / 2)

    return withinXBound && withinYBound;
}