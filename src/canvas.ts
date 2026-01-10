import { eventManager } from "@Services/.";
import { Main } from "@Views/.";

console.log("StartApp");

const mainView = new Main()
eventManager.MainView = mainView;

console.log("Finish Startup");