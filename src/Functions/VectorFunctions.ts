import type { Vector2 } from "@Models/."
import { windowProvider } from "@Services/WindowProvider";

export function IsWithinRectangle(point: Vector2, rectPosition:Vector2, rectSize:Vector2){
    const withinXBound = point.x <= (rectPosition.x + rectSize.x) && point.x >= rectPosition.x;
    const withinYBound = point.y <= (rectPosition.y + rectSize.y) && point.y >= rectPosition.y;

    return withinXBound && withinYBound;
}

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

export function ScaleToMaxWindowSize(size:Vector2){
    let height = size.y;
    let width = size.x;
    let imageToWindowRatio = 1;

    const widthByHeight = (height / 9) * 16;
    if (widthByHeight > width){
        imageToWindowRatio = height / windowProvider.WindowSize.y;
    }
    else{
        imageToWindowRatio = width / windowProvider.WindowSize.x;
    }

    return {
        x: width / imageToWindowRatio,
        y: height / imageToWindowRatio
    }
}