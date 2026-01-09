import { WindowProvider } from "./Services/WindowProvider.js";
import { EventManager } from "./Services/EventManager.js";

console.log("StartApp");

const eventManager = new EventManager();
const windowProvider = new WindowProvider();

eventManager.RegisterClickEvent((e) => console.log(e));
eventManager.RegisterClickEvent((e) => console.log("hei"));

console.log("Finish Startup");