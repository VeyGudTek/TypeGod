class ProgressService{
    private readonly StorageIndex = "progress"

    private CompletedLevels:number[] = [];
    private ExistingData:string | null;

    constructor(){
        this.ExistingData = window.localStorage.getItem(this.StorageIndex);
    }

    ResetData(){
            this.CompletedLevels = [];
            this.Save();
        }
        
    LoadExisting(){
        if (this.CheckExisting()){
            this.CompletedLevels = JSON.parse(this.ExistingData as string);
        }
    }

    CheckExisting(){
        return this.ExistingData !== null && !this.CheckMalformed();
    }

    private CheckMalformed(){
        if (this.ExistingData !== null){
            this.CompletedLevels = JSON.parse(this.ExistingData);

            return Array.isArray(this.CompletedLevels) && this.CompletedLevels.every(l => typeof l === "number");
        }
    }

    GetCompletedLevels(){
        return [...this.CompletedLevels];
    }
    
    SaveCompletedLevel(level:number){
        this.CompletedLevels.push(level);
        this.Save();
    }
    
    private Save(){
        window.localStorage.setItem(this.StorageIndex, JSON.stringify(this.CompletedLevels));
    }
}

export const progressService = new ProgressService();