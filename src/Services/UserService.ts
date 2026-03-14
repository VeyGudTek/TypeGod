import type { CharacterIndex, User, CharacterData } from "@Models/.";
import { defaultUserData } from "@Static/.";

class UserService{
    private readonly storageIndex = "userData";
    private User:User = defaultUserData;
    private ExistingData:string | null;

    constructor(){
        this.ExistingData = window.localStorage.getItem(this.storageIndex);
    }

    CheckExisting(){
        return this.ExistingData !== null && !this.CheckMalformed();
    }

    LoadExisting(){
        if (this.CheckExisting()){
            this.User = JSON.parse(this.ExistingData as string);
        }
        else{
            window.localStorage.setItem(this.storageIndex, JSON.stringify(this.User))
        }
    }

    private CheckMalformed(){
        try{
            if (this.ExistingData !== null){
                this.User = JSON.parse(this.ExistingData);

                Object.keys(defaultUserData).forEach((characterIndex) => {
                    const index = characterIndex as CharacterIndex;
                    Object.keys(defaultUserData[index]).forEach((characterProperty) => {
                        const property = this.User[index][characterProperty as keyof CharacterData];
                        if (typeof property !== "number"){
                            throw new Error();
                        }
                    });
                });
            }
        }
        catch{
            return true;
        }
        return false;
    }

    GetUserData(){
        return structuredClone(this.User);
    }
}

export const userService = new UserService();