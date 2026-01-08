export class CanvasProvider {
    CanvasElement;
    CanvasContext;
    constructor() {
        this.CanvasElement = document.getElementById("canvas");
        this.CanvasContext = this.CanvasElement.getContext("2d");
    }
}
//# sourceMappingURL=canvasProvider.js.map