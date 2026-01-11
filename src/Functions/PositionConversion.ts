import type { Vector2 } from "@Models/."

export function GetPositionFromCenter(center:Vector2, size:Vector2){
    return {
        x: center.x - (size.x / 2),
        y: center.y - (size.y / 2),
    }
}

export function GetCenterFromPosition(position:Vector2, size:Vector2){
        return {
        x: position.x + (size.x / 2),
        y: position.y + (size.y / 2),
    }
}