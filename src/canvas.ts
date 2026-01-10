import { eventManager } from "@Services/.";

console.log("StartApp");

eventManager.RegisterClickEvent(() => console.log("Click Event Fired"));
eventManager.Render();

console.log("Finish Startup");