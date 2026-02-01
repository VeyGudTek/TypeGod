export class Timer{
    StartTime:number;

    constructor(){
        this.StartTime = performance.now();
    }

    GetElapsedTime(){
        return (performance.now() - this.StartTime) / 1000;
    }

    Reset(){
        this.StartTime = performance.now();
    }
}

class TimeService{
    DeltaTime:number = 0;
    LastFrameTime:number;

    constructor(){
        this.LastFrameTime = performance.now();
    }

    OnUpdate(){
        const newFrameTime = performance.now();
        this.DeltaTime = (newFrameTime - this.LastFrameTime) / 1000;
        this.LastFrameTime = newFrameTime;
    }
}

export const timeService = new TimeService();