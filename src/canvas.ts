import { eventManager } from "@Services/.";
import { Main } from "@Views/.";

console.log("StartApp");

const mainView = new Main()

eventManager.MainView = mainView;
eventManager.TriggerRender();

console.log("Finish Startup");