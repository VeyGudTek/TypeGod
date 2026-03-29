import type { AlignType, Vector2 } from "@Models/index";
import { windowProvider } from "@Services/WindowProvider";

export function DrawImage(imageName:string, position:Vector2, size:Vector2){
    const image = new Image();
    image.src = imageName;
    windowProvider.CanvasContext.drawImage(image, position.x, position.y, size.x, size.y);
}

export function DrawRect(position:Vector2, size:Vector2, color:string, outlineColor:string, outlineWidth:number) {
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.strokeStyle = outlineColor;
    windowProvider.CanvasContext.lineWidth = outlineWidth;
    
    if (outlineWidth !== 0){
        windowProvider.CanvasContext.strokeRect(position.x, position.y, size.x, size.y);
    }
    windowProvider.CanvasContext.fillRect(position.x, position.y, size.x, size.y);
}

export function DrawText(text:string, color:string, position:Vector2, align: AlignType, textSize:number){
    windowProvider.CanvasContext.font = `${textSize}px monospace`;
    windowProvider.CanvasContext.fillStyle = color;
    windowProvider.CanvasContext.textAlign = align;
    windowProvider.CanvasContext.textBaseline = "middle";

    RenderSplitText(text, position, textSize, align);
}

function RenderSplitText(text:string, position:Vector2, textSize:number, align: AlignType){
    const lines = text.split("\n");
    const totalLines = lines.length;
    const midIndex = Math.round((totalLines - 1) / 2);

    lines.forEach((line, index) => {
        let offset = 0;
        if (align == "center"){
            offset = (index - midIndex) * (textSize * 1.5);   
        }
        else{
            offset = index * (textSize * 1.5)
        }

        windowProvider.CanvasContext.fillText(line, position.x, position.y + offset);
    });
}