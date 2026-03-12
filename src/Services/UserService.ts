import type { CharacterIndex, User } from "@Models/.";
import { defaultUserData } from "@Static/.";

class UserService{
    private User:User = defaultUserData;

    GetCharacterData(characterIndex: CharacterIndex){
        return structuredClone(this.User[characterIndex]);
    }
}

export const userService = new UserService();