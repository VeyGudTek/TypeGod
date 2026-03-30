export class ComboTracker{
    private Combo = 0;
    private ComboAccumulator = 0;

    Reset(){
        this.Combo = 0;
        this.ComboAccumulator = 0;
    }

    AddCount(){
        this.Combo += 1;
        this.ComboAccumulator += Math.max(.001, .005 - (this.Combo * .00001));
    }

    SubtractCount(){
        this.Combo -= 1;
        this.ComboAccumulator -= Math.max(.001, .005 - (this.Combo - 1 * .00001));
    }

    GetCombo(){
        return this.Combo;
    }

    GetMultiplier(){
        return this.ComboAccumulator + 1;
    }
}