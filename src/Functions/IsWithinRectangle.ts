import type { Vector2 } from "@Models/.";

export function IsWithinRectangle(point: Vector2, rectPosition:Vector2, rectSize:Vector2){
    const withinXBound = point.x <= (rectPosition.x + rectSize.x) && point.x >= rectPosition.x;
    const withinYBound = point.y <= (rectPosition.y + rectSize.y) && point.y >= rectPosition.y;

    return withinXBound && withinYBound;
}