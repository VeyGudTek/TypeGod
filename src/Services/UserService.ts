import type { User } from "@Models/.";
import { defaultUserData } from "@Static/.";

class UserService{
    private User:User = defaultUserData;

    GetUserData(){
        return structuredClone(this.User);
    }
}

export const userService = new UserService();