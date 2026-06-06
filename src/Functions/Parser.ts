export function ParseInt(string:string){
    const parsedInt = +string;

    if (isNaN(parsedInt)){
        throw new Error(`Failed to parse to int: ${string}`);
    }

    return parsedInt;
}