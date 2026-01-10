import { eventManager } from "@Services/.";

console.log("StartApp");

eventManager.RegisterClickEvent((e) => console.log(e));
eventManager.RegisterClickEvent(() => console.log("hei"));

console.log("Finish Startup");