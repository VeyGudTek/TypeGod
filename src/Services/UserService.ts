import type { User } from "@Models/.";

class UserService{
    private User:User = {};

    GetCharacterName(){
        return this.User.characterName ? this.User.characterName : "";
    }

    SetCharacterName(name:string){
        this.User.characterName = name;
    }
}

export const userService = new UserService();