import { eventManager } from "@Services/EventManager.js";

console.log("StartApp");

eventManager.RegisterClickEvent((e) => console.log(e));
eventManager.RegisterClickEvent((e) => console.log("hei"));

console.log("Finish Startup");