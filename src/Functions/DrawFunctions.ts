import type { AlignType, Vector2 } from "@Models/index";
import { windowProvider } from "@Services/WindowProvider";
import { textDictionary } from "@Static/TextDictionary";

export function DrawImage(image:HTMLImageElement, position:Vector2, size:Vector2){
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

const originalCharSize = {x:100, y:200};

export function DrawText(text:string, color:string, position:Vector2, align: AlignType, textSize:number){
    const lines = text.split("\n");
    const totalLines = lines.length;
    
    let midIndex = Math.round((totalLines - 1) / 2);
    if (totalLines % 2 === 1){
        midIndex += .5;
    }

    const scaledSize = {
        x: (textSize / originalCharSize.y) * originalCharSize.x,
        y: textSize
    }

    let yOffset = align === "start" ? 0 : -(midIndex * scaledSize.y);
    lines.forEach((line) => {
        const linePosition = {
            x: position.x,
            y: position.y + yOffset
        }

        DrawLine(line, color, linePosition, scaledSize, align);
        yOffset += scaledSize.y;
    })
}

function DrawLine(text:string, color:string, position:Vector2, scaledSize:Vector2, align: AlignType){
    const totalCharacters = text.length;
    let midIndex = Math.round((totalCharacters - 1) / 2);

    if (totalCharacters % 2 === 1){
        midIndex += .5;
    }

    let xOffset = align === "start" ? 0 : -(midIndex * scaledSize.x);
    for (const char of text){
        const charImageData = textDictionary[char];
        if (charImageData === undefined){
            xOffset += scaledSize.x;
            continue;
        }

        const charPosition = {
            x: position.x + xOffset,
            y: position.y
        }

        DrawTintedImage(charImageData.image, color, charPosition, scaledSize);
        xOffset += scaledSize.x;
    }
}

function DrawTintedImage(image:HTMLImageElement, color:string, position:Vector2, size:Vector2){
    windowProvider.SecondaryCanvasElement.width = size.x;
    windowProvider.SecondaryCanvasElement.height = size.y;

    windowProvider.SecondaryCanvasContext.drawImage(image, 0, 0, size.x, size.y);
    windowProvider.SecondaryCanvasContext.globalCompositeOperation = "source-in";
    windowProvider.SecondaryCanvasContext.fillStyle = color;
    windowProvider.SecondaryCanvasContext.fillRect(0, 0, size.x, size.y);

    windowProvider.CanvasContext.drawImage(windowProvider.SecondaryCanvasElement, position.x, position.y);
}

//Old Implementation
/*
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
*/