class TimeService{
    DeltaTime:number = 0;
    LastFrameTime:number;

    constructor(){
        this.LastFrameTime = performance.now();
    }

    OnUpdate(){
        const newFrameTime = performance.now();
        this.DeltaTime = newFrameTime - this.LastFrameTime;
        this.LastFrameTime = newFrameTime;
    }
}

export const timeService = new TimeService();