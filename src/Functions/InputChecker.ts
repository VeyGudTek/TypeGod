export function CheckRegisterInput(username:string, password:string, repeatedPassword: string): string | undefined{
    if (username.length == 0){
        return "Username Cannot be empty.";
    }

    if (!/.*[a-z]+.*/.test(password)){
        return "Password must contain a lower-cased letter.";
    }

    if (!/.*[A-Z]+.*/.test(password)){
        return "Password must contain an upper-cased letter.";
    }

    if (!/.*[!?@#$%^&*_+]+.*/.test(password)){
        return "Password must contain\na special character.\n(!?@#$%^&*_+)";
    }

    if (!/.*\d+.*/.test(password)){
        return "Password must contain a number.";
    }

    if (password != repeatedPassword){
        return "Passwords do not match.";
    }
}