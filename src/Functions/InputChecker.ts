export function CheckRegisterInput(username:string, password:string, repeatedPassword: string): string | undefined{
    if (username.length < 2){
        return "Username must contain at least\n2 characters.";
    }

    if (!/.*[a-z]+.*/.test(password)){
        return "Password must contain\na lower-cased letter.";
    }

    if (!/.*[A-Z]+.*/.test(password)){
        return "Password must contain\an upper-cased letter.";
    }

    if (!/.*[!?@#$%^&*_+]+.*/.test(password)){
        return "Password must contain\na special character.\n(!?@#$%^&*_+)";
    }

    if (!/.*\d+.*/.test(password)){
        return "Password must contain\a number.";
    }

    if (password.length < 8){
        return "Password must be at least\n8 characters long."
    }

    if (password != repeatedPassword){
        return "Passwords do not match.";
    }
}

export function CheckLoginInput(username:string, password:string): string | undefined{
    if (username.length == 0){
        return "Please enter a username."
    }

    if (password.length == 0){
        return "Please enter a password."
    }
}