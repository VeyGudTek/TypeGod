import { eventManager } from "@Services/.";
import { Main } from "@Views/.";

console.log("StartApp");

eventManager.RegisterClickEvent((e) => console.log(e));
eventManager.RegisterClickEvent(() => console.log("hei"));
const mainView = new Main();

console.log("Finish Startup");