import type { Vector2 } from "@Models/Vector2.type";
import { windowProvider } from "@Services/WindowProvider";

export function DrawText(text:string, color:string, position:Vector2, align: "start" | "center", textSize:number){
    windowProvider.CanvasContext.font = `${textSize}px monospace`;
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.textAlign = align;
    windowProvider.CanvasContext.textBaseline = "middle";

    RenderSplitText(text, position, textSize);
}

function RenderSplitText(text:string, position:Vector2, textSize:number){
    const lines = text.split("\n");
    const totalLines = lines.length;
    const midIndex = Math.round((totalLines - 1) / 2);

    lines.forEach((line, index) => {
        const offset = (index - midIndex) * (textSize * 1.5);

        windowProvider.CanvasContext.fillText(line, position.x, position.y + offset);
    });
}