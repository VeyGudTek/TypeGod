class ProgressService{
    private readonly AttemptedIndex = "attemptedLevels"
    private readonly CompletedIndex = "completedLevels"

    private AttemptedLevels:number[] = [];
    private CompletedLevels:number[] = [];
    private ExistingAttempted:string | null;
    private ExistingCompleted:string | null;

    constructor(){
        this.ExistingCompleted = window.localStorage.getItem(this.CompletedIndex);
        this.ExistingAttempted = window.localStorage.getItem(this.AttemptedIndex);
    }

    ResetData(){
            this.CompletedLevels = [];
            this.AttemptedLevels = [];
            this.Save();
        }
        
    LoadExisting(){
        if (this.CheckExisting()){
            this.AttemptedLevels = JSON.parse(this.ExistingAttempted as string);
            this.CompletedLevels = JSON.parse(this.ExistingCompleted as string);
        }
    }

    CheckExisting(){
        return this.CheckValidData();
    }

    private CheckValidData(){
        if (this.ExistingCompleted !== null && this.ExistingAttempted !== null){
            const completedLevels = JSON.parse(this.ExistingCompleted);
            const attemptedLevels = JSON.parse(this.ExistingAttempted);

            const validCompleted = Array.isArray(completedLevels) && completedLevels.every(l => typeof l === "number");
            const validAttempted = Array.isArray(attemptedLevels) && attemptedLevels.every(l => typeof l === "number");

            return validAttempted && validCompleted;
        }
        return false;
    }

    GetAttemptedLevels(){
        return [...this.AttemptedLevels];
    }

    GetCompletedLevels(){
        return [...this.CompletedLevels];
    }

    SaveAttemptedLevel(level:number){
        if (!this.AttemptedLevels.includes(level)){
            this.AttemptedLevels.push(level);
            this.Save();
        }
    }
    
    SaveCompletedLevel(level:number){
        if (!this.CompletedLevels.includes(level)){
            this.CompletedLevels.push(level);
            this.Save();
        }
    }
    
    private Save(){
        window.localStorage.setItem(this.CompletedIndex, JSON.stringify(this.CompletedLevels));
        window.localStorage.setItem(this.AttemptedIndex, JSON.stringify(this.AttemptedLevels));
    }
}

export const progressService = new ProgressService();